// Shailesh Yadav 101332535
var currentEmail;

function logoutUser() {
    var ask = confirm("Are you sure want to logout?");
    if (ask) {
        window.localStorage.removeItem("order");
        window.localStorage.removeItem("loggedInStatus");
        window.location.href = "index.html";
    }
}

function prefillDataOnPage() {

    const userDetails = JSON.parse(window.localStorage.getItem("loggedInStatus"));
    const nameOfUser = document.getElementById("nameOfUser");
    const emailOfUser = document.getElementById("emailOfUser");
    const phoneOfUser = document.getElementById("phoneOfUser");
    const shipAddressOfUser = document.getElementById("shipAddressOfUser");

    nameOfUser.value = userDetails.name;
    emailOfUser.value = userDetails.email;
    phoneOfUser.value = userDetails.phone;
    shipAddressOfUser.value = userDetails.address;
    currentEmail = userDetails.email;
}

function updateProfile() {

    const nameOfUser = document.getElementById("nameOfUser");
    const emailOfUser = document.getElementById("emailOfUser");
    const phoneOfUser = document.getElementById("phoneOfUser");
    const shipAddressOfUser = document.getElementById("shipAddressOfUser");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.className = "font-weight-bold d-none";
    if (nameOfUser.value === null || nameOfUser.value === "") {
        errorMessage.textContent = "Plase enter name";
        errorMessage.className = "text-danger font-weight-bold";
    } else if (emailOfUser.value === null || emailOfUser.value === "") {
        errorMessage.textContent = "Please enter email";
        errorMessage.className = "text-danger font-weight-bold";
    } else if (phoneOfUser.value === null || phoneOfUser.value === "") {
        errorMessage.textContent = "Please enter phone number";
        errorMessage.className = "text-danger font-weight-bold";
    } else if (shipAddressOfUser.value === null || shipAddressOfUser.value === "") {
        errorMessage.textContent = "Please enter address";
        errorMessage.className = "text-danger font-weight-bold";
    } else {
        const allUsers = window.localStorage.getItem("users") ? JSON.parse(window.localStorage.getItem("users")) : [];
        const entry = allUsers.filter(function (data) {
            return (data.email === emailOfUser.value && currentEmail !== emailOfUser.value);
        });
        var existingLogged;
        if (entry.length === 0) {
            allUsers.forEach(function (data) {
                if (data.email === currentEmail) {
                    data.name = nameOfUser.value;
                    data.phone = phoneOfUser.value;
                    data.email = emailOfUser.value.toLowerCase();
                    data.address = shipAddressOfUser.value;
                    existingLogged = data;
                }
            });
            window.localStorage.setItem("loggedInStatus", JSON.stringify(existingLogged));
            window.localStorage.setItem("users", JSON.stringify(allUsers));
            errorMessage.textContent = "Update Profile successfull.";
            errorMessage.className = "text-success font-weight-bold";
        } else {
            errorMessage.textContent = "Email already exist. Please enter new email.";
            errorMessage.className = "text-danger font-weight-bold";
        }
    }

}

function deleteProfile() {
    var ask = confirm("Are you sure want to delete profile? All details will be removed.");
    if (ask) {
        var idx = -1;
        const allUsers = JSON.parse(window.localStorage.getItem("users"));
        const userDetails = JSON.parse(window.localStorage.getItem("loggedInStatus"));
        allUsers.forEach(function (data, index) {
            if (data.email === userDetails.email) {
                idx = index;
            }
        });
        if (idx > -1) {
            allUsers.splice(idx, 1);
        }
        window.localStorage.setItem("users", JSON.stringify(allUsers));
        window.localStorage.removeItem("order");
        window.localStorage.removeItem("loggedInStatus");
        window.location.href = "index.html";
    }

}