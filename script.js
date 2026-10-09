
/* ==========================================
   IGNIS FATUUS — ACCESSIBILITY & TUTORIAL
   File: script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const settingsBtn = document.getElementById("settingsBtn");
    const tutorialBtn = document.getElementById("tutorialBtn");
    const gameDialog = document.getElementById("gameDialog");
    const closeDialog = document.getElementById("closeDialog");
    const dialogContent = document.getElementById("dialogContent");

    // Stop safely if the required HTML is missing.
    if (
        !settingsBtn ||
        !tutorialBtn ||
        !gameDialog ||
        !closeDialog ||
        !dialogContent
    ) {
        console.warn("Ignis Fatuus: Menu dialog elements were not found.");
        return;
    }

    const STORAGE_KEY = "ignisFatuusAccessibility";

    const defaultSettings = {
        reducedMotion: false,
        largerText: false,
        highContrast: false
    };

    let settings = { ...defaultSettings };

    // Load saved accessibility preferences.
    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "null"
        );

        if (saved && typeof saved === "object") {
            settings = {
                reducedMotion: saved.reducedMotion === true,
                largerText: saved.largerText === true,
                highContrast: saved.highContrast === true
            };
        }
    } catch (error) {
        console.warn("Could not load accessibility preferences.", error);
    }

    // Apply preferences to the website.
    function applySettings() {
        document.body.classList.toggle(
            "reduce-effects",
            settings.reducedMotion
        );

        document.body.classList.toggle(
            "large-text",
            settings.largerText
        );

        document.body.classList.toggle(
            "high-contrast",
            settings.highContrast
        );
    }

    // Save preferences for future visits.
    function saveSettings() {
        applySettings();

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(settings)
            );
        } catch (error) {
            console.warn("Could not save accessibility preferences.", error);
        }
    }

    applySettings();

    // Open the dialog.
    function openDialog() {
        if (!gameDialog.open) {
            gameDialog.showModal();
        }
    }

    // Close the dialog.
    closeDialog.addEventListener("click", () => {
        gameDialog.close();
    });

    // Close when clicking the dark backdrop.
    gameDialog.addEventListener("click", (event) => {
        if (event.target === gameDialog) {
            gameDialog.close();
        }
    });

    // ======================================
    // ACCESSIBILITY SETTINGS
    // ======================================

    function showSettings() {
        dialogContent.innerHTML = `
            <h2>Accessibility Settings</h2>

            <p>
                Customize your experience in Ignis Fatuus.
                Your preferences will be saved on this device.
            </p>

            <label class="dialog-option">
                <input
                    type="checkbox"
                    id="reducedMotion"
                    ${settings.reducedMotion ? "checked" : ""}
                >
                <span>
                    <strong>Reduce animations</strong><br>
                    <small>
                        Reduce glowing title animations and visual effects.
                    </small>
                </span>
            </label>

            <label class="dialog-option">
                <input
                    type="checkbox"
                    id="largerText"
                    ${settings.largerText ? "checked" : ""}
                >
                <span>
                    <strong>Larger text</strong><br>
                    <small>
                        Increase the readability of text throughout the menu.
                    </small>
                </span>
            </label>

            <label class="dialog-option">
                <input
                    type="checkbox"
                    id="highContrast"
                    ${settings.highContrast ? "checked" : ""}
                >
                <span>
                    <strong>High contrast</strong><br>
                    <small>
                        Increase contrast between text, borders, and backgrounds.
                    </small>
                </span>
            </label>

            <button
                type="button"
                class="btn settings-reset"
                id="resetAccessibility"
            >
                Reset Settings
            </button>

            <p
                id="settingsStatus"
                class="settings-status"
                role="status"
                aria-live="polite"
            >
                Your preferences are saved automatically.
            </p>
        `;

        openDialog();

        const controls = [
            ["reducedMotion", "reducedMotion"],
            ["largerText", "largerText"],
            ["highContrast", "highContrast"]
        ];

        controls.forEach(([id, key]) => {
            const checkbox = document.getElementById(id);

            checkbox.addEventListener("change", () => {
                settings[key] = checkbox.checked;
                saveSettings();

                document.getElementById("settingsStatus").textContent =
                    "Accessibility preferences updated.";
            });
        });

        document
            .getElementById("resetAccessibility")
            .addEventListener("click", () => {
                settings = { ...defaultSettings };
                saveSettings();
                showSettings();

                document.getElementById("settingsStatus").textContent =
                    "Settings have been reset.";
            });
    }

    settingsBtn.addEventListener("click", showSettings);

    // ======================================
    // MAIN MENU TUTORIAL
    // ======================================

    function showTutorial() {
        dialogContent.innerHTML = `
            <h2>Field Guide</h2>

            <p>
                Welcome to <em>Ignis Fatuus</em>.
                This guide explains the different sections of your interface.
            </p>

            <section class="tutorial-entry">
                <h3>01. Premise</h3>
                <p>
                    Read the introduction to the story, its setting,
                    and the basic concept behind the experience.
                </p>
            </section>

            <section class="tutorial-entry">
                <h3>02. New Journey</h3>
                <p>
                    Begin the interactive story and follow its scenes
                    as the narrative unfolds.
                </p>
            </section>

            <section class="tutorial-entry">
                <h3>03. Evidence Archive</h3>
                <p>
                    Explore the character archive and discover
                    available information about the people connected
                    to the story.
                </p>
            </section>

            <section class="tutorial-entry">
                <h3>04. Credits</h3>
                <p>
                    View the people, resources, and acknowledgments
                    behind the project.
                </p>
            </section>

            <section class="tutorial-entry">
                <h3>05. Settings ⚙</h3>
                <p>
                    Customize visual accessibility options,
                    including reduced animations, larger text,
                    and higher contrast.
                </p>
            </section>

            <section class="tutorial-entry">
                <h3>06. Question Mark ?</h3>
                <p>
                    Reopen this field guide whenever you need
                    a reminder about the menu.
                </p>
            </section>

            <p class="tutorial-footer">
                Take your time. Observe carefully.
                Not every answer reveals the whole truth.
            </p>
        `;

        openDialog();
    }

    tutorialBtn.addEventListener("click", showTutorial);
});
