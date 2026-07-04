/* ══════════════════════════════════════
   CONTACTO — contacto.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ctcForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.ctc-submit');

    // Estado de carga con spinner
    btn.innerHTML = `<span class="spinner"></span> Enviando...`;
    btn.disabled = true;

    // Recopilar datos del formulario
    const datos = new FormData();
    datos.append('nombre',   form.querySelector('input[type="text"]').value);
    datos.append('empresa',  form.querySelectorAll('input[type="text"]')[1].value);
    datos.append('email',    form.querySelector('input[type="email"]').value);
    datos.append('telefono', form.querySelector('input[type="tel"]').value);
    datos.append('servicio', form.querySelector('select').value);
    datos.append('mensaje',  form.querySelector('textarea').value);

    try {
      // Enviar al PHP
      const respuesta = await fetch('php/enviar.php', {
        method: 'POST',
        body: datos
      });

      const resultado = await respuesta.json();

      const wrap = document.querySelector('.ctc-form-wrap');

      if (resultado.success) {
        // Éxito
        wrap.innerHTML = `
          <div class="ctc-success show">
            <div class="ctc-success-icon">✅</div>
            <h3>¡Mensaje enviado!</h3>
            <p>Nos pondremos en contacto a la brevedad.<br/>También podés escribirnos por WhatsApp.</p>
            <br/>
            <a href="https://wa.me/5491167197817" target="_blank" class="btn-primary" style="margin:0 auto;display:inline-flex;">
              Ir a WhatsApp <span>→</span>
            </a>
          </div>
        `;
      } else {
        // Error del servidor
        btn.textContent = 'Enviar mensaje →';
        btn.disabled = false;
        mostrarError(form, resultado.message);
      }

    } catch (error) {
      // Error de red
      btn.textContent = 'Enviar mensaje →';
      btn.disabled = false;
      mostrarError(form, 'No se pudo conectar. Intentá por WhatsApp.');
    }
  });

  function mostrarError(form, mensaje) {
    // Eliminar error anterior si existe
    const anterior = form.querySelector('.ctc-error');
    if (anterior) anterior.remove();

    const div = document.createElement('div');
    div.className = 'ctc-error';
    div.style.cssText = `
      color: #e07070;
      font-size: 0.82rem;
      padding: 0.8rem 1rem;
      background: rgba(224,112,112,0.08);
      border: 1px solid rgba(224,112,112,0.2);
      border-radius: 4px;
      margin-top: 0.5rem;
    `;
    div.textContent = mensaje;
    form.appendChild(div);
  }
});