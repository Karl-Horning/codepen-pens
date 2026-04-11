let ticking = false;

const changeBackgroundColour = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const sections = document.querySelectorAll(".scroll-section");

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            document.body.style.background = section.getAttribute("data-color");
        }
    });

    ticking = false;
};

document.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(changeBackgroundColour);
        ticking = true;
    }
});
