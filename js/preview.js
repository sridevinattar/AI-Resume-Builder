```javascript
/* ========================================
   AI RESUME BUILDER - PREVIEW.JS
   Live Resume Preview
======================================== */


/* ========================================
   PREVIEW ELEMENT
======================================== */

const resumePreview =
    document.getElementById("resumePreview");


/* ========================================
   GENERATE LIVE PREVIEW
======================================== */

function generatePreview() {

    if (!resumePreview) {
        return;
    }

    const getValue = function (id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";
    };


    /* ========================================
       PERSONAL INFORMATION
    ======================================== */

    const fullName =
        getValue("fullName") || "Your Name";

    const email =
        getValue("email");

    const phone =
        getValue("phone");

    const address =
        getValue("address");

    const linkedin =
        getValue("linkedin");

    const github =
        getValue("github");

    const website =
        getValue("website");


    /* ========================================
       SUMMARY
    ======================================== */

    const summary =
        getValue("summary");


    /* ========================================
       EDUCATION
    ======================================== */

    let educationHTML = "";

    document
        .querySelectorAll(".education-item")
        .forEach(function (item) {

            const degree =
                item.querySelector(
                    ".education-degree"
                )?.value.trim();

            const college =
                item.querySelector(
                    ".education-college"
                )?.value.trim();

            const start =
                item.querySelector(
                    ".education-start"
                )?.value.trim();

            const end =
                item.querySelector(
                    ".education-end"
                )?.value.trim();

            const grade =
                item.querySelector(
                    ".education-grade"
                )?.value.trim();


            if (
                degree ||
                college ||
                start ||
                end ||
                grade
            ) {

                educationHTML += 
                    <div class="preview-item">

                        <h3>
                            ${escapePreview(degree)}
                        </h3>

                        <p>
                            ${escapePreview(college)}
                        </p>

                        <p class="date">
                            ${escapePreview(start)}
                            ${start || end ? " - " : ""}
                            ${escapePreview(end)}
                        </p>

                        ${
                            grade
                            ? <p>${escapePreview(grade)}</p>
                            : ""
                        }

                    </div>
                ;
            }
        });


    /* ========================================
       EXPERIENCE
    ======================================== */

    let experienceHTML = "";

    document
        .querySelectorAll(".experience-item")
        .forEach(function (item) {

            const company =
                item.querySelector(
                    ".experience-company"
                )?.value.trim();

            const position =
                item.querySelector(
                    ".experience-position"
                )?.value.trim();

            const start =
                item.querySelector(
                    ".experience-start"
                )?.value.trim();

            const end =
                item.querySelector(
                    ".experience-end"
                )?.value.trim();

            const responsibilities =
                item.querySelector(
                    ".experience-responsibilities"
                )?.value.trim();


            if (
                company ||
                position ||
                responsibilities
            ) {

                experienceHTML += 
                    <div class="preview-item">

                        <h3>
                            ${escapePreview(position)}
                        </h3>

                        <p>
                            <strong>
                                ${escapePreview(company)}
                            </strong>
                        </p>

                        <p class="date">
                            ${escapePreview(start)}
                            ${start || end ? " - " : ""}
                            ${escapePreview(end)}
                        </p>

                        ${
                            responsibilities
                            ? <p>
                                ${escapePreview(
                                    responsibilities
                                )}
                               </p>
                            : ""
                        }

                    </div>
                ;
            }
        });


    /* ========================================
       PROJECTS
    ======================================== */

    let projectsHTML = "";

    document
        .querySelectorAll(".project-item")
        .forEach(function (item) {

            const title =
                item.querySelector(
                    ".project-title"
                )?.value.trim();

            const description =
                item.querySelector(
                    ".project-description"
                )?.value.trim();

            const technologies =
                item.querySelector(
                    ".project-technologies"
                )?.value.trim();

            const github =
                item.querySelector(
                    ".project-github"
                )?.value.trim();

            const live =
                item.querySelector(
                    ".project-live"
                )?.value.trim();


            if (
                title ||
                description ||
                technologies
            ) {

                projectsHTML += 
                    <div class="preview-item">

                        <h3>
                            ${escapePreview(title)}
                        </h3>

                        ${
                            description
                            ? <p>
                                ${escapePreview(
                                    description
                                )}
                               </p>
                            : ""
                        }

                        ${
                            technologies
                            ? <p>
                                <strong>
                                    Technologies:
                                </strong>
                                ${escapePreview(
                                    technologies
                                )}
                               </p>
                            : ""
                        }

                        ${
                            github
                            ? <p>
                                GitHub:
                                ${escapePreview(github)}
                               </p>
                            : ""
                        }

                        ${
                            live
                            ? `<p>
                                Live:
                                ${escapePreview(live)}
                               </p>
                            : ""
                        }

                    </div>
                ;
            }
        });


    /* ========================================
       CERTIFICATIONS
    ======================================== */

    let certificationsHTML = "";

    document
        .querySelectorAll(".certification-item")
        .forEach(function (item) {

            const name =
                item.querySelector(
                    ".certification-name"
                )?.value.trim();

            const organization =
                item.querySelector(
                    ".certification-organization"
                )?.value.trim();

            const year =
                item.querySelector(
                    ".certification-year"
                )?.value.trim();


            if (
                name ||
                organization ||
                year
            ) {

                certificationsHTML += 
                    <div class="preview-item">

                        <h3>
                            ${escapePreview(name)}
                        </h3>

                        <p>
                            ${escapePreview(organization)}
                        </p>

                        <p class="date">
                            ${escapePreview(year)}
                        </p>

                    </div>
                ;
            }
        });


    /* ========================================
       LANGUAGES
    ======================================== */

    let languagesHTML = "";

    document
        .querySelectorAll(".language-item")
        .forEach(function (item) {

            const language =
                item.querySelector(
                    ".language-name"
                )?.value.trim();

            const proficiency =
                item.querySelector(
                    ".language-proficiency"
                )?.value;


            if (language) {

                languagesHTML += 
                    <div class="preview-item">

                        <p>
                            <strong>
                                ${escapePreview(language)}
                            </strong>

                            ${
                                proficiency
                                ? " - " +
                                  escapePreview(
                                      proficiency
                                  )
                                : ""
                            }
                        </p>

                    </div>
                ;
            }
        });


    /* ========================================
       ACHIEVEMENTS
    ======================================== */

    let achievementsHTML = "";

    document
        .querySelectorAll(".achievement-item")
        .forEach(function (item) {

            const achievement =
                item.querySelector(
                    ".achievement-text"
                )?.value.trim();


            if (achievement) {

                achievementsHTML += 
                    <div class="preview-item">

                        <p>
                            ${escapePreview(
                                achievement
                            )}
                        </p>

                    </div>
                ;
            }
        });


    /* ========================================
       SKILLS
    ======================================== */

    let skillsHTML = "";

    if (
        typeof currentResume !== "undefined" &&
        currentResume.skills
    ) {

        currentResume.skills.forEach(
            function (skill) {

                skillsHTML += 
                    <span class="preview-skill">
                        ${escapePreview(skill)}
                    </span>
                ;
            }
        );
    }


    /* ========================================
       CONTACT INFORMATION
    ======================================== */

    let contactHTML = "";

    if (email) {
        contactHTML += 
            <span>${escapePreview(email)}</span>
        ;
    }

    if (phone) {
        contactHTML += 
            <span>${escapePreview(phone)}</span>
        ;
    }

    if (address) {
        contactHTML += 
            <span>${escapePreview(address)}</span>
        ;
    }


    /* ========================================
       SOCIAL LINKS
    ======================================== */

    let linksHTML = "";

    if (linkedin) {
        linksHTML += 
            <span>
                LinkedIn: ${escapePreview(linkedin)}
            </span>
        ;
    }

    if (github) {
        linksHTML += 
            <span>
                GitHub: ${escapePreview(github)}
            </span>
        ;
    }

    if (website) {
        linksHTML += 
            <span>
                Website: ${escapePreview(website)}
            </span>
        ;
    }


    /* ========================================
       COMPLETE RESUME
    ======================================== */

    resumePreview.innerHTML = 

        <div class="resume-preview-header">

            <h1>
                ${escapePreview(fullName)}
            </h1>

            ${
                contactHTML
                ? <div class="preview-contact">
                    ${contactHTML}
                   </div>
                : ""
            }

            ${
                linksHTML
                ? <div class="preview-links">
                    ${linksHTML}
                   </div>
                : ""
            }

        </div>


        ${
            summary
            ? 
                <section class="preview-section">

                    <h2>
                        Professional Summary
                    </h2>

                    <p>
                        ${escapePreview(summary)}
                    </p>

                </section>
            
            : ""
        }


        ${
            educationHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Education
                    </h2>

                    ${educationHTML}

                </section>
            
            : ""
        }


        ${
            skillsHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Skills
                    </h2>

                    <div class="preview-skills">
                        ${skillsHTML}
                    </div>

                </section>
            
            : ""
        }


        ${
            experienceHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Work Experience
                    </h2>

                    ${experienceHTML}

                </section>
            
            : ""
        }


        ${
            projectsHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Projects
                    </h2>

                    ${projectsHTML}

                </section>
            
            : ""
        }


        ${
            certificationsHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Certifications
                    </h2>

                    ${certificationsHTML}

                </section>
            
            : ""
        }


        ${
            languagesHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Languages
                    </h2>

                    ${languagesHTML}

                </section>
            
            : ""
        }


        ${
            achievementsHTML
            ? 
                <section class="preview-section">

                    <h2>
                        Achievements
                    </h2>

                    ${achievementsHTML}

                </section>
            
            : ""
        }

    ;

    applySelectedColor();
    }


/* ========================================
   ESCAPE PREVIEW TEXT
======================================== */

function escapePreview(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* ========================================
   TEMPLATE SELECTION
======================================== */

const templateOptions =
    document.querySelectorAll(".template-option");

templateOptions.forEach(
    function (option) {

        option.addEventListener(
            "click",
            function () {

                templateOptions.forEach(
                    function (item) {
                        item.classList.remove("active");
                    }
                );

                this.classList.add("active");

                const template =
                    this.dataset.template;

                if (
                    typeof currentResume !== "undefined"
                ) {
                    currentResume.template =
                        template;
                }

                applyTemplate(template);
            }
        );
    }
);


/* ========================================
   APPLY TEMPLATE
======================================== */

function applyTemplate(template) {

    if (!resumePreview) {
        return;
    }

    resumePreview.classList.remove(
        "template1",
        "template2",
        "template3"
    );

    resumePreview.classList.add(
        template || "template1"
    );
}


/* ========================================
   COLOR SELECTION
======================================== */

const colorOptions =
    document.querySelectorAll(".color-option");

colorOptions.forEach(
    function (option) {

        option.addEventListener(
            "click",
            function () {

                colorOptions.forEach(
                    function (item) {
                        item.classList.remove("active");
                    }
                );

                this.classList.add("active");

                const color =
                    this.dataset.color ||
                    this.style.backgroundColor;

                if (
                    typeof currentResume !== "undefined"
                ) {
                    currentResume.color =
                        color;
                }

                applyColor(color);
            }
        );
    }
);


/* ========================================
   APPLY COLOR
======================================== */

function applyColor(color) {

    if (!resumePreview || !color) {
        return;
    }

    resumePreview.style.setProperty(
        "--resume-color",
        color
    );

    resumePreview
        .querySelectorAll(
            ".preview-section h2"
        )
        .forEach(function (heading) {

            heading.style.color = color;
        });

    const header =
        resumePreview.querySelector(
            ".resume-preview-header"
        );

    if (header) {
        header.style.borderBottomColor =
            color;
    }
}


/* ========================================
   APPLY SAVED COLOR
======================================== */

function applySelectedColor() {

    if (
        typeof currentResume === "undefined"
    ) {
        return;
    }

    if (currentResume.color) {
        applyColor(currentResume.color);
    }
}


/* ========================================
   PHOTO PREVIEW
======================================== */

const photoInput =
    document.getElementById("profilePhoto");

const photoPreview =
    document.getElementById("profilePhotoPreview");


if (photoInput) {

    photoInput.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function (e) {

                    if (photoPreview) {

                        photoPreview.src =
                            e.target.result;
                    }

                    if (
                        typeof currentResume !==
                        "undefined"
                    ) {

                        currentResume.personal.photo =
                            e.target.result;
                    }

                    addPhotoToResume(
                        e.target.result
                    );
                };

            reader.readAsDataURL(file);
        }
    );
}


/* ========================================
   ADD PHOTO TO RESUME
======================================== */

function addPhotoToResume(photo) {

    if (!resumePreview || !photo) {
        return;
    }

    let image =
        resumePreview.querySelector(
            ".resume-profile-photo"
        );

    if (!image) {

        const header =
            resumePreview.querySelector(
                ".resume-preview-header"
            );

        if (!header) {
            return;
        }

        image =
            document.createElement("img");

        image.className =
            "resume-profile-photo";

        header.insertBefore(
            image,
            header.firstChild
        );
    }

    image.src = photo;
}


/* ========================================
   PRINT RESUME
======================================== */

const printButton =
    document.getElementById("printResume");

if (printButton) {

    printButton.addEventListener(
        "click",
        function () {

            window.print();
        }
    );
}


/* ========================================
   DOWNLOAD / PRINT PDF
======================================== */

const downloadButton =
    document.getElementById("downloadResume");

if (downloadButton) {

    downloadButton.addEventListener(
        "click",
        function () {

            alert(
                "Use the Print option and select 'Save as PDF' to download your resume."
            );

            window.print();
        }
    );
}


/* ========================================
   PREVIEW BUTTON
======================================== */

const previewButton =
    document.getElementById("previewResume");

if (previewButton) {

    previewButton.addEventListener(
        "click",
        function () {

            if (!resumePreview) {
                return;
            }

            resumePreview.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    );
}


/* ========================================
   INITIAL PREVIEW
======================================== */

if (resumePreview) {

    generatePreview();
}


/* ========================================
   MAKE FUNCTIONS AVAILABLE
======================================== */

window.generatePreview =
    generatePreview;

window.applyTemplate =
    applyTemplate;

window.applyColor =
    applyColor;
window.addPhotoToResume =
    addPhotoToResume;