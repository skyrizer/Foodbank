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
    try {

        $requestData = json_decode(file_get_contents("php://input"), true);

        // Check if the email and password are set in the POST request
        if (isset($requestData['email']) && isset($requestData['password'])) {
            $email = $requestData['email'];
            $password = $requestData['password'];

            // Check if the email already exists
			$stmt = $db->prepare("SELECT * FROM users WHERE email=:email AND password=:password");

        
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            if ($stmt->rowCount()  > 0) {

                $userData = $stmt->fetch(PDO::FETCH_ASSOC);
                http_response_code(200);
				$response = [
					'id' => $userData['id'],
					'name' => $userData['name'],
					'email' => $userData['email'],
					'password' => $userData['password'],
					'phone_no' => $userData['phone_no'],
					'matric_no' => $userData['matric_no'],
					'cafe_id' => $userData['cafe_id'],
					'role_id' => $userData['role_id']
					
				];
            } else {
                http_response_code(401);  // Unauthorized
                $response = [
                    'error' => "Invalid email or password."
                ];
            }
        } else {
            http_response_code(400);  // Bad Request
            $response = [
                'error' => "Email and password are required."
            ];
        }
    } catch (Exception $ee) {
        http_response_code(500);
        $response->error = "Error occurred " . $ee->getMessage();
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {

    // Handle GET requests

} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {

    // Handle PUT requests

}

// Before sending the JSON response, set the content type header
header('Content-Type: application/json');

// Then send the JSON response
echo json_encode($response);
exit();
?>