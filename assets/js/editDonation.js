document.addEventListener('DOMContentLoaded', function () {

    var editQuantity = JSON.parse(sessionStorage.getItem('editDonation'));
    console.log('Cafe Owner: ', editQuantity);

    var name = editQuantity.name;
    var quantity = editQuantity.quantity;
    var donation_id = editQuantity.id;


    console.log("name", name);
    console.log("quantity", quantity);
    console.log("donation", donation_id);

    document.getElementById('name').value = name;
    document.getElementById('quantity').value = quantity;

    document.getElementById('foodDonationForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect the form data
        var name = document.getElementById('name').value;
        var quantity = document.getElementById('quantity').value;

        // Prepare the data to be sent to the server
        var data = {
            donation_id: donation_id,
            name: name,
            quantity: quantity
        };

        // Send the data to the server
        fetch('../api/donation.php?action=updateQuantity', {
            method: 'PUT', // Use the appropriate method (POST, PUT, etc.)
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        })
        .then(response => response.json())
        .then(data => {

            if(!data.error){
                alert("Donation Quantity Edited Successfully");

                setTimeout(function() {
                    window.location.href = "../view/historyDonation.html";
                }, 2000);
            }
            else{
                alert("Donation Cannot Being Edited");
                setTimeout(function() {
                    window.location.href = "../view/historyDonation.html";
                }, 2000);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerHTML = 'Error updating food donation.';
        });
    });


    
});
