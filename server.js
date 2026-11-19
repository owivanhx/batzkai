require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { z } = require('zod');

// Falha cedo se faltar configuração crítica.
for (const k of ['JWT_SECRET', 'DATABASE_URL', 'FRONTEND_URL']) {
  if (!process.env[k]) { console.error('Variável ausente: ' + k); process.exit(1); }
}
if (process.env.JWT_SECRET.length < 32) { console.error('JWT_SECRET muito curto'); process.exit(1); }

const isProd = process.env.NODE_ENV === 'production';
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
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
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
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

// ---------- Produtos ----------
const productSchema = z.object({
  name: z.string().trim().min(3).max(80),
  description: z.string().trim().max(2000).default(''),
  category: z.string().trim().min(2).max(40),
  price_cents: z.number().int().min(1).max(100000000),
  stock: z.number().int().min(0).max(100000)
});

app.get('/api/products', wrap(async (req, res) => {
  const q = String(req.query.q || '').slice(0, 60), cat = String(req.query.category || '').slice(0, 40);
  const r = await db.query(
    `SELECT p.id,p.name,p.description,p.category,p.price_cents,p.stock,u.name AS seller
       FROM products p JOIN users u ON u.id=p.seller_id
      WHERE p.active AND ($1='' OR p.name ILIKE '%'||$1||'%') AND ($2='' OR p.category=$2)
      ORDER BY p.created_at DESC LIMIT 60`, [q, cat]);
  res.json(r.rows);
}));

app.post('/api/products', auth, need('seller', 'admin'), wrap(async (req, res) => {
  const b = parse(productSchema, req.body);
  const r = await db.query('INSERT INTO products(seller_id,name,description,category,price_cents,stock) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
    [req.user.id, b.name, b.description, b.category, b.price_cents, b.stock]);
  res.status(201).json(r.rows[0]);
}));

// Só o dono (ou admin) altera/remove: evita acesso a dados de outros vendedores (IDOR).
app.patch('/api/products/:id', auth, need('seller', 'admin'), wrap(async (req, res) => {
  const b = parse(productSchema, req.body);
  const r = await db.query(
    `UPDATE products SET name=$1,description=$2,category=$3,price_cents=$4,stock=$5
      WHERE id=$6 AND ($7='admin' OR seller_id=$8) RETURNING id`,
    [b.name, b.description, b.category, b.price_cents, b.stock, Number(req.params.id) || 0, req.user.role, req.user.id]);
  r.rowCount ? res.json({ ok: true }) : res.status(404).json({ error: 'Produto não encontrado.' });
}));

app.delete('/api/products/:id', auth, need('seller', 'admin'), wrap(async (req, res) => {
  const r = await db.query("UPDATE products SET active=false WHERE id=$1 AND ($2='admin' OR seller_id=$3)",
    [Number(req.params.id) || 0, req.user.role, req.user.id]);
  r.rowCount ? res.json({ ok: true }) : res.status(404).json({ error: 'Produto não encontrado.' });
}));

// ---------- Pedidos ----------
// O preço e o estoque vêm SEMPRE do banco. O cliente só informa produto e quantidade.
app.post('/api/orders', auth, wrap(async (req, res) => {
  const b = parse(z.object({ items: z.array(z.object({ product_id: z.number().int().positive(), qty: z.number().int().min(1).max(50) })).min(1).max(30) }), req.body);
  const merged = new Map();
  b.items.forEach(i => merged.set(i.product_id, (merged.get(i.product_id) || 0) + i.qty));
  const ids = [...merged.keys()].sort((a, c) => a - c); // ordem fixa evita deadlock
  const c = await db.connect();
  try {
    await c.query('BEGIN');
    const ps = await c.query('SELECT id,price_cents,stock,seller_id FROM products WHERE id=ANY($1) AND active ORDER BY id FOR UPDATE', [ids]);
    if (ps.rowCount !== ids.length) throw Object.assign(new Error('Produto indisponível.'), { status: 400 });
    let total = 0;
    for (const p of ps.rows) {
      const q = merged.get(Number(p.id));
      if (Number(p.seller_id) === req.user.id) throw Object.assign(new Error('Você não pode comprar o próprio produto.'), { status: 400 });
      if (p.stock < q) throw Object.assign(new Error('Estoque insuficiente.'), { status: 409 });
      total += p.price_cents * q;
    }
    const o = await c.query('INSERT INTO orders(buyer_id,total_cents) VALUES($1,$2) RETURNING id', [req.user.id, total]);
    for (const p of ps.rows) {
      const q = merged.get(Number(p.id));
      await c.query('INSERT INTO order_items VALUES($1,$2,$3,$4)', [o.rows[0].id, p.id, q, p.price_cents]);
      await c.query('UPDATE products SET stock=stock-$1 WHERE id=$2', [q, p.id]);
    }
    await c.query('COMMIT');
    res.status(201).json({ order_id: o.rows[0].id, total_cents: total });
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
}));

app.get('/api/orders', auth, wrap(async (req, res) => {
  const r = await db.query('SELECT id,status,total_cents,created_at FROM orders WHERE buyer_id=$1 ORDER BY id DESC LIMIT 50', [req.user.id]);
  res.json(r.rows);
}));

// ---------- Pagamento (Mercado Pago Checkout Pro) ----------
// Os dados do cartão/PIX são digitados na página do Mercado Pago. Seu servidor nunca os vê.
app.post('/api/orders/:id/pay', auth, wrap(async (req, res) => {
  const id = Number(req.params.id) || 0;
  const o = await db.query("SELECT id,total_cents FROM orders WHERE id=$1 AND buyer_id=$2 AND status='pending_payment'", [id, req.user.id]);
  if (!o.rowCount) return res.status(404).json({ error: 'Pedido não encontrado.' });
  const r = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ title: 'Pedido #' + id, quantity: 1, currency_id: 'BRL', unit_price: o.rows[0].total_cents / 100 }],
      external_reference: String(id),
      notification_url: process.env.API_URL + '/api/webhooks/mercadopago',
      back_urls: { success: process.env.FRONTEND_URL + '/pedido-ok', failure: process.env.FRONTEND_URL + '/pedido-erro' }
    })
  });
  if (!r.ok) throw new Error('Falha ao criar pagamento');
  res.json({ checkout_url: (await r.json()).init_point });
}));

// Não confiamos no corpo do webhook: consultamos o pagamento direto na API do Mercado Pago
// e conferimos status, pedido e valor antes de marcar como pago.
app.post('/api/webhooks/mercadopago', wrap(async (req, res) => {
  const pid = req.body && req.body.data && req.body.data.id;
  if (!pid || !/^\d+$/.test(String(pid))) return res.sendStatus(200);
  const r = await fetch('https://api.mercadopago.com/v1/payments/' + pid, { headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN } });
  if (!r.ok) return res.sendStatus(200);
  const pay = await r.json();
  if (pay.status === 'approved') {
    await db.query("UPDATE orders SET status='paid' WHERE id=$1 AND status='pending_payment' AND total_cents=$2",
      [Number(pay.external_reference) || 0, Math.round(pay.transaction_amount * 100)]);
  }
  res.sendStatus(200);
}));

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));
app.use((err, req, res, next) => {
  if (err.status && err.status < 500) return res.status(err.status).json({ error: err.message, details: err.details });
  console.error(err); // detalhes só no log do servidor, nunca na resposta
  res.status(500).json({ error: 'Erro interno. Tente novamente.' });
});

app.listen(process.env.PORT || 3000, () => console.log('API no ar'));
