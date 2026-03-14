# Quickstart: Portfolio Homepage

**Feature**: 001-portfolio-homepage
**Date**: 2026-03-09

---

## Prerequisites

- Node.js 20+
- Yarn v4 (repo-pinned; Corepack is optional in this project setup)

## Run the development server

```bash
yarn dev
# → http://localhost:5173
```

## Type-check (required before marking any task complete)

```bash
yarn typecheck
```

## Build for production

```bash
yarn build
yarn start
```

`yarn start` assumes a production build already exists.

---

## How content is structured

All portfolio data lives in `app/data/`:

| File | What it controls |
|------|-----------------|
| `app/data/technologies.ts` | Shared `Technology` registry — tech entries referenced by projects and skills |
| `app/data/config.ts` | `SiteConfig` — name, tagline, target roles, about paragraphs, contact links |
| `app/data/projects.ts` | `Project[]` — featured projects with outcome summaries and tech tags |
| `app/data/skills.ts` | `SkillGroup[]` — skill categories and technology references |

**To update your name, tagline, or contact info**: Edit `app/data/config.ts` → `siteConfig`.

**To add or change a project**: Edit `app/data/projects.ts`. Set `featured: true` and assign an `order` value. Featured projects (max 5) appear on the homepage. Reference `Technology` objects from `technologies.ts` in the `technologies` array.

**To add a new technology**: Add an entry to `app/data/technologies.ts` first, then reference it in projects or skills.

**To update skills**: Edit `app/data/skills.ts`. Add/remove `Technology` references within a category, or add a new `SkillGroup` object.

This feature uses a static typed data layer intentionally. A database-backed content layer may be added in a later feature without changing the UI contracts.

---

## How the homepage is assembled

The home route (`app/routes/home.tsx`) has a `loader` that imports from the data modules and returns the data to the component. All homepage sections are rendered by the `home.tsx` component (or sub-components it imports).

```
app/routes/home.tsx          ← loader + page root
app/components/
  site-header.tsx            ← sticky nav with anchor links
  sections/
    hero-section.tsx         ← name, tagline, target roles, CTA
    projects-section.tsx     ← featured project cards
    about-section.tsx        ← personal narrative
    skills-section.tsx       ← categorized skill groups
    contact-section.tsx      ← email, LinkedIn, GitHub links
  site-footer.tsx            ← minimal footer
app/data/
  technologies.ts            ← Technology[] registry (shared)
  config.ts                  ← SiteConfig singleton
  projects.ts                ← Project[] array
  skills.ts                  ← SkillGroup[] array
```

---

## Adding a new shadcn/ui component

```bash
yarn dlx shadcn@latest add <component-name>
# Components land in app/components/ui/
```

## Key conventions

- Use `cn()` from `~/lib/utils` for all conditional class merging
- Use `bg-canvas`, `bg-surface`, `bg-surface-muted` tokens (not hardcoded hex values)
- External links MUST have `target="_blank" rel="noopener noreferrer"`
- All section wrapper elements use `id="section-name"` for anchor navigation
- Run `yarn typecheck` after adding new routes (React Router regenerates types)
- Presentational section components MUST receive data via props from the route, not import directly from `app/data/`.
