import { showBtnPreLoader } from "./pre-loader.js";

const contactUsScheduleAMeetBtn = document.getElementById("contact-us-schedule-a-meet-btn");
contactUsScheduleAMeetBtn.addEventListener("click", () => {
    window.location.href = "schedule-a-meet.html";
});

const contactUsSubmitButton = document.getElementById("contact-us-submit-button");
contactUsSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const contactUsFormData = getDataFromContactUsForm();
    if (!contactUsFormData) {
        return;
    }
    sendDataToServer(contactUsFormData);
});

function getDataFromContactUsForm() {
    const name = document.getElementById("contact-us-name").value;
    if (!name) {
        alert("Please enter your name.");
        return;
    }
    const email = document.getElementById("contact-us-email").value;
    if (!email) {
        alert("Please enter your email.");
        return;
    }
    const subject = document.getElementById("contact-us-subject").value;
    if (!subject) {
        alert("Please enter the subject.");
        return;
    }
    const message = document.getElementById("contact-us-message").value;
    if (!message) {
        alert("Please enter your message.");
        return;
    }
    return {
        name: name,
        email: email,
        subject: subject,
        message: message
    }
}

async function sendDataToServer(data) {
    try {
        showBtnPreLoader(contactUsSubmitButton, true, '');
        const response = await fetch('/contact-us', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                alert("Your message has been sent successfully!");
            })
            .catch((error) => {
                alert("There was an error sending your message. Please try again later.");
            })
    } catch (error) { }
    finally {
        showBtnPreLoader(contactUsSubmitButton, false, "SEND <i class='bx  bx-arrow-right-stroke'  ></i>");
    }
}
