<?php
require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $new_password = trim($_POST["psw"]);
    $confirm_password = trim($_POST["psw-repeat"]);

    if ($new_password !== $confirm_password) {
        echo "<script>alert('Passwords do not match!');</script>";
        exit();
    }

    // Check if email exists
    $check_user_sql = "SELECT id FROM users WHERE email = ?";
    $check_stmt = $conn->prepare($check_user_sql);
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows === 0) {
        echo "<script>alert('Email not found!');</script>";
        exit();
    }

    // Update password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    $sql = "UPDATE users SET password = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $hashed_password, $email);

    if ($stmt->execute()) {
        echo "<script>alert('Password updated successfully!'); window.location.href='login.php';</script>";
    } else {
        echo "<script>alert('Error updating password. Try again.');</script>";
    }

    $stmt->close();
    $check_stmt->close();
}
?>
