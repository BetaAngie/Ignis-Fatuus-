
const scenes = {
    inspect: {
        label: "SYSTEM LOG // 002",
        text: "The terminal responds to your touch. A list of names appears, but one entry has been erased.",
        choices: [
            ["search", "Search for the erased entry"],
            ["leave", "Leave the terminal alone"]
        ]
    },

    call: {
        label: "AUDIO LOG // 003",
        text: "Your voice disappears into the silence. Somewhere beyond the room, something clicks twice.",
        choices: [
            ["follow", "Follow the sound"],
            ["return", "Return to the terminal"]
        ]
    },

    wait: {
        label: "SYSTEM LOG // 004",
        text: "Seconds pass. Then a new message appears: 'Silence has been recorded.'",
        choices: [
            ["inspect", "Inspect the terminal"],
            ["leave", "Step away"]
        ]
    },

    search: {
        label: "FILE RECOVERED // 005",
        text: "The erased entry leaves behind a fragment: ACCESS IS NOT THE SAME AS PERMISSION.",
        choices: [
            ["finish", "Close the recovered file"]
        ]
    },

    leave: {
        label: "SESSION PAUSED",
        text: "You step away. The terminal remains active behind you.",
        choices: [
            ["finish", "End the scene"]
        ]
    },

    follow: {
        label: "AUDIO LOG // 006",
        text: "The clicking stops. You find a locked door and a small symbol etched into its surface.",
        choices: [
            ["finish", "Memorize the symbol"]
        ]
    },

    return: {
        label: "SYSTEM LOG // 007",
        text: "The terminal is still waiting. The message on screen has changed.",
        choices: [
            ["search", "Search the records"],
            ["finish", "End the scene"]
        ]
    },

    finish: {
        label: "END OF RECOVERED RECORD",
        text: "The record ends here. The rest of the investigation awaits.",
        choices: []
    }
};

const label = document.getElementById("scene-label");
const storyText = document.getElementById("story-text");
const choicesBox = document.getElementById("story-choices");
const feedback = document.getElementById("story-feedback");
const restart = document.getElementById("restart-story");

function showScene(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) return;

    label.textContent = scene.label;
    storyText.textContent = scene.text;
    feedback.textContent = "";
    choicesBox.replaceChildren();

    scene.choices.forEach(([nextId, choiceText]) => {
        const button = document.createElement("button");
        button.textContent = choiceText;

        button.addEventListener("click", () => {
            showScene(nextId);
        });

        choicesBox.appendChild(button);
    });

    restart.hidden = sceneId !== "finish";
}

restart.addEventListener("click", () => {
    showScene("inspect");
});

// Start with the original opening choices.
showScene("inspect");
