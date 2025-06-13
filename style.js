const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach(t => new bootstrap.Tooltip(t));
gsap.from(".lead", {
  delay: 0.5,
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

