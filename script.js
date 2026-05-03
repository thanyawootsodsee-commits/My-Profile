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

