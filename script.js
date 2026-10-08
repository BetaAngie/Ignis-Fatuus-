
const settingsBtn = document.getElementById("settingsBtn");
const tutorialBtn = document.getElementById("tutorialBtn");
const gameDialog = document.getElementById("gameDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

// Restore saved preferences.
const savedEffects = localStorage.getItem("ignis-reduce-effects");

if (savedEffects === "true") {
    document.body.classList.add("reduce-effects");
}

// Open the tutorial.
tutorialBtn?.addEventListener("click", () => {
    dialogContent.innerHTML = `
        <h2>How to Begin</h2>
        <p>Welcome to Ignis Fatuus.</p>
        <p><strong>Premise:</strong> Learn about the story and its world.</p>
        <p><strong>New Journey:</strong> Enter the Discord community.</p>
        <p><strong>Credits:</strong> Meet the people behind the project.</p>
        <p>Read the roleplay rules before creating a character
        or participating in the story.</p>
    `;

    gameDialog.showModal();
});

// Open settings.
settingsBtn?.addEventListener("click", () => {
    const enabled = document.body.classList.contains("reduce-effects");

    dialogContent.innerHTML = `
        <h2>Settings</h2>
        <p>Adjust the visual experience to your preference.</p>

        <label class="dialog-option">
            <input
                type="checkbox"
                id="effectsToggle"
                ${enabled ? "checked" : ""}>
            <span>Reduce glow and animation effects</span>
        </label>
    `;

    const effectsToggle = document.getElementById("effectsToggle");

    effectsToggle.addEventListener("change", () => {
        document.body.classList.toggle(
            "reduce-effects",
            effectsToggle.checked
        );

        localStorage.setItem(
            "ignis-reduce-effects",
            String(effectsToggle.checked)
        );
    });

    gameDialog.showModal();
});

// Close the dialog.
closeDialog.addEventListener("click", () => {
    gameDialog.close();
});

// Clicking outside the dialog closes it.
gameDialog.addEventListener("click", (event) => {
    if (event.target === gameDialog) {
        gameDialog.close();
    }
});

// Fade out when navigating to another local HTML page.
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            link.target === "_blank"
        ) {
            return;
        }

        const destination = new URL(link.href, location.href);

        if (destination.origin !== location.origin) return;

        event.preventDefault();

        document.body.classList.add("page-leaving");

        setTimeout(() => {
            location.href = destination.href;
        }, 180);
    });
});
