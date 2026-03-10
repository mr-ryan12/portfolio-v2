# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (HMR at http://localhost:5173)
yarn dev

# Production build
yarn build

# Start production server (after build)
yarn start

# Type checking
yarn typecheck
```

Use `yarn` (v4, Berry) as the package manager — not npm or pnpm.

## Architecture

This is a personal portfolio site (Ryan McBride) built with **React Router v7** (SSR enabled), **TailwindCSS v4**, and **shadcn/ui** components.

**Key conventions:**
- Routes are declared in `app/routes.ts` using `@react-router/dev/routes` config syntax, then implemented as files under `app/routes/`
- The `~/*` path alias maps to `app/*` (e.g., `~/components/ui/button` → `app/components/ui/button`)
- `TooltipProvider` is globally wrapped in `app/root.tsx`; no need to re-wrap in pages
- Tailwind is configured via `app/app.css` (CSS variables approach), no `tailwind.config.js`

**shadcn/ui setup:**
- Style: `radix-nova`, base color: `neutral`, icons: `lucide-react`
- Add components with: `yarn shadcn add <component>`
- Components land in `app/components/ui/`
- `cn()` utility is at `~/lib/utils`

**Design system:**
- Dark background: `bg-[#060816]`, white text
- Inter font (Google Fonts) loaded via `root.tsx` links
- Tailwind CSS variables for theming (defined in `app/app.css`)

**Type generation:**
- React Router auto-generates route types into `.react-router/types/`; run `yarn typecheck` (which runs `react-router typegen` first) to regenerate after adding routes

## Active Technologies
- TypeScript 5.9 (strict mode enforced) + React Router v7 (SSR), TailwindCSS v4, shadcn/ui (radix-nova, neutral), lucide-react icons, Yarn v4 (001-portfolio-homepage)
- None — static TypeScript data modules (`app/data/`) (001-portfolio-homepage)

## Recent Changes
- 001-portfolio-homepage: Added TypeScript 5.9 (strict mode enforced) + React Router v7 (SSR), TailwindCSS v4, shadcn/ui (radix-nova, neutral), lucide-react icons, Yarn v4
