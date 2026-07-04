# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run deploy     # Build + deploy to GitHub Pages (gh-pages)
npm run lint       # ESLint
```

## Stack

- **React 18 + Vite** — component-per-section architecture
- **Framer Motion** — all animations; scroll-driven effects via `useScroll`/`useTransform`
- **Lenis (`@studio-freight/lenis`)** — smooth scroll, initialized in `App.jsx`, disabled on `/club-registration`
- **React Router v7** — SPA routing; routes defined in `App.jsx`
- **react-helmet-async** — SEO via `<SEO>` component wrapping `<Helmet>`
- **`@rollup/plugin-yaml`** — YAML files in `data/` importable as JS modules

## Architecture

**Routing** (`App.jsx`): The homepage (`/`) renders a stack of section components in order. Other routes (`/blog`, `/blog/:id`, `/blokz`, `/one-habit`) are standalone pages. Header and Footer are rendered at the App level, suppressed on special routes.

**Blog system**: Posts live as YAML files in `data/`. `Blog.jsx` loads them all dynamically via `import.meta.glob("../../data/*.yaml")`, uses the filename (without `.yaml`) as the URL slug, and sorts by `date` descending. `BlogPost.jsx` renders the `content` field as Markdown via `react-markdown` + `remark-gfm`. YAML frontmatter fields: `id`, `title`, `date`, `author`, `excerpt`, `coverImage`, `category`, `content`.

**Styling**: Global CSS variables and base styles in `src/index.css` (dark theme: `--color-bg: #0a0a0a`, `--color-text: #ffffff`). Fonts: Inter (body), Syne (headings/logo). Components use inline styles for layout + scoped `<style>` tags for hover/media queries. Utility classes: `.container`, `.glass`, `.text-stroke`, `.reveal`.

**SEO component** (`src/components/SEO.jsx`): Accepts `title`, `description`, `keywords`, `image`, `url`, `type`. Outputs `<title>`, Open Graph, Twitter Card, and JSON-LD structured data. Used at the top of each page-level component.

**Animation pattern**: Section components typically define `containerVariants` (stagger) + `itemVariants` (fade+slide), applied to a `<motion.div>` with `initial="initial" whileInView="animate" viewport={{ once: true }}`.

## Notes

- The site is being revamped from "Wbzard" branding to "Keeping Software Simple" agency identity. Docs in `../website-related-docs/` define the new brand, copy, and page structure.
- `lenis` package has replaced `@studio-freight/lenis` — update the import in `App.jsx` when convenient.
- Deploy target is GitHub Pages; `vite.config.js` sets `base: "/"`.
