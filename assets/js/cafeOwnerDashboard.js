// Function to get total daily donations
async function getTotalDailyDonations() {
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var cafeId = userData.cafe_id;

    const url = `../api/donation.php?action=totalDailyDonations&cafeId=${cafeId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);
        console.log(data.totalDailyDonations);
        console.log(data.totalDailyDonations.totalQuantity);

        // Process the returned data
        if (data.totalDailyDonations && data.totalDailyDonations.totalQuantity !== undefined) {
            const totalQuantity = data.totalDailyDonations.totalQuantity;
            // Update the DOM element with the fetched data
            document.querySelector('.dailyDonation .text p').textContent = totalQuantity;
        } else {
            document.querySelector('.dailyDonation .text p').textContent = '0';
        }
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        document.querySelector('.dailyDonation .text p').textContent = 'Error';
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

// Call the function to get total daily donations
setUserName();
getTotalDailyDonations();
