document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    init();

    // Function to initialize the application
    function init() {
        setupEventListeners();
    }

    // Function to set up event listeners
    function setupEventListeners() {
        document.getElementById('cafeRegistrationForm').addEventListener('submit', registerCafe);
    }

    // Function to handle cafe owner registration
    async function registerCafe(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
      


        const registrationData = {
            action: "addCafe",
            name: name,
        };

        console.log(registrationData)

        try {
            const response = await fetch('../api/cafe.php?action=addCafe', { // Change this URL to your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();

            if (response.ok) {
                
                alert('Registration successful!');
                document.getElementById('cafeRegistrationForm').reset();
                console.log(result);
            } else {
                alert('Failed To Register Cafe!');
                document.getElementById('cafeRegistrationForm').reset();
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'An error occurred while registering.';
        }
    }
});

async function setUserName() {

    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var name = userData.name
    var cafeId = userData.cafe_id;

    document.querySelector('.user-info span').textContent = name;

        // Process the returned data
        if (data.totalDailyDonations && data.totalDailyDonations.totalQuantity !== undefined) {
            const totalQuantity = data.totalDailyDonations.totalQuantity;
            // Update the DOM element with the fetched data
            document.querySelector('.dailyDonation .text p').textContent = totalQuantity;
        } else {
            document.querySelector('.dailyDonation .text p').textContent = '0';
        }
   
}

setUserName()
