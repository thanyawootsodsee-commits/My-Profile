// ======= DARK MODE =======
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
}

// ======= SCROLL NAV HIGHLIGHT =======
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ======= CONTACT FORM =======
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name    = document.getElementById("name");
  const email   = document.getElementById("email");
  const message = document.getElementById("message");
  const success = document.getElementById("form-success");

  let isValid = true;

  function showError(input, errorId, msg) {
    document.getElementById(errorId).textContent = msg;
    input.classList.add("invalid");
    isValid = false;
  }

  function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("invalid");
  }

  if (name.value.trim() === "") {
    showError(name, "name-error", "Name is required");
  } else {
    clearError(name, "name-error");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, "email-error", "Enter a valid email address");
  } else {
    clearError(email, "email-error");
  }

  if (message.value.trim().length < 10) {
    showError(message, "message-error", "Message must be at least 10 characters");
  } else {
    clearError(message, "message-error");
  }

  if (isValid) {
    form.reset();
    success.style.display = "block";
    setTimeout(() => { success.style.display = "none"; }, 4000);
  }
});

// ======= SCROLL REVEAL =======
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));