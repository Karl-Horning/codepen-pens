const sections = Array.from(document.querySelectorAll(".parallax"));

// Set each section's background image via CSS custom property
sections.forEach((sec) => {
    const url = sec.getAttribute("data-image");
    sec.style.setProperty("--bg-url", `url("${url}")`);
});

// background-image rule must be in an inline <style> so relative URLs resolve
// against the document, not the external stylesheet in ./css/
const styleTag = document.createElement("style");
styleTag.textContent = `.parallax::before { background-image: var(--bg-url); }`;
document.head.appendChild(styleTag);

let ticking = false;
function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        sections.forEach((sec) => {
            const speed = parseFloat(sec.dataset.speed || "0.3");
            const rect = sec.getBoundingClientRect();
            const offsetTop = rect.top + scrollY;
            const delta = scrollY - offsetTop;
            sec.style.setProperty("--ty", `${-(delta * speed)}px`);
        });

        ticking = false;
    });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
