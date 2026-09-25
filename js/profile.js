
// ========================================
// PROFILE PAGE
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Check login
    if (localStorage.getItem("resumeAILoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // Get elements
    const profileForm = document.getElementById("profileForm");

    const nameInput = document.getElementById("profileName");
    const emailInput = document.getElementById("profileEmail");
    const phoneInput = document.getElementById("profilePhone");

    const profilePhoto = document.getElementById("profilePhoto");
    const profilePhotoPreview = document.getElementById("profilePhotoPreview");

    const editProfileBtn = document.getElementById("editProfile");
    const saveProfileBtn = document.getElementById("saveProfile");

    const changePasswordForm = document.getElementById("changePasswordForm");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmNewPassword");

    const logoutBtn = document.getElementById("profileLogout");


    // ========================================
    // LOAD PROFILE
    // ========================================

    function loadProfile() {

        let profile = JSON.parse(
            localStorage.getItem("resumeAIProfile")
        );

        let user = JSON.parse(
            localStorage.getItem("resumeAIUser")
        );

        if (!profile && user) {
            profile = {
                name: user.name || "",
                email: user.email || "",
                phone: "",
                photo: ""
            };
        }

        if (!profile) {
            profile = {
                name: "",
                email: "",
                phone: "",
                photo: ""
            };
        }

        if (nameInput) {
            nameInput.value = profile.name || "";
        }

        if (emailInput) {
            emailInput.value = profile.email || "";
        }

        if (phoneInput) {
            phoneInput.value = profile.phone || "";
        }

        if (profilePhotoPreview && profile.photo) {
            profilePhotoPreview.src = profile.photo;
        }
    }


    // ========================================
    // ENABLE PROFILE EDITING
    // ========================================

    if (editProfileBtn) {

        editProfileBtn.addEventListener("click", function () {

            if (nameInput) {
                nameInput.disabled = false;
            }

            if (emailInput) {
                emailInput.disabled = false;
            }

            if (phoneInput) {
                phoneInput.disabled = false;
            }

            if (profilePhoto) {
                profilePhoto.disabled = false;
            }

            if (saveProfileBtn) {
                saveProfileBtn.style.display = "inline-block";
            }

            editProfileBtn.style.display = "none";
        });
    }


    // ========================================
    // SAVE PROFILE
    // ========================================

    if (profileForm) {

        profileForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";

            if (name === "" || email === "") {
                alert("Please enter your name and email.");
                return;
            }

            let profile = JSON.parse(
                localStorage.getItem("resumeAIProfile")
            ) || {};

            profile.name = name;
            profile.email = email;
            profile.phone = phone;

            localStorage.setItem(
                "resumeAIProfile",
                JSON.stringify(profile)
            );


            // Also update login user information
            let user = JSON.parse(
                localStorage.getItem("resumeAIUser")
            );

            if (user) {

                user.name = name;
                user.email = email;

                localStorage.setItem(
                    "resumeAIUser",
                    JSON.stringify(user)
                );
            }

            alert("Profile updated successfully.");

            if (saveProfileBtn) {
                saveProfileBtn.style.display = "none";
            }

            if (editProfileBtn) {
                editProfileBtn.style.display = "inline-block";
            }

            if (nameInput) {
                nameInput.disabled = true;
            }

            if (emailInput) {
                emailInput.disabled = true;
            }

            if (phoneInput) {
                phoneInput.disabled = true;
            }

        });
    }


    // ========================================
    // PROFILE PHOTO
    // ========================================

    if (profilePhoto) {

        profilePhoto.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                return;
            }

            // Check image type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {

                const imageData = event.target.result;

                if (profilePhotoPreview) {
                    profilePhotoPreview.src = imageData;
                }

                let profile = JSON.parse(
                    localStorage.getItem("resumeAIProfile")
                ) || {};

                profile.photo = imageData;

                localStorage.setItem(
                    "resumeAIProfile",
                    JSON.stringify(profile)
                );

            };

            reader.readAsDataURL(file);
        });
    }


    // ========================================
    // CHANGE PASSWORD
    // ========================================

    if (changePasswordForm) {

        changePasswordForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const newPassword = newPasswordInput
                ? newPasswordInput.value
                : "";

            const confirmPassword = confirmPasswordInput
                ? confirmPasswordInput.value
                : "";

            if (newPassword === "" || confirmPassword === "") {
                alert("Please enter the new password.");
                return;
            }

            if (newPassword.length < 6) {
                alert("Password must contain at least 6 characters.");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }


            // Update user password
            let user = JSON.parse(
                localStorage.getItem("resumeAIUser")
            );

            if (user) {

                user.password = newPassword;

                localStorage.setItem(
                    "resumeAIUser",
                    JSON.stringify(user)
                );
            }


            // Save separate password value
            localStorage.setItem(
                "resumeAIPassword",
                newPassword
            );

            alert("Password changed successfully.");

            changePasswordForm.reset();
        });
    }


    // ========================================
    // LOGOUT
    // ========================================

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {

                localStorage.removeItem("resumeAILoggedIn");

                window.location.href = "login.html";
            }
        });
    }


    // ========================================
    // LOAD PROFILE WHEN PAGE OPENS
    // ========================================

    loadProfile();

});