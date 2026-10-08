const clueButtons = document.querySelectorAll(".evidence-card");
const form = document.getElementById("puzzle-form");
const answerInput = document.getElementById("puzzle-answer");
const feedback = document.getElementById("puzzle-feedback");
const secretMessage = document.getElementById("secret-message");

clueButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const clueId = button.dataset.clue;
        const clue = document.getElementById(`clue-${clueId}`);

        clue.hidden = !clue.hidden;
        button.setAttribute("aria-expanded", String(!clue.hidden));
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const answer = answerInput.value.trim();

    if (answer === "08:15") {
        feedback.textContent = "ACCESS GRANTED.";
        secretMessage.hidden = false;

        try {
            localStorage.setItem("ignisPuzzleSolved", "true");
        } catch {
            // The puzzle still works if browser storage is unavailable.
        }
    } else {
        feedback.textContent =
            "ACCESS DENIED. Reexamine the recovered evidence.";
        secretMessage.hidden = true;
    }
});

try {
    if (localStorage.getItem("ignisPuzzleSolved") === "true") {
        feedback.textContent = "PREVIOUS ACCESS CONFIRMED.";
        secretMessage.hidden = false;
    }
} catch {
    // Ignore unavailable browser storage.
}
