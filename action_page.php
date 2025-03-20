<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['psw'];

    // Here you can add code to save the data to a database

    echo "Registration successful!";
}
?>