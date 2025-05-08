// Выбор стола
document.querySelectorAll('.table').forEach(table => {
    table.addEventListener('click', function() {
      // Снимаем выделение
      document.querySelectorAll('.table').forEach(t => {
        t.classList.remove('selected');
        t.style.backgroundColor = '';
      });
      
      // Выделяем выбранный
      this.classList.add('selected');
      this.style.backgroundColor = '#4CAF50';
      document.getElementById('selected-table').textContent = this.dataset.table;
    });
  });
  
  // Отправка формы
  document.getElementById('reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const table = document.querySelector('.table.selected')?.dataset.table;
  
    if (!table) {
      alert('Пожалуйста, выберите стол!');
      return;
    }
  
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      date: `${form.date.value}T${form.time.value}:00`,
      table: table
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка сервера');
      }
  
      alert('Стол успешно забронирован!');
      form.reset();
      document.querySelectorAll('.table').forEach(t => {
        t.classList.remove('selected');
        t.style.backgroundColor = '';
      });
      document.getElementById('selected-table').textContent = '-';
  
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка бронирования: ' + error.message);
    }
  });