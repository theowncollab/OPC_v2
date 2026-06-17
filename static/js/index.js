function reRoute(to) {
    window.location.href = to;
}

const br = document.getElementById("hero-left-top-right");
if (br) {
    br.addEventListener("click", function() {
        reRoute("index.html#brands-intro");
    });
}

const cr = document.getElementById("hero-right-top");
if (cr) {
    cr.addEventListener("click", function() {
        reRoute("index.html#creators-intro");
    });
}

const er = document.getElementById("hero-middle");
if (er) {
    er.addEventListener("click", function() {
        reRoute("index.html#event-partners-intro");
    });
}

const schdBtn = document.getElementById("schedule-meet-btn");
if (schdBtn) {
    schdBtn.addEventListener("click", function() {
        reRoute("schedule-a-meet.html");
    });
}

const kmBtn = document.getElementById("know-more-btn");
if (kmBtn) {
    kmBtn.addEventListener("click", function() {
        reRoute("index.html#intro-section");
    });
}

const ebBtn = document.getElementById("explore-brands-btn");
if (ebBtn) {
    ebBtn.addEventListener("click", function() {
        reRoute("brands.html");
    });
}

const eeBtn = document.getElementById("explore-events-btn");
if (eeBtn) {
    eeBtn.addEventListener("click", function() {
        reRoute("event-partners.html");
    });
}

const ecBtn = document.getElementById("explore-creators-btn");
if (ecBtn) {
    ecBtn.addEventListener("click", function() {
        reRoute("creators.html");
    });
}

const contactUsMiniBtn = document.querySelector("#contact-us-mini-button button");
if (contactUsMiniBtn) {
    contactUsMiniBtn.addEventListener("click", function () {
        reRoute("contact-us.html");
    });
}

const lagEl = document.querySelectorAll('.lagElement');
  const lagFactor = 0.1; // smaller = more delay

  window.addEventListener('scroll', () => {
    const offset = window.scrollY * lagFactor;
    lagEl.forEach(el => {
      el.style.transform = `translateY(${offset}px)`;
    });
  });