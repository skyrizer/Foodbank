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
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    $requestData = json_decode(file_get_contents("php://input"), true);

    switch ($action) {
        case 'addRequest':
        
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
    $user_id = isset($_GET['userId']) ? $_GET['userId'] : '';

    switch ($action) {
        case 'donationRequestByUser':
            // Handle totalDonations action
            try {
                $stmt = $db->prepare("SELECT c.name AS cafe_name,d.name AS donation_name, r.dateTime 
                                        FROM requests r 
                                        JOIN donations d ON r.donation_id = d.id 
                                        JOIN cafes c ON d.cafe_id = c.id
                                        WHERE r.user_id = :userId");
                $stmt->bindParam(':userId', $user_id);                        
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 

                http_response_code(200);  // OK
                $response->donationRequestByUser = $result;
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