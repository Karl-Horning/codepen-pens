(() => {
    const ANIMATION_DURATION = 600;

    const animateButton = (e) => {
        const container = e.currentTarget;
        const rippleElement = document.createElement("span");
        rippleElement.classList.add("ripple");

        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        rippleElement.style.width = `${size}px`;
        rippleElement.style.height = `${size}px`;
        rippleElement.style.top = `${y}px`;
        rippleElement.style.left = `${x}px`;

        container.appendChild(rippleElement);

        setTimeout(() => {
            rippleElement.remove();
        }, ANIMATION_DURATION);
    };

    document
        .getElementById("downloadButton")
        .addEventListener("click", animateButton);
})();
