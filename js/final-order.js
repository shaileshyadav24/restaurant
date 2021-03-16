function showOrderOnPage() {
    if (window.localStorage.getItem("order")) {
        const orderItem = JSON.parse(window.localStorage.getItem("order"));
        var totalOrder = 0;
        orderItem.forEach(function (data) {
            totalOrder += data.selectedCount * data.Price;
        });
        const discount = totalOrder > 1000 ? 30 : (totalOrder <= 1000 && totalOrder > 80 ? 20 : 5);
        const finalRate = totalOrder - (totalOrder * discount / 100);

        document.getElementById("quantityList").innerHTML =
            "<h3><b>Total Bill: $" + finalRate + "</b></h3>";

        const userDetails = JSON.parse(window.localStorage.getItem("loggedInStatus"));
        const nameOfUser = document.getElementById("nameOfUser");
        const emailOfUser = document.getElementById("emailOfUser");
        const phoneOfUser = document.getElementById("phoneOfUser");
        const shipAddressOfUser = document.getElementById("shipAddressOfUser");
        const billAddressOfUser = document.getElementById("billAddressOfUser");

        nameOfUser.value = userDetails.name;
        emailOfUser.value = userDetails.email;
        phoneOfUser.value = userDetails.phone;
        shipAddressOfUser.value = userDetails.address;
        billAddressOfUser.value = userDetails.address;

    } else {
        window.location.href = 'dashboard.html';
    }
}

function finalizeOrder() {
    const nameOfUser = document.getElementById("nameOfUser");
    const emailOfUser = document.getElementById("emailOfUser");
    const phoneOfUser = document.getElementById("phoneOfUser");
    const shipAddressOfUser = document.getElementById("shipAddressOfUser");
    const billAddressOfUser = document.getElementById("billAddressOfUser");

    if (nameOfUser.value === null || nameOfUser.value === "") {
        displayErrorInForm("Please enter name.");
    } else if (emailOfUser.value === null || emailOfUser.value === "") {
        displayErrorInForm("Please enter email.");
    } else if (phoneOfUser.value === null || phoneOfUser.value === "") {
        displayErrorInForm("Please enter phone number.");
    } else if (shipAddressOfUser.value === null || shipAddressOfUser.value === "") {
        displayErrorInForm("Please enter shipping address.");
    } else if (billAddressOfUser.value === null || billAddressOfUser.value === "") {
        displayErrorInForm("Please enter billing address.");
    } else {
        alert("Order placed successfully. It will be delivered shortly.");
        window.localStorage.removeItem("order");
        window.location.href = "dashboard.html";
    }
}


function displayErrorInForm(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.className = "text-danger font-weight-bold";
}

function logoutUser() {
    var ask = confirm("Are you sure want to logout?");
    if (ask) {
        window.localStorage.removeItem("order");
        window.localStorage.removeItem("loggedInStatus");
        window.location.href = "index.html";
    }
}
