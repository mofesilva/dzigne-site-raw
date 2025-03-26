const menu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');


menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

// Carrossel: Passar slides + automatizar slides
let autoSlideInterval;

function moveToSlide(slides, offset) {
    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
}

function startAutoSlide(slides) {
    autoSlideInterval = setInterval(() => {
        moveToSlide(slides, 1)
    }, 5000);
}

function resetAutoSlide(slides) {
    clearInterval(autoSlideInterval);
    startAutoSlide(slides);
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[data-carousel-button]");
    const slides = document.querySelector("[data-slides]");

    startAutoSlide(slides);

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const offset = button.dataset.carouselButton === "next" ? 1 : -1
            const slides = button
                .closest("[data-carousel]")
                .querySelector("[data-slides]")
            moveToSlide(slides, offset);
            resetAutoSlide(slides);
        })
    })
})




