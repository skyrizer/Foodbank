// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    var studentID = JSON.parse(sessionStorage.getItem('userData'));
    console.log('Student: ', studentID);
    fetchData(studentID.id);
});

// Function to fetch data from the server
function fetchData(student_id) {
    fetch('../api/donationRequest.php?action=donationRequestByUser&userId='+student_id)
      .then(response => response.json())
      .then(data => {
        console.log("DATA : ",data);
        // Call a function to update the table with the fetched data
        updateTable(data.donationRequestByUser);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to update the table with data
  function updateTable(data) {
    const tbody = document.querySelector('tbody');
    let rows = '';

    data.forEach((item, index) => {

        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${item.donation_name}</td>
                        <td>${item.dateTime}</td>
                        <td>${item.cafe_name}</td>
                    </tr>`;

        rows += row;
    });

    // Set the innerHTML of tbody once with all rows
    tbody.innerHTML = rows;
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
        var studentName = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

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

