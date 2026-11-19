CREATE TABLE IF NOT EXISTS users (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer','seller','admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  seller_id   BIGINT NOT NULL REFERENCES users(id),
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents > 0),
  stock       INTEGER NOT NULL CHECK (stock >= 0),
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS orders (
  id          BIGSERIAL PRIMARY KEY,
  buyer_id    BIGINT NOT NULL REFERENCES users(id),
  status      TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment','paid','cancelled')),
  total_cents INTEGER NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS order_items (
  order_id         BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id       BIGINT NOT NULL REFERENCES products(id),
  qty              INTEGER NOT NULL CHECK (qty > 0),
  unit_price_cents INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE INDEX IF NOT EXISTS idx_products_cat ON products(category) WHERE active;
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);

-- Perfil e configurações (pode rodar de novo sem problema)
ALTER TABLE users ADD COLUMN IF NOT EXISTS pronoun      TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone        TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS address      TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio          TEXT NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_color TEXT NOT NULL DEFAULT '#1a159e';
ALTER TABLE users ADD COLUMN IF NOT EXISTS settings JSONB NOT NULL
  DEFAULT '{"theme":"auto","notifications":true,"language":"pt-BR","show_books":"all","show_reviews":"all"}';

-- Livros, cestinha, pedidos e resenhas (pode rodar de novo sem problema)
CREATE TABLE IF NOT EXISTS books (
  id             BIGSERIAL PRIMARY KEY,
  seller_id      BIGINT NOT NULL REFERENCES users(id),
  title          TEXT NOT NULL,
  author         TEXT NOT NULL DEFAULT '',
  category       TEXT NOT NULL,
  book_condition TEXT NOT NULL,
  description    TEXT NOT NULL DEFAULT '',
  price_cents    INTEGER NOT NULL CHECK (price_cents >= 0),   -- 0 = doação
  status         TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','reserved','sold','removed')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_books_avail ON books(category, created_at DESC) WHERE status = 'available';
CREATE TABLE IF NOT EXISTS cart_items (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, book_id)
);
CREATE TABLE IF NOT EXISTS book_orders (
  id          BIGSERIAL PRIMARY KEY,
  buyer_id    BIGINT NOT NULL REFERENCES users(id),
  status      TEXT NOT NULL DEFAULT 'pending_payment'
              CHECK (status IN ('pending_payment','paid','shipped','delivered','refund_requested','cancelled')),
  total_cents INTEGER NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS book_order_items (
  order_id         BIGINT NOT NULL REFERENCES book_orders(id) ON DELETE CASCADE,
  book_id          BIGINT NOT NULL REFERENCES books(id),
  seller_id        BIGINT NOT NULL REFERENCES users(id),
  unit_price_cents INTEGER NOT NULL,
  PRIMARY KEY (order_id, book_id)
);
CREATE TABLE IF NOT EXISTS reviews (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_title TEXT NOT NULL,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
