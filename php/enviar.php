<?php
/* ══════════════════════════════════════
   SAVINI STUDIO — enviar.php
   Recibe el formulario y envía el email
══════════════════════════════════════ */

// Solo acepta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// ── Configuración ──────────────────────
$destinatario = 'consultas@estudiosavini.com.ar'; // email donde llegan los mensajes
$asunto_base  = 'Nuevo contacto desde Savini Studio';
// ───────────────────────────────────────

// Función para limpiar los datos recibidos
function limpiar($dato) {
    return htmlspecialchars(strip_tags(trim($dato)));
}

// Recibir y limpiar campos
$nombre   = limpiar($_POST['nombre']   ?? '');
$empresa  = limpiar($_POST['empresa']  ?? '');
$email    = limpiar($_POST['email']    ?? '');
$telefono = limpiar($_POST['telefono'] ?? '');
$servicio = limpiar($_POST['servicio'] ?? '');
$mensaje  = limpiar($_POST['mensaje']  ?? '');

// Validaciones básicas
if (empty($nombre) || empty($email) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Completá los campos obligatorios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El email no es válido.']);
    exit;
}

// Armar el cuerpo del email
$cuerpo = "
========================================
NUEVO CONTACTO — SAVINI STUDIO
========================================

Nombre:   $nombre
Empresa:  $empresa
Email:    $email
Teléfono: $telefono
Servicio: $servicio

Mensaje:
$mensaje

========================================
";

// Headers del email
$headers  = "From: no-reply@estudiosavini.com.ar\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar
$enviado = mail($destinatario, $asunto_base . " - $nombre", $cuerpo, $headers);

if ($enviado) {
    echo json_encode(['success' => true, 'message' => '¡Mensaje enviado correctamente!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Hubo un error al enviar. Intentá por WhatsApp.']);
}