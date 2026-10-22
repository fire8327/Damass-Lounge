// DAMASS Lounge & Bar — Main JS

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Tab Filtering
    const tabs = document.querySelectorAll('.menu-tab-btn');
    const items = document.querySelectorAll('.menu-dish-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            items.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 40);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(8px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 180);
                }
            });
        });
    });

    // 2. Reservation Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bookName').value.trim();
            const phone = document.getElementById('bookPhone').value.trim();
            const date = document.getElementById('bookDate').value;
            const time = document.getElementById('bookTime').value;
            const hall = document.getElementById('bookHall').value;
            const guests = document.getElementById('bookGuests').value;

            if (!name || !phone) {
                alert('Пожалуйста, укажите ваше имя и контактный телефон для брони.');
                return;
            }

            alert(`Спасибо, ${name}! Заявка на бронирование стола принята:\n\n• Зал: ${hall}\n• Дата: ${date} в ${time}\n• Гостей: ${guests}\n\nАдминистратор перезвонит вам по номеру ${phone} в ближайшее время для подтверждения.`);
            bookingForm.reset();
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileNav');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});
