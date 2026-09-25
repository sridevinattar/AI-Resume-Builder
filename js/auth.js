```javascript
/* ========================================
   AI RESUME BUILDER - AUTHENTICATION
   Login / Signup / Forgot Password
======================================== */


/* ========================================
   SIGNUP
======================================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value;
        const confirmPassword =
            document.getElementById("confirmPassword")?.value;

        if (!name || !email || !password || !confirmPassword) {
            showAuthMessage("Please fill in all fields.", "error");
            return;
        }

        if (password.length < 6) {
            showAuthMessage(
                "Password must contain at least 6 characters.",
                "error"
            );
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage(
                "Passwords do not match.",
                "error"
            );
            return;
        }

        const existingUser =
            JSON.parse(localStorage.getItem("resumeAIUser"));

        if (existingUser && existingUser.email === email) {
            showAuthMessage(
                "An account with this email already exists.",
                "error"
            );
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(
            "resumeAIUser",
            JSON.stringify(user)
        );

        /* Save basic profile information */

        const profile = {
            name: name,
            email: email,
            phone: "",
            photo: ""
        };

        localStorage.setItem(
            "resumeAIProfile",
            JSON.stringify(profile)
        );

        showAuthMessage(
            "Account created successfully! Redirecting to login...",
            "success"
        );

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    });
}


/* ========================================
   LOGIN
======================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email")?.value.trim();

        const password =
            document.getElementById("password")?.value;

        if (!email || !password) {
            showAuthMessage(
                "Please enter your email and password.",
                "error"
            );
            return;
        }

        const user =
            JSON.parse(localStorage.getItem("resumeAIUser"));

        if (!user) {
            showAuthMessage(
                "No account found. Please create an account first.",
                "error"
            );
            return;
        }

        if (
            email === user.email &&
            password === user.password
        ) {

            localStorage.setItem(
                "resumeAILoggedIn",
                "true"
            );

            showAuthMessage(
                "Login successful! Redirecting...",
                "success"
            );

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            showAuthMessage(
                "Invalid email or password.",
                "error"
            );
        }
    });
}


/* ========================================
   FORGOT PASSWORD
======================================== */

const forgotForm =
    document.getElementById("forgotPasswordForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email")?.value.trim();

        if (!email) {
            showAuthMessage(
                "Please enter your email address.",
                "error"
            );
            return;
        }

        const user =
            JSON.parse(localStorage.getItem("resumeAIUser"));

        if (!user || user.email !== email) {
            showAuthMessage(
                "No account found with this email.",
                "error"
            );
            return;
        }

        /*
           Demo project:
           We cannot send a real email here.
           Instead, allow the user to set a new password.
        */

        const newPassword =
            prompt("Enter your new password:");

        if (!newPassword) {
            return;
        }

        if (newPassword.length < 6) {
            showAuthMessage(
                "Password must contain at least 6 characters.",
                "error"
            );
            return;
        }

        user.password = newPassword;

        localStorage.setItem(
            "resumeAIUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "resumeAIPassword",
            newPassword
        );

        showAuthMessage(
            "Password changed successfully. You can now login.",
            "success"
        );
    });
}


/* ========================================
   LOGOUT
======================================== */

const logoutButtons =
    document.querySelectorAll(".logout-btn");

logoutButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            localStorage.removeItem("resumeAILoggedIn");

            window.location.href = "login.html";
        }
    });
});


/* ========================================
   PASSWORD SHOW / HIDE
======================================== */

const passwordToggles =
    document.querySelectorAll(".password-toggle");

passwordToggles.forEach(function (button) {

    button.addEventListener("click", function () {

        const passwordInput =
            this.parentElement.querySelector("input");

        if (!passwordInput) {
            return;
        }

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            this.textContent = "Hide";

        } else {

            passwordInput.type = "password";
            this.textContent = "Show";
        }
    });
});


/* ========================================
   AUTH MESSAGE
======================================== */

function showAuthMessage(message, type) {

    let messageBox =
        document.getElementById("authMessage");

    if (!messageBox) {

        messageBox = document.createElement("div");

        messageBox.id = "authMessage";

        const form =
            document.querySelector(".auth-form");

        if (form) {
            form.parentNode.insertBefore(
                messageBox,
                form
            );
        }
    }

    messageBox.textContent = message;

    messageBox.className =
        "auth-message " + type;

    setTimeout(function () {

        if (messageBox) {
            messageBox.className = "auth-message";
        }

    }, 4000);
}


/* ========================================
   CHECK LOGIN STATUS
======================================== */

function checkLogin() {

    const isLoggedIn =
        localStorage.getItem("resumeAILoggedIn");

    return isLoggedIn === "true";
}


/* ========================================
   PROTECT DASHBOARD / BUILDER PAGES
======================================== */

function protectPage() {

    const protectedPages = [
        "dashboard.html",
        "resume-builder.html",
        "profile.html",
        "settings.html"
    ];

    const currentPage =
        window.location.pathname.split("/").pop();

    if (
        protectedPages.includes(currentPage) &&
        !checkLogin()
    ) {
        window.location.href = "login.html";
    }
}


/* Run page protection */

protectPage();
```
