document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleFormLink = document.getElementById("toggleForm");
    const formTitle = document.getElementById("form-title");

    toggleFormLink.addEventListener("click", function (event) {
        event.preventDefault();

        if (loginForm.classList.contains("hidden")) {
            loginForm.classList.remove("hidden");
            signupForm.classList.add("hidden");
            formTitle.textContent = "Login";
            toggleFormLink.textContent = "Sign Up";
        } else {
            loginForm.classList.add("hidden");
            signupForm.classList.remove("hidden");
            formTitle.textContent = "Sign Up";
            toggleFormLink.textContent = "Login";
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Login Successful!");
    });

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Signup Successful!");
    });
});
