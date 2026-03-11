# Research: Portfolio Homepage

**Phase**: 0 — Outline & Research
**Feature**: 001-portfolio-homepage
**Date**: 2026-03-09

---

## Decision 1: Data Source for Portfolio Content

**Decision**: Static TypeScript data modules returned via React Router loaders.

**Rationale**: Portfolio content (projects, skills, about text, contact links) is static and author-controlled. A CMS or database would add unnecessary complexity (violating Constitution V: Simplicity). Placing data in typed TypeScript modules (`app/data/`) gives full type safety, SSR compatibility, and zero runtime dependencies. Loaders return this data so no `useEffect` is needed, satisfying Constitution IV (SSR Compatibility). Static data is the deliberate choice for the homepage feature, with database-backed content deferred to a later feature where it provides real value.

**Alternatives considered**:
- **Headless CMS (Contentful, Sanity)**: Adds network dependency, auth config, and a paid service. Overkill for a solo-maintained static portfolio.
- **MDX files**: Works for content-heavy pages (blog) but adds complexity for structured data like projects and skills. Rejected.
- **Hardcoded JSX**: Makes data impossible to reuse across pages (e.g., project detail routes). Rejected in favor of data module approach.

---

## Decision 2: Navigation Pattern

**Decision**: Fixed/sticky header with anchor links to in-page sections. Mobile uses a Sheet (drawer) component already installed via shadcn/ui.

**Rationale**: Single-page layout with all sections on the homepage (per spec assumption). Anchor navigation is the correct UX pattern. The Sheet component is already available, avoiding any new dependency for mobile nav. This satisfies Constitution I (Component-First) by reusing an existing shadcn/ui primitive.

**Alternatives considered**:
- **Separate pages per section**: Over-engineered for a portfolio where employers should see the full picture in one scroll.
- **Custom mobile menu**: Would duplicate behavior already covered by Sheet. Rejected.
- **No mobile nav**: Unacceptable for SC-005 (320px accessibility requirement).

---

## Decision 3: Projects Section — Card Composition

**Decision**: Use the existing `Card` shadcn/ui component as the base for project cards. Each card composes: `CardHeader` (title + role tag), `CardContent` (outcome summary + supporting description), `CardFooter` (tech badges + CTA link).

**Rationale**: Card is already installed and aligns with Constitution I. Badge is also installed for tech tags. No new components needed for the projects section beyond composition of existing primitives.

**Alternatives considered**:
- **Custom grid with div-based layout**: Bypasses the design system. Rejected.
- **Table layout**: Semantically wrong for a card grid. Rejected.

---

## Decision 4: Skills Section — Display Pattern

**Decision**: Grouped skill categories rendered as labeled sections (e.g., Frontend, Backend, Infrastructure, Tools). Individual skills displayed as Badge components. No proficiency bars, ratings, or star systems.

**Rationale**: Proficiency ratings are subjective and often backfire in hiring contexts. Clean categorical groupings signal the engineer's mental model of their stack. Badge components already installed. Proficiency signals come from projects, not a rating scale.

**Alternatives considered**:
- **Skill bars with percentage**: Misleading and visually clichéd. Rejected.
- **Logo icon grid**: Poor accessibility, no semantic meaning. Rejected.
- **Plain text list**: Less visually impactful and harder to scan quickly. Rejected.

---

## Decision 5: Contact Section — No Form

**Decision**: Direct links only: email (`mailto:`), LinkedIn, GitHub. No contact form.

**Rationale**: Contact forms require backend handling (spam protection, email routing, validation). Constitution V prohibits adding complexity without clear need. Direct mailto links satisfy FR-007, FR-014, and SC-003 without any server-side code. Employers who prefer not to use email can use LinkedIn.

**Alternatives considered**:
- **Contact form with server action**: Would require email service (Resend, SendGrid), spam protection (Honeypot or CAPTCHA), and server action. All complexity without meaningful UX benefit over a mailto link for this use case.

---

## Decision 6: Project Detail Pages

**Decision**: Out of scope for this feature. For this feature, project cards link to external URLs (GitHub repo, live demo) where available. Internal project detail pages remain a separate future feature.

**Rationale**: Spec states "optional deeper detail pages for individual projects." Including them in this feature would significantly expand scope without being required by any P1-P2 user story. FR-003 requires "a clear path to more detail when available" — external links satisfy this.

**Alternatives considered**:
- **In-scope project detail pages**: Would require: additional route definitions, dynamic routing, per-project data, and additional design work. Deferred to a follow-up feature.

---

## Decision 7: SEO Metadata Strategy

**Decision**: Use React Router's `meta()` export in the home route for page title, description, and Open Graph tags. No third-party SEO library needed.

**Rationale**: React Router v7 has built-in meta support. SSR renders these server-side, which is critical for SEO and link previews (when the portfolio URL is shared on LinkedIn, Slack, etc.). Constitution V prohibits adding dependencies when built-in capability suffices.

**Alternatives considered**:
- **react-helmet / react-helmet-async**: Redundant with React Router v7's meta export. Rejected.

---

## Decision 8: Animation Strategy

**Decision**: CSS transitions only (Tailwind's `transition`, `duration`, `ease` utilities). No animation library.

**Rationale**: Constitution V (Simplicity) prohibits speculative dependencies. Subtle hover transitions on cards and links are achievable with Tailwind alone. Heavy scroll-reveal animations distract from content and can hurt perceived performance. A premium feel comes from typography and spacing, not motion.

**Alternatives considered**:
- **Framer Motion**: Additional dependency not justified for basic hover and transition effects. Rejected.
- **GSAP**: Far too heavy for this use case. Rejected.

---

## Decision 9: Image Handling

**Decision**: No hero image. The hero section uses typography-only layout. Project images are optional and loaded lazily with `loading="lazy"` attribute. Images placed in `public/` directory.

**Rationale**: Typography-first hero sections are consistent with premium product design aesthetic (e.g., Vercel, Linear). They avoid hero image loading bottlenecks (SC-006: hero readable within 3s). Project images are secondary to outcome summaries (FR-004) so lazy loading is appropriate.

**Alternatives considered**:
- **Hero background image**: Creates above-the-fold loading dependency. Rejected for performance.
- **Next-gen image optimization (sharp, etc.)**: Overkill for a portfolio with few images. Rejected.

---

## Decision 10: Accessibility Foundation

**Decision**: Semantic HTML first (FR-015): `<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`. Skip-to-content link at top of page. Interactive primitives from shadcn/ui provide strong accessibility defaults, but semantic structure and focus visibility must still be preserved in custom layout components.

**Rationale**: Constitution Development Workflow: "Semantic HTML should be preferred before adding ARIA. No `<div>` soup." Radix UI (underlying shadcn/ui) handles ARIA and keyboard interactions for interactive components. Skip navigation link is a best-practice addition with minimal code cost.

**Alternatives considered**:
- **Custom ARIA implementation**: Redundant with Radix UI. Rejected.
- **Accessibility library (axe-react, etc.)**: Dev tooling, not runtime code. Can be added to dev workflow separately.
