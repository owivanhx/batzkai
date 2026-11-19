require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool, types } = require('pg');
types.setTypeParser(20, Number); // ids bigint chegam como número, não texto
const { z } = require('zod');
const path = require('path');

// Falha cedo se faltar configuração crítica.
for (const k of ['JWT_SECRET', 'DATABASE_URL']) {
  if (!process.env[k]) { console.error('Variável ausente: ' + k); process.exit(1); }
}
if (process.env.JWT_SECRET.length < 32) { console.error('JWT_SECRET muito curto'); process.exit(1); }

const isProd = process.env.NODE_ENV === 'production';
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: { useDefaults: true, directives: {
  defaultSrc: ["'self'"], scriptSrc: ["'self'"], connectSrc: ["'self'"], imgSrc: ["'self'", 'data:'],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'], fontSrc: ['https://fonts.gstatic.com'],
  objectSrc: ["'none'"], frameAncestors: ["'none'"], 'upgrade-insecure-requests': isProd ? [] : null } } }));
app.use(cors({ origin: process.env.FRONTEND_URL || false, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Muitas tentativas. Aguarde alguns minutos.' } });

// Anti-CSRF: o cookie é SameSite=Strict e toda escrita exige um cabeçalho que formulários de outros sites não conseguem enviar.
app.use((req, res, next) => {
  const write = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
  if (write && !req.path.startsWith('/api/webhooks/') && req.get('X-Requested-With') !== 'feirao') {
    return res.status(403).json({ error: 'Requisição bloqueada.' });
  }
  next();
});

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const parse = (schema, data) => {
  const r = schema.safeParse(data);
  if (!r.success) { const e = new Error('Dados inválidos'); e.status = 400; e.details = r.error.issues.map(i => i.path.join('.') + ': ' + i.message); throw e; }
  return r.data;
};

// ---------- Autenticação ----------
function setSession(res, user) {
  const token = jwt.sign({ sub: String(user.id), role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.cookie('session', token, { httpOnly: true, secure: isProd, sameSite: 'strict', maxAge: 2 * 60 * 60 * 1000 });
}
function auth(req, res, next) {
  try { const p = jwt.verify(req.cookies.session, process.env.JWT_SECRET); req.user = { id: Number(p.sub), role: p.role }; next(); }
  catch { res.status(401).json({ error: 'Faça login para continuar.' }); }
}
const need = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ error: 'Sem permissão.' });

const DUMMY_HASH = bcrypt.hashSync('senha-falsa-para-tempo-constante', 12);

app.post('/api/auth/register', authLimiter, wrap(async (req, res) => {
  const b = parse(z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().toLowerCase().email().max(120),
    password: z.string().min(10, 'Use ao menos 10 caracteres').max(72)
  }), req.body);
  const hash = await bcrypt.hash(b.password, 12);
  // O papel NUNCA vem do cliente: todo cadastro novo é comprador.
  const r = await db.query(
    "INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) ON CONFLICT (email) DO NOTHING RETURNING id,role", [b.name, b.email, hash]);
  if (!r.rowCount) return res.status(409).json({ error: 'Não foi possível criar a conta com esses dados.' });
  setSession(res, r.rows[0]);
  res.status(201).json({ ok: true });
}));

app.post('/api/auth/login', authLimiter, wrap(async (req, res) => {
  const b = parse(z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(72) }), req.body);
  const r = await db.query('SELECT id,role,password_hash FROM users WHERE email=$1', [b.email]);
  const u = r.rows[0];
  const ok = await bcrypt.compare(b.password, u ? u.password_hash : DUMMY_HASH);
  if (!u || !ok) return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  setSession(res, u);
  res.json({ ok: true, role: u.role });
}));

app.post('/api/auth/logout', (req, res) => { res.clearCookie('session'); res.json({ ok: true }); });

app.post('/api/me/become-seller', auth, need('buyer'), wrap(async (req, res) => {
  await db.query("UPDATE users SET role='seller' WHERE id=$1 AND role='buyer'", [req.user.id]);
  const u = { id: req.user.id, role: 'seller' }; setSession(res, u); res.json({ ok: true });
}));

// ---------- Perfil e configurações (cada pessoa só enxerga e altera os próprios dados) ----------
const ME_COLS = 'id,name,email,role,pronoun,phone,address,bio,avatar_color,settings';
const profileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  pronoun: z.string().trim().max(20).default(''),
  phone: z.string().trim().max(25).regex(/^[0-9()+\-\s]*$/, 'Telefone inválido').default(''),
  address: z.string().trim().max(200).default(''),
  bio: z.string().trim().max(300).default(''),
  avatar_color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#1a159e')
});
const settingsSchema = z.object({
  theme: z.enum(['auto', 'light', 'dark']), notifications: z.boolean(), language: z.enum(['pt-BR', 'en', 'es']),
  show_books: z.enum(['all', 'me']), show_reviews: z.enum(['all', 'me'])
});

app.get('/api/me', wrap(async (req, res) => {
  let id;
  try { id = Number(jwt.verify(req.cookies.session, process.env.JWT_SECRET).sub); } catch { return res.json({ user: null }); }
  const r = await db.query('SELECT ' + ME_COLS + ' FROM users WHERE id=$1', [id]);
  res.json({ user: r.rows[0] || null });
}));

app.patch('/api/me/profile', auth, wrap(async (req, res) => {
  const b = parse(profileSchema, req.body);
  await db.query('UPDATE users SET name=$1,pronoun=$2,phone=$3,address=$4,bio=$5,avatar_color=$6 WHERE id=$7',
    [b.name, b.pronoun, b.phone, b.address, b.bio, b.avatar_color, req.user.id]);
  res.json({ ok: true });
}));

app.patch('/api/me/settings', auth, wrap(async (req, res) => {
  const b = parse(settingsSchema, req.body);
  await db.query('UPDATE users SET settings=$1 WHERE id=$2', [JSON.stringify(b), req.user.id]);
  res.json({ ok: true });
}));

// Trocar e-mail exige a senha atual: quem roubar uma sessão aberta não consegue tomar a conta.
app.patch('/api/me/email', auth, authLimiter, wrap(async (req, res) => {
  const b = parse(z.object({ email: z.string().trim().toLowerCase().email().max(120), password: z.string().min(1).max(72) }), req.body);
  const u = await db.query('SELECT password_hash FROM users WHERE id=$1', [req.user.id]);
  if (!u.rowCount || !(await bcrypt.compare(b.password, u.rows[0].password_hash))) return res.status(401).json({ error: 'Senha atual incorreta.' });
  try { await db.query('UPDATE users SET email=$1 WHERE id=$2', [b.email, req.user.id]); }
  catch (e) { if (e.code === '23505') return res.status(409).json({ error: 'Não foi possível usar esse e-mail.' }); throw e; }
  res.json({ ok: true });
}));

// ---------- Livros ----------
const CATS = ['Romance', 'Poesia', 'Infantil', 'Didático'];
const CONDS = ['Como novo', 'Bom estado', 'Com marcas'];
const bookSchema = z.object({
  title: z.string().trim().min(2).max(80),
  author: z.string().trim().max(60).default(''),
  category: z.enum(CATS),
  book_condition: z.enum(CONDS),
  description: z.string().trim().max(500).default(''),
  price_cents: z.number().int().min(0).max(100000000) // 0 = doação
});
const id = (req) => Number(req.params.id) || 0;

// Pedidos não pagos em 30 minutos são cancelados e os livros voltam à venda.
const expireOrders = () => db.query(
  `WITH x AS (UPDATE book_orders SET status='cancelled' WHERE status='pending_payment' AND created_at < now() - interval '30 minutes' RETURNING id)
   UPDATE books SET status='available' WHERE status='reserved' AND id IN (SELECT book_id FROM book_order_items WHERE order_id IN (SELECT id FROM x))`);

app.get('/api/books', wrap(async (req, res) => {
  await expireOrders();
  const cat = String(req.query.category || '').slice(0, 20), q = String(req.query.q || '').slice(0, 60);
  const r = await db.query(
    `SELECT b.id,b.title,b.author,b.category,b.book_condition,b.description,b.price_cents,b.seller_id,u.name AS seller
       FROM books b JOIN users u ON u.id=b.seller_id
      WHERE b.status='available' AND ($1='' OR b.category=$1) AND ($2='' OR b.title ILIKE '%'||$2||'%' OR b.author ILIKE '%'||$2||'%')
      ORDER BY b.created_at DESC LIMIT 100`, [cat, q]);
  res.json(r.rows);
}));

app.post('/api/books', auth, wrap(async (req, res) => {
  const b = parse(bookSchema, req.body);
  const r = await db.query('INSERT INTO books(seller_id,title,author,category,book_condition,description,price_cents) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id',
    [req.user.id, b.title, b.author, b.category, b.book_condition, b.description, b.price_cents]);
  res.status(201).json(r.rows[0]);
}));

app.get('/api/me/books', auth, wrap(async (req, res) => {
  const r = await db.query("SELECT id,title,author,category,book_condition,price_cents,status FROM books WHERE seller_id=$1 AND status<>'removed' ORDER BY id DESC", [req.user.id]);
  res.json(r.rows);
}));

// Só o dono remove, e só enquanto o livro está à venda.
app.delete('/api/books/:id', auth, wrap(async (req, res) => {
  const r = await db.query("UPDATE books SET status='removed' WHERE id=$1 AND seller_id=$2 AND status='available'", [id(req), req.user.id]);
  r.rowCount ? res.json({ ok: true }) : res.status(404).json({ error: 'Livro não encontrado ou já reservado.' });
}));

// ---------- Cestinha (fica salva na conta) ----------
app.get('/api/cart', auth, wrap(async (req, res) => {
  const r = await db.query(
    `SELECT b.id,b.title,b.author,b.price_cents,u.name AS seller FROM cart_items c JOIN books b ON b.id=c.book_id JOIN users u ON u.id=b.seller_id
      WHERE c.user_id=$1 AND b.status='available' ORDER BY b.id`, [req.user.id]);
  res.json(r.rows);
}));
app.put('/api/cart/:id', auth, wrap(async (req, res) => {
  const b = await db.query("SELECT seller_id FROM books WHERE id=$1 AND status='available'", [id(req)]);
  if (!b.rowCount) return res.status(404).json({ error: 'Esse livro não está mais disponível.' });
  if (b.rows[0].seller_id === req.user.id) return res.status(400).json({ error: 'Você não pode comprar o seu próprio livro.' });
  await db.query('INSERT INTO cart_items(user_id,book_id) VALUES($1,$2) ON CONFLICT DO NOTHING', [req.user.id, id(req)]);
  res.json({ ok: true });
}));
app.delete('/api/cart/:id', auth, wrap(async (req, res) => {
  await db.query('DELETE FROM cart_items WHERE user_id=$1 AND book_id=$2', [req.user.id, id(req)]);
  res.json({ ok: true });
}));

// ---------- Pedidos ----------
// O preço vem SEMPRE do banco. Os livros ficam travados (FOR UPDATE) para duas pessoas não comprarem o mesmo exemplar.
app.post('/api/orders', auth, wrap(async (req, res) => {
  await expireOrders();
  const c = await db.connect();
  try {
    await c.query('BEGIN');
    const bs = await c.query(
      `SELECT b.id,b.price_cents,b.seller_id FROM cart_items ci JOIN books b ON b.id=ci.book_id
        WHERE ci.user_id=$1 AND b.status='available' AND b.seller_id<>$1 ORDER BY b.id FOR UPDATE OF b`, [req.user.id]);
    if (!bs.rowCount) throw Object.assign(new Error('Sua cestinha está vazia ou os livros já foram vendidos.'), { status: 400 });
    const total = bs.rows.reduce((s, b) => s + b.price_cents, 0), status = total === 0 ? 'paid' : 'pending_payment';
    const o = await c.query('INSERT INTO book_orders(buyer_id,status,total_cents) VALUES($1,$2,$3) RETURNING id', [req.user.id, status, total]);
    for (const b of bs.rows) await c.query('INSERT INTO book_order_items VALUES($1,$2,$3,$4)', [o.rows[0].id, b.id, b.seller_id, b.price_cents]);
    await c.query('UPDATE books SET status=$1 WHERE id=ANY($2)', [total === 0 ? 'sold' : 'reserved', bs.rows.map(b => b.id)]);
    await c.query('DELETE FROM cart_items WHERE user_id=$1', [req.user.id]);
    await c.query('COMMIT');
    res.status(201).json({ order_id: o.rows[0].id, total_cents: total, status });
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
}));

app.get('/api/orders', auth, wrap(async (req, res) => {
  const r = await db.query(
    `SELECT o.id,o.status,o.total_cents,o.created_at,
            COALESCE(json_agg(json_build_object('id',b.id,'title',b.title,'price_cents',i.unit_price_cents)) FILTER (WHERE b.id IS NOT NULL),'[]') AS items
       FROM book_orders o LEFT JOIN book_order_items i ON i.order_id=o.id LEFT JOIN books b ON b.id=i.book_id
      WHERE o.buyer_id=$1 GROUP BY o.id ORDER BY o.id DESC LIMIT 50`, [req.user.id]);
  res.json(r.rows);
}));

const move = (name, from, to, after) => app.post('/api/orders/:id/' + name, auth, wrap(async (req, res) => {
  const r = await db.query('UPDATE book_orders SET status=$1 WHERE id=$2 AND buyer_id=$3 AND status=ANY($4) RETURNING id', [to, id(req), req.user.id, from]);
  if (!r.rowCount) return res.status(404).json({ error: 'Pedido não encontrado ou sem essa opção agora.' });
  if (after) await db.query(after, [r.rows[0].id]);
  res.json({ ok: true });
}));
move('cancel', ['pending_payment'], 'cancelled', "UPDATE books SET status='available' WHERE status='reserved' AND id IN (SELECT book_id FROM book_order_items WHERE order_id=$1)");
move('received', ['paid', 'shipped'], 'delivered');
move('refund', ['delivered'], 'refund_requested');

// ---------- Pagamento (Mercado Pago Checkout Pro) ----------
// Os dados do cartão/PIX são digitados na página do Mercado Pago. Seu servidor nunca os vê.
async function markPaid(orderId, totalCents) {
  const r = await db.query("UPDATE book_orders SET status='paid' WHERE id=$1 AND status='pending_payment' AND total_cents=$2 RETURNING id", [orderId, totalCents]);
  if (r.rowCount) await db.query("UPDATE books SET status='sold' WHERE id IN (SELECT book_id FROM book_order_items WHERE order_id=$1)", [orderId]);
}
app.post('/api/orders/:id/pay', auth, wrap(async (req, res) => {
  const o = await db.query("SELECT id,total_cents FROM book_orders WHERE id=$1 AND buyer_id=$2 AND status='pending_payment'", [id(req), req.user.id]);
  if (!o.rowCount) return res.status(404).json({ error: 'Pedido não encontrado.' });
  if (!process.env.MP_ACCESS_TOKEN) { // sem gateway configurado: só no ambiente de testes
    if (isProd) return res.status(503).json({ error: 'Pagamento indisponível no momento.' });
    await markPaid(o.rows[0].id, o.rows[0].total_cents);
    return res.json({ simulated: true });
  }
  const r = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ title: 'Pedido #' + o.rows[0].id, quantity: 1, currency_id: 'BRL', unit_price: o.rows[0].total_cents / 100 }],
      external_reference: String(o.rows[0].id),
      notification_url: process.env.API_URL + '/api/webhooks/mercadopago',
      back_urls: { success: process.env.API_URL + '/#pedido-ok', failure: process.env.API_URL + '/#pedido-erro' }
    })
  });
  if (!r.ok) throw new Error('Falha ao criar pagamento');
  res.json({ checkout_url: (await r.json()).init_point });
}));

// Não confiamos no corpo do webhook: consultamos o pagamento na API do Mercado Pago e conferimos status, pedido e valor.
app.post('/api/webhooks/mercadopago', wrap(async (req, res) => {
  const pid = req.body && req.body.data && req.body.data.id;
  if (!pid || !/^\d+$/.test(String(pid)) || !process.env.MP_ACCESS_TOKEN) return res.sendStatus(200);
  const r = await fetch('https://api.mercadopago.com/v1/payments/' + pid, { headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN } });
  if (!r.ok) return res.sendStatus(200);
  const pay = await r.json();
  if (pay.status === 'approved') await markPaid(Number(pay.external_reference) || 0, Math.round(pay.transaction_amount * 100));
  res.sendStatus(200);
}));

// ---------- Resenhas ----------
app.get('/api/me/reviews', auth, wrap(async (req, res) => {
  const r = await db.query('SELECT id,book_title,body FROM reviews WHERE user_id=$1 ORDER BY id DESC LIMIT 50', [req.user.id]);
  res.json(r.rows);
}));
app.post('/api/reviews', auth, wrap(async (req, res) => {
  const b = parse(z.object({ book_title: z.string().trim().min(2).max(80), body: z.string().trim().min(5).max(500) }), req.body);
  await db.query('INSERT INTO reviews(user_id,book_title,body) VALUES($1,$2,$3)', [req.user.id, b.book_title, b.body]);
  res.status(201).json({ ok: true });
}));

// Serve a loja (pasta public) no MESMO endereço da API: o cookie de login funciona e não precisa de CORS.
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));
app.use((err, req, res, next) => {
  if (err.status && err.status < 500) return res.status(err.status).json({ error: err.message, details: err.details });
  console.error(err); // detalhes só no log do servidor, nunca na resposta
  res.status(500).json({ error: 'Erro interno. Tente novamente.' });
});

app.listen(process.env.PORT || 3000, () => console.log('API no ar'));
