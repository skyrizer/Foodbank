// Add this script at the end of your HTML file or in a separate JS file (e.g., sidebar.js)
document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = window.location.pathname;
    
    const path = "/Foodbank/view";

    const links = {
        [path + '/adminDashboard.html']: 'dashboard-link',
        [path + '/studentRegistration.html']: 'student-registration-link',
        [path + '/studentManagement.html']: 'student-management-link',
        [path + '/cafeOwnerRegistration.html']: 'cafe-owner-registration-link',
        [path + '/cafeOwnerManagement.html']: 'cafe-owner-management-link',
        [path + '/cafeRegistration.html']: 'cafe-registration-link',
        [path + '/cafeManagement.html']: 'cafe-management-link'
    };
    
    const activeLinkId = links[currentUrl];
    console.log(currentUrl)
    console.log(activeLinkId)
    console.log(links[currentUrl])

    if (activeLinkId) {
        document.getElementById(activeLinkId).classList.add('active');
    } else {
        console.log("error")

    }
});
