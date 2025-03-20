<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard - ASKDEAL</title>
</head>
<body>
    <h2>Welcome, <?php echo htmlspecialchars($_SESSION["email"]); ?>!</h2>
    <p><a href="logout.php">Logout</a></p>
</body>
</html>
