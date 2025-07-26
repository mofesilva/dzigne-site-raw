const menu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})


// Carrossel: Passar slides + automatizar slides
let autoSlideInterval = null; // armazenamos o setInterval global

function moveToSlide(slides, offset) {
    const activeSlide = slides.querySelector("[data-active]");
    const slidesArray = [...slides.children];
    let newIndex = slidesArray.indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slidesArray.length - 1;
    if (newIndex >= slidesArray.length) newIndex = 0;

    delete activeSlide.dataset.active;
    slidesArray[newIndex].dataset.active = true;
}

function startAutoSlide(slides) {
    // Se já existir um intervalo rodando, não inicia outro
    if (autoSlideInterval) return;

    autoSlideInterval = setInterval(() => {
        moveToSlide(slides, 1);
    }, 5000);
}

function pauseAutoSlide() {
    if (!autoSlideInterval) return; // se já está pausado, não faz nada

    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
}

function resetAutoSlide(slides) {
    pauseAutoSlide();
    startAutoSlide(slides);
}

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) {
        return;
    }
    const slides = carousel.querySelector("[data-slides]");
    if (!slides) {
        return;
    }

    // Inicia o auto-slide
    startAutoSlide(slides);

    // Pausar ao entrar com mouse; retomar ao sair
    carousel.addEventListener("mouseenter", () => {
        pauseAutoSlide();
    });
    carousel.addEventListener("mouseleave", () => {
        startAutoSlide(slides);
    });

    // Botões "Prev" / "Next"
    const buttons = carousel.querySelectorAll("[data-carousel-button]");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const offset = button.dataset.carouselButton === "next" ? 1 : -1;
            moveToSlide(slides, offset);
            resetAutoSlide(slides);
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const trigger = 50;                 // pixels de scroll para ativar

    window.addEventListener("scroll", () => {
        if (window.scrollY > trigger) {
            navbar.classList.add("navbar--shrink");
        } else {
            navbar.classList.remove("navbar--shrink");
        }
    });
});

