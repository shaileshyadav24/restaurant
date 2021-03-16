// Shailesh Yadav 101332535
function registerUser() {
    const nameOfUser = document.getElementById("nameOfUser");
    const emailOfUser = document.getElementById("emailOfUser");
    const passwordOfUser = document.getElementById("passwordOfUser");
    const confirmPasswordOfUser = document.getElementById("confirmPasswordOfUser");
    const phoneOfUser = document.getElementById("phoneOfUser");
    const addressOfUser = document.getElementById("addressOfUser");

    if (nameOfUser.value === null || nameOfUser.value === "") {
        displayErrorInForm("Please enter name.");
    } else if (emailOfUser.value === null || emailOfUser.value === "") {
        displayErrorInForm("Please enter email.");
    } else if (passwordOfUser.value === null || passwordOfUser.value === "") {
        displayErrorInForm("Please enter password.");
    } else if (passwordOfUser.value.length < 6) {
        displayErrorInForm("Password length should be more than 5.");
    } else if (confirmPasswordOfUser.value === null || confirmPasswordOfUser.value === "") {
        displayErrorInForm("Please enter confirm password.");
    } else if (confirmPasswordOfUser.value !== passwordOfUser.value) {
        displayErrorInForm("Password does not match.");
    } else if (phoneOfUser.value === null || phoneOfUser.value === "") {
        displayErrorInForm("Please enter phone number.");
    } else if (addressOfUser.value === null || addressOfUser.value === "") {
        displayErrorInForm("Please enter address.");
    } else {
        const obj = {
            name: nameOfUser.value,
            email: emailOfUser.value.toLowerCase(),
            password: passwordOfUser.value,
            phone: phoneOfUser.value,
            address: addressOfUser.value
        };
        const allUsers = window.localStorage.getItem("users") ? JSON.parse(window.localStorage.getItem("users")) : [];
        const entry = allUsers.filter(function (data) {
            return (data.email === obj.email);
        });
        if (entry.length === 0) {
            allUsers.push(obj);
            window.localStorage.setItem("users", JSON.stringify(allUsers));
            errorMessage.textContent = "Registration successfull.";
            errorMessage.className = "text-success font-weight-bold";
        } else {
            displayErrorInForm("Email already exist. Please enter new.");
        }
    }
}

function displayErrorInForm(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.className = "text-danger font-weight-bold";
}