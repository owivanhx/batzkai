-- =====================================================
-- Badtz-kai — Leitura Brasileira
-- Cole este arquivo inteiro no Supabase: SQL Editor > New query > Run
-- =====================================================

create sequence if not exists book_code_seq start 1000;
create sequence if not exists order_code_seq start 8000;

-- ---------- PERFIS (um por usuário) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Leitor(a)',
  pronoun text not null default 'ela/dela',
  address text not null default '',
  phone text not null default '',
  privacy text not null default 'Público (todos os leitores)',
  created_at timestamptz not null default now()
);

-- ---------- LIVROS ----------
create table public.books (
  id bigint generated always as identity primary key,
  code text not null unique default ('BK-' || lpad(nextval('book_code_seq')::text, 3, '0')),
  title text not null check (char_length(title) between 1 and 150),
  author text not null check (char_length(author) between 1 and 120),
  publisher text,
  pages int,
  year int,
  condition text not null default 'Usado',
  rating text not null default 'Novo',
  reviews_count text not null default '0',
  sold_count text not null default '',
  seller_id uuid references auth.users(id) on delete cascade,
  seller_name text not null default 'Vendedor',
  price numeric(10,2) not null default 0 check (price >= 0),
  old_price numeric(10,2) not null default 0,
  discount boolean not null default false,
  is_new boolean not null default false,
  free boolean not null default false,
  location text not null default 'Salto - SP',
  bg text not null default '#1a159e',
  fg text not null default '#ffffff',
  description text not null default '',
  created_at timestamptz not null default now()
);

-- ---------- CESTINHA ----------
create table public.cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  book_id bigint not null references public.books(id) on delete cascade,
  edition text not null default 'Capa Comum',
  qty int not null default 1 check (qty between 1 and 10),
  unique (user_id, book_id, edition)
);

-- ---------- PEDIDOS ----------
create table public.orders (
  id bigint generated always as identity primary key,
  code text not null unique default ('BK-' || lpad(nextval('order_code_seq')::text, 4, '0')),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  total numeric(10,2) not null default 0,
  items jsonb not null default '[]',
  status text not null default 'Preparando envio',
  where_text text not null default 'Posto de coleta Salto/SP',
  created_at timestamptz not null default now()
);

-- ---------- RESENHAS ----------
create table public.reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  book_title text not null check (char_length(book_title) between 1 and 150),
  author text not null default 'Autor(a)',
  text text not null check (char_length(text) between 1 and 2000),
  bg text not null default '#3a0ca3',
  fg text not null default '#f72585',
  created_at timestamptz not null default now()
);

-- ---------- REEMBOLSOS ----------
create table public.refunds (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  order_code text not null,
  title text not null,
  status text not null default 'Em análise',
  created_at timestamptz not null default now(),
  unique (user_id, order_code)
);

-- ---------- CRIA O PERFIL AUTOMATICAMENTE NO CADASTRO ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- SEGURANÇA (Row Level Security)
-- Cada pessoa só enxerga e altera os próprios dados.
-- =====================================================
alter table public.profiles   enable row level security;
alter table public.books      enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders     enable row level security;
alter table public.reviews    enable row level security;
alter table public.refunds    enable row level security;

-- Perfis: só o próprio usuário
create policy "profiles_select_own" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Livros: todo mundo vê; só o dono cria, edita e apaga
create policy "books_select_all"  on public.books for select using (true);
create policy "books_insert_own"  on public.books for insert to authenticated with check (seller_id = auth.uid());
create policy "books_update_own"  on public.books for update to authenticated using (seller_id = auth.uid()) with check (seller_id = auth.uid());
create policy "books_delete_own"  on public.books for delete to authenticated using (seller_id = auth.uid());

-- Cestinha: só do próprio usuário
create policy "cart_all_own" on public.cart_items for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Pedidos: o usuário vê e cria os seus (não pode editar nem apagar)
create policy "orders_select_own" on public.orders for select to authenticated using (user_id = auth.uid());
create policy "orders_insert_own" on public.orders for insert to authenticated with check (user_id = auth.uid());

-- Resenhas: todo mundo lê; só o dono escreve e apaga
create policy "reviews_select_all" on public.reviews for select using (true);
create policy "reviews_insert_own" on public.reviews for insert to authenticated with check (user_id = auth.uid());
create policy "reviews_delete_own" on public.reviews for delete to authenticated using (user_id = auth.uid());

-- Reembolsos: só do próprio usuário
create policy "refunds_select_own" on public.refunds for select to authenticated using (user_id = auth.uid());
create policy "refunds_insert_own" on public.refunds for insert to authenticated with check (user_id = auth.uid());

-- =====================================================
-- LIVROS INICIAIS (os 12 que já existiam no site)
-- =====================================================
insert into public.books
  (code, title, author, publisher, pages, year, condition, rating, reviews_count, sold_count, seller_name, price, old_price, discount, is_new, free, location, bg, fg, description)
values
('BK-001','Uma Mulher no Escuro','Raphael Montes','Companhia das Letras',256,2019,'Seminovo • Ótimo estado','4.9','1,4 mil','3,2 mil vendidos','Sebo Literário Salto',24.90,49.80,true,false,false,'Salto - SP (1,2 km)','#161822','#ffffff','Victoria Bravo tinha apenas quatro anos quando sua família foi brutalmente assassinada. Vinte anos depois, ela leva uma vida solitária até que eventos estranhos voltam a ameaçá-la. Suspense psicológico vencedor do Prêmio Jabuti.'),
('BK-002','Jantar Secreto','Raphael Montes','Companhia das Letras',368,2016,'Novo • Lacrado','4.8','2,1 mil','5,8 mil vendidos','Livraria Paulista',29.90,39.90,false,true,false,'Itu - SP (6 km)','#f5f5f7','#9e1922','Um grupo de jovens amigos divide um apartamento em Copacabana e cria uma rede de jantares clandestinos para pagar as dívidas, mergulhando em um esquema sombrio.'),
('BK-003','A Biblioteca da Meia-Noite','Matt Haig','Bertrand Brasil',308,2021,'Seminovo • Sem grifos','4.9','4,7 mil','9,1 mil vendidos','Acervo da Clara',22.50,45.00,true,false,false,'Salto - SP (800 m)','#193824','#80ed99','Entre a vida e a morte existe uma biblioteca com infinitos livros que mostram como teria sido a vida de Nora Seed caso ela tivesse tomado outras decisões.'),
('BK-004','Até o Verão Terminar','Colleen Hoover','Galera Record',336,2021,'Usado • Bem conservado','4.7','3,3 mil','6,4 mil vendidos','Estante da Bia',19.90,39.80,true,false,false,'Indaiatuba - SP (12 km)','#1c1824','#ffb4a2','Beyah passa o verão na península do Texas antes de ir para a faculdade e conhece Samson, descobrindo que ambos guardam segredos profundos.'),
('BK-005','O Avesso da Pele','Jeferson Tenório','Companhia das Letras',192,2020,'Seminovo • Edição especial','5.0','1,9 mil','4,5 mil vendidos','Coletivo Leitura Viva',26.00,36.90,false,true,false,'Salto - SP (2 km)','#cdd9e5','#1d3557','Vencedor do Prêmio Jabuti de Romance Literário. Pedro resgata a história de seu pai, Henrique, em uma narrativa comovente sobre identidade e relações familiares no Brasil.'),
('BK-006','Bom Dia, Verônica','Ilana Casoy & R. Montes','DarkSide Books',256,2016,'Seminovo • Capa dura','4.9','2,8 mil','7,0 mil vendidos','Sebo Literário Salto',21.00,42.00,true,false,false,'Salto - SP (1,5 km)','#d90429','#111111','Verônica Torres, escrivã da Delegacia de Homicídios de São Paulo, decide investigar por conta própria dois casos arquivados que revelam uma trama perigosa.'),
('BK-007','O Rei de Amarelo','Robert W. Chambers','Intrínseca',320,2018,'Doação Comunitária • Bom estado','4.6','890','1,1 mil doados','Ponto de Leitura Centro',0,0,false,false,true,'Salto - SP (Centro - Doação)','#1a110b','#f4a261','Coletânea clássica de contos de horror estranho e fantasia sombria centrados em uma peça teatral proibida que leva à loucura quem a lê.'),
('BK-008','Coraline','Neil Gaiman','Intrínseca',224,2020,'Novo • Capa dura ilustrada','4.9','5,2 mil','11 mil vendidos','Livraria Fantasia BR',25.00,38.00,false,true,false,'Itu - SP (7 km)','#edf2fb','#4a2c6d','Ao atravessar uma porta secreta em sua nova casa, Coraline encontra um mundo alternativo assustadoramente parecido com o seu, onde uma Outra Mãe quer mantê-la para sempre.'),
('BK-009','Love, Theoretically','Ali Hazelwood','Arqueiro',384,2023,'Seminovo • Com marcador','4.8','2,4 mil','4,9 mil vendidos','Estante da Camis',23.90,47.80,true,true,false,'Salto - SP (3 km)','#f9c74f','#9b2226','Elsie Hannaway é uma física teórica de dia e namorada de aluguel nas horas vagas, até cruzar com Jack Smith, o físico experimental que arruinou a carreira de seu mentor.'),
('BK-010','Red Hood Outlaw','DC Comics','Panini Comics',164,2021,'Seminovo • Papel couchê','4.7','640','1,8 mil vendidos','HQ & Mangá Mania',18.00,36.00,true,false,false,'Salto - SP (900 m)','#2b2d42','#ef233c','Jason Todd assume uma postura ainda mais implacável nas ruas de Gotham após o rompimento com os Foras da Lei.'),
('BK-011','Alchemised','SenLinYu','Rocco',640,2025,'Novo • Edição de colecionador','5.0','1,7 mil','3,9 mil vendidos','Livraria Paulista',34.90,54.90,false,true,false,'Indaiatuba - SP (14 km)','#2f2e2c','#e0d8c3','Em um mundo devastado pela guerra e pela necromancia, Helena Marino tenta recuperar suas memórias perdidas sob a vigilância de um implacável alquimista.'),
('BK-012','Garoto de Ipanema','Mariana Barbosa','Seguinte',288,2022,'Doação • Ótimo estado','4.8','950','1,3 mil doados','Camila N. (Leitora local)',0,0,false,true,true,'Salto - SP (Doação)','#48cae4','#03045e','Romance nacional leve e ensolarado ambientado no Rio de Janeiro, sobre amizade, verão e primeiras descobertas.');
