<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mobile_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ---------------------- USERS CRUD ----------------------

// Create
function createUser($conn, $name, $email) {
    $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $email);
    $stmt->execute();
    echo $stmt->affected_rows > 0 ? "User created." : "User creation failed.";
    $stmt->close();
}

// Read
function readUsers($conn) {
    $sql = "SELECT id, name, email FROM users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "ID: {$row['id']} - Name: {$row['name']} - Email: {$row['email']}<br>";
        }
    } else {
        echo "No users found.";
    }
}

// Update
function updateUser($conn, $id, $name, $email) {
    $stmt = $conn->prepare("UPDATE users SET name=?, email=? WHERE id=?");
    $stmt->bind_param("ssi", $name, $email, $id);
    $stmt->execute();
    echo $stmt->affected_rows > 0 ? "User updated." : "User update failed.";
    $stmt->close();
}

// Delete
function deleteUser($conn, $id) {
    $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo $stmt->affected_rows > 0 ? "User deleted." : "User deletion failed.";
    $stmt->close();
}

// ---------------------- ORDER HISTORY ----------------------

function addOrder($conn, $userId, $productId, $quantity, $totalPrice, $status = 'Pending') {
    $stmt = $conn->prepare("INSERT INTO order_history (user_id, product_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iiids", $userId, $productId, $quantity, $totalPrice, $status);
    $stmt->execute();
    echo $stmt->affected_rows > 0 ? "Order added." : "Order failed.";
    $stmt->close();
}

function getOrderHistory($conn, $userId) {
    $stmt = $conn->prepare("SELECT * FROM order_history WHERE user_id = ? ORDER BY order_date DESC");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "Order ID: {$row['order_id']} | Product ID: {$row['product_id']} | Quantity: {$row['quantity']} | Total: {$row['total_price']} | Status: {$row['status']}<br>";
    }
    $stmt->close();
}

// ---------------------- WISHLIST ----------------------

function addToWishlist($conn, $userId, $productId) {
    $stmt = $conn->prepare("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $productId);
    $stmt->execute();
    echo $stmt->affected_rows > 0 ? "Added to wishlist." : "Failed to add.";
    $stmt->close();
}

function getWishlist($conn, $userId) {
    $stmt = $conn->prepare("SELECT * FROM wishlist WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "Wishlist ID: {$row['wishlist_id']} | Product ID: {$row['product_id']} | Added: {$row['added_date']}<br>";
    }
    $stmt->close();
}

function removeFromWishlist($conn, $wishlistId) {
    $stmt = $conn->prepare("DELETE FROM wishlist WHERE wishlist_id = ?");
    $stmt->bind_param("i", $wishlistId);
    $stmt->execute();
    echo $stmt->affected_rows > 0 ? "Removed from wishlist." : "Removal failed.";
    $stmt->close();
}

// ---------------------- CONNECTION CLOSE ----------------------
$conn->close();
?>
