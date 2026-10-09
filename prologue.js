
/* ==================================================
   IGNIS FATUUS — NEW JOURNEY
   File: js/new-journey.js
================================================== */

// Replace this with your actual Discord server invite.
const DISCORD_INVITE = "https://discord.gg/YOUR-INVITE";

const scenes = {
    beginning: {
        chapter: "PROLOGUE · 01",
        title: "THE BEGINNING",
        background: "../Images/journey/hallway.webp",
        lines: [
            {
                speaker: "NARRATION",
                text: "The first thing you notice is the silence."
            },
            {
                speaker: "NARRATION",
                text: "No footsteps. No voices. Not even the distant hum of machinery."
            },
            {
                speaker: "NARRATION",
                text: "Only the flickering lights above you, and a door at the end of the hall that you don't remember seeing before."
            },
            {
                speaker: "???",
                text: "You're not supposed to be here yet."
            }
        ],
        choices: [
            {
                text: "Ask who they are.",
                next: "question"
            },
            {
                text: "Approach the mysterious door.",
                next: "door"
            },
            {
                text: "Remain silent and observe.",
                next: "observe"
            }
        ]
    },

    question: {
        chapter: "PROLOGUE · 02",
        title: "A STRANGER'S WARNING",
        background: "../Images/journey/figure.webp",
        lines: [
            {
                speaker: "YOU",
                text: "\"Who are you? And what do you mean I'm not supposed to be here?\""
            },
            {
                speaker: "NARRATION",
                text: "The figure remains motionless beneath the dying lights. For a moment, you wonder if they heard you at all."
            },
            {
                speaker: "???",
                text: "\"Someone who knows what happens when people open doors they don't understand.\""
            },
            {
                speaker: "NARRATION",
                text: "Their gaze shifts toward the end of the hall."
            },
            {
                speaker: "???",
                text: "\"If you're determined to stay, at least learn when not to trust someone.\""
            }
        ]
    },

    door: {
        chapter: "PROLOGUE · 02",
        title: "BEYOND THE THRESHOLD",
        background: "../Images/journey/final-door.webp",
        lines: [
            {
                speaker: "NARRATION",
                text: "You take a step toward the door. Then another."
            },
            {
                speaker: "NARRATION",
                text: "The closer you get, the colder the air becomes. Something on the other side seems to be waiting."
            },
            {
                speaker: "???",
                text: "\"Curiosity. That's how it always begins.\""
            },
            {
                speaker: "NARRATION",
                text: "A faint click echoes through the corridor. The door unlocks by itself."
            },
            {
                speaker: "???",
                text: "\"Well? You wanted to know what was inside.\""
            }
        ]
    },

    observe: {
        chapter: "PROLOGUE · 02",
        title: "THE UNSEEN",
        background: "../Images/journey/figure.webp",
        lines: [
            {
                speaker: "NARRATION",
                text: "You say nothing. Instead, you study the corridor and the stranger's silhouette."
            },
            {
                speaker: "NARRATION",
                text: "Their shadow stretches across the floor, though the light above them has already gone dark."
            },
            {
                speaker: "???",
                text: "\"Smart. Silence keeps more secrets than words ever could.\""
            },
            {
                speaker: "NARRATION",
                text: "For a brief moment, you think you see someone standing behind them."
            },
            {
                speaker: "NARRATION",
                text: "You blink. The corridor is empty again."
            }
        ]
    },

    revelation: {
        chapter: "PROLOGUE · 03",
        title: "A WORLD OF SECRETS",
        background: "../Images/journey/final-door.webp",
        lines: [
            {
                speaker: "NARRATION",
                text: "Beyond the corridor lies a world that looks almost familiar."
            },
            {
                speaker: "NARRATION",
                text: "People have their own histories, their own secrets, and reasons for being here. Some will offer a helping hand. Others may have something to hide."
            },
            {
                speaker: "???",
                text: "\"You won't find all your answers here.\""
            },
            {
                speaker: "???",
                text: "\"The real story begins when you meet the others.\""
            },
            {
                speaker: "NARRATION",
                text: "The door opens. Somewhere beyond it, voices rise from the darkness."
            }
        ]
    }
};

// --------------------------------------------------
// Elements
// --------------------------------------------------

const chapterLabel = document.getElementById("chapter-label");
const sceneHeading = document.getElementById("scene-heading");
const storyScene = document.getElementById("story-scene");

const speakerName = document.getElementById("speaker-name");
const dialogueText = document.getElementById("dialogue-text");
const dialogueCounter = document.getElementById("dialogue-counter");
const nextButton = document.getElementById("next-button");

const choiceSection = document.getElementById("choice-section");
const choiceList = document.getElementById("choice-list");

const endingPanel = document.getElementById("ending-panel");
const discordLink = document.getElementById("discord-link");

// --------------------------------------------------
// State
// --------------------------------------------------

let currentScene = "beginning";
let currentLine = 0;
let typingTimer = null;
let isTyping = false;
let typewriterVersion = 0;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// --------------------------------------------------
// Scene loading
// --------------------------------------------------

function loadScene(sceneName) {
    clearTimeout(typingTimer);
    typewriterVersion++;

    const scene = scenes[sceneName];

    if (!scene) return;

    currentScene = sceneName;
    currentLine = 0;

    choiceSection.hidden = true;
    endingPanel.hidden = true;
    storyScene.hidden = false;

    chapterLabel.textContent = scene.chapter;
    sceneHeading.textContent = scene.title;

    storyScene.style.backgroundImage = `
        linear-gradient(
            180deg,
            rgba(5, 7, 18, 0.08) 0%,
            rgba(5, 7, 18, 0.25) 40%,
            rgba(5, 7, 18, 0.88) 100%
        ),
        url("${scene.background}")
    `;

    renderLine();
}

// --------------------------------------------------
// Dialogue and typewriter
// --------------------------------------------------

function renderLine() {
    clearTimeout(typingTimer);

    const scene = scenes[currentScene];
    const line = scene.lines[currentLine];

    speakerName.textContent = line.speaker;
    dialogueCounter.textContent =
        `${String(currentLine + 1).padStart(2, "0")} / ` +
        `${String(scene.lines.length).padStart(2, "0")}`;

    nextButton.disabled = false;
    nextButton.innerHTML = 'CONTINUE <span aria-hidden="true">→</span>';

    typeText(line.text);
}

function typeText(text) {
    clearTimeout(typingTimer);

    const version = ++typewriterVersion;

    if (reducedMotion) {
        dialogueText.textContent = text;
        isTyping = false;
        nextButton.innerHTML =
            'CONTINUE <span aria-hidden="true">→</span>';
        return;
    }

    isTyping = true;
    dialogueText.textContent = "";

    nextButton.innerHTML =
        'SKIP <span aria-hidden="true">»</span>';

    let index = 0;

    function typeNextCharacter() {
        if (version !== typewriterVersion) return;

        if (index < text.length) {
            dialogueText.textContent += text.charAt(index);
            index++;
            typingTimer = setTimeout(typeNextCharacter, 24);
        } else {
            isTyping = false;
            nextButton.innerHTML =
                'CONTINUE <span aria-hidden="true">→</span>';
        }
    }

    typeNextCharacter();
}

function advanceDialogue() {
    const scene = scenes[currentScene];

    if (isTyping) {
        clearTimeout(typingTimer);
        typewriterVersion++;

        dialogueText.textContent = scene.lines[currentLine].text;
        isTyping = false;

        nextButton.innerHTML =
            'CONTINUE <span aria-hidden="true">→</span>';

        return;
    }

    if (currentLine < scene.lines.length - 1) {
        currentLine++;
        renderLine();
        return;
    }

    // After the opening, display the interactive choices.
    if (currentScene === "beginning") {
        showChoices(scenes.beginning.choices);
        return;
    }

    // Each first choice leads into the same main story,
    // while preserving its own introductory scene.
    if (
        ["question", "door", "observe"].includes(currentScene)
    ) {
        loadScene("revelation");
        return;
    }

    // Finish the prologue.
    showEnding();
}

// --------------------------------------------------
// Interactive choices
// --------------------------------------------------

function showChoices(choices) {
    clearTimeout(typingTimer);

    choiceList.replaceChildren();
    choiceSection.hidden = false;
    nextButton.disabled = true;

    choices.forEach((choice, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "choice-button";
        button.textContent =
            `${String(index + 1).padStart(2, "0")} — ${choice.text}`;

        button.addEventListener("click", () => {
            loadScene(choice.next);
        });

        choiceList.appendChild(button);
    });

    choiceList.querySelector("button")?.focus();
}

// --------------------------------------------------
// Ending and Discord
// --------------------------------------------------

function showEnding() {
    clearTimeout(typingTimer);
    typewriterVersion++;
    isTyping = false;

    storyScene.hidden = true;
    choiceSection.hidden = true;
    endingPanel.hidden = false;

    discordLink.href = DISCORD_INVITE;

    chapterLabel.textContent = "PROLOGUE · COMPLETE";
    sceneHeading.textContent = "THE STORY CONTINUES";

    endingPanel.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center"
    });
}

// --------------------------------------------------
// Events
// --------------------------------------------------

nextButton.addEventListener("click", advanceDialogue);

// Allow the Space and Enter keys to advance the dialogue
// when the player is not focused on a choice or link.
document.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    if (
        event.target instanceof HTMLButtonElement ||
        event.target instanceof HTMLAnchorElement
    ) {
        return;
    }

    if (event.key === " " || event.key === "Enter") {
        if (!storyScene.hidden && !nextButton.disabled) {
            event.preventDefault();
            advanceDialogue();
        }
    }
});

// --------------------------------------------------
// Start
// --------------------------------------------------

loadScene("beginning");