import { showBtnPreLoader } from "./pre-loader.js";

const registerEventSignInBtn = document.getElementById("register-event-sign-in-btn");
registerEventSignInBtn.addEventListener("click", () => {
    window.location.href = "sign-in.html";
});

function registerEventFormData() {
    const eventName = document.getElementById("event-name").value;
    if (!eventName) {
        alert("Please enter the event name.");
        return;
    }
    const eventStartDate = document.getElementById("event-start-date").value;
    if (!eventStartDate) {
        alert("Please enter the event start date.");
        return;
    }
    const eventEndDate = document.getElementById("event-end-date").value;
    if (!eventEndDate) {
        alert("Please enter the event end date.");
        return;
    }
    const eventOrganizer = document.getElementById("event-organizer").value;
    if (!eventOrganizer) {
        alert("Please enter the event organizer.");
        return;
    }
    const eventLocation = document.getElementById("event-location").value;
    if (!eventLocation) {
        alert("Please enter the event location.");
        return;
    }
    const eventPocEmail = document.getElementById("poc-email").value;
    if (!eventPocEmail) {
        alert("Please enter the point of contact email.");
        return;
    }
    const eventPocName = document.getElementById("poc-name").value;
    if (!eventPocName) {
        alert("Please enter the point of contact name.");
        return;
    }
    const eventPocPhoneNumber = document.getElementById("poc-phone").value;
    if (!eventPocPhoneNumber) {
        alert("Please enter the point of contact phone number.");
        return;
    }

    return {
        name: eventName,
        start_date: eventStartDate,
        end_date: eventEndDate,
        organizer: eventOrganizer,
        location: eventLocation,
        poc_email: eventPocEmail,
        poc_name: eventPocName,
        poc_phone: eventPocPhoneNumber
    }
}

async function sendDataToServer(formData) {
    try {
        showBtnPreLoader(registerEventSubmitBtn, true, '');
        const response = await fetch(`${window.API_BASE_URL}/register-event`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status_code == 200) {
                    alert("Event registered successfully!");
                }
                else if (data.status_code == 400) {
                    alert("Event is already registered. Please check the details and try again.");
                }
                else {
                    alert("An error occurred while registering the event. Please try again later.");
                }
            });
    } catch (error) { }
    finally {
        showBtnPreLoader(registerEventSubmitBtn, false, "REGISTER EVENT <i class='bx  bx-arrow-right-stroke'  ></i>");
    }
}

const registerEventSubmitBtn = document.getElementById("register-event-submit-btn");
registerEventSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = registerEventFormData();
    if (!formData) {
        return;
    }
    sendDataToServer(formData);
});
