/**
 * DAMASS LOUNGE & BAR — BESPOKE CLIENT ENGINE
 * Kanash, Cheboksarskaya 29
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LIVE KANASH TIME & VENUE OPEN/CLOSED STATUS
       ========================================================================== */
    function updateKanashStatus() {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        const kanashTimeEl = document.getElementById('kanashTime');

        // Current UTC time offset for Kanash (MSK UTC+3)
        const now = new Date();
        const utcHours = now.getUTCHours();
        const kanashHours = (utcHours + 3) % 24;
        const minutes = now.getUTCMinutes().toString().padStart(2, '0');
        const dayOfWeek = now.getUTCDay(); // 0 is Sun, 5 is Fri, 6 is Sat

        if (kanashTimeEl) {
            kanashTimeEl.textContent = `${kanashHours.toString().padStart(2, '0')}:${minutes}`;
        }

        // Hours: Mon-Thu, Sun: 16:00 - 00:00 ( Kanash hours >= 16 orKanash hours === 0 )
        // Fri-Sat: 16:00 - 01:00
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
        const closingHour = isWeekend ? 1 : 0;
        
        const isOpen = (kanashHours >= 16) || (kanashHours < closingHour);

        if (statusDot && statusText) {
            if (isOpen) {
                statusDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
                statusText.innerHTML = '<span class="text-emerald-400 font-semibold">Открыто сейчас</span> • В залах горит вечерний свет';
            } else {
                statusDot.className = 'w-2 h-2 rounded-full bg-amber-400';
                statusText.innerHTML = '<span class="text-amber-400 font-semibold">Ждем гостей с 16:00</span> • Принимаем брони онлайн';
            }
        }
    }
    updateKanashStatus();
    setInterval(updateKanashStatus, 30000);

    /* ==========================================================================
       2. ORIGINAL BLOCK: DAMASS EVENING CURATOR (Сценарии вечера)
       ========================================================================== */
    const scenarios = {
        lounge: {
            title: "Дымный лаунж & Чайная церемония",
            subtitle: "Неспешный вечер под мягкий фоновый саунд",
            desc: "Идеально для перезагрузки после рабочего дня или приватной беседы. Мягкие диваны у бара, приглушенный теплый свет, авторские чаши от наших кальянных мастеров и прозрачный чайник со свежими ягодами и травами на огне.",
            zone: "Основной лаунж-зал (диваны)",
            guestRec: "2–4 персоны",
            vibe: "Приглушенный чилл • Лаунж ритм • 18+",
            pairTitle: "Гастрономическая пара сценария:",
            pairText: "Паровой коктейль DAMASS + Согревающий облепиховый чай с розмарином (800 мл)",
            image: "images/hookah_lounge.jpg",
            formHall: "Основной лаунж-зал",
            formGuests: "3-4 человека"
        },
        vip: {
            title: "Закрытый VIP-зал & Караоке",
            subtitle: "Ваша компания, любимые треки и полная приватность",
            desc: "Изолированное пространство с премиальной акустикой, профессиональным караоке и большими экранами. Никаких посторонних — идеальный выбор для дня рождения, корпоратива или громкого праздника с друзьями.",
            zone: "VIP-комната с караоке",
            guestRec: "5–15+ персон",
            vibe: "Караоке • Праздничный драйв • Приватность",
            pairTitle: "Гастрономическая пара сценария:",
            pairText: "Мясное ассорти на мангале + Сырная тарелка с орехами + Крафтовые напитки",
            image: "images/interior_vip.jpg",
            formHall: "VIP-комната с караоке",
            formGuests: "5-8 человек"
        },
        gourmet: {
            title: "Кухня на мангале & Барный вечер",
            subtitle: "Сочный шашлык на углях и крафтовое пенное",
            desc: "Гастрономический акцент на блюдах открытого огня. Настоящий шашлык с пылу с жару, фирменные бургеры DAMASS с карамелизированным луком и картофелем фри, сытные закуски и холодное разливное.",
            zone: "Основной зал & Столики у бара",
            guestRec: "2–6 персон",
            vibe: "Мангал & Гриль • Вкусный ужин • Уют",
            pairTitle: "Гастрономическая пара сценария:",
            pairText: "Шашлык из мяса на углях с маринованным луком + Крафтовое пенное / Фирменный бургер",
            image: "images/food_grill.jpg",
            formHall: "Столик у бара",
            formGuests: "3-4 человека"
        }
    };

    const moodChips = document.querySelectorAll('.mood-chip');
    const curatorTitle = document.getElementById('curatorTitle');
    const curatorSubtitle = document.getElementById('curatorSubtitle');
    const curatorDesc = document.getElementById('curatorDesc');
    const curatorZone = document.getElementById('curatorZone');
    const curatorGuests = document.getElementById('curatorGuests');
    const curatorVibe = document.getElementById('curatorVibe');
    const curatorPairText = document.getElementById('curatorPairText');
    const curatorImage = document.getElementById('curatorImage');
    const curatorApplyBtn = document.getElementById('curatorApplyBtn');

    let currentSelectedScenario = 'lounge';

    function setScenario(scenarioKey) {
        const s = scenarios[scenarioKey];
        if (!s) return;
        currentSelectedScenario = scenarioKey;

        moodChips.forEach(chip => {
            if (chip.getAttribute('data-scenario') === scenarioKey) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        if (curatorImage) {
            curatorImage.style.opacity = '0.3';
            setTimeout(() => {
                curatorImage.src = s.image;
                curatorImage.style.opacity = '1';
            }, 200);
        }

        if (curatorTitle) curatorTitle.textContent = s.title;
        if (curatorSubtitle) curatorSubtitle.textContent = s.subtitle;
        if (curatorDesc) curatorDesc.textContent = s.desc;
        if (curatorZone) curatorZone.textContent = s.zone;
        if (curatorGuests) curatorGuests.textContent = s.guestRec;
        if (curatorVibe) curatorVibe.textContent = s.vibe;
        if (curatorPairText) curatorPairText.textContent = s.pairText;
    }

    moodChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const sc = chip.getAttribute('data-scenario');
            setScenario(sc);
        });
    });

    if (curatorApplyBtn) {
        curatorApplyBtn.addEventListener('click', () => {
            const s = scenarios[currentSelectedScenario];
            const hallSelect = document.getElementById('bookHall');
            const guestsSelect = document.getElementById('bookGuests');

            if (hallSelect && s.formHall) {
                for (let option of hallSelect.options) {
                    if (option.value.includes(s.formHall) || option.text.includes(s.formHall)) {
                        hallSelect.value = option.value;
                        break;
                    }
                }
            }

            if (guestsSelect && s.formGuests) {
                guestsSelect.value = s.formGuests;
            }

            syncPassPreview();

            // Smooth scroll to booking
            const bookingSec = document.getElementById('booking');
            if (bookingSec) {
                bookingSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* ==========================================================================
       3. ORIGINAL BLOCK: NIGHT BILL & DEPOSIT ESTIMATOR (Калькулятор чека)
       ========================================================================== */
    let calcGuests = 4;
    let calcZone = 'main'; // 'main' or 'vip'
    let calcHookahs = 1;
    let calcGrill = true;
    let calcTea = true;

    const calcGuestsDisplay = document.getElementById('calcGuestsCount');
    const calcMinusGuest = document.getElementById('calcMinusGuest');
    const calcPlusGuest = document.getElementById('calcPlusGuest');
    const calcZoneMain = document.getElementById('calcZoneMain');
    const calcZoneVip = document.getElementById('calcZoneVip');
    const calcHookahSelect = document.getElementById('calcHookahSelect');
    const calcGrillToggle = document.getElementById('calcGrillToggle');
    const calcTeaToggle = document.getElementById('calcTeaToggle');

    const calcTotalSum = document.getElementById('calcTotalSum');
    const calcPerPerson = document.getElementById('calcPerPerson');
    const calcBookEstimateBtn = document.getElementById('calcBookEstimateBtn');

    function calculateEstimate() {
        // Realistic pricing from real Damass data:
        // Average check: 500 - 800 rub
        // Hookah: 700 rub
        // Grill dish: ~450 rub / person
        // Tea ceremony: ~280 rub
        // VIP room has minimum comfort base or karaoke
        let total = 0;

        // Base food/drinks
        const foodBasePerPerson = calcGrill ? 550 : 350;
        total += calcGuests * foodBasePerPerson;

        // Hookahs
        total += calcHookahs * 700;

        // Tea ceremonies (1 tea per 3 guests)
        if (calcTea) {
            const teaCount = Math.max(1, Math.ceil(calcGuests / 3));
            total += teaCount * 280;
        }

        // VIP room deposit minimum
        if (calcZone === 'vip') {
            if (total < 3500) total = 3500; // minimum friendly check for entire VIP room
        }

        const perPerson = Math.round(total / calcGuests);

        if (calcTotalSum) {
            calcTotalSum.textContent = `~${total.toLocaleString('ru-RU')} ₽`;
        }
        if (calcPerPerson) {
            calcPerPerson.textContent = `~${perPerson.toLocaleString('ru-RU')} ₽ / чел (средний чек)`;
        }
    }

    if (calcMinusGuest) {
        calcMinusGuest.addEventListener('click', () => {
            if (calcGuests > 1) {
                calcGuests--;
                calcGuestsDisplay.textContent = calcGuests;
                calculateEstimate();
            }
        });
    }

    if (calcPlusGuest) {
        calcPlusGuest.addEventListener('click', () => {
            if (calcGuests < 20) {
                calcGuests++;
                calcGuestsDisplay.textContent = calcGuests;
                calculateEstimate();
            }
        });
    }

    if (calcZoneMain && calcZoneVip) {
        calcZoneMain.addEventListener('click', () => {
            calcZone = 'main';
            calcZoneMain.classList.add('active');
            calcZoneVip.classList.remove('active');
            calculateEstimate();
        });
        calcZoneVip.addEventListener('click', () => {
            calcZone = 'vip';
            calcZoneVip.classList.add('active');
            calcZoneMain.classList.remove('active');
            calculateEstimate();
        });
    }

    if (calcHookahSelect) {
        calcHookahSelect.addEventListener('change', (e) => {
            calcHookahs = parseInt(e.target.value, 10);
            calculateEstimate();
        });
    }

    if (calcGrillToggle) {
        calcGrillToggle.addEventListener('change', (e) => {
            calcGrill = e.target.checked;
            calculateEstimate();
        });
    }

    if (calcTeaToggle) {
        calcTeaToggle.addEventListener('change', (e) => {
            calcTea = e.target.checked;
            calculateEstimate();
        });
    }

    if (calcBookEstimateBtn) {
        calcBookEstimateBtn.addEventListener('click', () => {
            const hallSelect = document.getElementById('bookHall');
            const guestsSelect = document.getElementById('bookGuests');

            if (hallSelect) {
                hallSelect.value = (calcZone === 'vip') ? 'VIP-комната с караоке' : 'Основной лаунж-зал';
            }

            if (guestsSelect) {
                if (calcGuests <= 2) guestsSelect.value = '1-2 человека';
                else if (calcGuests <= 4) guestsSelect.value = '3-4 человека';
                else if (calcGuests <= 8) guestsSelect.value = '5-8 человек';
                else guestsSelect.value = 'Более 8 человек (банкет/VIP)';
            }

            syncPassPreview();

            const bookingSec = document.getElementById('booking');
            if (bookingSec) {
                bookingSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    calculateEstimate();

    /* ==========================================================================
       4. VIP GUEST PASS LIVE PREVIEW & FORM SYNC
       ========================================================================== */
    const bookNameInput = document.getElementById('bookName');
    const bookPhoneInput = document.getElementById('bookPhone');
    const bookDateInput = document.getElementById('bookDate');
    const bookTimeInput = document.getElementById('bookTime');
    const bookHallInput = document.getElementById('bookHall');
    const bookGuestsInput = document.getElementById('bookGuests');

    const passGuestName = document.getElementById('passGuestName');
    const passDate = document.getElementById('passDate');
    const passTime = document.getElementById('passTime');
    const passHall = document.getElementById('passHall');
    const passGuests = document.getElementById('passGuests');
    const passCode = document.getElementById('passCode');

    // Default booking date to today
    if (bookDateInput && !bookDateInput.value) {
        const todayStr = new Date().toISOString().split('T')[0];
        bookDateInput.value = todayStr;
        bookDateInput.min = todayStr;
    }

    function syncPassPreview() {
        if (passGuestName && bookNameInput) {
            passGuestName.textContent = bookNameInput.value.trim() || 'Гость DAMASS';
        }
        if (passDate && bookDateInput) {
            passDate.textContent = bookDateInput.value || 'Сегодня';
        }
        if (passTime && bookTimeInput) {
            passTime.textContent = bookTimeInput.value || '19:00';
        }
        if (passHall && bookHallInput) {
            passHall.textContent = bookHallInput.value || 'Основной зал';
        }
        if (passGuests && bookGuestsInput) {
            passGuests.textContent = bookGuestsInput.value || '3–4 чел';
        }
        if (passCode && !passCode.dataset.assigned) {
            const randomCode = 'DMS-' + Math.floor(1000 + Math.random() * 9000);
            passCode.textContent = randomCode;
            passCode.dataset.assigned = "true";
        }
    }

    [bookNameInput, bookPhoneInput, bookDateInput, bookTimeInput, bookHallInput, bookGuestsInput].forEach(inp => {
        if (inp) {
            inp.addEventListener('input', syncPassPreview);
            inp.addEventListener('change', syncPassPreview);
        }
    });
    syncPassPreview();

    /* ==========================================================================
       5. BESPOKE RESERVATION CONFIRMATION MODAL (No alert())
       ========================================================================== */
    const bookingForm = document.getElementById('bookingForm');
    const bespokeModal = document.getElementById('bespokeModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalConfirmDetails = document.getElementById('modalConfirmDetails');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = bookNameInput ? bookNameInput.value.trim() : '';
            const phone = bookPhoneInput ? bookPhoneInput.value.trim() : '';
            const date = bookDateInput ? bookDateInput.value : '';
            const time = bookTimeInput ? bookTimeInput.value : '';
            const hall = bookHallInput ? bookHallInput.value : '';
            const guests = bookGuestsInput ? bookGuestsInput.value : '';
            const code = passCode ? passCode.textContent : 'DMS-2026';

            if (!name || !phone) {
                return;
            }

            if (modalConfirmDetails) {
                modalConfirmDetails.innerHTML = `
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-zinc-400">Номер заявки:</span>
                            <span class="text-[#d4af37] font-bold font-mono">${code}</span>
                        </div>
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-zinc-400">Имя гостя:</span>
                            <span class="text-white font-medium">${name}</span>
                        </div>
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-zinc-400">Контактный телефон:</span>
                            <span class="text-white font-medium">${phone}</span>
                        </div>
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-zinc-400">Дата и время:</span>
                            <span class="text-white font-medium">${date} в ${time}</span>
                        </div>
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-zinc-400">Зал и гости:</span>
                            <span class="text-white font-medium">${hall} (${guests})</span>
                        </div>
                    </div>
                `;
            }

            if (bespokeModal) {
                bespokeModal.classList.add('active');
            }
        });
    }

    if (modalCloseBtn && bespokeModal) {
        modalCloseBtn.addEventListener('click', () => {
            bespokeModal.classList.remove('active');
            if (bookingForm) bookingForm.reset();
            if (passCode) delete passCode.dataset.assigned;
            syncPassPreview();
        });

        bespokeModal.addEventListener('click', (e) => {
            if (e.target === bespokeModal) {
                bespokeModal.classList.remove('active');
                if (bookingForm) bookingForm.reset();
                if (passCode) delete passCode.dataset.assigned;
                syncPassPreview();
            }
        });
    }

    /* ==========================================================================
       6. MENU CATEGORY FILTERING WITH SMOOTH STAGGER
       ========================================================================== */
    const menuTabs = document.querySelectorAll('.editorial-tab');
    const menuItems = document.querySelectorAll('.menu-dish-card');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    /* ==========================================================================
       7. MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
            });
        });
    }

});
