const isProduction = window.location.hostname.includes("theowncollab.com");
const domainAttribute = isProduction ? "domain=.theowncollab.com;" : "";
const cookieOptions = `${domainAttribute} path=/; max-age=604800; Secure; SameSite=Lax`;

const OUR_CLIENT_ID = '828246651523-ulnokv5h94loanmj3pd8t8ud6kc72ov5.apps.googleusercontent.com';

let selectedUserType = null;

function handleCredentialResponse(response) {
    const idToken = response.credential;
    fetch(`${window.API_BASE_URL}/auth/google-sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            google_id_token: idToken,
            user_type: selectedUserType
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status_code == 200) {
                alert(data.message);
                document.cookie = `accessToken=${data.access_token}; ${cookieOptions}`;
                document.cookie = `refreshToken=${data.refresh_token}; ${cookieOptions}`;
                document.cookie = `tokenType=${data.token_type}; ${cookieOptions}`;
                window.location.href = window.DASHBOARD_URL;
            }
            else if (data.status_code == 400) {
                alert(data.message);
            }
            else if (data.status_code == 500) {
                alert(data.message);
            }
            else {
                alert('An unexpected error occurred. Please try again later.');
            }
        })
}

window.onload = () => {

    const types = document.querySelectorAll('.type');
    const overlay = document.getElementById('google-sign-in-overlay');

    overlay.addEventListener('click', (e) => {
        if (!selectedUserType) {
            e.stopPropagation();
            alert("Please select a User Type before signing in.");
        }
    });

    types.forEach(type => {
        type.addEventListener('click', () => {
            if (type.classList.contains('active')) {
                type.classList.remove('active');
                selectedUserType = null;
                overlay.style.display = 'block';
            } else {
                types.forEach(t => t.classList.remove('active'));
                type.classList.add('active');
                selectedUserType = type.innerText.trim();
                overlay.style.display = 'none';
            }
        });
    });

    google.accounts.id.initialize({
        client_id: OUR_CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { type: 'standard' }
    );

};

const signInScheduleMeetBtn = document.getElementById('sign-in-schedule-a-meet-btn');
signInScheduleMeetBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});