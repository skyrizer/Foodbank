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
        case 'addDonation':
            // Handle addCafe action
            try {
                if (isset($requestData['name']) && isset($requestData['quantity']) &&
                         isset($requestData['cafe_id']) ) {
                        
                    $name = $requestData['name'];
                    $quantity = $requestData['quantity'];
                    $dateTime = date('Y-m-d H:i:s');
                    $cafe_id = $requestData['cafe_id'];

                    $stmt = $db->prepare("INSERT INTO donations (name,quantity,dateTime,cafe_id)
                                             VALUES (:name, :quantity, :dateTime, :cafe_id)");
                                             
                    $stmt->bindParam(':name', $name);
                    $stmt->bindParam(':quantity', $quantity);
                    $stmt->bindParam(':dateTime', $dateTime);
                    $stmt->bindParam(':cafe_id', $cafe_id);
                    $stmt->execute();

                    http_response_code(200);  // Created
                    $response->message = "Donation added successfully.";
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
    $cafeId = isset($_GET['cafeId']) ? $_GET['cafeId'] : '';

    switch ($action) {
        case 'donationList':
            // Handle totalDonations action
            try {
                $stmt = $db->prepare("SELECT * FROM donations WHERE cafe_id=:cafeId");
                $stmt->bindParam(':cafeId', $cafeId);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC); 

                http_response_code(200);  // OK
                $response->donations = $result;
            } catch (Exception $ee) {
                http_response_code(500);
                $response->error = "Error occurred " . $ee->getMessage();
            }
            break;

        case 'dailyFoodDonation':
            // Handle totalCafe action
            try {
                $stmt = $db->prepare("SELECT * FROM donations WHERE cafe_id = :cafeId AND DATE(dateTime) = CURDATE()");
                $stmt->bindParam(':cafeId', $cafeId);
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