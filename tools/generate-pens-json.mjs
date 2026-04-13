import { promises as fs } from "node:fs";
import path from "node:path";

/** Generate `src/pens.json` from the `src/pens` folder.
 *
 * Scans all folders under `src/pens/**` and collects metadata for each pen:
 *
 * - Title: from `<title>` tag, or the folder name as a fallback
 * - Description: from `<meta name="description">`
 * - Category: the parent folder of the pen under `src/pens/`
 * - Path: repo-relative path from `src/`
 * - URL: path prefixed with `/codepen-pens/`
 * - Preview: `img/preview.webp` inside the pen folder, or null
 *
 * Writes `src/pens.json` for use by the index page.
 *
 * @example
 * npm run build:json
 */

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const PENS_ROOT = path.join(SRC_DIR, "pens");
const OUTPUT_JSON = path.join(SRC_DIR, "pens.json");

// For user or organisation sites, set to "/"
// For project sites (for example, github.io/codepen-pens), set to "/codepen-pens/"
const BASE_URL = "/codepen-pens/";

/** @returns {Promise<boolean>} True if the path exists. */
const exists = async (p) => !!(await fs.stat(p).catch(() => null));

/** Reads a file if present; returns null if not found. */
const readTextIfExists = async (p) =>
    (await exists(p)) ? fs.readFile(p, "utf8") : null;

/** Normalises whitespace to single spaces. */
const normaliseWS = (s) => s.replace(/\s+/g, " ").trim();

/** Extracts the document title from a `<title>` tag. */
const extractTitle = (html) => {
    if (!html) return null;
    const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return m ? normaliseWS(m[1]) : null;
};

/** Extracts the description from a `<meta name="description">` tag. */
const extractMetaDescription = (html) => {
    if (!html) return null;

    const getMetaContent = (attr, value) => {
        // Case 1: attr appears before content
        let re = new RegExp(
            `<meta\\b[^>]*\\b${attr}\\s*=\\s*(["'])${value}\\1[^>]*\\bcontent\\s*=\\s*(["'])([\\s\\S]*?)\\2`,
            "i"
        );
        let m = html.match(re);
        if (m) return normaliseWS(m[3]);

        // Case 2: content appears before attr
        re = new RegExp(
            `<meta\\b[^>]*\\bcontent\\s*=\\s*(["'])([\\s\\S]*?)\\1[^>]*\\b${attr}\\s*=\\s*(["'])${value}\\3`,
            "i"
        );
        m = html.match(re);
        return m ? normaliseWS(m[2]) : null;
    };

    return getMetaContent("name", "description");
};

/** Returns the path of `img/preview.webp` relative to `src/` if it exists,
 *  otherwise null.
 *
 * @param {string} penDir Absolute path to the pen folder.
 * @returns {Promise<string|null>}
 */
const findPreview = async (penDir) => {
    const full = path.join(penDir, "img", "preview.webp");
    if (!(await exists(full))) return null;
    return path.relative(SRC_DIR, full).replace(/\\/g, "/");
};

/** Converts a src/-relative path to a GitHub Pages URL. */
const toUrlPath = (relPath) =>
    (BASE_URL + relPath.replace(/\\/g, "/")).replace(/\/{2,}/g, "/");

/** Returns a path relative to `src/`, using forward slashes. */
const toRelFromSrc = (absolute) =>
    path.relative(SRC_DIR, absolute).replace(/\\/g, "/");

/** Recursively finds all pens (folders containing `index.html`). */
const findPens = async (startDir) => {
    const results = [];

    const walk = async (dir) => {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        // If this folder has index.html, treat it as a pen
        const hasIndex = entries.some(
            (e) => e.isFile() && e.name.toLowerCase() === "index.html"
        );
        if (hasIndex) {
            results.push(dir);
            return; // Stop descending — a pen is atomic
        }

        // Otherwise, continue traversing
        await Promise.all(
            entries
                .filter((e) => e.isDirectory())
                .map((e) => walk(path.join(dir, e.name)))
        );
    };

    await walk(startDir);
    return results;
};

/** Deduces category from `src/pens/<category>/<pen>`. */
const categoryFromPath = (absDir) => {
    const parts = toRelFromSrc(absDir).split("/");
    // parts: ["pens", "<category>", "<pen>"]
    return parts.length >= 3 ? parts[1].toLowerCase() : "misc";
};

/** Main entry point. */
const main = async () => {
    if (!(await exists(PENS_ROOT))) {
        console.error(`No pens folder found at: ${PENS_ROOT}`);
        process.exit(1);
    }

    const penDirs = await findPens(PENS_ROOT);
    const pens = [];

    for (const dir of penDirs) {
        const html = await readTextIfExists(path.join(dir, "index.html"));

        const relFromSrc = toRelFromSrc(dir);
        const title =
            extractTitle(html) ||
            path.basename(dir).replace(/[-_]+/g, " ");
        const description = extractMetaDescription(html) ?? "";
        const category = categoryFromPath(dir);
        const url = toUrlPath(relFromSrc);
        const previewRel = await findPreview(dir);
        const preview = previewRel
            ? path.posix.join(relFromSrc, "img/preview.webp")
            : null;

        pens.push({ title, category, path: relFromSrc, url, preview, description });
    }

    pens.sort(
        (a, b) =>
            a.category.localeCompare(b.category) ||
            a.title.localeCompare(b.title)
    );

    await fs.writeFile(OUTPUT_JSON, JSON.stringify(pens, null, 2) + "\n", "utf8");
    console.log(`Wrote ${pens.length} pens → ${OUTPUT_JSON}`);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
