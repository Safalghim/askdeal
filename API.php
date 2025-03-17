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

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        readRecords($conn);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        createRecord($conn, $data['name'], $data['email']);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        updateRecord($conn, $data['id'], $data['name'], $data['email']);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        deleteRecord($conn, $data['id']);
        break;
    default:
        echo json_encode(["message" => "Method not supported"]);
        break;
}

// Functions for CRUD operations
function createRecord($conn, $name, $email) {
    $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "New record created successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function readRecords($conn) {
    $sql = "SELECT id, name, email FROM users";
    $result = $conn->query($sql);
    $data = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
}

function updateRecord($conn, $id, $name, $email) {
    $sql = "UPDATE users SET name='$name', email='$email' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record updated successfully"]);
    } else {
        echo json_encode(["message" => "Error updating record: " . $conn->error]);
    }
}

function deleteRecord($conn, $id) {
    $sql = "DELETE FROM users WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record deleted successfully"]);
    } else {
        echo json_encode(["message" => "Error deleting record: " . $conn->error]);
    }
}

// Close connection
$conn->close();
?>