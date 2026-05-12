# Portfolio

Personal portfolio site for Sławomir Liszniański. The site presents work as a
**capability graph**: projects are evidence, capabilities are what they prove,
and projections are audience-specific lenses over the same body of work.

The full project specification lives in [`doc/portfolio_project_spec.md`](doc/portfolio_project_spec.md).

## Stack

- Vue 3 + TypeScript + Vue Router
- Vite (dev server and bundler)
- Tailwind CSS
- Content lives in [`data/portfolio.json`](data/portfolio.json) — the JSON is the
  source of truth; the app is a renderer.

## Prerequisites

- Node 20+ (tested on Node 24)
- npm 10+
- [`just`](https://github.com/casey/just) — task runner (1.40+)

## Running

All day-to-day tasks are wrapped in [`justfile`](justfile). Run `just` (no args)
to list recipes.

```bash
just install         # npm install
just dev             # start the dev server in the background (writes .dev.pid, .dev.log)
just status          # show whether the dev server is running and on what URL
just logs            # tail .dev.log
just stop            # stop the dev server (kills the whole process group)
just restart         # stop + dev
just check           # TypeScript type check
just build           # type-check + production build into dist/
just preview         # serve the production build
just clean           # remove dist/, .dev.pid, .dev.log
```

The dev server runs at <http://localhost:5173/>.

## Editing content

Everything visible on the site is driven by [`data/portfolio.json`](data/portfolio.json):

- `person`, `site.hero`, `site.copy.*` — top-of-page identity and section copy
- `projections[]` — audience-specific lenses, each with a `tagQuery` that
  filters projects in
- `domains[]`, `capabilities[]` — controlled vocabularies referenced by projects
- `projects[]` — each project has `summary`, `problem`, `solution`, `evidence[]`,
  `tags[]`, `media[]`, `links[]`, and optional `projectionHighlights` keyed by
  projection id
- `consulting`, `contact` — bottom-of-home content

TypeScript interfaces matching this shape live in
[`src/types/portfolio.ts`](src/types/portfolio.ts).

## Images

Project images live under [`public/media/projects/<project-id>/`](public/media).
The portrait used in the contact section is at `public/media/`. The decorative
background image is `public/media/bg-dark.jpg`.

When dropping new photos in, resize and recompress them for the web. A
reasonable default for full-screen lightbox use is the long side ≤ 1600 px and
quality 80–82, with EXIF stripped. Example:

```bash
convert input.jpg -auto-orient -resize '1600x1600>' -strip \
        -interlace JPEG -quality 82 output.jpg
```

## Project layout

```text
data/
  portfolio.json               # source of truth for all content
doc/
  portfolio_project_spec.md    # design spec
public/
  media/                       # static assets served at /media/...
src/
  components/                  # AppHeader, ProjectRow, ProjectGallery, ...
  views/                       # HomeView, ProjectsView, ProjectDetailView, ...
  router/                      # vue-router setup
  lib/                         # content loader and query helpers
  types/                       # TypeScript interfaces for the JSON shape
  styles/main.css              # Tailwind entrypoint
```
