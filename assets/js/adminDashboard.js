
// Function to make an AJAX request
function makeAjaxRequest(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOMContentLoaded event fired.');

    // Define the promises array
    var promises = [];

    // AJAX call to calculate total student registration
    promises.push(makeAjaxRequest("../api/student.php?action=totalStudent&roleId=3"));
    promises.push(makeAjaxRequest("../api/cafe.php?action=totalCafe"));
    promises.push(makeAjaxRequest("../api/request.php?action=totalRequest"));

    // Wait for all promises to be resolved
    Promise.all(promises)
        .then(function (results) {
            // Results is an array containing the resolved values from each promise
            var [student, cafe, reservation] = results;

            console.log("Studentasd: ",student.totalStudent);

            // Select and update the UI elements
            var totalStudent = document.querySelector('.student p');
            if (totalStudent) {
                totalStudent.textContent = student.totalStudent;
            } else {
                console.error('Total Student <p> element not found.');
            }

            // Select and update the UI elements
            var totalCafe = document.querySelector('.cafe p');
            if (totalCafe) {
                totalCafe.textContent = cafe.totalCafe;
            } else {
                console.error('Total Student <p> element not found.');
            }

            // Select and update the UI elements
            var totalReservation = document.querySelector('.reservation p');
            if (totalReservation) {
                totalReservation.textContent = reservation.totalRequest;
            } else {
                console.error('Total Student <p> element not found.');
            }


        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});