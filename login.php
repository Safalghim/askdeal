<?php
session_start();
require "config.php"; // Database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input_email = trim($_POST["email"]);
    $input_password = trim($_POST["psw"]);

    if (empty($input_email) || empty($input_password)) {
        $error = "Both fields are required!";
    } else {
        // Check if the email exists
        $sql = "SELECT id, email, password FROM users WHERE email = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("s", $input_email);
            $stmt->execute();
            $stmt->store_result();

            // If user exists, fetch data
            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id, $email, $hashed_password);
                $stmt->fetch();

                // Verify password
                if (password_verify($input_password, $hashed_password)) {
                    $_SESSION["loggedin"] = true;
                    $_SESSION["id"] = $id;
                    $_SESSION["email"] = $email;

                    header("Location: dashboard.php");
                    exit();
                } else {
                    $error = "Invalid password!";
                }
            } else {
                $error = "No account found with this email!";
            }
            $stmt->close();
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - ASKDEAL</title>
    <style>
    body { font-family: Arial, sans-serif; }
    .container { width: 30%; margin: auto; padding: 20px; text-align: center; }
    input { width: 100%; padding: 10px; margin: 10px 0; }
    button { background-color: #04AA6D; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>

<h2>Login Form</h2>

<div class="container">
    <?php if (isset($error)) echo "<div style='color: red;'>$error</div>"; ?>

    <form action="login.php" method="post">
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email Address" name="email" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>

        <button type="submit">Login</button>
        <label>
            <input type="checkbox" name="remember"> Remember me
        </label>
    </form>
    
    <p><a href="forgot_password.php">Forgot password?</a></p>
    <p>Don't have an account? <a href="Register.html">Sign Up</a></p>
</div>

</body>
</html>
