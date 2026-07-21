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
        indexLinks.forEach(l => l.style.color = '');
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

/* ── MÁS INFO expandible ── */
document.querySelectorAll('.btn-mas-info').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const panel = document.getElementById(targetId);
    const isOpen = panel.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.srv-mas-info').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.btn-mas-info').forEach(b => {
      b.classList.remove('open');
      b.querySelector('span').style.transform = '';
    });

    // Abrir el clickeado si estaba cerrado
    if (!isOpen) {
      panel.classList.add('open');
      btn.classList.add('open');
      btn.querySelector('span').style.transform = 'rotate(180deg)';
    }
  });
});