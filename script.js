// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Tooltip activation
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach((t) => new bootstrap.Tooltip(t));

// AOS animation
AOS.init();

// GSAP animations
gsap.from("#hero-name", {
  y: -50,
  opacity: 0,
  duration: 1.75,
  ease: "power2.out",
});
gsap.from(".lead", {
  delay: 0.5,
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});