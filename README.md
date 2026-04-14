# CodePen Pens — Front-end demos and experiments

A personal collection of front-end experiments, challenges, and learning projects.
Each pen uses plain HTML, CSS, and JavaScript.

Some pens are recent. Others are older examples from early in my learning, kept to show progress and experimentation.

## Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Start local server on port 5173        |
| `npm run build:json` | Regenerate JSON data (`src/pens.json`) |

To deploy as a GitHub user site rather than a project site, update `BASE_URL` in `tools/generate-pens-json.mjs`.

## Project structure

```text
.
├── LICENSE
├── README.md
├── package.json
├── src/
│   ├── assets/              # Static assets (fonts, design files)
│   │   ├── designs/         # Source design files
│   │   └── fonts/           # Local fonts
│   ├── css/
│   │   └── style.css        # Index page stylesheet
│   ├── js/
│   │   └── script.js        # Index page script
│   ├── pens/                # Individual projects
│   │   ├── css/             # CSS-only demos
│   │   ├── fcc-projects/    # freeCodeCamp projects
│   │   ├── javascript/      # JavaScript demos
│   │   ├── portfolio/       # Portfolio designs
│   │   └── svg/             # SVG experiments and animations
│   ├── pens.json            # Auto-generated pen index
│   └── index.html           # Index page
└── tools/
    └── generate-pens-json.mjs
```

## Tech stack

- **HTML / CSS / JavaScript (ES Modules)** — core technologies
- **Node.js** — tooling and local dev server

## Live demo

Each project can be viewed on [CodePen](https://codepen.io/karlhorning) or locally through the index page, which includes filtering and previews.

The live version is available at [karlhorning.dev/codepen-pens/](https://www.karlhorning.dev/codepen-pens/).

## Deployment

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. The workflow uploads the contents of `src/`.

## Accessibility note

Some older pens don't meet current accessibility standards. They're kept to show progress over time.

## License

Released under the [MIT License](./LICENSE) by [Karl Horning](https://github.com/Karl-Horning).
