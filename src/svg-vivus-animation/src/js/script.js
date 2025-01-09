/**
 * Executes when the DOM content is loaded.
 * Initializes the SVG animation and handles animation completion.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Get SVG elements
    const svgElement = document.getElementById("helloWorld");
    const helloOutline = document.getElementById("helloOutline");
    const worldOutline = document.getElementById("worldOutline");
    const helloBg = document.getElementById("helloBg");
    const worldBg = document.getElementById("worldBg");
    const allSvgElements = [helloOutline, worldOutline, helloBg, worldBg];
    const animateBtn = document.getElementById("animateBtn");

    // Check if all SVG elements are found
    if (
        !svgElement ||
        !helloOutline ||
        !worldOutline ||
        !helloBg ||
        !worldBg ||
        !animateBtn
    ) {
        console.error(
            "Failed to find required SVG elements or animation button."
        );
        return; // Exit the function if any required element is missing
    }

    // Colour palette
    const colours = {
        transparentBlack: "rgba(0, 0, 0, 0)",
        fillBlack: "rgba(0, 0, 0, 1)",
        transparentWhite: "rgba(255, 255, 255, 0)",
        fillWhite: "rgba(255, 255, 255, 1)",
    };

    /**
     * Callback function to execute when the animation is complete.
     * Changes the fill colours of SVG elements with a fade effect.
     */
    const onComplete = () => {
        console.log("Animation complete");
        // Additional code to execute when the animation is complete
        // Fading in different SVG elements with specified timing and colours
        fadeFill({ element: helloOutline });
        fadeFill({ element: worldOutline, transitionTime: 2 });
        fadeFill({
            element: helloBg,
            transparentColour: colours.transparentBlack,
            fillColour: colours.fillBlack,
            transitionTime: 1.2,
        });
        fadeFill({
            element: worldBg,
            transparentColour: colours.transparentBlack,
            fillColour: colours.fillBlack,
            transitionTime: 2.2,
        });
        // Re-enable animation button after completion
        animateBtn.disabled = false;
    };

    /**
     * Applies a fade effect to the fill colour of an SVG element.
     * @param {Object} options - Options for the fade effect.
     * @param {HTMLElement} options.element - The SVG element to apply the fade effect.
     * @param {string} [options.transparentColour="rgba(255, 255, 255, 0)"] - The transparent colour for the fade effect.
     * @param {string} [options.fillColour="rgba(255, 255, 255, 1)"] - The fill colour after the fade effect.
     * @param {number} [options.transitionTime=1] - The duration of the fade effect transition in seconds.
     */
    const fadeFill = ({
        element,
        transparentColour = colours.transparentWhite,
        fillColour = colours.fillWhite,
        transitionTime = 1,
    }) => {
        // Set initial opacity to 0
        element.style.fill = transparentColour;
        // Apply transition for smooth fade
        element.style.transition = `fill ${transitionTime}s cubic-bezier(0.79, 0.33, 0.14, 0.53)`;
        // Set final opacity to 1 after a short delay
        setTimeout(() => {
            element.style.fill = fillColour;
        }, 100);
    };

    /**
     * Resets the animation by clearing fill colours and disabling the animation button.
     */
    const resetAnimation = () => {
        animateBtn.disabled = true;
        // Clear fill colours
        allSvgElements.forEach((element) => {
            element.style.fill = "none";
        });
    };

    /**
     * Starts the SVG animation.
     * Resets animation, initializes Vivus SVG animation, and handles animation completion.
     */
    const startAnimation = () => {
        resetAnimation();

        // Initialize Vivus SVG animation
        const vivus = new Vivus(svgElement, { duration: 200 }, onComplete);
        vivus.play();

        // Check if animation is complete
        vivus.getStatus() === "end"
            ? console.log("Animation complete!")
            : console.log("Animation in progress...");
    };

    // Event listener for animation button click
    animateBtn.addEventListener("click", startAnimation);

    // Initialize the animation to start when the page has loaded
    startAnimation();
});
