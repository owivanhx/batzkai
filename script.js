const catalogBooks = [
  {
    id: 1,
    title: 'Uma Mulher no Escuro',
    author: 'Raphael Montes',
    price: 24.90,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (1,2 km)',
    bg: '#161822',
    fg: '#ffffff',
    desc: 'Suspense psicológico premiado de Raphael Montes. Exemplar seminovo em ótimo estado.'
  },
  {
    id: 2,
    title: 'Jantar Secreto',
    author: 'Raphael Montes',
    price: 29.90,
    discount: false,
    isNew: true,
    free: false,
    location: 'Itu - SP (6 km)',
    bg: '#f5f5f7',
    fg: '#9e1922',
    desc: 'Um grupo de amigos organiza jantares clandestinos no Rio de Janeiro.'
  },
  {
    id: 3,
    title: 'A Biblioteca da Meia-Noite',
    author: 'Matt Haig',
    price: 22.50,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (800 m)',
    bg: '#193824',
    fg: '#80ed99',
    desc: 'Entre a vida e a morte existe uma biblioteca com infinitas possibilidades.'
  },
  {
    id: 4,
    title: 'Até o Verão Terminar',
    author: 'Colleen Hoover',
    price: 19.90,
    discount: true,
    isNew: false,
    free: false,
    location: 'Indaiatuba - SP (12 km)',
    bg: '#1c1824',
    fg: '#ffb4a2',
    desc: 'Romance emocionante sobre segredos, recomeços e laços inesperados.'
  },
  {
    id: 5,
    title: 'O Avesso da Pele',
    author: 'Jeferson Tenório',
    price: 26.00,
    discount: false,
    isNew: true,
    free: false,
    location: 'Salto - SP (2 km)',
    bg: '#cdd9e5',
    fg: '#1d3557',
    desc: 'Vencedor do Prêmio Jabuti. Uma narrativa potente sobre identidade e família.'
  },
  {
    id: 6,
    title: 'Bom Dia, Verônica',
    author: 'Ilana Casoy & R. Montes',
    price: 21.00,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (1,5 km)',
    bg: '#d90429',
    fg: '#111111',
    desc: 'Thriller policial brasileiro eletrizante.'
  },
  {
    id: 7,
    title: 'O Rei de Amarelo',
    author: 'Robert W. Chambers',
    price: 0,
    discount: false,
    isNew: false,
    free: true,
    location: 'Salto - SP (Centro - Doação)',
    bg: '#1a110b',
    fg: '#f4a261',
    desc: 'Clássico do horror cósmico disponível para doação comunitária.'
  },
  {
    id: 8,
    title: 'Coraline',
    author: 'Neil Gaiman',
    price: 25.00,
    discount: false,
    isNew: true,
    free: false,
    location: 'Itu - SP (7 km)',
    bg: '#edf2fb',
    fg: '#4a2c6d',
    desc: 'Edição ilustrada de fantasia sombria.'
  },
  {
    id: 9,
    title: 'Love, Theoretically',
    author: 'Ali Hazelwood',
    price: 23.90,
    discount: true,
    isNew: true,
    free: false,
    location: 'Salto - SP (3 km)',
    bg: '#f9c74f',
    fg: '#9b2226',
    desc: 'Comédia romântica acadêmica cheia de química.'
  },
  {
    id: 10,
    title: 'Red Hood Outlaw',
    author: 'DC Comics',
    price: 18.00,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (900 m)',
    bg: '#2b2d42',
    fg: '#ef233c',
    desc: 'HQ em perfeito estado de conservação.'
  },
  {
    id: 11,
    title: 'Alchemised',
    author: 'SenLinYu',
    price: 34.90,
    discount: false,
    isNew: true,
    free: false,
    location: 'Indaiatuba - SP (14 km)',
    bg: '#2f2e2c',
    fg: '#e0d8c3',
    desc: 'Fantasia sombria muito aguardada pelos leitores.'
  },
  {
    id: 12,
    title: 'Garoto de Ipanema',
    author: 'Mariana Barbosa',
    price: 0,
    discount: false,
    isNew: true,
    free: true,
    location: 'Salto - SP (Doação)',
    bg: '#48cae4',
    fg: '#03045e',
    desc: 'Romance nacional leve disponível para doação.'
  }
];

let basketItems = [
  {
    id: 101,
    title: 'Se Deus me chamar não vou',
    author: 'Mariana Salomão Carrara',
    price: 24.00,
    bg: '#2a9d8f',
    fg: '#fefae0'
  },
  {
    id: 102,
    title: 'Crime e Castigo',
    author: 'Fiódor Dostoiévski',
    price: 32.00,
    bg: '#f8f9fa',
    fg: '#111111'
  },
  {
    id: 103,
    title: 'Nem todo outono é igual',
    author: 'Luis De Wilson',
    price: 19.50,
    bg: '#e76f51',
    fg: '#fff3b0'
  }
];

const shippingOrders = [
  {
    code: '#BK-8421',
    title: 'Torto Arado — Itamar Vieira Junior',
    status: 'Em trânsito • Chega amanhã',
    where: 'Centro de Distribuição Salto/SP'
  }
];

const pastPurchases = [
  {
    code: '#BK-7910',
    title: 'Crime e Castigo — Dostoiévski',
    date: '12/10/2026',
    price: 32.00
  },
  {
    code: '#BK-7655',
    title: 'Garoto de Ipanema — Mariana Barbosa',
    date: '28/09/2026',
    price: 22.00
  }
];

let refunds = [
  {
    code: '#BK-7102',
    title: 'Box Clássicos Brasileiros',
    status: 'Reembolso aprovado (R$ 45,00)'
  }
];

let userSellingBooks = [
  {
    title: 'O Avesso da Pele',
    author: 'Jeferson Tenório',
    type: 'Venda • R$ 26',
    bg: '#cdd9e5',
    fg: '#1d3557'
  },
  {
    title: 'Até o Verão Terminar',
    author: 'Colleen Hoover',
    type: 'Doação',
    bg: '#1c1824',
    fg: '#ffb4a2'
  }
];

let userReviews = [
  {
    bookTitle: 'Garoto de Ipanema',
    author: 'Mariana Barbosa',
    bg: '#48cae4',
    fg: '#03045e',
    text: 'Leitura envolvente e solar! Os personagens cativam logo nas primeiras páginas.'
  }
];

let activeFilter = null;
let currentCartTab = 'cestinha';
let userProfile = {
  name: 'Camila N.',
  email: 'camila@leitura.br',
  pronoun: 'ela/dela',
  address: 'Rua Nove de Julho, 410 - Salto, SP',
  phone: '(11) 99876-5432',
  privacy: 'Público (todos os leitores)'
};

function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + viewId).classList.add('active');

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === viewId);
  });

  if (viewId === 'cart') renderCartTab();
  if (viewId === 'profile') renderProfile();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function updateCartBadges() {
  const count = basketItems.length;
  document.getElementById('desktop-cart-count').textContent = count;
  document.getElementById('mobile-cart-count').textContent = count;
}

/* ================= INÍCIO ================= */
function toggleFilter(type) {
  activeFilter = activeFilter === type ? null : type;
  document.getElementById('filter-50off').classList.toggle('active-filter', activeFilter === '50off');
  document.getElementById('filter-new').classList.toggle('active-filter', activeFilter === 'new');

  const statusBar = document.getElementById('filter-status');
  if (activeFilter) {
    statusBar.style.display = 'flex';
    document.getElementById('filter-label').textContent =
      activeFilter === '50off' ? 'Mostrando livros com 50% OFF' : 'Mostrando novidades (NEW)';
  } else {
    statusBar.style.display = 'none';
  }
  renderBooks();
}

function clearFilters() {
  activeFilter = null;
  document.getElementById('filter-50off').classList.remove('active-filter');
  document.getElementById('filter-new').classList.remove('active-filter');
  document.getElementById('filter-status').style.display = 'none';
  document.getElementById('search-input').value = '';
  renderBooks();
}

function renderBooks() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const grid = document.getElementById('books-grid');

  const filtered = catalogBooks.filter(b => {
    if (activeFilter === '50off' && !b.discount) return false;
    if (activeFilter === 'new' && !b.isNew) return false;
    if (query) {
      const match =
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query);
      if (!match) return false;
    }
    return true;
  });

  if (!filtered.length) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 24px; color: var(--text-muted);">Nenhum livro encontrado para essa busca.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      book => `
    <div class="book-item" onclick="openBookModal(${book.id})">
      <div class="book-cover" style="background:${book.bg}; color:${book.fg};">
        ${book.free ? `<span class="book-badge free">DOAÇÃO</span>` : book.discount ? `<span class="book-badge">50% OFF</span>` : ''}
        <span class="book-author">${book.author}</span>
        <span class="book-title-cover">${book.title}</span>
        <span style="font-size:0.55rem; opacity:0.8;">Badtz-kai</span>
      </div>
      <span class="book-price-tag">${book.free ? 'Grátis' : 'R$ ' + book.price.toFixed(2).replace('.', ',')}</span>
    </div>
  `
    )
    .join('');
}

function openBookModal(id) {
  const book = catalogBooks.find(b => b.id === id);
  if (!book) return;
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <div style="display:flex; gap:14px; align-items:flex-start;">
      <div class="book-cover" style="width:105px; flex-shrink:0; background:${book.bg}; color:${book.fg};">
        <span class="book-author">${book.author}</span>
        <span class="book-title-cover">${book.title}</span>
        <span style="font-size:0.55rem;">Badtz-kai</span>
      </div>
      <div>
        <h3 style="font-size:1.15rem; margin-bottom:4px;">${book.title}</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">${book.author}</p>
        <p style="font-size:0.8rem; font-weight:700; color:var(--royal); margin-bottom:8px;">📍 ${book.location}</p>
        <p style="font-size:0.86rem; line-height:1.4;">${book.desc}</p>
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:18px; padding-top:12px; border-top:1.5px solid var(--royal-light);">
      <strong style="font-size:1.15rem;">${book.free ? 'Doação Gratuita' : 'R$ ' + book.price.toFixed(2).replace('.', ',')}</strong>
      <div style="display:flex; gap:8px;">
        <button class="small-action-btn" onclick="closeModal()">Fechar</button>
        <button class="primary-btn" onclick="addToBasket(${book.id})">+ Cestinha</button>
      </div>
    </div>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function openInfoModal() {
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <h3 style="color:var(--royal); margin-bottom:8px;">Sobre o Badtz-kai — Leitura Brasileira</h3>
    <p style="font-size:0.9rem; line-height:1.5; margin-bottom:10px;">
      Plataforma comunitária para comprar, vender e doar livros perto de você, incentivando a leitura nacional e a economia circular.
    </p>
    <ul style="font-size:0.85rem; padding-left:18px; line-height:1.6; margin-bottom:16px;">
      <li>Descontos de até 50% OFF em sebos e leitores locais</li>
      <li>Doação direta entre leitores da mesma região</li>
      <li>Acompanhamento completo na cestinha e resenhas no perfil</li>
    </ul>
    <button class="primary-btn" style="width:100%;" onclick="closeModal()">Entendi</button>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function addToBasket(id) {
  const book = catalogBooks.find(b => b.id === id);
  if (!book) return;
  basketItems.push({ ...book, uid: Date.now() });
  updateCartBadges();
  closeModal();
  showToast(`"${book.title}" adicionado à cestinha!`);
}

/* ================= CESTINHA ================= */
function switchCartTab(tab) {
  currentCartTab = tab;
  document.querySelectorAll('.cart-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  renderCartTab();
}

function renderCartTab() {
  const container = document.getElementById('cart-tab-content');

  if (currentCartTab === 'cestinha') {
    const total = basketItems.reduce((sum, item) => sum + item.price, 0);
    container.innerHTML = `
      <div class="basket-graphic">
        ${
          basketItems.length === 0
            ? `<p style="text-align:center; margin:auto; font-weight:800; background:var(--surface); padding:12px 18px; border-radius:14px;">Sua cestinha está vazia.</p>`
            : `<div class="basket-books-grid">
                ${basketItems
                  .map(
                    (item, idx) => `
                  <div class="basket-book-card" title="Passe o mouse ou clique para ampliar">
                    <button class="remove-basket-btn" onclick="removeFromBasket(${idx})" title="Remover">×</button>
                    <div class="book-cover" style="background:${item.bg}; color:${item.fg};">
                      <span class="book-author">${item.author}</span>
                      <span class="book-title-cover">${item.title}</span>
                      <span style="font-size:0.65rem; font-weight:800;">${item.price === 0 ? 'Grátis' : 'R$ ' + item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>`
        }
        <div class="basket-footer">
          <div>
            <small style="color:var(--text-muted); display:block;">Total (${basketItems.length} itens)</small>
            <strong style="font-size:1.15rem;">R$ ${total.toFixed(2).replace('.', ',')}</strong>
          </div>
          ${basketItems.length ? `<button class="primary-btn" onclick="checkoutBasket()">Finalizar pedido</button>` : ''}
        </div>
      </div>
    `;
  } else if (currentCartTab === 'enviando') {
    container.innerHTML = shippingOrders
      .map(
        o => `
      <div class="order-card">
        <div class="order-header">
          <span>Pedido ${o.code}</span>
          <span class="status-pill">Em rota</span>
        </div>
        <p style="font-weight:700; margin-bottom:4px;">${o.title}</p>
        <p style="font-size:0.85rem; color:var(--text-muted);">🚚 ${o.status}</p>
        <p style="font-size:0.82rem; margin-top:4px;">📍 Onde o produto está: <strong>${o.where}</strong></p>
      </div>
    `
      )
      .join('');
  } else if (currentCartTab === 'compras') {
    container.innerHTML = pastPurchases
      .map(
        p => `
      <div class="order-card">
        <div class="order-header">
          <span>${p.code} • ${p.date}</span>
          <span>R$ ${p.price.toFixed(2).replace('.', ',')}</span>
        </div>
        <p style="font-weight:700; margin-bottom:8px;">${p.title}</p>
        <button class="small-action-btn" onclick="requestRefund('${p.code}', '${p.title}')">Solicitar reembolso</button>
      </div>
    `
      )
      .join('');
  } else if (currentCartTab === 'reembolso') {
    container.innerHTML = refunds
      .map(
        r => `
      <div class="order-card">
        <div class="order-header">
          <span>${r.code}</span>
          <span class="status-pill">${r.status}</span>
        </div>
        <p style="font-weight:700;">${r.title}</p>
      </div>
    `
      )
      .join('');
  }
}

function removeFromBasket(index) {
  basketItems.splice(index, 1);
  updateCartBadges();
  renderCartTab();
  showToast('Livro removido da cestinha.');
}

function checkoutBasket() {
  const first = basketItems[0];
  shippingOrders.unshift({
    code: '#BK-' + Math.floor(1000 + Math.random() * 9000),
    title: `${first.title}${basketItems.length > 1 ? ` + ${basketItems.length - 1} livro(s)` : ''}`,
    status: 'Preparando envio',
    where: 'Posto de coleta Salto/SP'
  });
  basketItems = [];
  updateCartBadges();
  switchCartTab('enviando');
  showToast('Pedido realizado com sucesso!');
}

function requestRefund(code, title) {
  refunds.unshift({ code, title, status: 'Em análise' });
  switchCartTab('reembolso');
  showToast('Solicitação de reembolso enviada.');
}

/* ================= CONFIGURAÇÕES ================= */
function toggleDarkMode() {
  const enabled = document.getElementById('dark-mode-toggle').checked;
  document.body.classList.toggle('dark-mode', enabled);
  showToast(enabled ? 'Tema escuro ativado' : 'Tema claro ativado');
}

function filterSettings() {
  const q = document.getElementById('settings-search').value.toLowerCase();
  document.querySelectorAll('.setting-item').forEach(item => {
    const kw = item.dataset.keywords + ' ' + item.innerText.toLowerCase();
    item.style.display = kw.includes(q) ? 'flex' : 'none';
  });
}

function openSettingPanel(panel) {
  const box = document.getElementById('setting-detail-panel');
  box.style.display = 'block';

  if (panel === 'perfil') {
    box.innerHTML = `
      <h4 style="margin-bottom:10px;">Dados de Contato e Endereço</h4>
      <div class="form-group">
        <label>Endereço de entrega</label>
        <input id="cfg-address" value="${userProfile.address}" />
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="cfg-phone" value="${userProfile.phone}" />
      </div>
      <button class="primary-btn" onclick="saveProfileSettings()">Salvar alterações</button>
    `;
  } else if (panel === 'cartoes') {
    box.innerHTML = `
      <h4 style="margin-bottom:8px;">Cartões Salvos</h4>
      <p style="font-size:0.88rem; margin-bottom:10px;">💳 Mastercard •••• 4829 (Principal)</p>
      <button class="small-action-btn" onclick="showToast('Novo cartão adicionado para pagamento rápido!')">+ Adicionar cartão</button>
    `;
  } else if (panel === 'privacidade') {
    box.innerHTML = `
      <h4 style="margin-bottom:8px;">Quem pode ver sua lista de livros e avaliações?</h4>
      <div class="form-group">
        <select id="cfg-privacy" onchange="userProfile.privacy = this.value; showToast('Privacidade atualizada!')">
          <option ${userProfile.privacy.includes('Público') ? 'selected' : ''}>Público (todos os leitores)</option>
          <option ${userProfile.privacy.includes('Apenas') ? 'selected' : ''}>Apenas leitores da minha cidade</option>
          <option ${userProfile.privacy.includes('Privado') ? 'selected' : ''}>Privado</option>
        </select>
      </div>
    `;
  }
}

function saveProfileSettings() {
  userProfile.address = document.getElementById('cfg-address').value;
  userProfile.phone = document.getElementById('cfg-phone').value;
  showToast('Endereço e telefone atualizados!');
}

/* ================= PERFIL ================= */
function renderProfile() {
  document.getElementById('profile-name').textContent = userProfile.name;
  document.getElementById('profile-email').textContent = userProfile.email;
  document.getElementById('profile-pronoun').textContent = userProfile.pronoun;

  document.getElementById('user-selling-books').innerHTML = userSellingBooks
    .map(
      b => `
    <div class="user-book-mini">
      <div class="book-cover" style="background:${b.bg}; color:${b.fg};">
        <span class="book-author">${b.author}</span>
        <span class="book-title-cover" style="font-size:0.7rem;">${b.title}</span>
      </div>
      <small style="display:block; margin-top:4px; font-weight:700; font-size:0.72rem;">${b.type}</small>
    </div>
  `
    )
    .join('');

  document.getElementById('user-reviews-box').innerHTML = userReviews
    .map(
      r => `
    <div class="review-item">
      <div class="review-cover-mini">
        <div class="book-cover" style="background:${r.bg}; color:${r.fg};">
          <span class="book-title-cover" style="font-size:0.68rem;">${r.bookTitle}</span>
        </div>
      </div>
      <div class="review-lines">
        <div class="review-author-tag">${r.author}</div>
        <p class="review-text-ruled">${r.text}</p>
      </div>
    </div>
  `
    )
    .join('');
}

function editProfileField(field) {
  const labels = {
    name: 'Seu nome',
    email: 'Seu e-mail ou telefone',
    pronoun: 'Seu pronome (ex: ela/dela, ele/dele, elu/delu)'
  };
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <h4 style="margin-bottom:10px;">Editar ${labels[field]}</h4>
    <div class="form-group">
      <input id="edit-field-input" value="${userProfile[field]}" />
    </div>
    <div style="display:flex; justify-content:flex-end; gap:8px;">
      <button class="small-action-btn" onclick="closeModal()">Cancelar</button>
      <button class="primary-btn" onclick="saveEditedField('${field}')">Salvar</button>
    </div>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function saveEditedField(field) {
  const val = document.getElementById('edit-field-input').value.trim();
  if (val) {
    userProfile[field] = val;
    renderProfile();
    showToast('Perfil atualizado!');
  }
  closeModal();
}

function openAddBookModal() {
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <h4 style="margin-bottom:10px;">Anunciar ou Doar Livro</h4>
    <div class="form-group">
      <label>Título do livro</label>
      <input id="new-book-title" placeholder="Ex: Capitães da Areia" />
    </div>
    <div class="form-group">
      <label>Autor(a)</label>
      <input id="new-book-author" placeholder="Ex: Jorge Amado" />
    </div>
    <div class="form-group">
      <label>Modalidade</label>
      <select id="new-book-type">
        <option value="Venda • R$ 20">Venda • R$ 20</option>
        <option value="Doação">Doação Gratuita</option>
      </select>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:8px;">
      <button class="small-action-btn" onclick="closeModal()">Cancelar</button>
      <button class="primary-btn" onclick="addNewUserBook()">Publicar</button>
    </div>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function addNewUserBook() {
  const title = document.getElementById('new-book-title').value.trim();
  const author = document.getElementById('new-book-author').value.trim();
  const type = document.getElementById('new-book-type').value;
  if (!title || !author) return;
  userSellingBooks.unshift({
    title,
    author,
    type,
    bg: '#1a159e',
    fg: '#ffffff'
  });
  renderProfile();
  closeModal();
  showToast('Livro publicado no seu perfil!');
}

function openReviewModal() {
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <h4 style="margin-bottom:10px;">Escrever Resenha</h4>
    <div class="form-group">
      <label>Livro lido</label>
      <input id="rev-book" placeholder="Ex: Coraline" />
    </div>
    <div class="form-group">
      <label>Autor(a)</label>
      <input id="rev-author" placeholder="Ex: Neil Gaiman" />
    </div>
    <div class="form-group">
      <label>Sua avaliação</label>
      <textarea id="rev-text" rows="3" placeholder="O que achou da leitura?"></textarea>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:8px;">
      <button class="small-action-btn" onclick="closeModal()">Cancelar</button>
      <button class="primary-btn" onclick="addNewReview()">Publicar resenha</button>
    </div>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function addNewReview() {
  const bookTitle = document.getElementById('rev-book').value.trim();
  const author = document.getElementById('rev-author').value.trim();
  const text = document.getElementById('rev-text').value.trim();
  if (!bookTitle || !text) return;
  userReviews.unshift({
    bookTitle,
    author: author || 'Autor(a)',
    bg: '#3a0ca3',
    fg: '#f72585',
    text
  });
  renderProfile();
  closeModal();
  showToast('Resenha publicada!');
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
}

/* Inicialização */
renderBooks();
renderProfile();
updateCartBadges();
