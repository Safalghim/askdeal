<?php
session_start();
require 'db_connect.php';

$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $stmt = $conn->prepare("SELECT id, order_date, total_amount FROM orders WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $orders_result = $stmt->get_result();
    $orders = [];

    while ($order = $orders_result->fetch_assoc()) {
        $stmt_items = $conn->prepare("SELECT product_name, price, quantity FROM order_items WHERE order_id = ?");
        $stmt_items->bind_param("i", $order['id']);
        $stmt_items->execute();
        $items_result = $stmt_items->get_result();
        $order['items'] = $items_result->fetch_all(MYSQLI_ASSOC);
        $orders[] = $order;
    }

    echo json_encode($orders);
} else {
    echo json_encode([]);
}
?>
