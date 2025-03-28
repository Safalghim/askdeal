<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debugging: Check if POST request is received
    if (!isset($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {
        http_response_code(400);
        echo "Bad Request: Missing fields.";
        exit;
    }

    // Retrieve and sanitize form data
    $name = trim(htmlspecialchars($_POST['name']));
    $email = trim(htmlspecialchars($_POST['email']));
    $subject = trim(htmlspecialchars($_POST['subject']));
    $message = trim(htmlspecialchars($_POST['message']));

    // Validate inputs
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "All fields are required.";
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // Email recipient (change to your support email)
    $to = "support@askdeal.com";  

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Email body
    $fullMessage = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Send email
    if (mail($to, $subject, $fullMessage, $headers)) {
        http_response_code(200);
        echo "Message sent successfully.";
    } else {
        http_response_code(500);
        echo "Failed to send message. Please try again.";
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo "405 Method Not Allowed";
}
?>
