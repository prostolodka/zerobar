require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const sendSMS = require('./telegram');

const app = express();

// Настройки CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Роут бронирования
app.post('/api/book', async (req, res) => {
  try {
    console.log('Данные брони:', req.body);
    const { name, phone, date, table } = req.body;

    if (!name || !phone || !date || !table) {
      return res.status(400).json({ error: "Заполните все поля" });
    }

    // Сохранение в БД
    await pool.execute(
      'INSERT INTO reservations (name, phone, booking_date, table_number) VALUES (?, ?, ?, ?)',
      [name, phone, date, table]
    );

    // Отправка в Telegram
    const message = `
      <b>📌 Новая бронь!</b>
      <b>Имя:</b> ${name}
      <b>Телефон:</b> <code>${phone}</code>
      <b>Стол №:</b> ${table}
      <b>Дата:</b> ${new Date(date).toLocaleString('ru-RU')}
    `;
    
    await sendSMS(process.env.TELEGRAM_CHAT_ID, message);
    res.json({ success: true });

  } catch (err) {
    console.error('Ошибка:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));