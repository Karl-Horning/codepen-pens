import { promises as fs } from "node:fs";
import path from "node:path";

/** Generate `src/pens.json` from the `src/pens` folder.
 *
 * Scans all folders under `src/pens/**` and collects metadata for each pen:
 *
 * - Title (from `<title>` tag or folder name)
 * - Description (from `<meta name="description">` or
 *   `<meta property="og:description">`)
 * - Category (derived from folder path)
 * - Preview image:
 *   - Prefer `src/assets/previews/<pen-folder>.*`
 *   - Fallback to `img/preview.*` inside the pen
 * - Public URL suitable for GitHub Pages
 *
 * Writes `src/pens.json` for use by the index page.
 *
 * @example
 * node tools/generate-pens-json.mjs
 */

/**
 * Configuration
 *
 * Adjust `BASE_URL` if this repo is your GitHub user site rather than a
 * project site. All paths are kept relative so local and Pages builds
 * behave the same.
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

/** Extracts the document title from `<title>` tags. */
const extractTitle = (html) => {
    if (!html) return null;
    const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return m ? normaliseWS(m[1]) : null;
};

/** Extracts a short description from `<meta>` tags. */
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

    // Try standard meta description first, then Open Graph
    return (
        getMetaContent("name", "description") ||
        getMetaContent("property", "og:description")
    );
};

/** Finds a preview image for a pen.
 *
 * Looks for `src/assets/previews/<pen-folder>.*` first, then falls back to
 * `img/preview.*` inside the pen folder.
 *
 * @param {string} penDir Absolute path to the pen folder.
 * @returns {Promise<string|null>} Relative path from `src/`, or null.
 */
const findPreview = async (penDir) => {
    const penSlug = path.basename(penDir);
    const globalPreviewDir = path.join(SRC_DIR, "assets", "previews");

    // Check the centralised previews folder
    const globalCandidates = [
        `${penSlug}.png`,
        `${penSlug}.jpg`,
        `${penSlug}.jpeg`,
        `${penSlug}.gif`,
        `${penSlug}.webp`,
    ];

    for (const file of globalCandidates) {
        const full = path.join(globalPreviewDir, file);
        if (await exists(full)) {
            // Return path relative to src/
            return `assets/previews/${file}`.replace(/\\/g, "/");
        }
    }

    // Fallback: local img/preview.*
    const localCandidates = [
        "img/preview.png",
        "img/preview.jpg",
        "img/preview.jpeg",
        "img/preview.gif",
        "img/preview.webp",
    ];

    for (const rel of localCandidates) {
        const full = path.join(penDir, rel);
        if (await exists(full)) {
            // Return path relative to src/
            return toRelFromSrc(full);
        }
    }

    return null;
};

/** Converts a relative path to a GitHub Pages–friendly URL. */
const toUrlPath = (relPath) =>
    (BASE_URL + relPath.replace(/\\/g, "/")).replace(/\/{2,}/g, "/");

/** Returns a path relative to `src/`. */
const toRelFromSrc = (absolute) =>
    absolute.replace(SRC_DIR + path.sep, "").replace(/\\/g, "/");

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

/** Extracts a slug from the final folder name. */
const slugFromDir = (dir) => path.basename(dir).toLowerCase();

/** Deduces category from `src/pens/<category>/<pen>`. */
const categoryFromPath = (absDir) => {
    const rel = toRelFromSrc(absDir);
    const parts = rel.split("/");
    return parts.length >= 3 ? parts[1].toLowerCase() : "misc";
};

/** Main entry point.
 *
 * - Validates presence of `src/pens`
 * - Gathers metadata for each pen
 * - Sorts alphabetically by category then title
 * - Writes `src/pens.json`
 */
const main = async () => {
    if (!(await exists(PENS_ROOT))) {
        console.error(`No pens folder found at: ${PENS_ROOT}`);
        process.exit(1);
    }

    const penDirs = await findPens(PENS_ROOT);
    const pens = [];

    for (const dir of penDirs) {
        const indexPath = path.join(dir, "index.html");
        const html = await readTextIfExists(indexPath);

        const title =
            extractTitle(html) || slugFromDir(dir).replace(/[-_]+/g, " ");
        const description = extractMetaDescription(html) || "";
        const category = categoryFromPath(dir);

        // Relative path from src/ (works in Pages and local dev)
        const relFromSrc = toRelFromSrc(
            dir.endsWith(path.sep) ? dir : dir + path.sep
        );
        // URL that GitHub Pages will serve
        const url = toUrlPath(relFromSrc);

        // Resolve preview path:
        // - If it starts with "assets/", it is already relative to src/
        // - Otherwise, it is a local preview under the pen folder
        const previewRel = await findPreview(dir);
        const previewPath = previewRel
            ? previewRel.startsWith("assets/")
                ? previewRel
                : path.posix.join(relFromSrc, previewRel)
            : null;

        pens.push({
            title,
            category,
            path: relFromSrc,
            url,
            preview: previewPath,
            description,
        });
    }

    // Sort by category, then title
    pens.sort(
        (a, b) =>
            a.category.localeCompare(b.category) ||
            a.title.localeCompare(b.title)
    );

    await fs.writeFile(
        OUTPUT_JSON,
        JSON.stringify(pens, null, 2) + "\n",
        "utf8"
    );
    console.log(`Wrote ${pens.length} pens → ${OUTPUT_JSON}`);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
