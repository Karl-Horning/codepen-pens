(() => {
    /**
     * Duration of the ripple animation in milliseconds.
     * @type {number}
     */
    const ANIMATION_DURATION = 600;

    /**
     * Animates a ripple effect on the clicked button.
     *
     * @param {MouseEvent} e - The mouse click event.
     */
    const animateButton = (e) => {
        // Get the button container
        const container = e.currentTarget;

        // Create a span element for the ripple effect
        const rippleElement = document.createElement("span");
        rippleElement.classList.add("ripple");

        // Calculate position and size of the ripple
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        // Apply styles to the ripple element
        rippleElement.style.width = `${size}px`;
        rippleElement.style.height = `${size}px`;
        rippleElement.style.top = `${y}px`;
        rippleElement.style.left = `${x}px`;

        // Append the ripple element to the container
        container.appendChild(rippleElement);

        // Remove the ripple element after the animation duration
        setTimeout(() => {
            rippleElement.remove();
        }, ANIMATION_DURATION);
    };

    /**
     * Event handler for the button click event.
     *
     * @param {MouseEvent} e - The mouse click event.
     */
    const handleClick = (e) => {
        animateButton(e);
    };

    // Add a click event listener to the download button
    downloadButton.addEventListener("click", handleClick);
})();
