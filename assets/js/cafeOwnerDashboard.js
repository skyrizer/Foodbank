
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

    var cafeOwner = JSON.parse(sessionStorage.getItem('userData'));
    console.log('Cafe Owner: ', cafeOwner);

    console.log('DOMContentLoaded event fired.');

    // Define the promises array
    var cafeOwner = [];

    // AJAX call to calculate total student registration
    cafeOwner.push(makeAjaxRequest("../api/donation.php?action=dailyFoodDonation&cafeId=1"));

    // Wait for all promises to be resolved
    Promise.all(cafeOwner)
        .then(function (results) {
            // Results is an array containing the resolved values from each promise
            var [donation] = results;

            if (donation.students.length === 0) {
                // If the array is empty, set the donation to 0
                donation = 0;
            } else {
                // If the array is not empty, use the length of the array as the donation value
                donation = donation.students.length;
            }

            console.log("tadStuden: ",donation);

            // Select and update the UI elements
            var dailyDonation = document.querySelector('.dailyDonation p');
            if (dailyDonation) {
                dailyDonation.textContent = donation;
            } else {
                console.error('Total Student <p> element not found.');
            }

        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});