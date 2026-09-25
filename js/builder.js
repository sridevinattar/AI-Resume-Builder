```javascript
/* ========================================
   AI RESUME BUILDER - BUILDER.JS
   Resume Form Management
======================================== */


/* ========================================
   GET FORM ELEMENTS
======================================== */

const resumeForm = document.getElementById("resumeForm");

const educationContainer =
    document.getElementById("educationContainer");

const experienceContainer =
    document.getElementById("experienceContainer");

const projectsContainer =
    document.getElementById("projectsContainer");

const certificationsContainer =
    document.getElementById("certificationsContainer");

const languagesContainer =
    document.getElementById("languagesContainer");

const skillsContainer =
    document.getElementById("skillsContainer");


/* ========================================
   RESUME DATA
======================================== */

let currentResume = {
    id: null,

    personal: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        website: "",
        photo: ""
    },

    summary: "",

    education: [],

    skills: [],

    experience: [],

    projects: [],

    certifications: [],

    languages: [],

    achievements: [],

    template: "template1",

    color: "#6c63ff",

    createdAt: "",
    updatedAt: ""
};


/* ========================================
   GET ALL SAVED RESUMES
======================================== */

function getSavedResumes() {

    const data =
        localStorage.getItem("resumeAIResumes");

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


/* ========================================
   SAVE ALL RESUMES
======================================== */

function saveAllResumes(resumes) {

    localStorage.setItem(
        "resumeAIResumes",
        JSON.stringify(resumes)
    );
}


/* ========================================
   GENERATE ID
======================================== */

function generateResumeId() {

    return Date.now().toString();
}


/* ========================================
   CURRENT DATE
======================================== */

function getDate() {

    return new Date().toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* ========================================
   ADD EDUCATION
======================================== */

function addEducation(data = {}) {

    if (!educationContainer) {
        return;
    }

    const item =
        document.createElement("div");

    item.className = "dynamic-item education-item";

    item.innerHTML = 
        <h4>Education</h4>

        <div class="form-row">

            <div class="form-group">
                <label>Degree</label>
                <input
                    type="text"
                    class="education-degree"
                    placeholder="BCA / B.Tech / MBA"
                    value="${escapeHTML(data.degree || "")}"
                >
            </div>

            <div class="form-group">
                <label>College / University</label>
                <input
                    type="text"
                    class="education-college"
                    placeholder="College name"
                    value="${escapeHTML(data.college || "")}"
                >
            </div>

        </div>

        <div class="form-row">

            <div class="form-group">
                <label>Start Year</label>
                <input
                    type="text"
                    class="education-start"
                    placeholder="2023"
                    value="${escapeHTML(data.startYear || "")}"
                >
            </div>

            <div class="form-group">
                <label>End Year</label>
                <input
                    type="text"
                    class="education-end"
                    placeholder="2026"
                    value="${escapeHTML(data.endYear || "")}"
                >
            </div>

        </div>

        <div class="form-group">
            <label>Percentage / CGPA</label>
            <input
                type="text"
                class="education-grade"
                placeholder="8.5 CGPA / 85%"
                value="${escapeHTML(data.grade || "")}"
            >
        </div>

        <button
            type="button"
            class="remove-btn"
            onclick="this.parentElement.remove(); updatePreview();">
            Remove
        </button>
    ;

    educationContainer.appendChild(item);
}


/* ========================================
   ADD EXPERIENCE
======================================== */

function addExperience(data = {}) {

    if (!experienceContainer) {
        return;
    }

    const item =
        document.createElement("div");

    item.className = "dynamic-item experience-item";

    item.innerHTML = 
        <h4>Work Experience</h4>

        <div class="form-row">

            <div class="form-group">
                <label>Company</label>
                <input
                    type="text"
                    class="experience-company"
                    placeholder="Company name"
                    value="${escapeHTML(data.company || "")}"
                >
            </div>

            <div class="form-group">
                <label>Position</label>
                <input
                    type="text"
                    class="experience-position"
                    placeholder="Web Developer"
                    value="${escapeHTML(data.position || "")}"
                >
            </div>

        </div>

        <div class="form-row">

            <div class="form-group">
                <label>Start Date</label>
                <input
                    type="text"
                    class="experience-start"
                    placeholder="Jan 2025"
                    value="${escapeHTML(data.startDate || "")}"
                >
            </div>

            <div class="form-group">
                <label>End Date</label>
                <input
                    type="text"
                    class="experience-end"
                    placeholder="Present"
                    value="${escapeHTML(data.endDate || "")}"
                >
            </div>

        </div>

        <div class="form-group">
            <label>Responsibilities</label>
            <textarea
                class="experience-responsibilities"
                placeholder="Describe your responsibilities..."
            >${escapeHTML(data.responsibilities || "")}</textarea>
        </div>

        <button
            type="button"
            class="remove-btn"
            onclick="this.parentElement.remove(); updatePreview();">
            Remove
        </button>
    ;

    experienceContainer.appendChild(item);
}


/* ========================================
   ADD PROJECT
======================================== */

function addProject(data = {}) {

    if (!projectsContainer) {
        return;
    }

    const item =
        document.createElement("div");

    item.className = "dynamic-item project-item";

    item.innerHTML = 
        <h4>Project</h4>

        <div class="form-group">
            <label>Project Title</label>
            <input
                type="text"
                class="project-title"
                placeholder="AI Resume Builder"
                value="${escapeHTML(data.title || "")}"
            >
        </div>

        <div class="form-group">
            <label>Project Description</label>
            <textarea
                class="project-description"
                placeholder="Describe your project..."
            >${escapeHTML(data.description || "")}</textarea>
        </div>

        <div class="form-group">
            <label>Technologies</label>
            <input
                type="text"
                class="project-technologies"
                placeholder="HTML, CSS, JavaScript"
                value="${escapeHTML(data.technologies || "")}"
            >
        </div>

        <div class="form-row">

            <div class="form-group">
                <label>GitHub Link</label>
                <input
                    type="url"
                    class="project-github"
                    placeholder="https://github.com/"
                    value="${escapeHTML(data.github || "")}"
                >
            </div>

            <div class="form-group">
                <label>Live Link</label>
                <input
                    type="url"
                    class="project-live"
                    placeholder="https://example.com"
                    value="${escapeHTML(data.live || "")}"
                >
            </div>

        </div>

        <button
            type="button"
            class="remove-btn"
            onclick="this.parentElement.remove(); updatePreview();">
            Remove
        </button>
    ;

    projectsContainer.appendChild(item);
}


/* ========================================
   ADD CERTIFICATION
======================================== */

function addCertification(data = {}) {

    if (!certificationsContainer) {
        return;
    }

    const item =
        document.createElement("div");

    item.className = "dynamic-item certification-item";

    item.innerHTML = 
        <h4>Certification</h4>

        <div class="form-row">

            <div class="form-group">
                <label>Certification Name</label>
                <input
                    type="text"
                    class="certification-name"
                    placeholder="Python Certification"
                    value="${escapeHTML(data.name || "")}"
                >
            </div>

            <div class="form-group">
                <label>Issuing Organization</label>
                <input
                    type="text"
                    class="certification-organization"
                    placeholder="Coursera / Google"
                    value="${escapeHTML(data.organization || "")}"
                >
            </div>

        </div>

        <div class="form-group">
            <label>Year</label>
            <input
                type="text"
                class="certification-year"
                placeholder="2026"
                value="${escapeHTML(data.year || "")}"
            >
        </div>

        <button
            type="button"
            class="remove-btn"
            onclick="this.parentElement.remove(); updatePreview();">
            Remove
        </button>
    ;

    certificationsContainer.appendChild(item);
}


/* ========================================
   ADD LANGUAGE
======================================== */

function addLanguage(data = {}) {

    if (!languagesContainer) {
        return;
    }

    const item =
        document.createElement("div");

    item.className = "dynamic-item language-item";

    item.innerHTML = 
        <h4>Language</h4>

        <div class="form-row">

            <div class="form-group">
                <label>Language</label>
                <input
                    type="text"
                    class="language-name"
                    placeholder="English"
                    value="${escapeHTML(data.name || "")}"
                >
            </div>

            <div class="form-group">
                <label>Proficiency</label>

                <select class="language-proficiency">

                    <option value="">
                        Select proficiency
                    </option>

                    <option value="Basic"
                        ${data.proficiency === "Basic" ? "selected" : ""}>
                        Basic
                    </option>

                    <option value="Intermediate"
                        ${data.proficiency === "Intermediate" ? "selected" : ""}>
                        Intermediate
                    </option>

                    <option value="Advanced"
                        ${data.proficiency === "Advanced" ? "selected" : ""}>
                        Advanced
                    </option>

                    <option value="Fluent"
                        ${data.proficiency === "Fluent" ? "selected" : ""}>
                        Fluent
                    </option>

                </select>

            </div>

        </div>

        <button
            type="button"
            class="remove-btn"
            onclick="this.parentElement.remove(); updatePreview();">
            Remove
        </button>
    ;

    languagesContainer.appendChild(item);
}


/* ========================================
   ADD ACHIEVEMENT
======================================== */

function addAchievement(data = {}) {

    const container =
        document.getElementById("achievementsContainer");

    if (!container) {
        return;
    }

    const item =
        document.createElement("div");

    item.className = "dynamic-item achievement-item";

    item.innerHTML = 
        <h4>Achievement</h4>

        <div class="form-group">
            <label>Achievement</label>

            <textarea
                class="achievement-text"
                placeholder="Describe your achievement..."
            >${escapeHTML(data.text || "")}</textarea>

        </div>

        <button
            type="button"
            class="remove-btn"
            onclick="this.parentElement.remove(); updatePreview();">
            Remove
        </button>
    ;

    container.appendChild(item);
}


/* ========================================
   ADD SKILL
======================================== */

function addSkill() {

    const skillInput =
        document.getElementById("skillInput");

    if (!skillInput) {
        return;
    }

    const skill =
        skillInput.value.trim();

    if (!skill) {
        return;
    }

    if (!currentResume.skills.includes(skill)) {
        currentResume.skills.push(skill);
    }

    skillInput.value = "";

    displaySkills();

    updatePreview();
}


/* ========================================
   DISPLAY SKILLS
======================================== */

function displaySkills() {

    if (!skillsContainer) {
        return;
    }

    skillsContainer.innerHTML = "";

    currentResume.skills.forEach(
        function (skill, index) {

            const tag =
                document.createElement("span");

            tag.className = "skill-tag";

            tag.innerHTML = 
                ${escapeHTML(skill)}

                <button
                    type="button"
                    onclick="removeSkill(${index})">
                    ×
                </button>
            ;

            skillsContainer.appendChild(tag);
        }
    );
}


/* ========================================
   REMOVE SKILL
======================================== */

function removeSkill(index) {

    currentResume.skills.splice(index, 1);

    displaySkills();

    updatePreview();
}


/* ========================================
   COLLECT FORM DATA
======================================== */

function collectResumeData() {

    const getValue = function (id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    };


    /* Personal */

    currentResume.personal.fullName =
        getValue("fullName");

    currentResume.personal.email =
        getValue("email");

    currentResume.personal.phone =
        getValue("phone");

    currentResume.personal.address =
        getValue("address");

    currentResume.personal.linkedin =
        getValue("linkedin");

    currentResume.personal.github =
        getValue("github");

    currentResume.personal.website =
        getValue("website");


    /* Summary */

    currentResume.summary =
        getValue("summary");


    /* Education */

    currentResume.education = [];

    document
        .querySelectorAll(".education-item")
        .forEach(function (item) {

            currentResume.education.push({

                degree:
                    item.querySelector(
                        ".education-degree"
                    )?.value.trim() || "",

                college:
                    item.querySelector(
                        ".education-college"
                    )?.value.trim() || "",

                startYear:
                    item.querySelector(
                        ".education-start"
                    )?.value.trim() || "",

                endYear:
                    item.querySelector(
                        ".education-end"
                    )?.value.trim() || "",

                grade:
                    item.querySelector(
                        ".education-grade"
                    )?.value.trim() || ""
            });
        });


    /* Experience */

    currentResume.experience = [];

    document
        .querySelectorAll(".experience-item")
        .forEach(function (item) {

            currentResume.experience.push({

                company:
                    item.querySelector(
                        ".experience-company"
                    )?.value.trim() || "",

                position:
                    item.querySelector(
                        ".experience-position"
                    )?.value.trim() || "",

                startDate:
                    item.querySelector(
                        ".experience-start"
                    )?.value.trim() || "",

                endDate:
                    item.querySelector(
                        ".experience-end"
                    )?.value.trim() || "",

                responsibilities:
                    item.querySelector(
                        ".experience-responsibilities"
                    )?.value.trim() || ""
            });
        });


    /* Projects */

    currentResume.projects = [];

    document
        .querySelectorAll(".project-item")
        .forEach(function (item) {

            currentResume.projects.push({

                title:
                    item.querySelector(
                        ".project-title"
                    )?.value.trim() || "",

                description:
                    item.querySelector(
                        ".project-description"
                    )?.value.trim() || "",

                technologies:
                    item.querySelector(
                        ".project-technologies"
                    )?.value.trim() || "",

                github:
                    item.querySelector(
                        ".project-github"
                    )?.value.trim() || "",

                live:
                    item.querySelector(
                        ".project-live"
                    )?.value.trim() || ""
            });
        });


    /* Certifications */

    currentResume.certifications = [];

    document
        .querySelectorAll(".certification-item")
        .forEach(function (item) {

            currentResume.certifications.push({

                name:
                    item.querySelector(
                        ".certification-name"
                    )?.value.trim() || "",

                organization:
                    item.querySelector(
                        ".certification-organization"
                    )?.value.trim() || "",

                year:
                    item.querySelector(
                        ".certification-year"
                    )?.value.trim() || ""
            });
        });


    /* Languages */

    currentResume.languages = [];

    document
        .querySelectorAll(".language-item")
        .forEach(function (item) {

            currentResume.languages.push({

                name:
                    item.querySelector(
                        ".language-name"
                    )?.value.trim() || "",

                proficiency:
                    item.querySelector(
                        ".language-proficiency"
                    )?.value || ""
            });
        });


    /* Achievements */

    currentResume.achievements = [];

    document
        .querySelectorAll(".achievement-item")
        .forEach(function (item) {

            currentResume.achievements.push({

                text:
                    item.querySelector(
                        ".achievement-text"
                    )?.value.trim() || ""
            });
        });


    currentResume.updatedAt =
        getDate();

    return currentResume;
}


/* ========================================
   SAVE RESUME
======================================== */

function saveResume() {

    collectResumeData();

    if (!currentResume.personal.fullName) {

        alert("Please enter your full name.");

        return;
    }


    if (!currentResume.personal.email) {

        alert("Please enter your email.");

        return;
    }


    const resumes =
        getSavedResumes();


    if (!currentResume.id) {

        currentResume.id =
            generateResumeId();

        currentResume.createdAt =
            getDate();

        resumes.push(
            JSON.parse(
                JSON.stringify(currentResume)
            )
        );

    } else {

        const index =
            resumes.findIndex(
                function (resume) {

                    return String(resume.id) ===
                        String(currentResume.id);
                }
            );

        if (index !== -1) {

            resumes[index] =
                JSON.parse(
                    JSON.stringify(currentResume)
                );

        } else {

            resumes.push(
                JSON.parse(
                    JSON.stringify(currentResume)
                )
            );
        }
    }


    saveAllResumes(resumes);

    localStorage.removeItem(
        "resumeAIEditingId"
    );

    alert("Resume saved successfully!");

    window.location.href =
        "dashboard.html";
}


/* ========================================
   LOAD RESUME FOR EDITING
======================================== */

function loadResume() {

    const editingId =
        localStorage.getItem(
            "resumeAIEditingId"
        );

    if (!editingId) {
        return;
    }

    const resumes =
        getSavedResumes();

    const resume =
        resumes.find(function (item) {

            return String(item.id) ===
                String(editingId);
        });

    if (!resume) {
        return;
    }

    currentResume =
        JSON.parse(
            JSON.stringify(resume)
        );


    /* Personal */

    setValue(
        "fullName",
        currentResume.personal.fullName
    );

    setValue(
        "email",
        currentResume.personal.email
    );

    setValue(
        "phone",
        currentResume.personal.phone
    );

    setValue(
        "address",
        currentResume.personal.address
    );

    setValue(
        "linkedin",
        currentResume.personal.linkedin
    );

    setValue(
        "github",
        currentResume.personal.github
    );

    setValue(
        "website",
        currentResume.personal.website
    );


    /* Summary */

    setValue(
        "summary",
        currentResume.summary
    );


    /* Clear existing dynamic items */

    clearContainer(educationContainer);
    clearContainer(experienceContainer);
    clearContainer(projectsContainer);
    clearContainer(certificationsContainer);
    clearContainer(languagesContainer);

    const achievementsContainer =
        document.getElementById(
            "achievementsContainer"
        );

    clearContainer(achievementsContainer);


    /* Load Education */

    currentResume.education.forEach(
        function (education) {
            addEducation(education);
        }
    );


    /* Load Experience */

    currentResume.experience.forEach(
        function (experience) {
            addExperience(experience);
        }
    );


    /* Load Projects */

    currentResume.projects.forEach(
        function (project) {
            addProject(project);
        }
    );


    /* Load Certifications */

    currentResume.certifications.forEach(
        function (certification) {
            addCertification(certification);
        }
    );


    /* Load Languages */

    currentResume.languages.forEach(
        function (language) {
            addLanguage(language);
        }
    );


    /* Load Achievements */

    currentResume.achievements.forEach(
        function (achievement) {
            addAchievement(achievement);
        }
    );


    displaySkills();

    updatePreview();
}


/* ========================================
   SET VALUE
======================================== */

function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value = value || "";
    }
}


/* ========================================
   CLEAR CONTAINER
======================================== */

function clearContainer(container) {

    if (container) {
        container.innerHTML = "";
    }
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
   UPDATE PREVIEW
======================================== */

function updatePreview() {

    /*
       preview.js will handle the actual
       live resume preview.

       This function checks whether
       preview.js is available.
    */

    if (typeof generatePreview === "function") {
        generatePreview();
    }
}


/* ========================================
   ADD BUTTON EVENTS
======================================== */

const addEducationButton =
    document.getElementById("addEducation");

if (addEducationButton) {

    addEducationButton.addEventListener(
        "click",
        function () {
            addEducation();
        }
    );
}


const addExperienceButton =
    document.getElementById("addExperience");

if (addExperienceButton) {

    addExperienceButton.addEventListener(
        "click",
        function () {
            addExperience();
        }
    );
}


const addProjectButton =
    document.getElementById("addProject");

if (addProjectButton) {

    addProjectButton.addEventListener(
        "click",
        function () {
            addProject();
        }
    );
}


const addCertificationButton =
    document.getElementById("addCertification");

if (addCertificationButton) {

    addCertificationButton.addEventListener(
        "click",
        function () {
            addCertification();
        }
    );
}


const addLanguageButton =
    document.getElementById("addLanguage");

if (addLanguageButton) {

    addLanguageButton.addEventListener(
        "click",
        function () {
            addLanguage();
        }
    );
}


const addAchievementButton =
    document.getElementById("addAchievement");

if (addAchievementButton) {

    addAchievementButton.addEventListener(
        "click",
        function () {
            addAchievement();
        }
    );
}


const addSkillButton =
    document.getElementById("addSkill");

if (addSkillButton) {

    addSkillButton.addEventListener(
        "click",
        function () {
            addSkill();
        }
    );
}


/* ========================================
   SAVE BUTTON
======================================== */

const saveResumeButton =
    document.getElementById("saveResume");

if (saveResumeButton) {

    saveResumeButton.addEventListener(
        "click",
        function () {
            saveResume();
        }
    );
}


/* ========================================
   FORM CHANGE EVENTS
======================================== */

if (resumeForm) {

    resumeForm.addEventListener(
        "input",
        function () {
            updatePreview();
        }
    );

    resumeForm.addEventListener(
        "change",
        function () {
            updatePreview();
        }
    );
}


/* ========================================
   INITIAL LOAD
======================================== */

if (resumeForm) {

    /*
       Add one empty education section
       when creating a new resume.
    */

    const editingId =
        localStorage.getItem(
            "resumeAIEditingId"
        );

    if (editingId) {

        loadResume();

    } else {

        if (
            educationContainer &&
            educationContainer.children.length === 0
        ) {
            addEducation();
        }

        if (
            experienceContainer &&
            experienceContainer.children.length === 0
        ) {
            addExperience();
        }

        if (
            projectsContainer &&
            projectsContainer.children.length === 0
        ) {
            addProject();
        }

        displaySkills();

        updatePreview();
    }
}


/* ========================================
   MAKE FUNCTIONS AVAILABLE TO HTML
======================================== */

window.addEducation = addEducation;
window.addExperience = addExperience;
window.addProject = addProject;
window.addCertification = addCertification;
window.addLanguage = addLanguage;
window.addAchievement = addAchievement;
window.addSkill = addSkill;
window.removeSkill = removeSkill;
window.saveResume = saveResume;
window.updatePreview = updatePreview;
```
