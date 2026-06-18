/* ══════════════════════════════════════
   SERVICIOS — servicios.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Scroll reveal de cada servicio
  const items = document.querySelectorAll('.srv-item');
  if (items.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
  }

  // Índice activo al hacer scroll
  const sections = document.querySelectorAll('.srv-item[id]');
  const indexLinks = document.querySelectorAll('.srv-index a');

const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Limpia todos
        indexLinks.forEach(l => {
          l.style.color = '';
          l.style.borderBottomColor = '';
        });
        // Marca solo el activo
        const active = document.querySelector(`.srv-index a[href="#${entry.target.id}"]`);
        if (active) {
          active.style.color = 'var(--green)';
          active.style.borderBottomColor = 'var(--green)';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => spy.observe(s));

});