/* ═══════════════════════════════════════════
   SAVINI STUDIO — main.js
═══════════════════════════════════════════ */

/*  NAV BURGER (mobile) */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar al hacer click en un link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
    });
  });
}

/*  NODE DIAGRAM (Canvas) */
function initNodeDiagram() {
  const canvas = document.getElementById('nodeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let W, H, cx, cy, radius;

  function resize() {
    const parent = canvas.parentElement;
    W = parent.offsetWidth;
    H = parent.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    cx = W / 2;
    cy = H / 2;
    radius = Math.min(W, H) * 0.37;
  }

  const GREEN      = '#1db87a';
  const GREEN_DIM  = 'rgba(29,184,122,0.18)';
  const GREEN_FAINT= 'rgba(29,184,122,0.06)';

  // Particles
  const particles = Array.from({ length: 7 }, (_, i) => ({
    angle: (i / 7) * Math.PI * 2,
    speed: 0.004 + Math.random() * 0.003,
    progress: Math.random(),
    orbitIndex: i,
  }));

  let tick = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = GREEN_DIM;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.52, 0, Math.PI * 2);
    ctx.strokeStyle = GREEN_FAINT;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center glow
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
    glowGrad.addColorStop(0, 'rgba(29,184,122,0.18)');
    glowGrad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Spokes + particles
    const angles = [0, 51, 102, 153, 204, 255, 306].map(d => (d - 90) * Math.PI / 180);

    angles.forEach((angle, i) => {
      const sx = cx + Math.cos(angle) * radius;
      const sy = cy + Math.sin(angle) * radius;

      // Spoke line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.strokeStyle = 'rgba(29,184,122,0.10)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Animated particle along spoke
      particles[i].progress += particles[i].speed;
      if (particles[i].progress > 1) particles[i].progress = 0;

      const p = particles[i].progress;
      const px = cx + Math.cos(angle) * radius * p;
      const py = cy + Math.sin(angle) * radius * p;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(29,184,122,${0.6 * (1 - p * 0.5)})`;
      ctx.fill();
    });

    // Pulse ring
    const pulseR = radius * (0.7 + 0.1 * Math.sin(tick * 0.03));
    ctx.beginPath();
    ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(29,184,122,${0.04 + 0.03 * Math.sin(tick * 0.03)})`;
    ctx.lineWidth = 8;
    ctx.stroke();

    tick++;
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { resize(); });
}

/* ── SATELLITE NODE POSITIONING ── */
function positionSatellites() {
  const diagram = document.getElementById('heroDiagram');
  if (!diagram) return;

  const sats = diagram.querySelectorAll('.node-satellite');
  const angles = [0, 51, 102, 153, 204, 255, 306];

  sats.forEach((sat, i) => {
    const angleDeg = angles[i] - 90;
    const angleRad = angleDeg * Math.PI / 180;
    const w = diagram.offsetWidth;
    const r = w * 0.37;
    const x = 50 + (Math.cos(angleRad) * r / w * 100);
    const y = 50 + (Math.sin(angleRad) * r / w * 100);
    sat.style.left = x + '%';
    sat.style.top  = y + '%';
    sat.style.transform = 'translate(-50%, -50%)';
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.pain-card, .service-card, .comp-card, .nexo-content, .nexo-visual'
  );
  els.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

/* ── NAV ACTIVE LINK (scroll spy lite) */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href*="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ──  ACORDEÓN ── */
function initAccordion() {
  const items = document.querySelectorAll('.acc-item');
  if (!items.length) return;

  function updateToggleText(item) {
    const text = item.querySelector('.acc-toggle-text');
    if (!text) return;
    text.textContent = item.classList.contains('acc-open') ? 'Cerrar' : 'Ver';
  }

  items.forEach(item => {
    updateToggleText(item); // estado inicial
    const header = item.querySelector('.acc-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('acc-open');
      // Cerrar todos
      items.forEach(i => {
        i.classList.remove('acc-open');
        updateToggleText(i);
      });
      // Abrir el clickeado si estaba cerrado
      if (!isOpen) {
        item.classList.add('acc-open');
        updateToggleText(item);
      }
    });
  });
}

/* ── TABS ── */
function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add('active');
    });
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  positionSatellites();
  initNodeDiagram();
  initScrollReveal();
  initNavSpy();
  initAccordion();
  initTabs();

  window.addEventListener('resize', positionSatellites);
});