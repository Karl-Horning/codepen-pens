document.addEventListener("DOMContentLoaded", () => {
    const svgElement = document.getElementById("helloWorld");
    const helloOutline = document.getElementById("helloOutline");
    const worldOutline = document.getElementById("worldOutline");
    const helloBg = document.getElementById("helloBg");
    const worldBg = document.getElementById("worldBg");
    const allSvgElements = [helloOutline, worldOutline, helloBg, worldBg];
    const animateBtn = document.getElementById("animateBtn");

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
        return;
    }

    const colours = {
        transparentBlack: "rgba(0, 0, 0, 0)",
        fillBlack: "rgba(0, 0, 0, 1)",
        transparentWhite: "rgba(255, 255, 255, 0)",
        fillWhite: "rgba(255, 255, 255, 1)",
    };

    const onComplete = () => {
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
        animateBtn.disabled = false;
    };

    /**
     * Fades an SVG element's fill from transparent to a solid colour.
     * @param {Object} options
     * @param {HTMLElement} options.element - The SVG element to fade.
     * @param {string} [options.transparentColour] - Starting transparent colour.
     * @param {string} [options.fillColour] - Target fill colour.
     * @param {number} [options.transitionTime] - Transition duration in seconds.
     */
    const fadeFill = ({
        element,
        transparentColour = colours.transparentWhite,
        fillColour = colours.fillWhite,
        transitionTime = 1,
    }) => {
        element.style.fill = transparentColour;
        element.style.transition = `fill ${transitionTime}s cubic-bezier(0.79, 0.33, 0.14, 0.53)`;
        setTimeout(() => {
            element.style.fill = fillColour;
        }, 100);
    };

    const resetAnimation = () => {
        animateBtn.disabled = true;
        allSvgElements.forEach((element) => {
            element.style.fill = "none";
        });
    };

    const startAnimation = () => {
        resetAnimation();
        const vivus = new Vivus(svgElement, { duration: 200 }, onComplete);
        vivus.play();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onComplete();
        return;
    }

    animateBtn.addEventListener("click", startAnimation);
    startAnimation();
});
