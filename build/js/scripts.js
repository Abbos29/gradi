// Custom Scripts
// Мобильное меню бургер
function burgerMenu() {
    const burger = document.querySelector('.burger')
    const burgerClose = document.querySelector('.btn-close')
    const menu = document.querySelector('.menu')
    const body = document.querySelector('body')
    burger.addEventListener('click', () => {
        if (!menu.classList.contains('active')) {
            menu.classList.add('active')
            // burger.classList.add('active-burger')
            body.classList.add('locked')
        } else {
            menu.classList.remove('active')
            // burger.classList.remove('active-burger')
            body.classList.remove('locked')
        }
    })
    menu.addEventListener("click", (event) => {
        if (!event.target) {
            menu.classList.remove('active')
            // burger.classList.remove('active-burger')
            body.classList.remove('locked')
        }
    })
    burgerClose.addEventListener('click', () => {
        menu.classList.remove('active')
        // burger.classList.remove('active-burger')
        body.classList.remove('locked')
    })
    // Вот тут мы ставим брейкпоинт навбара
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991.98) {
            menu.classList.remove('active')
            burger.classList.remove('active-burger')
            body.classList.remove('locked')
        }
    })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
    const nav = document.querySelector('nav')

    // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
    const breakpoint = 1
    if (window.scrollY >= breakpoint) {
        nav.classList.add('fixed__nav')
    } else {
        nav.classList.remove('fixed__nav')
    }
}
window.addEventListener('scroll', fixedNav)





// SWIPER

const whoSwiper = new Swiper('.who__swiper', {

    navigation: {
        nextEl: '.who-arrow-next',
        prevEl: '.who-arrow-prev',
    },

    loop: true,

    // initialSlide: 3,
    // centeredSlides: true,
    grabCursor: true,
    slidesPerView: 2,
    spaceBetween: 20,

    breakpoints: {
        1450: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 3,
        }
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const detailsElements = document.querySelectorAll("details");

    // Обработчик клика для закрытия details
    document.addEventListener("click", function (event) {
        const target = event.target;
        console.log(target);

        // Проверяем, является ли клик вне details и summary
        if (!target.closest("details") && !target.closest("summary")) {
            // Скрываем все открытые details
            detailsElements.forEach(function (details) {
                details.removeAttribute("open");
            });
        } else if (target.tagName === "SUMMARY" || target.tagName === 'svg' || target.tagName === 'path') {
            // Если кликнули на summary, закрываем все открытые details,
            // кроме того, на который был сделан клик
            detailsElements.forEach(function (details) {
                if (details !== target.parentElement) {
                    details.removeAttribute("open");
                }
            });
        }
    });

    // Обработчик для отслеживания наведения мыши на dropdown-menu
    document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
        let timeoutId;

        menu.addEventListener("mouseover", function () {
            clearTimeout(timeoutId); // Очищаем таймер закрытия details
        });

        menu.addEventListener("mouseout", function () {
            // Устанавливаем таймер закрытия details только если мышь не находится на самом details
            if (!menu.closest("details").matches(":hover")) {
                timeoutId = setTimeout(function () {
                    menu.closest("details").removeAttribute("open");
                }, 1000);
            }
        });
    });

    // Обработчик для автоматического закрытия details через 3 секунды
    detailsElements.forEach(function (details) {
        details.addEventListener("toggle", function () {
            if (details.getAttribute("open")) {
                // Устанавливаем таймер для автоматического закрытия через 3 секунды
                setTimeout(function () {
                    details.removeAttribute("open");
                }, 1500);
            }
        });
    });
});









// TABS

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
    const headers = document.querySelectorAll(headerSelector);

    headers.forEach((header) => {
        const tabs = header.querySelectorAll(tabSelector);
        const contents = header.parentElement.querySelectorAll(contentSelector);

        function hideTabContent() {
            contents.forEach((item) => {
                item.style.display = 'none';
            });
            tabs.forEach((item) => {
                item.classList.remove(activeClass);
            });
        }

        function showTabContent(i = 0) {
            contents[i].style.display = display;
            tabs[i].classList.add(activeClass);
        }

        hideTabContent();
        showTabContent();

        header.addEventListener('click', (e) => {
            const target = e.target;

            if (
                target.classList.contains(tabSelector.replace(/\./, '')) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, ''))
            ) {
                tabs.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    });
}

// Пример использования:
tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active');
