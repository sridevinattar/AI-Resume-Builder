// ========================================
// SETTINGS PAGE
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Check login
    if (localStorage.getItem("resumeAILoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ========================================
    // GET SETTINGS ELEMENTS
    // ========================================

    const darkModeToggle = document.getElementById("darkModeToggle");
    const themeOptions = document.querySelectorAll(".theme-option");

    const defaultTemplate = document.getElementById("defaultTemplate");
    const autoSave = document.getElementById("autoSave");
    const livePreview = document.getElementById("livePreview");
    const notifications = document.getElementById("notifications");

    const saveSettingsBtn = document.getElementById("saveSettings");
    const deleteAccountBtn = document.getElementById("deleteAccount");

    // ========================================
    // DEFAULT SETTINGS
    // ========================================

    let settings = JSON.parse(
        localStorage.getItem("resumeAISettings")
    ) || {

        darkMode: false,
        theme: "purple",
        defaultTemplate: "template1",
        autoSave: true,
        livePreview: true,
        notifications: true
    };


    // ========================================
    // LOAD SETTINGS
    // ========================================

    function loadSettings() {

        // Dark mode
        if (darkModeToggle) {
            darkModeToggle.checked = settings.darkMode;
        }

        // Default template
        if (defaultTemplate) {
            defaultTemplate.value =
                settings.defaultTemplate || "template1";
        }

        // Auto save
        if (autoSave) {
            autoSave.checked = settings.autoSave;
        }

        // Live preview
        if (livePreview) {
            livePreview.checked = settings.livePreview;
        }

        // Notifications
        if (notifications) {
            notifications.checked = settings.notifications;
        }

        // Theme
        themeOptions.forEach(function (option) {

            option.classList.remove("active");

            if (option.dataset.theme === settings.theme) {
                option.classList.add("active");
            }
        });

        applyTheme(settings.theme);
        applyDarkMode(settings.darkMode);
    }


    // ========================================
    // THEME COLORS
    // ========================================

    function applyTheme(theme) {

        let color = "#6c63ff";

        if (theme === "blue") {
            color = "#2196f3";
        }

        if (theme === "green") {
            color = "#20a464";
        }

        if (theme === "orange") {
            color = "#ff8a00";
        }

        document.documentElement.style.setProperty(
            "--primary-color",
            color
        );

        localStorage.setItem(
            "resumeAITheme",
            theme
        );
    }


    // ========================================
    // THEME OPTION CLICK
    // ========================================

    themeOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            const selectedTheme =
                option.dataset.theme;

            if (!selectedTheme) {
                return;
            }

            themeOptions.forEach(function (item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

            settings.theme = selectedTheme;

            applyTheme(selectedTheme);
        });
    });


    // ========================================
    // DARK MODE
    // ========================================

    function applyDarkMode(enabled) {

        if (enabled) {
            document.body.classList.add("dark-mode");

            localStorage.setItem(
                "resumeAIDarkMode",
                "true"
            );

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem(
                "resumeAIDarkMode",
                "false"
            );
        }
    }


    if (darkModeToggle) {

        darkModeToggle.addEventListener(
            "change",
            function () {

                settings.darkMode =
                    darkModeToggle.checked;

                applyDarkMode(
                    darkModeToggle.checked
                );
            }
        );
    }


    // ========================================
    // SAVE SETTINGS
    // ========================================

    if (saveSettingsBtn) {

        saveSettingsBtn.addEventListener(
            "click",
            function () {

                settings.darkMode =
                    darkModeToggle
                        ? darkModeToggle.checked
                        : false;

                settings.defaultTemplate =
                    defaultTemplate
                        ? defaultTemplate.value
                        : "template1";

                settings.autoSave =
                    autoSave
                        ? autoSave.checked
                        : true;

                settings.livePreview =
                    livePreview
                        ? livePreview.checked
                        : true;

                settings.notifications =
                    notifications
                        ? notifications.checked
                        : true;


                localStorage.setItem(
                    "resumeAISettings",
                    JSON.stringify(settings)
                );

                alert("Settings saved successfully.");
            }
        );
    }


    // ========================================
    // ACCOUNT DELETION
    // ========================================

    if (deleteAccountBtn) {

        deleteAccountBtn.addEventListener(
            "click",
            function () {

                const firstConfirm = confirm(
                    "Are you sure you want to delete your account?"
                );

                if (!firstConfirm) {
                    return;
                }

                const secondConfirm = confirm(
                    "This will delete your profile and saved resumes. Continue?"
                );

                if (!secondConfirm) {
                    return;
                }


                // Remove account data
                localStorage.removeItem("resumeAIUser");
                localStorage.removeItem("resumeAIProfile");
                localStorage.removeItem("resumeAIResumes");
                localStorage.removeItem("resumeAISettings");
                localStorage.removeItem("resumeAITheme");
                localStorage.removeItem("resumeAIDarkMode");
                localStorage.removeItem("resumeAIPassword");
                localStorage.removeItem("resumeAILoggedIn");

                alert("Your account has been deleted.");

                window.location.href = "signup.html";
            }
        );
    }


    // ========================================
    // LOGOUT
    // ========================================

    const logoutButtons =
        document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            localStorage.removeItem(
                "resumeAILoggedIn"
            );

            window.location.href = "login.html";
        });
    });


    // ========================================
    // LOAD SETTINGS ON PAGE OPEN
    // ========================================

    loadSettings();

});