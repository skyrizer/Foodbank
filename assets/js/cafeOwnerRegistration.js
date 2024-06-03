

async function setUserName() {

    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var name = userData.name
    var cafeId = userData.cafe_id;

    console.log(sessionStorage.getItem("userData"))

    document.querySelector('.user-info span').textContent = name;

}

setUserName();

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    init();

    // Function to initialize the application
    function init() {
        
        fetchCafes();
        setupEventListeners();

        
    }

    async function setUserName() {

        var userData = JSON.parse(sessionStorage.getItem("userData"));
        var name = userData.name
        var cafeId = userData.cafe_id;

        console.log(sessionStorage.getItem("userData"))

        document.querySelector('.user-info span').textContent = name;

    }


    // Function to fetch cafes
    async function fetchCafes() {
        try {
            const response = await fetch('../api/cafe.php?action=cafeList'); // Change this URL to your actual endpoint
            const data = await response.json();

            console.log('Cafes response:', data); // Log the response to see its structure

            if (data && Array.isArray(data.cafes)) { // Ensure the cafes property is an array
                const cafeSelect = document.getElementById('cafe');
                data.cafes.forEach(cafe => {
                    const option = document.createElement('option');
                    option.value = cafe.id;
                    option.textContent = cafe.name;
                    cafeSelect.appendChild(option);
                });
            } else {
                throw new Error('Response does not contain a cafes array');
            }
        } catch (error) {
            console.error('Error fetching cafes:', error);
        }
    }
    // Function to set up event listeners
    function setupEventListeners() {
        document.getElementById('cafeOwnerRegistrationForm').addEventListener('submit', registerCafeOwner);
    }

    // Function to handle cafe owner registration
    async function registerCafeOwner(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const cafeId = document.getElementById('cafe').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const registrationData = {
            action: "registerCafeOwner",
            name: name,
            email: email,
            password: password,
            role_id: 2,
            phone_no: phoneNumber,
            cafe_id: parseInt(cafeId)
        };

        console.log(registrationData)

        try {
            const response = await fetch('../api/auth/register.php?action=registerCafeOwner', { // Change this URL to your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();

            if (response.ok) {
                document.getElementById('message').innerText = 'Registration successful!';
                console.log(result);
            } else {
                document.getElementById('message').innerText = result.error || 'Registration failed!';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'An error occurred while registering.';
        }
    }
});


