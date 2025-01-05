/**
 * Immediately Invoked Function Expression (IIFE) to encapsulate the script.
 */
(() => {
    // Get reference to the play button
    const playBtn = document.getElementById("play");

    // Flag to track if animation is in progress
    let animationInProgress = false;

    // Check if GSAP library is available
    if (!gsap) {
        console.error(
            "GSAP not found. Make sure it is included before this script."
        );
        return;
    }

    /**
     * Function to perform the computer animation.
     */
    const computerAnimation = () => {
        // If animation is already in progress, do not start again
        if (animationInProgress) {
            return;
        }

        // Set flag to indicate animation is in progress
        animationInProgress = true;

        // Disable the button during animation
        playBtn.disabled = true;

        // Create a GSAP timeline
        const tl = gsap.timeline({
            // Callback when the animation is complete
            onComplete: () => {
                // Reset flag and enable the button after animation
                animationInProgress = false;
                playBtn.disabled = false;
            },
        });

        // Animation sequence
        tl.from("#stand", 0.5, {
            scaleY: 0,
            transformOrigin: "bottom",
            ease: "power2.out",
        })
            .from("#standBack", 0.5, {
                scaleY: 0,
                transformOrigin: "bottom",
                ease: "bounce.out",
            })
            .from("#monitorBottom", 0.7, {
                scaleX: 0,
                transformOrigin: "center",
                ease: "bounce.out",
            })
            .from("#screen", 0.6, {
                scaleY: 0,
                transformOrigin: "bottom",
                ease: "circ.out",
                delay: 0.4,
            })
            .from("#yellowBox", 0.5, { scale: 0 })
            .staggerFrom(
                "#computer-svg > g:nth-child(1) > g path",
                0.2,
                { scaleX: 0 },
                -0.1
            );
    };

    /**
     * Function to handle click event on the play button.
     */
    const handleClick = () => {
        // Trigger the computer animation
        computerAnimation();
    };

    // Add event listener for click on the play button
    playBtn.addEventListener("click", handleClick);

    // Initial animation when the page loads
    computerAnimation();
})();
