// Cria/atualiza as tabelas do banco. Funciona no Windows, Mac e Linux: npm run db
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('Falta a linha DATABASE_URL no arquivo .env');
  process.exit(1);
}
const db = new Pool({ connectionString: process.env.DATABASE_URL });
db.query(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'))
  .then(() => { console.log('Tabelas criadas/atualizadas com sucesso.'); return db.end(); })
  .catch((e) => { console.error('Falha ao criar as tabelas: ' + (e.message || e.code)); process.exit(1); });
