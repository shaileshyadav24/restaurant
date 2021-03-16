function logoutUser() {
    var ask = confirm("Are you sure want to logout?");
    if (ask) {
        window.localStorage.removeItem("order");
        window.localStorage.removeItem("loggedInStatus");
        window.location.href = "index.html";
    }
}

function validateAndUpdatePassword() {
    var currentPassword = document.getElementById("currentPassword");
    var newPassword = document.getElementById("newPassword");
    const errorMessage = document.getElementById("errorMessage");

    if (currentPassword.value === null || currentPassword.value === null) {
        errorMessage.textContent = "Please enter current password";
        errorMessage.className = "text-danger font-weight-bold";
    } else if (newPassword.value === null || newPassword.value === null) {
        errorMessage.textContent = "Please enter new password";
        errorMessage.className = "text-danger font-weight-bold";
    } else if (newPassword.value.length < 6) {
        errorMessage.textContent = "New password should be of length more than 5";
        errorMessage.className = "text-danger font-weight-bold";
    } else if (newPassword.value === currentPassword.value) {
        errorMessage.textContent = "New password cannot be same as existing password.";
        errorMessage.className = "text-danger font-weight-bold";
    } else {
        const userDetails = JSON.parse(window.localStorage.getItem("loggedInStatus"));
        if (userDetails.password !== currentPassword.value) {
            errorMessage.textContent = "Password does not match with existing password.";
            errorMessage.className = "text-danger font-weight-bold";
        } else {
            userDetails.password = newPassword.value;
            window.localStorage.setItem("loggedInStatus", JSON.stringify(userDetails));
            const allUsers = JSON.parse(window.localStorage.getItem("users"));
            allUsers.forEach(function (data) {
                if (data.email === userDetails.email) {
                    data.password = newPassword.value;
                }
            });
            window.localStorage.setItem("users", JSON.stringify(allUsers));
            errorMessage.textContent = "Password updated successfully.";
            errorMessage.className = "text-success font-weight-bold";
        }
    }
}