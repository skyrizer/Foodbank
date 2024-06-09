<?php

$hostname = "localhost";
$database = "foodbank";
$username = "root";
$password = "Wafir@2259";

$db = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

// initial response code
// response code will be changed if the request goes into any of the processes

http_response_code(404);
$response = new stdClass();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    $requestData = json_decode(file_get_contents("php://input"), true);

    switch ($action) {
        case 'addCafe':
            // Handle addCafe action
            try {
                if (isset($requestData['name'])) {
                    $name = $requestData['name'];

                    $stmt = $db->prepare("INSERT INTO cafes (name) VALUES (:name)");
                    $stmt->bindParam(':name', $name);
                    $stmt->execute();

                    http_response_code(200);  // Created
                    $response->message = "Cafe added successfully.";
                } else {
                    http_response_code(400);  // Bad Request
                    $response->error = "Name is required.";
                }
            } catch (Exception $ee) {
                http_response_code(500);
                $response->error = "Error occurred " . $ee->getMessage();
            }
            break;

        case 'addOwner':
            // Handle addOwner action
            break;

        // Add more cases for other POST actions

        default:
            http_response_code(404);  // Not Found
            $response->error = "Action not found.";
            break;
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Handle GET requests
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    $roleId = isset($_GET['roleId']) ? $_GET['roleId'] : '';

    switch ($action) {
        case 'totalStudent':
            // Handle totalCafe action
            try {
                $stmt = $db->prepare("SELECT COUNT(*) as total FROM users WHERE role_id = :roleId");
                $stmt->bindParam(':roleId', $roleId);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $totalStudents = $result['total'];

                http_response_code(200);  // OK
                $response->totalStudent = $totalStudents;
            } catch (Exception $ee) {
                http_response_code(500);
                $response->error = "Error occurred " . $ee->getMessage();
            }
            break;

        case 'studentList':
            // Handle totalCafe action
            try {
                $stmt = $db->prepare("SELECT * FROM users WHERE role_id = :roleId");
                $stmt->bindParam(':roleId', $roleId);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
                
                http_response_code(200);  // OK
                $response->students = $result;
            } catch (Exception $ee) {
                http_response_code(500);
                $response->error = "Error occurred " . $ee->getMessage();
            }
            break;


        default:
            http_response_code(404);  // Not Found
            $response->error = "Action not found.";
            break;
    }

} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Handle PUT requests

}

// Before sending the JSON response, set the content type header
header('Content-Type: application/json');

// Then send the JSON response
echo json_encode($response);
exit();
?>