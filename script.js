// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Update button label
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Remember the user's choice
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
}

// Grab all sections and nav links
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");

// Listen for scroll events
window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  // Highlight the matching nav link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

});

// Fade in all sections on load
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transition = "opacity 0.6s ease";
});

window.addEventListener("load", () => {
  document.querySelectorAll(".section").forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = "1";
    }, index * 200); // Each section fades in 200ms after the last
  });
});

// Contact form validation
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page from refreshing

  const name    = document.getElementById("name");
  const email   = document.getElementById("email");
  const message = document.getElementById("message");
  const success = document.getElementById("form-success");

  // Reset errors
  let isValid = true;

  function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.classList.add("invalid");
    isValid = false;
  }

  function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("invalid");
  }

  // Validate name
  if (name.value.trim() === "") {
    showError(name, "name-error", "Name is required");
  } else {
    clearError(name, "name-error");
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, "email-error", "Enter a valid email address");
  } else {
    clearError(email, "email-error");
  }

  // Validate message
  if (message.value.trim().length < 10) {
    showError(message, "message-error", "Message must be at least 10 characters");
  } else {
    clearError(message, "message-error");
  }

  // If all valid — show success
  if (isValid) {
    form.reset();
    success.style.display = "block";
    setTimeout(() => {
      success.style.display = "none";
    }, 4000);
  }
});