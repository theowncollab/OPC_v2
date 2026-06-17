import { showBtnPreLoader } from "./pre-loader.js";

const scheduleAMeetSignInBtn = document.getElementById("schedule-a-meet-sign-in-btn");
scheduleAMeetSignInBtn.addEventListener("click", () => {
    window.location.href = "sign-in.html";
});

async function fetchAvailableTimeSlots(selectedDate) {
    try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`${window.GSCRIPT_URL}?date=${formattedDate}`);
        const data = await response.json();
        if (data.status === "success") {
            await populateTimeSlots(data.slots);
        } else {
            console.error("Backend returned an error:", data.message);
        }
    } catch (error) {
        console.error("Critical failure fetching time slots:", error);
    }
}

async function populateTimeSlots(timeSlots) {
    const timeInput = document.getElementById("time");
    timeInput.innerHTML = '<option value="" disabled selected>Select Time Slot *</option>';

    if (timeSlots.length === 0) {
        timeInput.innerHTML = '<option value="" disabled selected>No slots available</option>';
        return;
    }

    timeSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = JSON.stringify({ start: slot.startValue, end: slot.endValue });
        const localTime = new Date(slot.startValue);
        option.textContent = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeInput.appendChild(option);
    });
}

const dateInput = document.getElementById("date");
dateInput.addEventListener("change", async () => {
    const selectedDate = new Date(dateInput.value);
    await fetchAvailableTimeSlots(selectedDate);
});

function scheduleMeetFormData() {
    const nameInput = document.getElementById("name").value;
    if (!nameInput) {
        alert("Please enter your name.");
        return null;
    }

    const emailInput = document.getElementById("email").value;
    if (!emailInput) {
        alert("Please enter your email.");
        return null;
    }

    const userTypeSelect = document.getElementById("type").value;
    if (!userTypeSelect) {
        alert("Please select a user type.");
        return null;
    }

    const dateInput = document.getElementById("date").value;
    if (!dateInput) {
        alert("Please select a date.");
        return null;
    }

    const timeInput = document.getElementById("time").value;
    if (!timeInput) {
        alert("Please select a time.");
        return null;
    }

    const selectedSlot = JSON.parse(timeInput);

    return {
        name: nameInput,
        email: emailInput,
        userType: userTypeSelect,
        startDateTime: selectedSlot.start,
        endDateTime: selectedSlot.end
    };
}

async function sendScheduleMeetToServer(formData) {
    try {
        showBtnPreLoader(scheduleFormBtn, true, '');

        const response = await fetch(`${window.GSCRIPT_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(formData),
            redirect: "follow"
        });

        const data = await response.json();
        if (data.status === "success") {
            alert(`${data.message}\nWe have sent an invite to your email!`);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("type").value = "";
            document.getElementById("date").value = "";
            document.getElementById("time").innerHTML = '<option value="" disabled selected>Select Time Slot *</option>';
        } else {
            alert(`Booking failed: ${data.message}`);
        }
    } catch (error) {
        console.error("Error scheduling meet:", error);
        alert("An error occurred while scheduling the meet. Please try again later.");
    } finally {
        showBtnPreLoader(scheduleFormBtn, false, "SCHEDULE THE MEET <i class='bx bx-arrow-right-stroke'></i>");
    }
}

const scheduleFormBtn = document.getElementById("schedule-meet-form-btn");
scheduleFormBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = scheduleMeetFormData();
    if (!formData) return;
    await sendScheduleMeetToServer(formData);
});