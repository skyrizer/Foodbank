// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    var cafeOwner = JSON.parse(sessionStorage.getItem('userData'));
    console.log('Cafe Owner: ', cafeOwner);
    fetchData(cafeOwner.cafe_id);
    
});

// Function to fetch data from the server
function fetchData(cafe_id) {
    fetch('../api/donation.php?action=donationList&cafeId='+cafe_id)
      .then(response => response.json())
      .then(data => {
        console.log("DATA : ",data);
        // Call a function to update the table with the fetched data
        updateTable(data.donations);
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
                    <td>${item.name}</td>
                    <td>${item.dateTime}</td>
                    <td>${item.quantity}</td>
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

        // Convert both the company name and the search term to lowercase for comparison
        if (studentName.includes(searchTerm) ) {
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