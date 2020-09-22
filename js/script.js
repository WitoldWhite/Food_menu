"use strict";

window.addEventListener("DOMContentLoaded", () => {
    //Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    const hideTabContent = () => {
        tabsContent.forEach((e) => {
            // e.style.display = 'none';
            e.classList.add("hide");
            e.classList.remove("show", "fade");
        });

        tabs.forEach((e) => {
            e.classList.remove("tabheader__item_active");
        });
    };

    const showTabContent = (i = 0) => {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        console.log(target);

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = "2020-9-26";

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60 * 24)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const addZero = (num) => {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    const setTimer = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updClock, 1000);
        updClock();

        function updClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };
    setTimer(".timer", deadline);

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    const showModal = () => {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(timerId);
    };

    modalTrigger.forEach((e) => {
        e.addEventListener("click", showModal);
    });

    const closeModal = () => {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    };

    // modalCloseBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const timerId = setTimeout(showModal, 5000);

    const showModalByScroll = () => {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    };

    window.addEventListener("scroll", showModalByScroll);

    class Menu {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.price = price;
            this.transfer = 28;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const e = document.createElement("div");

            if (this.classes.length === 0) {
                this.element = "menu_item";
                e.classList.add(this.element);
            } else {
                this.classes.forEach((className) => e.classList.add(className));
            }
            e.innerHTML = `
                  <div class="menu__item">
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
                    </div>
                </div>`;
            this.parent.append(e);
        }
    }

    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        "Fitness menu",
        'The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product of active and healthy people. This is a completely new product with an optimal price and high quality!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        "Premium menu",
        'In the "Premium" menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - restaurant menu without going to the restaurant!',
        21,
        ".menu .container",
        "menu__item"
    ).render();

    new Menu(
        "img/tabs/post.jpg",
        "post",
        "Lenten menu",
        'The Lenten menu is a new approach to cooking: more fresh vegetables and fruits. A product of active and healthy people. This is a completely new product with an optimal price and high quality!',
        13,
        ".menu .container",
        "menu__item"
    ).render();

    //Form

    const messages = {
        loading: 'Loading..',
        succes: 'Thank you, we will contact you soon',
        failure: 'Oops ... it looks like something went wrong',
    };

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.textContent = messages.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);


            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);
            // request.send(formData);

            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showGratitude(messages.succes);
                    statusMessage.remove();
                })
                .catch(() => {
                    showGratitude(messages.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    const showGratitude = (message) => {
        const templateModalDialog = document.querySelector('.modal__dialog');

        templateModalDialog.classList.add('hide');
        showModal();

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal__dialog');
        modalContent.innerHTML = `
        <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(modalContent);

        setTimeout(() => {
            modalContent.remove();
            templateModalDialog.classList.add('show');
            templateModalDialog.classList.remove('hide');
            closeModal();
        }, 3500);
    };


});