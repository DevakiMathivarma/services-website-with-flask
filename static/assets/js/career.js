document.getElementById("careerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = document.getElementById("careerForm");
  const formData = new FormData(form);

  const name = form.querySelector('input[name="full_name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const phone = form.querySelector('input[name="phone"]').value.trim();
  const resume = form.querySelector('input[name="resume"]').files[0];

  const namePattern = /^[A-Za-z\s]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  // --- Validation ---
  if (!namePattern.test(name)) {
    alert("Full name must contain only letters and spaces.");
    return;
  }

  if (!emailPattern.test(email) || !email.toLowerCase().endsWith(".com")) {
    alert("Please enter a valid email address ending with .com.");
    return;
  }

  if (!phonePattern.test(phone)) {
    alert("Phone number must be exactly 10 digits (no symbols or spaces).");
    return;
  }

  if (!resume) {
    alert("Please upload your resume.");
    return;
  }

  if (resume.type !== "application/pdf") {
    alert("Only PDF files are allowed. You selected: ." + resume.name.split(".").pop());
    return;
  }

  if (resume.size > 10 * 1024 * 1024) {
    alert("Maximum file size is 10 MB.");
    return;
  }

  // --- Submit Form with Fetch ---
  fetch("/submit_career", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        document.getElementById("popup").style.display = "flex";
        form.reset();
        document.querySelector(".btn-upload").innerText = "Upload Resume";
      } else {
        alert("Something went wrong. Please try again later.");
      }
    })
    .catch((error) => {
      console.error("Submission failed", error);
      alert("Error submitting application.");
    });
});

// --- Resume File Validation and Filename Display ---
document.getElementById("resume").addEventListener("change", function () {
  const file = this.files[0];
  const maxSizeMB = 10;

  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension !== 'pdf') {
      alert('Only PDF files are allowed. You selected: .' + fileExtension);
      this.value = '';
      document.querySelector('.btn-upload').innerText = 'Upload Resume';
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert('Maximum file size is 10 MB.');
      this.value = '';
      document.querySelector('.btn-upload').innerText = 'Upload Resume';
      return;
    }

    document.querySelector('.btn-upload').innerText = file.name;
  }
});
function validateEmail(e) {
    e.preventDefault(); // Prevent form reload

    const emailInput = document.getElementById('sub-email');
    const email = emailInput.value.trim();

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert('Please enter an email address.');
    } else if (!emailPattern.test(email)) {
      alert('Invalid email address.');
    } else if (!email.toLowerCase().endsWith('.com')) {
      alert('Email must end with ".com".');
    } else {
      alert('Thank you for subscribing!');
      emailInput.value = ''; // ✅ Clear the input field
    }
  }
  