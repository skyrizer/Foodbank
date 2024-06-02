<?php

$hostname = "localhost";
$database = "foodbank";
$username = "root";
$password = "Wafir@020304";

$db = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

// initial response code
// response code will be changed if the request goes into any of the processes
http_response_code(404);
$response = new stdClass();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the request body
    $requestData = json_decode(file_get_contents("php://input"), true);

    // Check the "action" parameter to determine which POST request to handle
    if (isset($requestData['action'])) {
        switch ($requestData['action']) {
            case 'registerAdmin':
                try {

                    // Prepare the SQL statement for login
                    $name = isset($requestData['name']) ? $requestData['name'] : null;
                    $email = isset($requestData['email']) ? $requestData['email'] : null;
                    $password = isset($requestData['password']) ? $requestData['password'] : null;
                    $phone_no = isset($requestData['phone_no']) ? $requestData['phone_no'] : null;
                    $matric_no = null;
                    $cafe_id = isset($requestData['cafe_id']) ? $requestData['cafe_id'] : null;
                    $role_id = 1;
            
                    // Prepare the SQL statement for registration
                    $stmt = $db->prepare("INSERT INTO users (name, email, password, phone_no, matric_no, cafe_id, role_id) VALUES (:name, :email, :password, :phone_no, :matric_no, :cafe_id, :role_id)");
            
                    // Bind parameters
                    $stmt->bindParam(':name', $name);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $password);
                    $stmt->bindParam(':phone_no', $phone_no);
                    $stmt->bindParam(':matric_no', $matric_no);
                    $stmt->bindParam(':cafe_id', $cafe_id);
                    $stmt->bindParam(':role_id', $role_id);
            
                    // Execute the statement
                    $stmt->execute();
            
                    // Check if the registration was successful
                    if ($stmt->rowCount() > 0) {
                        // Registration successful
                        http_response_code(201); // Created
                        $response->message = "Registered successfully.";
                    } else {
                        // Registration failed
                        http_response_code(500); // Internal Server Error
                        $response->error = "Failed to register user.";
                    }
                } catch (Exception $ee) {
                    http_response_code(500);
                    $response->error = "Error occurred " . $ee->getMessage();
                }
                break;

            case 'registerStudent':
                try {

                    // Prepare the SQL statement for login
                    $name = isset($requestData['name']) ? $requestData['name'] : null;
                    $email = isset($requestData['email']) ? $requestData['email'] : null;
                    $password = isset($requestData['password']) ? $requestData['password'] : null;
                    $phone_no = isset($requestData['phone_no']) ? $requestData['phone_no'] : null;
                    $matric_no = isset($requestData['matric_no']) ? $requestData['matric_no'] : null;
                    $cafe_id = isset($requestData['cafe_id']) ? $requestData['cafe_id'] : null;
                    $role_id = 3;
            
                    // Prepare the SQL statement for registration
                    $stmt = $db->prepare("INSERT INTO users (name, email, password, phone_no, matric_no, cafe_id, role_id) VALUES (:name, :email, :password, :phone_no, :matric_no, :cafe_id, :role_id)");
            
                    // Bind parameters
                    $stmt->bindParam(':name', $name);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $password);
                    $stmt->bindParam(':phone_no', $phone_no);
                    $stmt->bindParam(':matric_no', $matric_no);
                    $stmt->bindParam(':cafe_id', $cafe_id);
                    $stmt->bindParam(':role_id', $role_id);
            
                    // Execute the statement
                    $stmt->execute();
            
                    // Check if the registration was successful
                    if ($stmt->rowCount() > 0) {
                        // Registration successful
                        http_response_code(201); // Created
                        $response->message = "Registered successfully.";
                    } else {
                        // Registration failed
                        http_response_code(500); // Internal Server Error
                        $response->error = "Failed to register user.";
                    }
                } catch (Exception $ee) {
                    http_response_code(500);
                    $response->error = "Error occurred " . $ee->getMessage();
                }
                break;

                case 'registerCafeOwner':
                    try {
    
                        // Prepare the SQL statement for login
                        $name = isset($requestData['name']) ? $requestData['name'] : null;
                        $email = isset($requestData['email']) ? $requestData['email'] : null;
                        $password = isset($requestData['password']) ? $requestData['password'] : null;
                        $phone_no = isset($requestData['phone_no']) ? $requestData['phone_no'] : null;
                        $matric_no = null;
                        $cafe_id = isset($requestData['cafe_id']) ? $requestData['cafe_id'] : null;
                        $role_id = 2;
                
                        // Prepare the SQL statement for registration
                        $stmt = $db->prepare("INSERT INTO users (name, email, password, phone_no, matric_no, cafe_id, role_id) VALUES (:name, :email, :password, :phone_no, :matric_no, :cafe_id, :role_id)");
                
                        // Bind parameters
                        $stmt->bindParam(':name', $name);
                        $stmt->bindParam(':email', $email);
                        $stmt->bindParam(':password', $password);
                        $stmt->bindParam(':phone_no', $phone_no);
                        $stmt->bindParam(':matric_no', $matric_no);
                        $stmt->bindParam(':cafe_id', $cafe_id);
                        $stmt->bindParam(':role_id', $role_id);
                
                        // Execute the statement
                        $stmt->execute();
                
                        // Check if the registration was successful
                        if ($stmt->rowCount() > 0) {
                            // Registration successful
                            http_response_code(201); // Created
                            $response->message = "Registered successfully.";
                        } else {
                            // Registration failed
                            http_response_code(500); // Internal Server Error
                            $response->error = "Failed to register user.";
                        }
                    } catch (Exception $ee) {
                        http_response_code(500);
                        $response->error = "Error occurred " . $ee->getMessage();
                    }
                    break;

            // Add more cases for additional POST requests as needed

            default:
                http_response_code(400);  // Bad Request
                $response->error = "Invalid action parameter.";
                break;
        }
    } else {
        http_response_code(400);  // Bad Request
        $response->error = "Action parameter is required.";
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Handle GET requests
} elseif ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // Handle PUT requests
}

// Before sending the JSON response, set the content type header
header('Content-Type: application/json');

// Then send the JSON response
echo json_encode($response);
exit();
?>
