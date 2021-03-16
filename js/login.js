// Shailesh Yadav 101332535
function validateUser() {
    const loginName = document.getElementById("loginName");
    const loggedInPassword = document.getElementById("loggedInPassword");
    const rememberMe = document.getElementById("rememberMe");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.className = "text-danger font-weight-bold d-none";
    if (loginName.value === "" || loginName.value === null) {
        errorMessage.textContent = message;
        errorMessage.className = "text-danger font-weight-bold";
    } else if (loggedInPassword.value === "" || loggedInPassword.value === null) {
        errorMessage.textContent = message;
        errorMessage.className = "text-danger font-weight-bold";
    } else {
        const allUsers = window.localStorage.getItem("users") ? JSON.parse(window.localStorage.getItem("users")) : [];
        const entry = allUsers.filter(function (data) {
            return (data.email === loginName.value.toLowerCase() && data.password === loggedInPassword.value);
        });
        if (entry.length === 1) {
            const obj = entry[0];
            obj.rememberMe = true;
            obj.signIn = true;
            window.localStorage.setItem("loggedInStatus", JSON.stringify(obj));
            window.location.href = "dashboard.html";
        } else {
            errorMessage.textContent = "Please verify email and password.";
            errorMessage.className = "text-danger font-weight-bold";
        }
    }
}

function isRememberMeUserAvailable() {
    const obj = window.localStorage.getItem("loggedInStatus") ? JSON.parse(window.localStorage.getItem("loggedInStatus")) : null;
    if (obj && obj.rememberMe) {
        window.location.href = "dashboard.html";
    } else {
        window.localStorage.removeItem("loggedInStatus");
    }
}
