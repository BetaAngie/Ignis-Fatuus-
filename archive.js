
/* ==================================================
   IGNIS FATUUS — EVIDENCE ARCHIVE
   File: js/evidence.js

   Includes:
   1. Character archive and reveal configuration
   2. Character carousel navigation
   3. Character keyboard controls
   4. Character mobile swipe support
   5. Cast carousel navigation
   6. Cast mobile swipe support
   7. Responsive carousel positioning
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================================
       1. CHARACTER CAROUSEL ELEMENTS
    ============================================== */

    const viewport = document.getElementById("carousel-viewport");
    const track = document.getElementById("carousel-track");
    const cards = [...document.querySelectorAll(".character-card")];

    const previousButton =
        document.getElementById("previous-character");

    const nextButton =
        document.getElementById("next-character");

    const counter = document.getElementById("file-counter");

    const dots = [
        ...document.querySelectorAll(".carousel-dot")
    ];

    /* ==============================================
       2. CHARACTER CONFIGURATION
    ============================================== */

    /*
       revealed: false = silhouette and classified information
       revealed: true  = official portrait and character information

       IMPORTANT:
       Keep character information generic until you are
       ready to reveal that character in your story.
    */

    const characters = [
        {
            id: "IF-001",
            name: "SUBJECT 01",
            revealed: false,
            silhouette: "Images/Characters/subject-01-silhouette.png",
            portrait: "Images/Characters/subject-01.png",
            description: "Further information is restricted."
        },
        {
            id: "IF-002",
            name: "SUBJECT 02",
            revealed: false,
            silhouette: "Images/Characters/subject-02-silhouette.png",
            portrait: "Images/Characters/subject-02.png",
            description: "Further information is restricted."
        },
        {
            id: "IF-003",
            name: "SUBJECT 03",
            revealed: false,
            silhouette: "Images/Characters/subject-03-silhouette.png",
            portrait: "Images/Characters/subject-03.png",
            description: "Further information is restricted."
        },
        {
            id: "IF-004",
            name: "SUBJECT 04",
            revealed: false,
            silhouette: "Images/Characters/subject-04-silhouette.png",
            portrait: "Images/Characters/subject-04.png",
            description: "Further information is restricted."
        },
        {
            id: "IF-005",
            name: "SUBJECT 05",
            revealed: false,
            silhouette: "Images/Characters/subject-05-silhouette.png",
            portrait: "Images/Characters/subject-05.png",
            description: "Further information is restricted."
        }
    ];

    let activeIndex = 0;
    let resizeFrame = null;

    /* ==============================================
       3. APPLY CHARACTER INFORMATION
    ============================================== */

    function applyCharacterData() {
        cards.forEach((card, index) => {
            const character = characters[index];

            if (!character) return;

            const image =
                card.querySelector(".character-portrait");

            const name =
                card.querySelector(".character-name");

            const description =
                card.querySelector(".character-description");

            const status =
                card.querySelector(".lock-status");

            const stamp =
                card.querySelector(".portrait-stamp");

            const category =
                card.querySelector(".file-category");

            const footer =
                card.querySelector(".file-footer");

            const isRevealed = character.revealed;

            card.classList.toggle("is-revealed", isRevealed);

            if (image) {
                image.onerror = () => {
                    image.style.display = "none";
                    image.classList.add("image-missing");
                };

                image.onload = () => {
                    image.style.display = "block";
                    image.classList.remove("image-missing");
                };

                image.src = isRevealed
                    ? character.portrait
                    : character.silhouette;

                image.alt = isRevealed
                    ? `Portrait of ${character.name}`
                    : `Silhouette of ${character.name}, identity classified`;
            }

            if (name) {
                name.textContent = character.name;
            }

            if (description) {
                description.textContent = character.description;
            }

            if (status) {
                status.textContent = isRevealed
                    ? "● DECLASSIFIED"
                    : "● CLASSIFIED";
            }

            if (stamp) {
                stamp.textContent = isRevealed
                    ? "IDENTITY CONFIRMED"
                    : "IDENTITY WITHHELD";

                stamp.hidden = isRevealed;
            }

            if (category) {
                category.textContent = isRevealed
                    ? "PERSONNEL RECORD"
                    : "PERSONNEL FILE";
            }

            if (footer && footer.firstElementChild) {
                footer.firstElementChild.textContent = isRevealed
                    ? "STATUS: VERIFIED"
                    : "STATUS: SEALED";
            }
        });
    }

    /* ==============================================
       4. POSITION CHARACTER CAROUSEL
    ============================================== */

    function positionCarousel() {
        if (!viewport || !track || !cards.length) return;

        const activeCard = cards[activeIndex];

        if (!activeCard) return;

        const viewportWidth = viewport.clientWidth;

        const cardCenter =
            activeCard.offsetLeft + activeCard.offsetWidth / 2;

        const offset = viewportWidth / 2 - cardCenter;

        track.style.transform = `translateX(${offset}px)`;
    }

    /* ==============================================
       5. UPDATE CHARACTER CAROUSEL
    ============================================== */

    function updateCarousel() {
        cards.forEach((card, index) => {
            const isActive = index === activeIndex;

            card.classList.toggle("is-active", isActive);

            card.setAttribute(
                "aria-current",
                String(isActive)
            );
        });

        dots.forEach((dot, index) => {
            const isActive = index === activeIndex;

            dot.classList.toggle("active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        if (counter) {
            counter.textContent =
                `FILE ${String(activeIndex + 1).padStart(2, "0")} / ` +
                `${String(cards.length).padStart(2, "0")}`;
        }

        positionCarousel();
    }

    /* ==============================================
       6. CHARACTER NAVIGATION
    ============================================== */

    function goToCharacter(index) {
        if (!cards.length) return;

        activeIndex =
            (index + cards.length) % cards.length;

        updateCarousel();
    }

    if (cards.length && viewport && track) {

        if (previousButton) {
            previousButton.addEventListener("click", () => {
                goToCharacter(activeIndex - 1);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                goToCharacter(activeIndex + 1);
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                goToCharacter(Number(dot.dataset.index));
            });
        });

        /* KEYBOARD NAVIGATION */

        const characterCarousel =
            document.getElementById("character-carousel");

        if (characterCarousel) {
            characterCarousel.addEventListener(
                "keydown",
                (event) => {
                    if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        goToCharacter(activeIndex - 1);
                    }

                    if (event.key === "ArrowRight") {
                        event.preventDefault();
                        goToCharacter(activeIndex + 1);
                    }
                }
            );
        }

        /* CHARACTER SWIPE SUPPORT */

        let pointerStartX = 0;
        let pointerStartY = 0;
        let pointerActive = false;

        viewport.addEventListener("pointerdown", (event) => {
            if (
                event.pointerType === "mouse" &&
                event.button !== 0
            ) {
                return;
            }

            pointerStartX = event.clientX;
            pointerStartY = event.clientY;
            pointerActive = true;
        });

        viewport.addEventListener("pointerup", (event) => {
            if (!pointerActive) return;

            pointerActive = false;

            const differenceX =
                event.clientX - pointerStartX;

            const differenceY =
                event.clientY - pointerStartY;

            if (
                Math.abs(differenceX) < 45 ||
                Math.abs(differenceX) < Math.abs(differenceY)
            ) {
                return;
            }

            goToCharacter(
                activeIndex + (differenceX < 0 ? 1 : -1)
            );
        });

        viewport.addEventListener("pointercancel", () => {
            pointerActive = false;
        });

        /* CHARACTER INITIALIZATION */

        applyCharacterData();
        updateCarousel();

    } else {
        console.warn(
            "Evidence Archive: Character carousel not found. " +
            "The Cast carousel will still initialize if present."
        );
    }

    /* ==============================================
       7. CAST CAROUSEL ELEMENTS
    ============================================== */

    const castViewport =
        document.getElementById("cast-viewport");

    const castTrack =
        document.getElementById("cast-track");

    const castCards = [
        ...document.querySelectorAll(".cast-card")
    ];

    const castPrevious =
        document.getElementById("cast-previous");

    const castNext =
        document.getElementById("cast-next");

    const castCounter =
        document.getElementById("cast-counter");

    const castDots = [
        ...document.querySelectorAll(".cast-dot")
    ];

    /* ==============================================
       8. CAST CAROUSEL NAVIGATION
    ============================================== */

    if (
        castViewport &&
        castTrack &&
        castCards.length
    ) {
        let castIndex = 0;

        function positionCast() {
            const activeCastCard = castCards[castIndex];

            if (!activeCastCard) return;

            const cardCenter =
                activeCastCard.offsetLeft +
                activeCastCard.offsetWidth / 2;

            const offset =
                castViewport.clientWidth / 2 - cardCenter;

            castTrack.style.transform =
                `translateX(${offset}px)`;
        }

        function updateCast() {
            castCards.forEach((card, index) => {
                card.classList.toggle(
                    "is-active",
                    index === castIndex
                );
            });

            castDots.forEach((dot, index) => {
                const isActive = index === castIndex;

                dot.classList.toggle("active", isActive);

                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });

            if (castCounter) {
                castCounter.textContent =
                    `CAST FILE ${String(castIndex + 1).padStart(2, "0")} / ` +
                    `${String(castCards.length).padStart(2, "0")}`;
            }

            positionCast();
        }

        function goToCast(index) {
            castIndex =
                (index + castCards.length) % castCards.length;

            updateCast();
        }

        /* CAST ARROWS */

        if (castPrevious) {
            castPrevious.addEventListener("click", () => {
                goToCast(castIndex - 1);
            });
        }

        if (castNext) {
            castNext.addEventListener("click", () => {
                goToCast(castIndex + 1);
            });
        }

        /* CAST INDICATOR DOTS */

        castDots.forEach((dot) => {
            dot.addEventListener("click", () => {
                goToCast(Number(dot.dataset.index));
            });
        });

        /* CAST KEYBOARD NAVIGATION */

        const castCarousel =
            document.getElementById("cast-carousel");

        if (castCarousel) {
            castCarousel.addEventListener(
                "keydown",
                (event) => {
                    if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        goToCast(castIndex - 1);
                    }

                    if (event.key === "ArrowRight") {
                        event.preventDefault();
                        goToCast(castIndex + 1);
                    }
                }
            );
        }

        /* CAST MOBILE SWIPING */

        let castStartX = 0;
        let castStartY = 0;
        let castPointerActive = false;

        castViewport.addEventListener(
            "pointerdown",
            (event) => {
                if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                ) {
                    return;
                }

                castStartX = event.clientX;
                castStartY = event.clientY;
                castPointerActive = true;
            }
        );

        castViewport.addEventListener(
            "pointerup",
            (event) => {
                if (!castPointerActive) return;

                castPointerActive = false;

                const differenceX =
                    event.clientX - castStartX;

                const differenceY =
                    event.clientY - castStartY;

                if (
                    Math.abs(differenceX) < 45 ||
                    Math.abs(differenceX) < Math.abs(differenceY)
                ) {
                    return;
                }

                goToCast(
                    castIndex + (differenceX < 0 ? 1 : -1)
                );
            }
        );

        castViewport.addEventListener(
            "pointercancel",
            () => {
                castPointerActive = false;
            }
        );

        /* INITIALIZE CAST CAROUSEL */

        updateCast();

        /* Keep Cast centered when its viewport changes */

        window.addEventListener("resize", positionCast);
    }

    /* ==============================================
       9. RESPONSIVE RECENTERING
    ============================================== */

    window.addEventListener("resize", () => {
        if (resizeFrame !== null) {
            cancelAnimationFrame(resizeFrame);
        }

        resizeFrame = requestAnimationFrame(() => {
            positionCarousel();
            resizeFrame = null;
        });
    });

    /* ==============================================
       END OF EVIDENCE ARCHIVE
    ============================================== */

});
