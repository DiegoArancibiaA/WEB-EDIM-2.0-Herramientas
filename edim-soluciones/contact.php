<?php
/**
 * EDIM SOLUCIONES - Procesamiento de Formulario de Contacto
 */
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST['telefono'] ?? ''));
    $empresa = htmlspecialchars(trim($_POST['empresa'] ?? ''));
    $asunto = htmlspecialchars(trim($_POST['asunto'] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? ''));

    if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
        $response['message'] = 'Por favor complete todos los campos obligatorios.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Por favor ingrese un correo electronico valido.';
    } else {
        $to = 'contacto@edimsoluciones.com';
        $subject = 'Nuevo mensaje de contacto: ' . $asunto;
        $body = "Nombre: $nombre\n";
        $body .= "Email: $email\n";
        $body .= "Telefono: $telefono\n";
        $body .= "Empresa: $empresa\n";
        $body .= "Asunto: $asunto\n";
        $body .= "Mensaje:\n$mensaje\n";

        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Mensaje enviado correctamente.';
        } else {
            $response['message'] = 'Error al enviar el mensaje. Intente nuevamente.';
        }
    }
} else {
    $response['message'] = 'Metodo no permitido.';
}

echo json_encode($response);
?>
