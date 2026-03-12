# Tasks: Portfolio Homepage

**Feature**: `001-portfolio-homepage`
**Branch**: `001-portfolio-homepage`
**Input**: `specs/001-portfolio-homepage/` — plan.md, spec.md, data-model.md, contracts/data-contracts.md
**Tests**: Not requested — no test tasks included

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Maps to a user story from spec.md (US1–US5)
- Exact file paths are included in every task description

---

## Phase 1: Setup

**Purpose**: Create the `app/data/` directory and confirm project scaffold is ready before foundational work begins.

- [x] T001 Create `app/data/` directory (run `mkdir -p app/data` from repo root)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data layer + page shell must be complete before any section component can be built or tested.

**⚠️ CRITICAL**: No user story phase can begin until this phase is complete. All section components depend on the data contracts and the route loader being in place.

### Data Layer

- [x] T002 [P] Create `app/data/technologies.ts` — export `TechnologyLinks` interface, `Technology` interface, `technologies: Technology[]` registry (real or placeholder entries), and `getTechnology(id: string): Technology` helper function
- [x] T003 [P] Create `app/data/config.ts` — export `SiteConfigAbout` interface, `SiteConfigContact` interface, `SiteConfig` interface, and `siteConfig: SiteConfig` singleton with placeholder content (name, title, tagline, targetRoles, about, contact)
- [x] T004 [P] Create `app/data/projects.ts` — export `ProjectLinks` type, `Project` interface, `projects: Project[]` array (1–2 draft entries), and `featuredProjects: Project[]` (filtered to `featured: true`, sorted ascending by `order`)
- [x] T005 [P] Create `app/data/skills.ts` — export `SkillGroup` interface and `skillGroups: SkillGroup[]` array with placeholder categories (Frontend, Backend, Tools), sorted ascending by `order`

### Layout Shell

- [x] T006 [P] Create `app/components/site-header.tsx` — sticky header (`bg-canvas/80 backdrop-blur-md`), engineer name left, anchor nav links right (`#projects`, `#about`, `#skills`, `#contact`), Sheet mobile drawer triggered by lucide-react `Menu` icon, skip-to-content link (`<a href="#main-content">`) visually hidden until focused; define inline `NavLink` interface and `NAV_LINKS` constant
- [x] T007 [P] Create `app/components/site-footer.tsx` — minimal `<footer>` with copyright line and icon links (GitHub, LinkedIn) using lucide-react `Github` and `Linkedin` icons; `target="_blank" rel="noopener noreferrer"` on external links

### Route Wiring

- [x] T008 Update `app/routes/home.tsx` — add `loader()` that imports from all four `app/data/` modules and returns `{ config: siteConfig, projects: featuredProjects, skillGroups }`; replace existing component body with `<SiteHeader />`, `<main id="main-content">` (empty for now), and `<SiteFooter />`; use `Route.ComponentProps` from `./+types/home` for component props typing
- [x] T009 Run `yarn typecheck` — all data module types and loader return type must resolve cleanly with zero errors before section work begins

**Checkpoint**: `yarn typecheck` passes — data contracts are live and the route loader is wired. Section components can now be built and consumed.

---

## Phase 3: User Story 1 — Employer First Impression (Priority: P1) 🎯 MVP

**Goal**: Build the hero section so a first-time visitor can identify the engineer's name, role, target roles, and value proposition within 10 seconds without scrolling.

**Independent Test**: Open the homepage, read only the hero section without scrolling, and confirm a stranger can describe who the engineer is, what they do, and what roles they're targeting. Verify layout is polished at all viewport widths.

- [x] T010 [US1] Create `app/components/sections/hero-section.tsx` — props: `{ config: SiteConfig }`; structure: `<section id="hero" aria-labelledby="hero-heading">`; elements top-down: eyebrow label (tagline, `text-sm uppercase tracking-[0.2em] text-muted-foreground`), `<h1 id="hero-heading">` with `config.name`, professional identity line (`config.title`), `config.targetRoles` displayed as `Badge` components (one per role), value proposition paragraph (`config.tagline`, `text-muted-foreground`), CTA group: primary `Button` ("View My Work" → `#projects`) and outline `Button` ("Get In Touch" → `#contact`); typography-only, no images
- [x] T011 [US1] Wire `<HeroSection config={loaderData.config} />` inside `<main id="main-content">` in `app/routes/home.tsx`; run `yarn typecheck`

**Checkpoint**: Hero section renders data from `siteConfig` and is readable above the fold on mobile and desktop.

---

## Phase 4: User Story 2 — Project Credibility Review (Priority: P2)

**Goal**: Build the projects section so an employer can read project cards and understand what was built, the outcome, and the engineer's role — without clicking through.

**Independent Test**: Read only the projects section and confirm a non-technical person can describe what each project accomplished and why it mattered. Verify external links open in a new tab and technology badges are visible but secondary.

- [x] T012 [US2] Create `app/components/sections/projects-section.tsx` — props: `{ projects: Project[] }`; structure: `<section id="projects" aria-labelledby="projects-heading">`; section heading `<h2 id="projects-heading">`; responsive CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`); each project rendered as shadcn/ui `Card`: `CardHeader` with project title + role `Badge`, `CardContent` with `outcome` (primary weight) + `description` (secondary, `text-muted-foreground`), `CardFooter` with `Badge` per technology + link buttons (only render if `links.demo` or `links.repo` exists, `target="_blank" rel="noopener noreferrer"`, lucide-react `ExternalLink` icon)
- [x] T013 [US2] Wire `<ProjectsSection projects={loaderData.projects} />` inside `<main>` after `HeroSection` in `app/routes/home.tsx`; run `yarn typecheck`

**Checkpoint**: Project cards render correctly with outcome-first content; tech badges and external links work; grid is responsive.

---

## Phase 5: User Story 3 — Engineer Background & Fit Assessment (Priority: P3)

**Goal**: Build the about section so a hiring manager can understand who the engineer is as a person and whether they'd be a good fit.

**Independent Test**: Read only the about section and confirm it answers "who is this person and would I want to work with them?" in an authentic, non-templated way.

- [ ] T014 [US3] Create `app/components/sections/about-section.tsx` — props: `{ about: SiteConfigAbout }`; structure: `<section id="about" aria-labelledby="about-heading">`; two-column layout on desktop (text left, optional decorative accent right), single column on mobile; `<h2 id="about-heading">` from `about.headline`; `about.paragraphs` mapped to `<p>` elements (`text-base leading-7 text-muted-foreground`); no markdown parsing — plain strings only
- [ ] T015 [US3] Wire `<AboutSection about={loaderData.config.about} />` inside `<main>` after `ProjectsSection` in `app/routes/home.tsx`; run `yarn typecheck`

**Checkpoint**: About section renders all paragraphs; layout is readable on mobile and desktop.

---

## Phase 6: User Story 4 — Skills & Toolbox Scan (Priority: P4)

**Goal**: Build the skills section so a technical interviewer can identify the engineer's primary stack and supporting technologies within 20 seconds.

**Independent Test**: Read only the skills section and confirm a technical interviewer can identify the primary stack and supporting technologies in under 20 seconds. Verify technologies are grouped by meaningful category, not presented as a flat list.

- [ ] T016 [US4] Create `app/components/sections/skills-section.tsx` — props: `{ skillGroups: SkillGroup[] }`; structure: `<section id="skills" aria-labelledby="skills-heading">`; `<h2 id="skills-heading">`; category grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`); each `SkillGroup` rendered as a group: `<h3>` for category label + `flex flex-wrap gap-2` of `Badge` components using `secondary` or `outline` variant (visually distinct from project tech badges); groups sorted by `order`
- [ ] T017 [US4] Wire `<SkillsSection skillGroups={loaderData.skillGroups} />` inside `<main>` after `AboutSection` in `app/routes/home.tsx`; run `yarn typecheck`

**Checkpoint**: Skills render in categorized groups with badges; visually scannable within 20 seconds.

---

## Phase 7: User Story 5 — Contact & Outreach (Priority: P5)

**Goal**: Build the contact section so an employer can initiate outreach in under 30 seconds without confusion.

**Independent Test**: Navigate to the contact section and confirm email, LinkedIn, and GitHub links are all present, clearly visible, and functional. Verify email link opens the native mail client and external links open in a new tab.

- [ ] T018 [US5] Create `app/components/sections/contact-section.tsx` — props: `{ contact: SiteConfigContact }`; structure: `<section id="contact" aria-labelledby="contact-heading">`; centered content block; `<h2 id="contact-heading">` with CTA phrase (e.g., "Let's Work Together"); optional 1-sentence invitation above links; three links as `Button` (ghost or outline variant) with icon + label: email (`mailto:` href, lucide-react `Mail`), LinkedIn (`contact.linkedin`, `target="_blank"`, lucide-react `Linkedin`), GitHub (`contact.github`, `target="_blank"`, lucide-react `Github`); `rel="noopener noreferrer"` on external links
- [ ] T019 [US5] Wire `<ContactSection contact={loaderData.config.contact} />` inside `<main>` after `SkillsSection` in `app/routes/home.tsx`; run `yarn typecheck`

**Checkpoint**: All three contact links present; email opens mail client; LinkedIn and GitHub open in new tab.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: SEO metadata, accessibility hardening, visual consistency, and final quality gates across all sections.

- [ ] T020 Update `meta()` export in `app/routes/home.tsx` — page title: `"${config.name} — ${config.title}"`, meta description from `config.tagline`, Open Graph tags (`og:title`, `og:description`, `og:type: "website"`); derive all values from `data` arg in `Route.MetaArgs`; verify no duplicate `<title>` or `<meta name="description">` from `app/root.tsx`
- [ ] T021 [P] Accessibility audit across all sections in `app/components/sections/` — verify every `<section>` has `aria-labelledby` pointing to its `<h2>` id; verify skip-to-content link in `app/components/site-header.tsx` is first focusable element and jumps focus to `#main-content` on Enter; verify all icon-only buttons have `aria-label`
- [ ] T022 [P] Visual consistency review across `app/components/sections/` — confirm all `<h2>` section headings use identical typographic treatment (`text-3xl md:text-4xl font-semibold tracking-tight`); consistent vertical rhythm between sections (`py-20 md:py-28`); no hardcoded hex colors; `Badge` variants consistent (default for project tech, secondary/outline for skills)
- [ ] T023 [P] Mobile review at 320px — open dev tools, set viewport to 320px, verify: no horizontal overflow in any section, header Sheet drawer opens and closes, all contact/CTA tap targets are at least 44×44px, project cards stack to single column
- [ ] T024 Run `yarn typecheck` — must pass with zero errors
- [ ] T025 Run `yarn build` — must complete without error; fix any build-time issues before marking complete

**Checkpoint**: `yarn typecheck` and `yarn build` both pass; all spec acceptance criteria met on visual inspection.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **blocks all user story phases**
- **Phase 3–7 (User Stories)**: All depend on Phase 2 completion; can proceed in priority order or in parallel
- **Phase 8 (Polish)**: Depends on all desired user story phases being complete

### User Story Dependencies

| Story | Depends On | Independent? |
|---|---|---|
| US1 Hero (P1) | Phase 2 complete | Yes |
| US2 Projects (P2) | Phase 2 complete | Yes |
| US3 About (P3) | Phase 2 complete | Yes |
| US4 Skills (P4) | Phase 2 complete | Yes |
| US5 Contact (P5) | Phase 2 complete | Yes |

All five user stories are fully independent of each other — each section component has its own file and its own slice of loader data.

### Within Each User Story

1. Section component file created first
2. Route wiring (`home.tsx`) second — requires the component to exist
3. `yarn typecheck` validates completion

### Parallel Opportunities Within Phase 2

```bash
# These four data files have no inter-dependencies — run in parallel:
Task: T002 — app/data/technologies.ts
Task: T003 — app/data/config.ts
Task: T004 — app/data/projects.ts
Task: T005 — app/data/skills.ts

# These two layout components have no data dependencies — run in parallel with each other:
Task: T006 — app/components/site-header.tsx
Task: T007 — app/components/site-footer.tsx
```

### Parallel Opportunities Within Phase 8

```bash
# These three polish tasks touch different concerns — run in parallel:
Task: T021 — Accessibility audit (sections/)
Task: T022 — Visual consistency review (sections/)
Task: T023 — Mobile review (320px viewport)
```

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (data layer + shell — **do not skip**)
3. Complete Phase 3: Hero section (US1)
4. **STOP and VALIDATE**: Open homepage, read hero cold, confirm identity/role/value prop is clear
5. Ship if hero passes — remaining sections add to a working baseline

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready (`yarn typecheck` passes)
2. Phase 3 (US1) → Hero live → Validate → Demo-able
3. Phase 4 (US2) → Projects live → Validate → Primary credibility complete
4. Phase 5 (US3) → About live → Human narrative present
5. Phase 6 (US4) → Skills live → Tech fit signal complete
6. Phase 7 (US5) → Contact live → **Full homepage complete**
7. Phase 8 → Polish, SEO, accessibility, final build

---

## Notes

- No test tasks — tests not requested in spec; `yarn typecheck` is the quality gate
- `app/data/` content is placeholder — Ryan McBride will replace draft copy with real project outcomes, bio, and contact details before launch
- `home.tsx` is safe to overwrite completely (existing markup is placeholder)
- All section components MUST receive data via props — never import from `app/data/` directly
- External links: always `target="_blank" rel="noopener noreferrer"`
- No hardcoded hex colors — use `bg-canvas`, `bg-surface`, `text-foreground`, `text-muted-foreground` tokens from `app/app.css`
