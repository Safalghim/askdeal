<?php
session_start();
require 'db_connect.php'; // Include your database connection

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Assuming user is logged in and user ID is stored in session
$user_id = $_SESSION['user_id'] ?? null;

if ($user_id && $data) {
    $stmt = $conn->prepare("INSERT INTO wishlist (user_id, product_name, price, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isds", $user_id, $data['productName'], $data['price'], $data['imageUrl']);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
