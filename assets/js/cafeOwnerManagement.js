// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    fetchData();
    
});

// Function to fetch data from the server
function fetchData() {
    fetch('../api/cafeOwner.php?action=cafeOwner')
      .then(response => response.json())
      .then(data => {

        // Call a function to update the table with the fetched data
        updateTable(data.cafeOwners);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to update the table with data
  function updateTable(data) {
    const tbody = document.querySelector('table tbody');

    // Clear existing rows
    tbody.innerHTML = '';

    // Iterate over the data and create rows
    data.forEach((item, index) => 
    {
      
      const row = `<tr>
                    <td>${index + 1}</td>
                    <td>${item.ownerName}</td>
                    <td>${item.phone_no}</td>
                    <td>${item.cafeName}</td>
                    <td>
                      <div class="button-column">
                        <button type="button" class="btn btn-danger" onclick="deleteCafeOwner(${item.id})">Delete </button>
                      </div>
                    </td>
                  </tr>`;

      // Append the row to the tbody
      tbody.innerHTML += row;
    });
  }

  function searchServices() {
    // Get the search term
    var searchTerm = document.getElementById('services').value.toLowerCase();
    console.log('KEYWORD:',searchTerm);

    // Get all rows in the table
    var rows = document.querySelectorAll('table tbody tr');

    var studentFound = false;

    // Loop through each row and hide/show based on the search term
    rows.forEach(function (row) {
        // Update the selector to target the correct cell (company name)
        var studentName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        var parentName = row.querySelector('td:nth-child(6)').textContent.toLowerCase();

        // Convert both the company name and the search term to lowercase for comparison
        if (studentName.includes(searchTerm) || parentName.includes(searchTerm)) {
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

  async function setUserName() {

    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var name = userData.name
    var cafeId = userData.cafe_id;

    document.querySelector('.user-info span').textContent = name;

   
}

setUserName();


  function deleteCafeOwner(id)
    {
      console.log("ID : ", id);
     
      fetch('../api/cafeOwner.php?action=delCafeOwner&user_id='+id, {
        method: 'DELETE', // Use the POST method
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        },
         // Convert the data object to a JSON string
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log("Cafe Owner Has Successfully deleted ");
        setTimeout(function() {
          window.location.href = "../view/cafeOwnerManagement.html";
        }, 2000);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
          
    }

    