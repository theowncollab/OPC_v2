const isProduction = window.location.hostname.includes("theowncollab.com");
const domainAttribute = isProduction ? "domain=.theowncollab.com;" : "";
const cookieOptions = `${domainAttribute} path=/; max-age=604800; Secure; SameSite=Lax`;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

async function refreshToken() {
  try {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCookie('refreshToken')}`,
      },
    });
    const data = await response.json();
    if (data.status_code == 200) {
      document.cookie = `accessToken=${data.access_token}; ${cookieOptions}`;
      document.cookie = `tokenType=${data.token_type}; ${cookieOptions}`;
      return 200;
    }
    else {
      return 0;
    }

  } catch (error) {
    return 0;
  }
}

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp) {
      return (payload.exp * 1000) <= (Date.now() + 10000);
    }
    return false;
  } catch (e) {
    return false;
  }
}

function changePage() {
  window.location.href = 'https://dashboard.theowncollab.com/';
}

async function initializeHeader() {
  const accessToken = getCookie('accessToken');
  const refreshTokenCookie = getCookie('refreshToken');

  if (accessToken && !isTokenExpired(accessToken)) {
    changePage();
    return;
  }

  if (refreshTokenCookie && !isTokenExpired(refreshTokenCookie)) {
    const refreshResponse = await refreshToken();
    if (refreshResponse === 200) {
      changePage();
    }
  }
}

function init() {
  initializeHeader();
}

function initializeWorkInProgress() {
  if (document.body.clientWidth < 1024) {
    document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #000; color: #fff; font-family: 'Segoe UI', sans-serif; text-align: center; padding: 20px; box-sizing: border-box;">
      <h1 style="font-size: 2.5rem; margin: 0 0 20px 0; letter-spacing: 2px; font-weight: 700;">WORK IN PROGRESS</h1>
      <p style="font-size: 1.1rem; line-height: 1.6; margin: 0 0 20px 0; max-width: 600px; color: #ccc;">
        This website is only available in desktop/laptop view for now. <br>
        Please open on the recommended device to continue.
      </p>
      <p style="color: #666; margin: 0 0 40px 0; font-style: italic;">
        We are very sorry for the inconvenience caused.
      </p>
      <div style="border-top: 1px solid #333; padding-top: 30px; width: 100%; max-width: 400px; display: flex; flex-direction: column; align-items: center;">
        <span style="display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; color: #888;">
          Meanwhile stay with us on social media
        </span>
        <div style="display: flex; gap: 30px;">
            <a href="https://www.instagram.com/owncollab/" target="_blank" style="color: #fff; font-size: 2.5rem; text-decoration: none; transition: transform 0.2s;"><i class='bxl bx-instagram'></i></a>
            <a href="https://www.facebook.com/profile.php?id=61584250147710" target="_blank" style="color: #fff; font-size: 2.5rem; text-decoration: none; transition: transform 0.2s;"><i class='bxl bx-facebook'></i></a>
            <a href="https://www.x.com/theowncollab/" target="_blank" style="color: #fff; font-size: 2.5rem; text-decoration: none; transition: transform 0.2s;"><i class='bxl bx-twitter-x'></i></a>
        </div>
      </div>
    </div>
  `;
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#000';
  }
  else {
    window.location.reload();
  }
}

function alert(message) {
  const alertOverlay = document.createElement('div');
  alertOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000000;
    backdrop-filter: blur(5px);
  `;

  const alertBox = document.createElement('div');
  alertBox.style.cssText = `
    background-color: #0d0d0d;
    border: 1px solid rgba(255, 235, 59, 0.5);
    padding: 30px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    font-family: 'Montserrat', sans-serif;
  `;

  const msg = document.createElement('p');
  msg.innerText = message;
  msg.style.cssText = `
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 25px;
    line-height: 1.5;
  `;

  const okBtn = document.createElement('button');
  okBtn.innerText = 'OK';
  okBtn.style.cssText = `
    background: rgba(255, 235, 59, 0.1);
    color: rgba(255, 235, 59, 1);
    border: 1px solid rgba(255, 235, 59, 0.7);
    padding: 10px 30px;
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    font-size: 0.9rem;
    outline: none;
    margin: 0 auto;
  `;

  okBtn.onmouseover = () => {
    okBtn.style.background = 'rgba(255, 235, 59, 1)';
    okBtn.style.color = '#000';
  };
  okBtn.onmouseout = () => {
    okBtn.style.background = 'rgba(255, 235, 59, 0.1)';
    okBtn.style.color = 'rgba(255, 235, 59, 1)';
  };

  okBtn.onclick = () => {
    document.body.removeChild(alertOverlay);
  };

  alertBox.appendChild(msg);
  alertBox.appendChild(okBtn);
  alertOverlay.appendChild(alertBox);
  document.body.appendChild(alertOverlay);
}

window.onload = init;

const lenis = new window.Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
