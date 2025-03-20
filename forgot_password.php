<?php
require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $new_password = trim($_POST["psw"]);
    $confirm_password = trim($_POST["psw-repeat"]);

    if ($new_password !== $confirm_password) {
        echo "<script>alert('Passwords do not match!');</script>";
    } else {
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
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password</title>
</head>
<body>
    <h2>Reset Password</h2>
    <form action="forgot_password.php" method="post">
        <input type="text" placeholder="Enter Email Address" name="email" required>
        <input type="password" placeholder="Enter New Password" name="psw" required>
        <input type="password" placeholder="Confirm New Password" name="psw-repeat" required>
        <button type="submit">Reset Password</button>
    </form>
</body>
</html>
