"use strict";
(() => {
    const carousel = document.querySelector(".carousel");
    const track = carousel?.querySelector(".carousel-track");
    if (!carousel || !track) {
        console.error("Carrossel não inicializado: estrutura do carrossel não encontrada.");
        return;
    }
    const activeTrack = track;
    const slides = Array.from(track.children).filter((slide) => slide instanceof HTMLElement);
    const nextButton = carousel.querySelector(".next");
    const previousButton = carousel.querySelector(".prev");
    if (slides.length === 0) {
        console.error("Carrossel não inicializado: nenhum slide foi encontrado.");
        return;
    }
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentSlide = 0;
    let direction = 1;
    let autoplayId = null;
    let isHovered = false;
    let hasFocus = false;
    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        const slideOffset = slides[currentSlide].offsetLeft - slides[0].offsetLeft;
        activeTrack.style.transform = `translateX(-${slideOffset}px)`;
    }
    function stopAutoplay() {
        if (autoplayId !== null) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    }
    function advanceAutoplay() {
        if (currentSlide === slides.length - 1) {
            direction = -1;
        }
        else if (currentSlide === 0) {
            direction = 1;
        }
        showSlide(currentSlide + direction);
    }
    function updateAutoplay() {
        stopAutoplay();
        if (slides.length > 1 &&
            !motionPreference.matches &&
            !document.hidden &&
            !isHovered &&
            !hasFocus) {
            autoplayId = window.setInterval(() => {
                advanceAutoplay();
            }, 5000);
        }
    }
    nextButton?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        updateAutoplay();
    });
    previousButton?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        updateAutoplay();
    });
    carousel.addEventListener("pointerenter", () => {
        isHovered = true;
        updateAutoplay();
    });
    carousel.addEventListener("pointerleave", () => {
        isHovered = false;
        updateAutoplay();
    });
    carousel.addEventListener("focusin", () => {
        hasFocus = true;
        updateAutoplay();
    });
    carousel.addEventListener("focusout", (event) => {
        const target = event.relatedTarget;
        if (!(target instanceof Node) || !carousel.contains(target)) {
            hasFocus = false;
            updateAutoplay();
        }
    });
    document.addEventListener("visibilitychange", updateAutoplay);
    window.addEventListener("resize", () => showSlide(currentSlide));
    motionPreference.addEventListener("change", updateAutoplay);
    showSlide(currentSlide);
    updateAutoplay();
})();
