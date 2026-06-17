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
    const parallaxElement = document.querySelector('#ep-hero-right img');
    addParallaxEffect(parallaxElement, 0.1);
});

const epScheduleMeetBtn = document.getElementById("ep-hero-schedule-a-meet-btn");
if (epScheduleMeetBtn) {
    epScheduleMeetBtn.addEventListener("click", function () {
        window.location.href = "schedule-a-meet.html";
    });
}

const epCorporateSponsorsMeetBtn = document.getElementById("ep-corporate-sponsors-schedule-a-meet-btn");
if (epCorporateSponsorsMeetBtn) {
    epCorporateSponsorsMeetBtn.addEventListener("click", function () {
        window.location.href = "schedule-a-meet.html";
    });
}

const epCorporateSponsorsRegUpdatesBtn = document.getElementById("ep-corporate-sponsors-register-updates-btn");
if (epCorporateSponsorsRegUpdatesBtn) {
    epCorporateSponsorsRegUpdatesBtn.addEventListener("click", function () {
        window.location.href = "sign-in.html";
    });
}

const eventRegBtn = document.getElementById("event-register-btn");
if (eventRegBtn) {
    eventRegBtn.addEventListener("click", function () {
        window.location.href = "register-event.html";
    });
}