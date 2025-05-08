const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'zerobar',
  waitForConnections: true,
  connectionLimit: 10
});

// Проверка подключения (опционально)
pool.getConnection()
  .then(conn => {
    console.log('Успешное подключение к MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('Ошибка подключения к MySQL:', err);
  });

module.exports = pool;