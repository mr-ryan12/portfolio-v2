# Implementation Plan: Portfolio Homepage

**Branch**: `001-portfolio-homepage` | **Date**: 2026-03-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-homepage/spec.md`

## Summary

Build and complete the premium portfolio homepage for Ryan McBride. The homepage is a single-page layout with five sections — Hero, Projects, About, Skills, and Contact — backed by a typed static data layer and served via SSR through React Router v7 loaders. Visual direction: dark, premium, design-conscious (Inter typography, design system tokens from `app/app.css`, shadcn/ui component primitives). Existing `home.tsx` hero markup will be refactored to use the data layer and design system properly; the remaining four sections will be built from scratch.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict mode enforced)
**Primary Dependencies**: React Router v7 (SSR), TailwindCSS v4, shadcn/ui (radix-nova, neutral), lucide-react icons, Yarn v4
**Storage**: None — static TypeScript data modules (`app/data/`)
**Testing**: `yarn typecheck` (React Router type generation + tsc strict)
**Target Platform**: Web (SSR, Node.js server via `@react-router/serve`)
**Project Type**: Web application (portfolio / marketing site)
**Performance Goals**: Hero section readable within 3 seconds (SC-006); no render-blocking above-the-fold assets
**Constraints**: No new runtime dependencies without justification; no `useEffect` for data; no hardcoded hex colors (use CSS variable tokens)
**Scale/Scope**: Single homepage with 5 sections; 3-5 project cards; 4-6 skill categories; static data only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Check | Notes |
|-----------|-------|-------|
| **I. Component-First** | PASS | Card, Badge, Button, Sheet used as foundation; no inline component duplication |
| **II. Type Safety** | PASS | Strict TypeScript throughout; loader types via `.react-router/types/`; no `any` |
| **III. Design System Adherence** | PASS | `bg-canvas`, `bg-surface`, CSS variable tokens only; Inter font from root.tsx; no hardcoded hex |
| **IV. SSR Compatibility** | PASS | Data via loaders; no `useEffect` for data; no browser-only APIs without guards |
| **V. Simplicity** | PASS | No new runtime dependencies; static data modules; no state management library |
| **VI. Proof Over Hype** | PASS | Spec FR-016 requires truthful content; outcome-first project summaries mandated |

**Post-Phase 1 re-check**: All principles satisfied. Component composition (Card+Badge+Button) reuses installed primitives. Data contract uses loader return types. No new dependencies introduced.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-homepage/
├── plan.md                # This file
├── research.md            # Phase 0 — decisions and rationale
├── data-model.md          # Phase 1 — entity definitions and loader shape
├── quickstart.md          # Phase 1 — dev guide and content editing reference
├── contracts/
│   └── data-contracts.md  # Phase 1 — TypeScript interface contracts
└── tasks.md               # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
app/
├── data/
│   ├── technologies.ts    # Technology[] — shared technology registry
│   ├── config.ts          # SiteConfig singleton (name, tagline, about, contact)
│   ├── projects.ts        # Project[] array with featuredProjects export
│   └── skills.ts          # SkillGroup[] array
├── components/
│   ├── ui/                # shadcn/ui primitives (existing — keep generic and reusable)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── sheet.tsx
│   │   └── separator.tsx
│   ├── sections/          # Homepage section components (new)
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── about-section.tsx
│   │   ├── skills-section.tsx
│   │   └── contact-section.tsx
│   ├── site-header.tsx    # Sticky nav with anchor links + mobile Sheet drawer
│   └── site-footer.tsx    # Minimal footer included as low-risk supporting chrome, not a primary content section
└── routes/
    └── home.tsx           # Index route: loader + page assembly (existing, refactored)
```

## Implementation Phases

### Phase A: Data Layer

**Goal**: Establish the typed static data foundation that all components consume.

**Tasks**:
1. Create `app/data/technologies.ts` — `Technology` interface + `technologies` registry with real or placeholder entries; exported `getTechnology(id)` helper
2. Create `app/data/config.ts` — `SiteConfig` interface + `siteConfig` export with placeholder content (name, tagline, target roles, about, contact)
3. Create `app/data/projects.ts` — `Project` interface + `ProjectLinks` type + `projects` array + `featuredProjects` computed export. Start with 1–2 draft project entries structured for real content; author will replace draft copy with finalized project content.
4. Create `app/data/skills.ts` — `SkillGroup` interface + `skillGroups` export with placeholder categories (Frontend, Backend, Tools)
5. Update `app/routes/home.tsx` loader to import data modules and return `HomeLoaderData` shape
6. Run `yarn typecheck` — types must resolve cleanly before any component work begins

**Completion gate**: `yarn typecheck` passes with loader return type correctly inferred by React Router.

---

### Phase B: Layout Shell & Navigation

**Goal**: Establish the page shell (header, main, footer) and anchor navigation before any section content.

**Tasks**:
1. Create `app/components/site-header.tsx`:
   - Fixed/sticky position, full-width, `bg-canvas/80` with backdrop blur
   - Engineer name/logo (left) + nav links (right): Projects, About, Skills, Contact
   - Mobile: Sheet drawer with same nav links, triggered by hamburger (lucide-react `Menu` icon)
   - Skip-to-content link (`<a href="#main-content">Skip to content</a>`) — visually hidden until focused
   - All nav links are `<a>` tags with anchor hrefs (`#projects`, `#about`, etc.)
2. Create `app/components/site-footer.tsx`:
   - Minimal one-line footer: copyright + quick icon links (GitHub, LinkedIn)
   - `<footer>` semantic element
3. Update `app/routes/home.tsx` to render `<SiteHeader>`, `<main id="main-content">`, and `<SiteFooter>` wrapping section components (stubs for now)

**Completion gate**: `yarn typecheck` passes; page renders header and footer with working mobile drawer.

---

### Phase C: Hero Section

**Goal**: Build the above-the-fold hero section. Highest-priority section (US-1, SC-001, SC-006).

**Tasks**:
1. Create `app/components/sections/hero-section.tsx`:
   - Props: `config: SiteConfig` (passed from home loader data)
   - Structure: `<section id="hero">` > centered container
   - Elements (top-down): tagline/eyebrow label, `<h1>` with engineer name headline, professional identity/title, target roles display, value proposition paragraph, CTA button group
   - Target roles: displayed as Badge components (one per role)
   - CTAs: Primary Button ("View My Work" → `#projects`), outlined secondary Button ("Get In Touch" → `#contact`)
   - Typography: Uses Inter (already loaded); uses `text-foreground`, `text-muted-foreground` tokens
   - No images; typography-only layout
2. Refactor existing hero markup in `home.tsx` to use `<HeroSection config={loaderData.config} />`
3. Ensure hero section is rendered inside `<main>` immediately after `<SiteHeader>`

**Completion gate**: `yarn typecheck` passes; hero section correctly displays data from `siteConfig`; visible and readable above the fold.

---

### Phase D: Projects Section

**Goal**: Build the featured projects grid. Core credibility section (US-2, SC-002).

**Tasks**:
1. Create `app/components/sections/projects-section.tsx`:
   - Props: `projects: Project[]`
   - Structure: `<section id="projects">` > section heading + project card grid
   - Project card composition using shadcn/ui `Card`:
     - `CardHeader`: project title + role badge
     - `CardContent`: outcome summary (primary text, larger weight) + description (secondary, smaller)
     - `CardFooter`: technology badges (using `Badge`) + link button(s)
   - Grid: responsive CSS grid (1 col mobile → 2-3 col desktop)
   - External links: `target="_blank" rel="noopener noreferrer"`, lucide-react `ExternalLink` icon
   - If no demo/repo link exists, omit the link button — no broken or placeholder links
2. Add `<ProjectsSection projects={loaderData.projects} />` to home page

**Completion gate**: `yarn typecheck` passes; project cards render correctly; tech badges use `Badge` component; external links open in new tab.

---

### Phase E: About Section

**Goal**: Build the personal narrative section. Builds human credibility (US-3).

**Tasks**:
1. Create `app/components/sections/about-section.tsx`:
   - Props: `about: SiteConfigAbout`
   - Structure: `<section id="about">` > two-column layout on desktop (text left, optional visual right), single column on mobile
   - Headline: `<h2>` using `about.headline`
   - Paragraphs: mapped from `about.paragraphs` array, each in a `<p>` tag
   - Optional decorative element (right column on desktop): could be a simple geometric accent or left empty — no avatar/photo required
   - No markdown parsing — paragraphs are plain strings
2. Add `<AboutSection about={loaderData.config.about} />` to home page

**Completion gate**: `yarn typecheck` passes; about section renders all paragraphs from config; layout is readable on mobile and desktop.

---

### Phase F: Skills Section

**Goal**: Build the categorized skills/toolbox display (US-4, SC-004).

**Tasks**:
1. Create `app/components/sections/skills-section.tsx`:
   - Props: `skillGroups: SkillGroup[]`
   - Structure: `<section id="skills">` > section heading + category grid
   - Each skill group: category label as `<h3>` + skills as `Badge` components in a flex-wrap layout
   - Grid: 2-column or 3-column layout for categories on desktop; single column on mobile
   - Badge variant for skills: use `secondary` or `outline` variant to differentiate from project tech badges
2. Add `<SkillsSection skillGroups={loaderData.skillGroups} />` to home page

**Completion gate**: `yarn typecheck` passes; skills render in categories with badges; scannable within 20 seconds (per SC-004).

---

### Phase G: Contact Section

**Goal**: Build the contact/outreach section (US-5, SC-003, FR-007, FR-014).

**Tasks**:
1. Create `app/components/sections/contact-section.tsx`:
   - Props: `contact: SiteConfigContact`
   - Structure: `<section id="contact">` > centered content block
   - Heading: short call-to-action phrase (e.g., "Let's Work Together")
   - Links (all as styled anchor elements):
     - Email: `mailto:` link, lucide-react `Mail` icon, opens native mail client
     - LinkedIn: external link, lucide-react `Linkedin` icon, `target="_blank"`
     - GitHub: external link, lucide-react `Github` icon, `target="_blank"`
   - Each contact link styled as a Button (ghost or outline variant) with icon + label
   - Optional: brief 1-sentence invitation copy above the links
2. Add `<ContactSection contact={loaderData.config.contact} />` to home page

**Completion gate**: `yarn typecheck` passes; all three contact links present and functional; mailto opens mail client; external links open in new tab.

---

### Phase H: SEO & Meta

**Goal**: Ensure proper page metadata for search and link previews.

**Tasks**:
1. Update `meta()` export in `app/routes/home.tsx`:
   - Page title: `"${config.name} — ${config.title}"`
   - Meta description: derived from tagline and about content
   - Open Graph tags: `og:title`, `og:description`, `og:type: "website"`
   - Derive meta values from route data in a React Router-supported way
2. Verify no duplicate `<title>` or `<meta name="description">` from root layout

**Completion gate**: `yarn typecheck` passes; view page source shows correct title and meta description tags rendered server-side.

---

### Phase I: Polish & Cross-Cutting

**Goal**: Ensure visual consistency, accessibility, and quality across all sections.

**Tasks**:
1. **Accessibility audit**:
   - Verify skip-to-content link works (tab from address bar → skip link visible → Enter → focus jumps to `#main-content`)
   - Verify all interactive elements have visible focus rings (Tailwind `focus-visible:ring` classes via shadcn defaults)
   - Verify all `<section>` elements have an `aria-labelledby` pointing to their `<h2>` headings
   - Verify `<img>` elements (if any) have descriptive `alt` attributes
2. **Visual consistency review**:
   - All section headings use the same typographic treatment
   - Consistent vertical rhythm between sections (spacing tokens, not arbitrary px values)
   - No hardcoded hex colors anywhere — all colors via CSS variable tokens
   - Card and badge styles consistent across Projects and Skills sections
3. **Mobile review** (320px):
   - Header collapses to mobile drawer correctly
   - No horizontal overflow on any section
   - All tap targets are at least 44×44px
   - Contact links are easily tappable
4. **Performance check**:
   - No images above the fold
   - No render-blocking resources added
   - `loading="lazy"` on any project images
5. Run `yarn typecheck` — must pass with zero errors
6. Run `yarn build` — must complete without error

**Completion gate**: `yarn typecheck` and `yarn build` both pass; all acceptance criteria from spec user stories are met on visual inspection.

---

## Complexity Tracking

No constitution violations. All design decisions reuse existing primitives and avoid speculative complexity.
