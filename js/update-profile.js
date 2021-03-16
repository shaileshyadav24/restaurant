

function logoutUser() {
    var ask = confirm("Are you sure want to logout?");
    if (ask) {
        window.localStorage.removeItem("order");
        window.localStorage.removeItem("loggedInStatus");
        window.location.href = "index.html";
    }
}