const form = document.getElementById("serviceForm");
const popup = document.getElementById("popup");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // Get values
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const date = form.date.value.trim();

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[1-9][0-9]{9}$/;

  // Validate email
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate phone
  if (!phonePattern.test(phone)) {
    alert("Please enter a valid phone number ");
    return;
  }
  if (!email.endsWith('.com')) {
        alert('Email must end with ".com".');
        return;
    }

  // ✅ Validate year
  if (date) {
    const parsedDate = new Date(date);
    const selectedYear = parsedDate.getFullYear();
    const currentYear = new Date().getFullYear();

    if (selectedYear < currentYear) {
      alert(`Please select a year that is ${currentYear} or later.`);
      return;
    }
  } else {
    alert("Please select a valid date.");
    return;
  }

  // Prepare data and send to server
  const formData = new FormData(form);
  const res = await fetch("/submit_form", {
    method: "POST",
    body: formData
  });
  const result = await res.json();

  if (result.status === "success") {
    popup.style.display = "flex";
    popup.classList.add("show");
  } else {
    alert("Failed to send. Try again later.");
  }
});
    function closePopup() {
     popup.classList.remove("show");
      form.reset();
    }
    flatpickr("#datepicker", {
    dateFormat: "d-M-Y" // Example: 11-Jul-2025
  });
  flatpickr("#timepicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",  // 03:45 PM format
    time_24hr: false      // Set to true for 24-hour format like 15:45
  });
  function restrictNameInput(inputField, fieldName) {
    inputField.addEventListener("input", function (e) {
      const originalValue = inputField.value;
      const cleanedValue = originalValue.replace(/[^a-zA-Z\s]/g, ""); // allow only letters and spaces

      if (originalValue !== cleanedValue) {
        alert(`${fieldName} should only contain letters.`);
        inputField.value = cleanedValue;
      }
    });
  }

  // Get name fields
  const firstNameInput = document.querySelector('input[name="fname"]');
  const lastNameInput = document.querySelector('input[name="lname"]');

  // Apply restriction
  restrictNameInput(firstNameInput, "First name");
  restrictNameInput(lastNameInput, "Last name");