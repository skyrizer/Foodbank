document.addEventListener('DOMContentLoaded', function () {

    var cafeOwner = JSON.parse(sessionStorage.getItem('userData'));
    console.log('Cafe Owner: ', cafeOwner);

    // Initialize the application
    init();

    // Function to initialize the application
    function init() {
        setupEventListeners();
    }

    // Function to set up event listeners
    function setupEventListeners() {
        document.getElementById('foodDonationForm').addEventListener('submit', makeDonation);
    }

    // Function to handle cafe owner registration
    async function makeDonation(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;


        const registrationData = {
            action: "addDonation",
            name: name,
            quantity: quantity,
            cafe_id: cafeOwner.cafe_id,
        };

        console.log(registrationData)

        try {
            const response = await fetch('../api/donation.php?action=addDonation', { // Change this URL to your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();

            if (response.ok) {
                
                alert('Registration successful!');
                document.getElementById('foodDonationForm').reset();
                console.log(result);
            } else {
                alert('Failed To Register Cafe!');
                document.getElementById('foodDonationForm').reset();
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'An error occurred while registering.';
        }
    }
});
