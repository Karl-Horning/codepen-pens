# CodePen Pens — Front-End Demos and Experiments

A personal collection of front-end experiments, challenges, and learning projects.
Each pen is built with pure HTML, CSS, and JavaScript — no frameworks, no build steps — to keep things simple, accessible, and transparent.

---

## Table of Contents

- [CodePen Pens — Front-End Demos and Experiments](#codepen-pens--front-end-demos-and-experiments)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Quick Start](#quick-start)
  - [Usage / Scripts](#usage--scripts)
  - [Project Structure](#project-structure)
  - [Tech Stack](#tech-stack)
  - [Live / Demo](#live--demo)
  - [Configuration](#configuration)
  - [Deployment](#deployment)
  - [License](#license)
  - [Accessibility Note](#accessibility-note)
  - [Author](#author)

---

## Overview

This project collects and organises my CodePen demos and experiments in one place.
It serves both as an archive and as a personal reference for design, animation, and accessibility techniques I've explored over time.

Some pens are recent, while others are older examples of my early learning — all are included to show progress and experimentation.

---

## Quick Start

Run a lightweight local server using Node.js:

```bash
# Serve the site from the src directory
npx serve src -l 5173
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.
This will correctly load `pens.json` and allow fetch requests without CORS errors.

---

## Usage / Scripts

- **`tools/generate-pens-json.mjs`** — Scans the `src/pens` folder and builds `pens.json`
  Used by the index page to display pens dynamically.
- **`npx serve src -l 5173`** — Runs a local development server on port 5173.
- **`node tools/generate-pens-json.mjs`** — Updates `pens.json` after adding or renaming pens.

---

## Project Structure

```text
.
├── LICENSE                  # MIT license file
├── README.md                # This document
├── src/
│   ├── assets/              # Static assets (fonts, previews, design files)
│   │   ├── designs/         # Screenshots, concept art, etc.
│   │   ├── fonts/           # Local or custom fonts
│   │   └── previews/        # Preview images for pens
│   ├── css/
│   │   └── style.css        # Main stylesheet for index page
│   ├── js/
│   │   └── script.js        # JS for rendering pens list
│   ├── pens/                # Individual CodePen projects
│   │   ├── css/             # CSS-only demos
│   │   ├── fcc-projects/    # FreeCodeCamp projects
│   │   ├── javascript/      # JS-based demos
│   │   ├── portfolio/       # Portfolio-related designs
│   │   └── svg/             # SVG experiments and animations
│   ├── pens.json            # Auto-generated index of all pens
│   └── index.html           # Main project index page
└── tools/
    └── generate-pens-json.mjs  # Script to build pens.json
```

---

## Tech Stack

- **HTML5 / CSS3 / JavaScript (ES Modules)** — core technologies
- **Node.js** — used for tooling and local server
- **Accessible-first design** — semantic HTML, visible focus states, and logical tab order

---

## Live / Demo

Each project can be viewed directly on [CodePen](https://codepen.io/karlhorning)
or locally through the index page, which provides filters and thumbnails for each demo.

---

## Configuration

- **Previews:** Stored in `src/assets/previews/`
- **Pen data:** Generated into `src/pens.json`
  Run `node tools/generate-pens-json.mjs` to update after adding new pens.
- **Base URL:** Adjust `BASE_URL` in `generate-pens-json.mjs` if deploying as a user site instead of a project site.

---

## Deployment

This project is deployed automatically to **GitHub Pages** via a workflow defined in
`.github/workflows/deploy.yml`.

- The workflow uploads the contents of `src/` to GitHub Pages on every push to `main`.
- No manual steps are required — commits trigger deployment automatically.
- Output URL: `https://www.karlhorning.dev/codepen-pens/`

---

## License

Released under the [MIT License](./LICENSE).

All pens are provided **as-is** and may not reflect current best practices.

---

## Accessibility Note

Some older pens **do not meet accessibility standards** and are included as part of my learning history.

They're preserved to demonstrate development progress and to encourage transparency in creative growth.

---

## Author

Made with ❤️ by [Karl Horning](https://github.com/Karl-Horning)
