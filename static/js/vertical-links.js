const contactUsBtn = document.querySelector("#left-fixed-links #contact");
contactUsBtn.addEventListener("click", () => {
  window.location.href = "contact-us.html";
});

const mailIdBtn = document.querySelector("#left-fixed-links #mail-id");
mailIdBtn.addEventListener("click", () => {
  navigator.clipboard.writeText("ceo@theowncollab.com");
  alert("Email ID copied to clipboard");
  window.location.href = "mailto:ceo@theowncollab.com";
});

const instagramBtn = document.querySelector("#right-fixed-links #social-instagram");
instagramBtn.addEventListener("click", () => {
  window.open("https://www.instagram.com/owncollab/", "_blank");
});

const facebookBtn = document.querySelector("#right-fixed-links #social-facebook");
facebookBtn.addEventListener("click", () => {
  window.open("https://www.facebook.com/profile.php?id=61584250147710", "_blank");
});

const twitterBtn = document.querySelector("#right-fixed-links #social-twitter");
twitterBtn.addEventListener("click", () => {
  window.open("https://www.x.com/theowncollab/", "_blank");
});