require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

// Улучшенная функция с обработкой ошибок
async function sendSMS(chatId, message) {
  try {
    if (!chatId || !message) {
      throw new Error('Не указан chatId или сообщение');
    }
    
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });
    
    console.log(`Сообщение отправлено на chatId: ${chatId}`);
    return true;
  } catch (error) {
    console.error('Ошибка отправки:', error.message);
    return false;
  }
}

// Проверка подключения
bot.on('polling_error', (error) => {
  console.error('Ошибка polling:', error.message);
});

// Экспорт функции
module.exports = sendSMS;
module.exports = async (chatId, message) => {
  console.log(`Попытка отправить в Telegram (chatId: ${chatId})`); // Логирование
  try {
    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    console.log('Успешно отправлено в Telegram');
  } catch (err) {
    console.error('Ошибка Telegram API:', err.response?.body || err.message);
    throw err;
  }
};