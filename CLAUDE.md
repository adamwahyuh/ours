# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal birthday-gift website ("Ours"): a React 19 + TypeScript + Vite single-page app styled with Tailwind CSS v4, deployed to GitHub Pages at `https://adamwahyuh.github.io/ours`.

## Commands

- `npm run dev` — Vite dev server (app is served under `/ours/`, e.g. `http://localhost:5173/ours/`)
- `npm run build` — type-check (`tsc -b`) then build to `dist/`
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run preview` — serve the production build
- `npm run deploy` — builds (via `predeploy`), copies `index.html` to `404.html` for SPA fallback on GitHub Pages, then publishes `dist/` with `gh-pages`

There is no test suite.

## Architecture

**Content is data-driven.** All user-facing copy, photo/music/video paths, and letter messages live in `src/lib/content.json`, keyed as `<pageName>.sections.<sectionName>`. Pages read it at module load through helpers in `src/lib/content.ts` (`getContentFromSectionPage(page, section)` returns `{ statusCode, data }`; callers use `.data`). Section components receive that object as an untyped `data` prop. To change text or swap media, edit the JSON rather than components.

**Routing** (`src/router.tsx`): `createBrowserRouter` with `basename: "/ours"`.
- `/` → `HomePage` (title, polaroids, "Open" link plus a "Later" `ButtonRunAway` that dodges clicks)
- `/happy-birthday` → `GalleryPage`, a full-height scroll-snap container stacking section components from `src/Pages/Section/` (Music, Envelope letter, Photos, Video), each wrapped in a motion slide-up-on-view
- `*` → `NotFoundPage`

All pages wrap content in `src/Components/Layout.tsx` (background + "Home" nav shown off the root route) and typically include `FloatingHeart` for ambient animation.

**Base path gotcha.** Vite `base` is `/ours/`, but media paths in `content.json` are root-relative (`/images/...`, `/music/...`, `/videos/...`, served from `public/`). Components that render media (`Polaroid`, `PhotoWithModal`, `WaveformPlayer`, `VideoViewer`) manually prefix `"/ours"` to the path. Keep that convention when adding media components, or media will 404 in both dev and production.

**Animation**: uses the `motion` package (`motion/react`); some files import from `framer-motion` directly, which resolves only as a transitive dependency of `motion`.

**Styling**: Tailwind v4 via `@tailwindcss/vite`; there is no `tailwind.config` — the `@theme` block in `src/index.css` defines the palette as Tailwind colors (`wine-*`, `rosewood`, `blush`, `petal`, `cream`, `champagne`, `gold`, `ink`, `paper` — use these instead of hex values), fonts (`font-windsong` from the bundled `src/assets/fonts/WindSong-*.ttf` for script headings; `font-serif` is Cormorant Garamond, loaded from Google Fonts in `index.html`), and custom animations (`animate-petal-fall`, `animate-twinkle`, `animate-heartbeat`, …). It also defines the `.text-romance` shimmer used by `Title`, and sets a global paw-icon cursor. Modals (`Envelope`, `PhotoWithModal`) render through `createPortal` to `document.body` so transformed motion ancestors don't trap their `position: fixed`. `src/App.css` is leftover Vite template CSS and is not imported.
