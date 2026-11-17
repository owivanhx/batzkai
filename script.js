const catalogBooks = [
  {
    id: 1,
    code: 'BK-001',
    title: 'Uma Mulher no Escuro',
    author: 'Raphael Montes',
    publisher: 'Companhia das Letras',
    pages: 256,
    year: 2019,
    condition: 'Seminovo • Ótimo estado',
    rating: '4.9',
    reviewsCount: '1,4 mil',
    soldCount: '3,2 mil vendidos',
    seller: 'Sebo Literário Salto',
    price: 24.90,
    oldPrice: 49.80,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (1,2 km)',
    bg: '#161822',
    fg: '#ffffff',
    desc: 'Victoria Bravo tinha apenas quatro anos quando sua família foi brutalmente assassinada. Vinte anos depois, ela leva uma vida solitária até que eventos estranhos voltam a ameaçá-la. Suspense psicológico vencedor do Prêmio Jabuti.'
  },
  {
    id: 2,
    code: 'BK-002',
    title: 'Jantar Secreto',
    author: 'Raphael Montes',
    publisher: 'Companhia das Letras',
    pages: 368,
    year: 2016,
    condition: 'Novo • Lacrado',
    rating: '4.8',
    reviewsCount: '2,1 mil',
    soldCount: '5,8 mil vendidos',
    seller: 'Livraria Paulista',
    price: 29.90,
    oldPrice: 39.90,
    discount: false,
    isNew: true,
    free: false,
    location: 'Itu - SP (6 km)',
    bg: '#f5f5f7',
    fg: '#9e1922',
    desc: 'Um grupo de jovens amigos divide um apartamento em Copacabana e cria uma rede de jantares clandestinos para pagar as dívidas, mergulhando em um esquema sombrio.'
  },
  {
    id: 3,
    code: 'BK-003',
    title: 'A Biblioteca da Meia-Noite',
    author: 'Matt Haig',
    publisher: 'Bertrand Brasil',
    pages: 308,
    year: 2021,
    condition: 'Seminovo • Sem grifos',
    rating: '4.9',
    reviewsCount: '4,7 mil',
    soldCount: '9,1 mil vendidos',
    seller: 'Acervo da Clara',
    price: 22.50,
    oldPrice: 45.00,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (800 m)',
    bg: '#193824',
    fg: '#80ed99',
    desc: 'Entre a vida e a morte existe uma biblioteca com infinitos livros que mostram como teria sido a vida de Nora Seed caso ela tivesse tomado outras decisões.'
  },
  {
    id: 4,
    code: 'BK-004',
    title: 'Até o Verão Terminar',
    author: 'Colleen Hoover',
    publisher: 'Galera Record',
    pages: 336,
    year: 2021,
    condition: 'Usado • Bem conservado',
    rating: '4.7',
    reviewsCount: '3,3 mil',
    soldCount: '6,4 mil vendidos',
    seller: 'Estante da Bia',
    price: 19.90,
    oldPrice: 39.80,
    discount: true,
    isNew: false,
    free: false,
    location: 'Indaiatuba - SP (12 km)',
    bg: '#1c1824',
    fg: '#ffb4a2',
    desc: 'Beyah passa o verão na península do Texas antes de ir para a faculdade e conhece Samson, descobrindo que ambos guardam segredos profundos.'
  },
  {
    id: 5,
    code: 'BK-005',
    title: 'O Avesso da Pele',
    author: 'Jeferson Tenório',
    publisher: 'Companhia das Letras',
    pages: 192,
    year: 2020,
    condition: 'Seminovo • Edição especial',
    rating: '5.0',
    reviewsCount: '1,9 mil',
    soldCount: '4,5 mil vendidos',
    seller: 'Coletivo Leitura Viva',
    price: 26.00,
    oldPrice: 36.90,
    discount: false,
    isNew: true,
    free: false,
    location: 'Salto - SP (2 km)',
    bg: '#cdd9e5',
    fg: '#1d3557',
    desc: 'Vencedor do Prêmio Jabuti de Romance Literário. Pedro resgata a história de seu pai, Henrique, em uma narrativa comovente sobre identidade e relações familiares no Brasil.'
  },
  {
    id: 6,
    code: 'BK-006',
    title: 'Bom Dia, Verônica',
    author: 'Ilana Casoy & R. Montes',
    publisher: 'DarkSide Books',
    pages: 256,
    year: 2016,
    condition: 'Seminovo • Capa dura',
    rating: '4.9',
    reviewsCount: '2,8 mil',
    soldCount: '7,0 mil vendidos',
    seller: 'Sebo Literário Salto',
    price: 21.00,
    oldPrice: 42.00,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (1,5 km)',
    bg: '#d90429',
    fg: '#111111',
    desc: 'Verônica Torres, escrivã da Delegacia de Homicídios de São Paulo, decide investigar por conta própria dois casos arquivados que revelam uma trama perigosa.'
  },
  {
    id: 7,
    code: 'BK-007',
    title: 'O Rei de Amarelo',
    author: 'Robert W. Chambers',
    publisher: 'Intrínseca',
    pages: 320,
    year: 2018,
    condition: 'Doação Comunitária • Bom estado',
    rating: '4.6',
    reviewsCount: '890',
    soldCount: '1,1 mil doados',
    seller: 'Ponto de Leitura Centro',
    price: 0,
    oldPrice: 0,
    discount: false,
    isNew: false,
    free: true,
    location: 'Salto - SP (Centro - Doação)',
    bg: '#1a110b',
    fg: '#f4a261',
    desc: 'Coletânea clássica de contos de horror estranho e fantasia sombria centrados em uma peça teatral proibida que leva à loucura quem a lê.'
  },
  {
    id: 8,
    code: 'BK-008',
    title: 'Coraline',
    author: 'Neil Gaiman',
    publisher: 'Intrínseca',
    pages: 224,
    year: 2020,
    condition: 'Novo • Capa dura ilustrada',
    rating: '4.9',
    reviewsCount: '5,2 mil',
    soldCount: '11 mil vendidos',
    seller: 'Livraria Fantasia BR',
    price: 25.00,
    oldPrice: 38.00,
    discount: false,
    isNew: true,
    free: false,
    location: 'Itu - SP (7 km)',
    bg: '#edf2fb',
    fg: '#4a2c6d',
    desc: 'Ao atravessar uma porta secreta em sua nova casa, Coraline encontra um mundo alternativo assustadoramente parecido com o seu, onde uma Outra Mãe quer mantê-la para sempre.'
  },
  {
    id: 9,
    code: 'BK-009',
    title: 'Love, Theoretically',
    author: 'Ali Hazelwood',
    publisher: 'Arqueiro',
    pages: 384,
    year: 2023,
    condition: 'Seminovo • Com marcador',
    rating: '4.8',
    reviewsCount: '2,4 mil',
    soldCount: '4,9 mil vendidos',
    seller: 'Estante da Camis',
    price: 23.90,
    oldPrice: 47.80,
    discount: true,
    isNew: true,
    free: false,
    location: 'Salto - SP (3 km)',
    bg: '#f9c74f',
    fg: '#9b2226',
    desc: 'Elsie Hannaway é uma física teórica de dia e namorada de aluguel nas horas vagas, até cruzar com Jack Smith, o físico experimental que arruinou a carreira de seu mentor.'
  },
  {
    id: 10,
    code: 'BK-010',
    title: 'Red Hood Outlaw',
    author: 'DC Comics',
    publisher: 'Panini Comics',
    pages: 164,
    year: 2021,
    condition: 'Seminovo • Papel couchê',
    rating: '4.7',
    reviewsCount: '640',
    soldCount: '1,8 mil vendidos',
    seller: 'HQ & Mangá Mania',
    price: 18.00,
    oldPrice: 36.00,
    discount: true,
    isNew: false,
    free: false,
    location: 'Salto - SP (900 m)',
    bg: '#2b2d42',
    fg: '#ef233c',
    desc: 'Jason Todd assume uma postura ainda mais implacável nas ruas de Gotham após o rompimento com os Foras da Lei.'
  },
  {
    id: 11,
    code: 'BK-011',
    title: 'Alchemised',
    author: 'SenLinYu',
    publisher: 'Rocco',
    pages: 640,
    year: 2025,
    condition: 'Novo • Edição de colecionador',
    rating: '5.0',
    reviewsCount: '1,7 mil',
    soldCount: '3,9 mil vendidos',
    seller: 'Livraria Paulista',
    price: 34.90,
    oldPrice: 54.90,
    discount: false,
    isNew: true,
    free: false,
    location: 'Indaiatuba - SP (14 km)',
    bg: '#2f2e2c',
    fg: '#e0d8c3',
    desc: 'Em um mundo devastado pela guerra e pela necromancia, Helena Marino tenta recuperar suas memórias perdidas sob a vigilância de um implacável alquimista.'
  },
  {
    id: 12,
    code: 'BK-012',
    title: 'Garoto de Ipanema',
    author: 'Mariana Barbosa',
    publisher: 'Seguinte',
    pages: 288,
    year: 2022,
    condition: 'Doação • Ótimo estado',
    rating: '4.8',
    reviewsCount: '950',
    soldCount: '1,3 mil doados',
    seller: 'Camila N. (Leitora local)',
    price: 0,
    oldPrice: 0,
    discount: false,
    isNew: true,
    free: true,
    location: 'Salto - SP (Doação)',
    bg: '#48cae4',
    fg: '#03045e',
    desc: 'Romance nacional leve e ensolarado ambientado no Rio de Janeiro, sobre amizade, verão e primeiras descobertas.'
  }
];

let basketItems = [
  {
    id: 101,
    code: 'BK-101',
    title: 'Se Deus me chamar não vou',
    author: 'Mariana Salomão Carrara',
    price: 24.00,
    bg: '#2a9d8f',
    fg: '#fefae0'
  },
  {
    id: 102,
    code: 'BK-102',
    title: 'Crime e Castigo',
    author: 'Fiódor Dostoiévski',
    price: 32.00,
    bg: '#f8f9fa',
    fg: '#111111'
  },
  {
    id: 103,
    code: 'BK-103',
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
    code: 'BK-U01',
    title: 'O Avesso da Pele',
    author: 'Jeferson Tenório',
    type: 'Venda • R$ 26',
    bg: '#cdd9e5',
    fg: '#1d3557'
  },
  {
    code: 'BK-U02',
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
let selectedBook = null;
let selectedEdition = 'Capa Comum';
let selectedQty = 1;
let favoritedBooks = new Set([1, 5]);

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
    const activeTarget = viewId === 'product' ? 'home' : viewId;
    btn.classList.toggle('active', btn.dataset.target === activeTarget);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

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
  document.getElementById('cart-count-badge').textContent = basketItems.length;
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
        b.code.toLowerCase().includes(query) ||
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
    <div class="book-item" onclick="openBookPage(${book.id})">
      <div class="book-cover" style="background:${book.bg}; color:${book.fg};">
        ${book.free ? `<span class="book-badge free">DOAÇÃO</span>` : book.discount ? `<span class="book-badge">50% OFF</span>` : ''}
        <span class="book-author">${book.author}</span>
        <span class="book-title-cover">${book.title}</span>
        <span style="font-size:0.55rem; opacity:0.8;">Badtz-kai</span>
      </div>
      <span class="book-code-hint">${book.code}</span>
      <span class="book-price-tag">${book.free ? 'Grátis' : 'R$ ' + book.price.toFixed(2).replace('.', ',')}</span>
    </div>
  `
    )
    .join('');
}

/* ================= PÁGINA DO PRODUTO (SISTEMA DE CÓDIGO AMAZON/SHOPEE) ================= */
function openBookPage(id) {
  const book = catalogBooks.find(b => b.id === id);
  if (!book) return;
  selectedBook = book;
  selectedEdition = 'Capa Comum';
  selectedQty = 1;
  renderProductPage();
  navigateTo('product');
}

function selectEdition(edition) {
  selectedEdition = edition;
  renderProductPage();
}

function changeProductQty(delta) {
  selectedQty = Math.max(1, Math.min(10, selectedQty + delta));
  renderProductPage();
}

function toggleFavoriteProduct(id) {
  if (favoritedBooks.has(id)) {
    favoritedBooks.delete(id);
    showToast('Removido dos favoritos');
  } else {
    favoritedBooks.add(id);
    showToast('Livro favoritado!');
  }
  renderProductPage();
}

function previewCoverView(mode) {
  const stage = document.getElementById('pdp-cover-stage');
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  document.getElementById('thumb-' + mode).classList.add('active');

  const b = selectedBook;
  if (mode === 'front') {
    stage.innerHTML = `
      <div class="book-cover" style="background:${b.bg}; color:${b.fg};">
        ${b.free ? `<span class="book-badge free">DOAÇÃO</span>` : b.discount ? `<span class="book-badge">50% OFF</span>` : ''}
        <span class="book-author">${b.author}</span>
        <span class="book-title-cover">${b.title}</span>
        <span style="font-size:0.65rem; opacity:0.85;">${b.publisher}</span>
      </div>
    `;
  } else if (mode === 'back') {
    stage.innerHTML = `
      <div class="book-cover" style="background:${b.bg}; color:${b.fg}; justify-content:center; gap:10px;">
        <span style="font-size:0.7rem; font-weight:800; text-transform:uppercase;">Sinopse</span>
        <p style="font-size:0.68rem; line-height:1.35; opacity:0.95;">${b.desc.slice(0, 145)}...</p>
        <span style="font-size:0.6rem; opacity:0.75;">${b.pages} páginas</span>
      </div>
    `;
  } else {
    stage.innerHTML = `
      <div class="book-cover" style="background:var(--surface-alt); color:var(--text-main); justify-content:center; gap:8px; border:2px dashed var(--royal);">
        <span style="font-size:1.6rem;">📖</span>
        <strong style="font-size:0.78rem;">Estado Físico</strong>
        <span style="font-size:0.72rem; color:var(--text-muted);">${b.condition}</span>
      </div>
    `;
  }
}

function renderProductPage() {
  const b = selectedBook;
  if (!b) return;

  const isFav = favoritedBooks.has(b.id);
  const priceFormatted = b.free ? 'Grátis (Doação)' : 'R$ ' + b.price.toFixed(2).replace('.', ',');
  const oldPriceFormatted = b.oldPrice > 0 ? 'R$ ' + b.oldPrice.toFixed(2).replace('.', ',') : '';

  const container = document.getElementById('product-detail-container');
  container.innerHTML = `
    <div class="pdp-breadcrumb">
      <button class="pdp-back-btn" onclick="navigateTo('home')">← Voltar</button>
      <span>Badtz-kai › Leitura Brasileira › Cód: <strong>${b.code}</strong></span>
    </div>

    <div class="pdp-main-card">
      <div class="pdp-gallery">
        <div class="pdp-cover-stage" id="pdp-cover-stage">
          <div class="book-cover" style="background:${b.bg}; color:${b.fg};">
            ${b.free ? `<span class="book-badge free">DOAÇÃO</span>` : b.discount ? `<span class="book-badge">50% OFF</span>` : ''}
            <span class="book-author">${b.author}</span>
            <span class="book-title-cover">${b.title}</span>
            <span style="font-size:0.65rem; opacity:0.85;">${b.publisher}</span>
          </div>
        </div>

        <div class="pdp-thumbs">
          <div class="pdp-thumb active" id="thumb-front" onclick="previewCoverView('front')" style="background:${b.bg}; color:${b.fg};">Capa</div>
          <div class="pdp-thumb" id="thumb-back" onclick="previewCoverView('back')">Contra-<br/>capa</div>
          <div class="pdp-thumb" id="thumb-state" onclick="previewCoverView('state')">Estado<br/>físico</div>
        </div>

        <div class="pdp-social-row">
          <button class="pdp-fav-btn" onclick="toggleFavoriteProduct(${b.id})">
            ${isFav ? '❤️ Favoritado' : '🤍 Favoritar'} (${isFav ? '1,2 mil' : '1,1 mil'})
          </button>
          <span>•</span>
          <span style="cursor:pointer;" onclick="showToast('Código ${b.code} copiado!')">📋 Copiar Cód.</span>
        </div>
      </div>

      <div class="pdp-info-col">
        <div class="pdp-badges-row">
          <span class="pdp-tag-official">${b.free ? 'Doação Comunitária' : 'Verificado'}</span>
          <span class="pdp-code-tag">Cód. do Item: ${b.code}</span>
        </div>

        <h1 class="pdp-title">${b.title} — ${b.publisher}</h1>

        <div class="pdp-rating-bar">
          <span class="pdp-stars"><u>${b.rating}</u> ★★★★★</span>
          <span class="pdp-divider-v"></span>
          <span><u>${b.reviewsCount}</u> Avaliações</span>
          <span class="pdp-divider-v"></span>
          <span>${b.soldCount}</span>
        </div>

        <div>
          ${
            b.discount
              ? `<div class="pdp-flash-banner">
                   <span>⚡ OFERTA RELÂMPAGO BADTZ-KAI</span>
                   <span>50% DE DESCONTO</span>
                 </div>`
              : ''
          }
          <div class="pdp-price-box ${b.discount ? 'has-banner' : ''}">
            ${oldPriceFormatted ? `<span class="pdp-old-price">${oldPriceFormatted}</span>` : ''}
            <span class="pdp-current-price">${priceFormatted}</span>
            ${b.discount ? `<span class="pdp-discount-pill">50% OFF</span>` : ''}
            <p class="pdp-installments">
              ${
                b.free
                  ? 'Retirada gratuita combinada com o doador.'
                  : `ou em até 3x de R$ ${(b.price / 3).toFixed(2).replace('.', ',')} sem juros`
              }
            </p>
          </div>
        </div>

        <div class="pdp-spec-row">
          <span class="pdp-spec-label">Envio / Local</span>
          <div>
            <strong>🚚 Entrega rápida Badtz-kai</strong><br/>
            <small style="color:var(--text-muted);">📍 ${b.location}</small>
          </div>
        </div>

        <div class="pdp-spec-row">
          <span class="pdp-spec-label">Edição</span>
          <div class="pdp-option-group">
            ${['Capa Comum', 'Capa Dura', 'Com Marcador']
              .map(
                ed => `
              <button class="pdp-option-btn ${selectedEdition === ed ? 'selected' : ''}" onclick="selectEdition('${ed}')">${ed}</button>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="pdp-spec-row">
          <span class="pdp-spec-label">Quantidade</span>
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="pdp-qty-box">
              <button onclick="changeProductQty(-1)">−</button>
              <span>${selectedQty}</span>
              <button onclick="changeProductQty(1)">+</button>
            </div>
            <small style="color:var(--text-muted);">Estoque disponível</small>
          </div>
        </div>

        <div class="pdp-cta-row">
          <button class="pdp-btn-cart" onclick="addCurrentBookToCart(false)">
            🧺 Adicionar à Cestinha
          </button>
          <button class="pdp-btn-buy" onclick="addCurrentBookToCart(true)">
            ${b.free ? 'Solicitar Doação' : 'Comprar Agora'}
          </button>
        </div>
      </div>
    </div>

    <div class="pdp-seller-card">
      <div class="pdp-seller-row">
        <div class="pdp-seller-info">
          <div class="pdp-seller-avatar">${b.seller.charAt(0)}</div>
          <div>
            <strong style="font-size:1rem;">${b.seller}</strong>
            <p style="font-size:0.8rem; color:var(--text-muted);">ID Verificado • 📍 ${b.location}</p>
          </div>
        </div>
        <button class="small-action-btn" onclick="showToast('Chat aberto com o vendedor!')">💬 Chat do Vendedor</button>
      </div>
    </div>

    <div class="pdp-details-card">
      <h3 style="margin-bottom:8px; color:var(--royal);">Especificações Técnicas</h3>
      <table class="pdp-specs-table">
        <tr><td>Código do Produto (SKU)</td><td><strong>${b.code}</strong></td></tr>
        <tr><td>Autor(a)</td><td>${b.author}</td></tr>
        <tr><td>Editora</td><td>${b.publisher}</td></tr>
        <tr><td>Número de Páginas</td><td>${b.pages} páginas</td></tr>
        <tr><td>Ano</td><td>${b.year}</td></tr>
        <tr><td>Condição</td><td>${b.condition}</td></tr>
      </table>

      <h3 style="margin-bottom:8px; color:var(--royal);">Sinopse</h3>
      <p style="font-size:0.92rem; line-height:1.6;">${b.desc}</p>
    </div>
  `;
}

function addCurrentBookToCart(goDirectlyToCart) {
  if (!selectedBook) return;
  for (let i = 0; i < selectedQty; i++) {
    basketItems.push({
      ...selectedBook,
      title: `${selectedBook.title} (${selectedEdition}) [${selectedBook.code}]`,
      uid: Date.now() + i
    });
  }
  updateCartBadges();
  if (goDirectlyToCart) {
    switchCartTab('cestinha');
    navigateTo('cart');
    showToast('Livro adicionado! Finalize seu pedido na cestinha.');
  } else {
    showToast(`${selectedQty}x "${selectedBook.title}" adicionado à cestinha!`);
  }
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
      <small style="display:block; margin-top:2px; font-size:0.6rem; color:var(--royal); font-weight:800;">${b.code}</small>
      <small style="display:block; font-weight:700; font-size:0.7rem;">${b.type}</small>
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
    pronoun: 'Seu pronome (ex: ela/dela, ele/dele)'
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
  const newCode = 'BK-' + Math.floor(200 + Math.random() * 800);
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <h4 style="margin-bottom:10px;">Anunciar ou Doar Livro</h4>
    <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">Código gerado automaticamente: <strong>${newCode}</strong></p>
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
      <button class="primary-btn" onclick="addNewUserBook('${newCode}')">Publicar</button>
    </div>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function addNewUserBook(code) {
  const title = document.getElementById('new-book-title').value.trim();
  const author = document.getElementById('new-book-author').value.trim();
  const type = document.getElementById('new-book-type').value;
  if (!title || !author) return;
  userSellingBooks.unshift({
    code,
    title,
    author,
    type,
    bg: '#1a159e',
    fg: '#ffffff'
  });
  renderProfile();
  closeModal();
  showToast(`Livro publicado com o código ${code}!`);
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

function openInfoModal() {
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `
    <h3 style="color:var(--royal); margin-bottom:8px;">Sobre o Badtz-kai — Leitura Brasileira</h3>
    <p style="font-size:0.9rem; line-height:1.5; margin-bottom:10px;">
      Plataforma comunitária com sistema de códigos (SKU) para rastreio de livros, compra, venda e doação entre leitores.
    </p>
    <button class="primary-btn" style="width:100%;" onclick="closeModal()">Entendi</button>
  `;
  document.getElementById('modal-backdrop').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
}

/* Inicialização */
renderBooks();
renderProfile();
updateCartBadges();
