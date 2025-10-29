/** Terminal-style pens list with live search and keyboard shortcut.
 *
 * Displays pens from `pens.json` in a text-based layout.
 * Each row shows:
 * - A small preview thumbnail (if available)
 * - The category name
 * - The title (linked)
 * - An optional description
 *
 * Includes a keyboard shortcut (`/`) to focus the search field,
 * and filters pens live as the user types.
 *
 * @example
 * <script type="module" src="./script.js"></script>
 */

// --- Elements ---
const list = document.getElementById("list");
const q = document.getElementById("q");

// --- Keyboard shortcut ---
// Press `/` to quickly focus the search input.
window.addEventListener("keydown", (e) => {
    if (e.key === "/") {
        e.preventDefault();
        q.focus();
    }
});

// --- Load pens data ---
const pens = await fetch("./pens.json").then((r) => r.json());
let filter = "";

// --- Search input handler ---
// Filters pens when the user types in the search box.
q.addEventListener("input", () => {
    filter = q.value.toLowerCase().trim();
    render();
});

/** Renders the pens list.
 *
 * Filters by title, description, or category.
 * When no matches are found, displays a fallback message.
 */
function render() {
    const rows = pens
        .filter((p) => {
            const text = (
                p.title +
                " " +
                (p.description || "") +
                " " +
                p.category
            ).toLowerCase();
            return !filter || text.includes(filter);
        })
        .map(
            (p) => `
        <div class="row" role="listitem">
          ${
              p.preview
                  ? `<img class="thumb" src="${p.preview}" alt="${p.title} preview">`
                  : `<div class="thumb" role="img" aria-label="${p.title} placeholder"></div>`
          }
          <div class="cat">${p.category}</div>
          <div>
            <div class="title"><a href="${p.url}">${p.title}</a></div>
            ${p.description ? `<div class="desc">${p.description}</div>` : ""}
          </div>
        </div>
      `
        )
        .join("");

    list.innerHTML = rows || `<p class="desc">No results.</p>`;
}

// --- Initial render ---
render();
