// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    fetchData();
    
});

// Function to fetch data from the server
function fetchData() {
    fetch('../api/cafe.php?action=cafeList')
      .then(response => response.json())
      .then(data => {
        console.log("DATA : ",data);
        // Call a function to update the table with the fetched data
        updateTable(data.cafes);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to update the table with data
  function updateTable(data) {
    const occurrences = document.getElementById('cafeName');
    const currentValue = occurrences.value; // Store the current selected value
    occurrences.innerHTML='';

    // Add the empty option
    const emptyOption = document.createElement('option');
    emptyOption.setAttribute('selected', true);
    emptyOption.setAttribute('disabled', true);
    emptyOption.setAttribute('hidden', true);
    occurrences.appendChild(emptyOption);

    // Iterate over the data and create dropdown options
    data.forEach((item) => {
        const option = document.createElement('option');
        option.textContent = item.name;
        option.value = item.id;
        occurrences.appendChild(option);
    });

    // Set the previously selected value if it exists
    if (currentValue) {
        id.value = currentValue;
    }
}

  function searchServices() {
    // Get the search term
    var searchTerm = document.getElementById('cafeName').value.toLowerCase();
    console.log('KEYWORD:',searchTerm);

    url = '../api/donation.php?action=dailyFoodDonation&cafeId='+searchTerm;
    console.log("URLEEE : ",url);
    fetch('../api/donation.php?action=dailyFoodDonation&cafeId='+searchTerm)
    .then(response => response.json())
    .then(data => {
      console.log("DATA FOOD: ",data);
      // Call a function to update the table with the fetched data
      updateTableFood(data.donations);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    // Get all rows in the table
    var rows = document.querySelectorAll('table tbody tr');

    var studentFound = false;

    // Loop through each row and hide/show based on the search term
    rows.forEach(function (row) {
        // Update the selector to target the correct cell (company name)
        var foodList = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
       

        // Convert both the company name and the search term to lowercase for comparison
        if (foodList.includes(searchTerm) ) {
            row.style.display = 'table-row';
            studentFound = true;
        } else {
            row.style.display = 'none';
        }
    });

    if(studentFound){
      document.querySelector('.alert.alert-success.alert-dismissible.fade.show[role="alert1"]').style.display = 'block';
      document.querySelector('.alert.alert-danger.alert-dismissible.fade.show[role="alert2"]').style.display = 'none';
    }
    else{
      document.querySelector('.alert.alert-success.alert-dismissible.fade.show[role="alert1"]').style.display = 'none';
      document.querySelector('.alert.alert-danger.alert-dismissible.fade.show[role="alert2"]').style.display = 'block';
    }
  }

  function updateTableFood(data) {
    const tbody = document.querySelector('tbody');
    let rows = '';
   

    data.forEach((item, index) => {

        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.dateTime}</td>
                        <td>${item.quantity}</td>
                        <td>
                      <div class="button-column">
                        <button type="button" class="btn btn-primary" onclick="reserveFood(${item.id})">Reserve</button>
                      </div>
                    </td>
                    </tr>`;

        rows += row;
    });

    // Set the innerHTML of tbody once with all rows
    tbody.innerHTML = rows;
}

async function reserveFood(donationId){
    console.log("reserve food");
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var userId = userData.id;

    const registrationData = {
        action: "addRequest",
        user_id: userId,
        donation_id: donationId,
    };

    try {
        const response = await fetch('../api/request.php?action=addRequest', { // Change this URL to your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        const result = await response.json();

        if (response.ok) {
            
            alert('Reservation successful!');
            //document.getElementById('cafeRegistrationForm').reset();
            console.log(result);
        } else {
            alert('Failed To Reserve');
           // document.getElementById('cafeRegistrationForm').reset();
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while registering.';
    }
}

  async function setUserName() {

    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var name = userData.name
    var cafeId = userData.cafe_id;

    document.querySelector('.user-info span').textContent = name;
}

setUserName()
