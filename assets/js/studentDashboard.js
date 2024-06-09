// Function to get total daily reservations
async function totalReservation() {
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var studentId = userData.id;

    const url = `../api/request.php?action=totalRequestByUser`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);
    

        // Process the returned data
        if (data.totalReqByUser !== 0) {
            const totalQuantity = data.totalReqByUser;
            // Update the DOM element with the fetched data
            document.querySelector('.reservation .text p').textContent = totalQuantity;
        } else {
            document.querySelector('.reservation .text p').textContent = '0';
        }
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        document.querySelector('.reservation .text p').textContent = 'Error';
    }
}

// Function to get total daily reservations
async function totalDailyReservation() {
    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var studentId = userData.id;

    const url = `../api/request.php?action=dailyTotalRequestByUser&userId=`+studentId;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);
    

        // Process the returned data
        if (data.dailyTotalRequestByUser !== 0) {
            const totalQuantity = data.dailyTotalRequestByUser;
            // Update the DOM element with the fetched data
            document.querySelector('.dailyreservation .text p').textContent = totalQuantity;
        } else {
            document.querySelector('.dailyreservation .text p').textContent = '0';
        }
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        document.querySelector('.dailyreservation .text p').textContent = 'Error';
    }
}


async function setUserName() {

    var userData = JSON.parse(sessionStorage.getItem("userData"));
    var name = userData.name
    var cafeId = userData.cafe_id;

    document.querySelector('.user-info span').textContent = name;
   
}

// Call the function to get total daily donations
setUserName();
totalReservation();
totalDailyReservation();
