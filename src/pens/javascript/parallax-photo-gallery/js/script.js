/** Parallax controller
 *
 * - One RAF-throttled scroll handler.
 * - Transforms the ::before layer for smooth, GPU-friendly motion.
 * - Builds captions from data attributes when present.
 *
 * @example
 * // HTML
 * // <section class="parallax" data-image="img.jpg" data-speed="0.3">
 * //   <div class="caption"><span class="title">Title</span> …</div>
 * // </section>
 */
const sections = Array.from(document.querySelectorAll(".parallax"));

// Build moving background + caption from data attributes
sections.forEach((sec) => {
    const url = sec.getAttribute("data-image");
    sec.style.setProperty("--image", `url("${url}")`);
    // Map to ::before via CSS var; avoid inline styles on the pseudo
    sec.style.setProperty("--bg-url", `url("${url}")`);
    sec.style.background = "none"; // Legacy safety: kill any old background

    // Inject a basic caption if only data-caption is provided
    const text = sec.getAttribute("data-caption");
    if (text && !sec.querySelector(".caption")) {
        const cap = document.createElement("div");
        cap.className = "caption";
        cap.innerHTML = `<h2>${text}</h2>`;
        sec.appendChild(cap);
    }
});

// Single style block to bind the CSS var to the pseudo element
const styleTag = document.createElement("style");
styleTag.textContent = `
  .parallax::before { background-image: var(--bg-url); }
`;
document.head.appendChild(styleTag);

// RAF scroll loop (one listener). We compute a translateY per section
let ticking = false;
function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;

        sections.forEach((sec) => {
            const speed = parseFloat(sec.dataset.speed || "0.3"); // default depth
            const rect = sec.getBoundingClientRect();
            const offsetTop = rect.top + scrollY;

            // Distance scrolled past this section; negative translate feels parallax
            const delta = scrollY - offsetTop;
            const translateY = -(delta * speed);

            sec.style.setProperty("--ty", `${translateY}px`);
            // Hint composition; transform itself is applied on ::before via CSS var
            sec.style.transform = "translateZ(0)";
            sec.style.setProperty(
                "--transform",
                `translate3d(0, var(--ty), 0)`
            );
        });

        ticking = false;
    });
}

// Drive transform via CSS to keep layout work minimal
const styleTransform = document.createElement("style");
styleTransform.textContent = `
  .parallax::before { transform: var(--transform, translate3d(0,0,0)); }
`;
document.head.appendChild(styleTransform);

// Observe visibility; useful for future optimisations (pause/offscreen etc.)
const io =
    "IntersectionObserver" in window
        ? new IntersectionObserver(
              (entries) => {
                  entries.forEach((e) => {
                      e.target.dataset.active = e.isIntersecting ? "1" : "0";
                  });
              },
              { rootMargin: "200px 0px" }
          )
        : null;

sections.forEach((s) => io && io.observe(s));

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
