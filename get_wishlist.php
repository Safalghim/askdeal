<?php
session_start();
require 'db_connect.php';

$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $stmt = $conn->prepare("SELECT product_name, price, image_url FROM wishlist WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $wishlist = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($wishlist);
} else {
    echo json_encode([]);
}
?>
