(() => {
    const playBtn = document.getElementById("play");

    let animationInProgress = false;

    if (typeof gsap === "undefined") {
        console.error(
            "GSAP not found. Make sure it is included before this script."
        );
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const computerAnimation = () => {
        if (animationInProgress) {
            return;
        }

        animationInProgress = true;
        playBtn.disabled = true;

        const tl = gsap.timeline({
            onComplete: () => {
                animationInProgress = false;
                playBtn.disabled = false;
            },
        });

        tl.from("#stand", { duration: 0.5, scaleY: 0, transformOrigin: "bottom", ease: "power2.out" })
            .from("#standBack", { duration: 0.5, scaleY: 0, transformOrigin: "bottom", ease: "bounce.out" })
            .from("#monitorBottom", { duration: 0.7, scaleX: 0, transformOrigin: "center", ease: "bounce.out" })
            .from("#screen", { duration: 0.6, scaleY: 0, transformOrigin: "bottom", ease: "circ.out", delay: 0.4 })
            .from("#yellowBox", { duration: 0.5, scale: 0 })
            .from("#computer-svg > g:nth-child(1) > g path", { duration: 0.2, scaleX: 0, stagger: -0.1 });
    };

    playBtn.addEventListener("click", computerAnimation);

    computerAnimation();
})();
