const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 80,
    direction: 'horizontal',
    navigation: {
        nextEl: '.scroll-right',
        prevEl: '.scroll-left',
    },
});

function addParallaxEffect(element, intensity) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const offset = scrollY * intensity;
        element.style.transform = `translateY(${offset}px)`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const parallaxElement = document.querySelector('#br-hero-right img');
    addParallaxEffect(parallaxElement, 0.15);
});

const brandsScheduleBtn = document.getElementById('brands-schedule-a-meet-btn');
brandsScheduleBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});