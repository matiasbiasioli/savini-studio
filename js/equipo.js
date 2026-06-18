/* ══════════════════════════════════════
   EQUIPO — equipo.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const miembros = document.querySelectorAll('.miembro');
  if (!miembros.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  miembros.forEach(m => observer.observe(m));
});