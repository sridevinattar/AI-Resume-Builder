/* ========================================
   AI RESUME BUILDER - DASHBOARD
   Create / Search / Edit / View / Delete
======================================== */


/* ========================================
   GET SAVED RESUMES
======================================== */

function getResumes() {

    const savedResumes =
        localStorage.getItem("resumeAIResumes");

    if (!savedResumes) {
        return [];
    }

    try {
        return JSON.parse(savedResumes);
    } catch (error) {
        return [];
    }
}


/* ========================================
   SAVE RESUMES
======================================== */

function saveResumes(resumes) {

    localStorage.setItem(
        "resumeAIResumes",
        JSON.stringify(resumes)
    );
}


/* ========================================
   DASHBOARD ELEMENTS
======================================== */

const resumeGrid =
    document.getElementById("resumeGrid");

const searchInput =
    document.getElementById("searchResume");

const emptyMessage =
    document.getElementById("emptyResumes");


/* ========================================
   DISPLAY RESUMES
======================================== */

function displayResumes(resumes) {

    if (!resumeGrid) {
        return;
    }

    resumeGrid.innerHTML = "";

    if (resumes.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }

    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }

    resumes.forEach(function (resume) {

        const card =
            document.createElement("div");

        card.className = "resume-card";

        const name =
            resume.personal?.fullName ||
            resume.name ||
            "Untitled Resume";

        const email =
            resume.personal?.email ||
            resume.email ||
            "No email added";

        const date =
            resume.updatedAt ||
            resume.createdAt ||
            "Recently created";

        card.innerHTML = `
            <h3>${escapeHTML(name)}</h3>

            <p>${escapeHTML(email)}</p>

            <p class="resume-date">
                Last updated: ${escapeHTML(date)}
            </p>

            <div class="resume-card-actions">

                <button
                    class="edit-resume"
                    onclick="editResume('${resume.id}')">
                    Edit
                </button>

                <button
                    class="view-resume"
                    onclick="viewResume('${resume.id}')">
                    View
                </button>

                <button
                    class="duplicate-resume"
                    onclick="duplicateResume('${resume.id}')">
                    Duplicate
                </button>

                <button
                    class="delete-resume"
                    onclick="deleteResume('${resume.id}')">
                    Delete
                </button>

            </div>
        ;`

        resumeGrid.appendChild(card);
    });
}


/* ========================================
   SEARCH RESUMES
======================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                this.value.toLowerCase().trim();

            const resumes = getResumes();

            const filteredResumes =
                resumes.filter(function (resume) {

                    const name =
                        resume.personal?.fullName ||
                        resume.name ||
                        "";

                    const email =
                        resume.personal?.email ||
                        resume.email ||
                        "";

                    return (
                        name.toLowerCase().includes(searchText) ||
                        email.toLowerCase().includes(searchText)
                    );
                });

            displayResumes(filteredResumes);
        }
    );
}


/* ========================================
   CREATE NEW RESUME
======================================== */

function createNewResume() {

    localStorage.removeItem("resumeAIEditingId");

    window.location.href =
        "resume-builder.html";
}


/* ========================================
   EDIT RESUME
======================================== */

function editResume(id) {

    localStorage.setItem(
        "resumeAIEditingId",
        id
    );

    window.location.href =
        "resume-builder.html";
}


/* ========================================
   VIEW RESUME
======================================== */

function viewResume(id) {

    localStorage.setItem(
        "resumeAIPreviewId",
        id
    );

    window.location.href =
        "resume-builder.html?preview=true";
}


/* ========================================
   DUPLICATE RESUME
======================================== */

function duplicateResume(id) {

    const resumes = getResumes();

    const resume =
        resumes.find(function (item) {
            return String(item.id) === String(id);
        });

    if (!resume) {
        alert("Resume not found.");
        return;
    }

    const newResume =
        JSON.parse(JSON.stringify(resume));

    newResume.id =
        Date.now().toString();

    newResume.name =
        (resume.name || "My Resume") + " Copy";

    newResume.createdAt =
        getCurrentDate();

    newResume.updatedAt =
        getCurrentDate();

    resumes.push(newResume);

    saveResumes(resumes);

    displayResumes(resumes);

    updateResumeCount();

    alert("Resume duplicated successfully.");
}


/* ========================================
   DELETE RESUME
======================================== */

function deleteResume(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this resume?"
        );

    if (!confirmDelete) {
        return;
    }

    let resumes = getResumes();

    resumes =
        resumes.filter(function (resume) {
            return String(resume.id) !== String(id);
        });

    saveResumes(resumes);

    displayResumes(resumes);

    updateResumeCount();

    alert("Resume deleted successfully.");
}


/* ========================================
   RESUME COUNT
======================================== */

function updateResumeCount() {

    const countElement =
        document.getElementById("resumeCount");

    if (!countElement) {
        return;
    }

    const resumes = getResumes();

    countElement.textContent =
        resumes.length;
}


/* ========================================
   WELCOME USER
======================================== */

function displayUserName() {

    const userNameElement =
        document.getElementById("dashboardUserName");

    if (!userNameElement) {
        return;
    }

    const profile =
        JSON.parse(
            localStorage.getItem("resumeAIProfile")
        );

    const user =
        JSON.parse(
            localStorage.getItem("resumeAIUser")
        );

    const name =
        profile?.name ||
        user?.name ||
        "User";

    userNameElement.textContent = name;
}


/* ========================================
   CURRENT DATE
======================================== */

function getCurrentDate() {

    const today = new Date();

    return today.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* ========================================
   ESCAPE HTML
======================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* ========================================
   LOGOUT
======================================== */

const dashboardLogout =
    document.getElementById("dashboardLogout");

if (dashboardLogout) {

    dashboardLogout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );

            if (!confirmLogout) {
                return;
            }

            localStorage.removeItem(
                "resumeAILoggedIn"
            );

            window.location.href =
                "login.html";
        }
    );
}


/* ========================================
   LOAD DASHBOARD
======================================== */

if (resumeGrid) {

    const resumes = getResumes();

    displayResumes(resumes);

    updateResumeCount();

    displayUserName();
}


/* ========================================
   MAKE FUNCTIONS AVAILABLE
   TO HTML BUTTONS
======================================== */

window.createNewResume = createNewResume;
window.editResume = editResume;
window.viewResume = viewResume;
window.duplicateResume = duplicateResume;
window.deleteResume = deleteResume; 