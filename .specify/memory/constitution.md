<!--
SYNC IMPACT REPORT
==================
Version change: (new) → 1.0.0
Modified principles: N/A (initial ratification)
Added sections:
  - Core Principles (5 principles)
  - Technology Stack
  - Development Workflow
  - Governance
Removed sections: N/A (initial ratification)
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ aligned (no changes required; Constitution Check section
    references principles generically and remains valid)
  - .specify/templates/spec-template.md ✅ aligned (mandatory sections unchanged)
  - .specify/templates/tasks-template.md ✅ aligned (task phases and structure remain valid)
  - .specify/templates/checklist-template.md ✅ aligned (generic structure; no constitution refs)
  - .specify/templates/agent-file-template.md ✅ aligned (no constitution-specific refs)
Follow-up TODOs:
  - None. All placeholders resolved.
-->

# Portfolio v2 Constitution

## Core Principles

### I. Component-First

shadcn/ui primitives MUST be used as the default foundation for interactive UI elements and common surfaces.
Custom layout and marketing components are encouraged when they compose or extend those primitives. New shadcn
components MUST be added via `yarn shadcn add <component>` and MUST land in
`app/components/ui/`. Inline one-off styles that duplicate component behavior are prohibited.

**Rationale**: shadcn/ui (radix-nova, neutral base) is the established design system for this
project. Bypassing it creates inconsistency and maintenance burden in a solo-maintained
portfolio.

### II. Type Safety

TypeScript MUST be used throughout with strict mode enforced. The `any` type is prohibited
except in explicit escape-hatch scenarios, which MUST be justified with an inline comment.
React Router auto-generated route types (`.react-router/types/`) MUST be used for all loader
and action return types. Running `yarn typecheck` MUST pass before any feature is considered
complete.

**Rationale**: Type errors caught at compile time prevent runtime regressions in a portfolio
site where there is no test suite acting as a safety net.

### III. Design System Adherence

All visual decisions MUST use the project design system:

- Background: `bg-[#060816]` (dark base)
- Typography: Inter font loaded via `root.tsx`
- Colors and spacing: Tailwind CSS variables defined in `app/app.css`
- Theming: CSS variables approach — no `tailwind.config.js` overrides

Hardcoded hex colors, arbitrary font imports, or spacing values that bypass the CSS variable
system are prohibited unless added to `app/app.css` first.

**Rationale**: Visual consistency is the primary quality signal for a personal portfolio.
Ad-hoc style decisions erode the coherence that makes the site credible to viewers.

### IV. SSR Compatibility

Initial route data MUST come from React Router loaders. useEffect is not for initial data fetching. 
It may be used only for client-only side effects or non-critical enhancement after render.
Browser-only APIs (e.g., `window`, `localStorage`) MUST be guarded with environment checks or deferred
to client-side effects after hydration.

**Rationale**: SSR is enabled and is a core architectural decision. Breaking hydration or
producing SSR/client mismatches creates flickering, accessibility regressions, and SEO
degradation — all critical for a portfolio.

### V. Simplicity

No new dependency MUST be added without a clear, demonstrated need that cannot be satisfied
by existing dependencies or a small amount of custom code. State management libraries are
prohibited; React Router loaders and React built-in state are sufficient. Features MUST NOT
be built speculatively — implement only what is required by the current feature spec.

**Rationale**: A personal portfolio is a small, maintainable site. Complexity introduced
without necessity makes future updates harder and increases bundle size without user benefit.

## Technology Stack

- **Language**: TypeScript (strict)
- **Framework**: React Router v7 (SSR enabled)
- **Styling**: TailwindCSS v4 (CSS variables, `app/app.css`)
- **Component Library**: shadcn/ui (radix-nova style, neutral base, lucide-react icons)
- **Package Manager**: Yarn v4 (Berry) — `yarn` MUST be used, not `npm` or `pnpm`
- **Path Alias**: `~/*` → `app/*`
- **Route Config**: `app/routes.ts` using `@react-router/dev/routes` syntax
- **Type Generation**: `.react-router/types/` — regenerate via `yarn typecheck`

## Development Workflow

- Routes MUST be declared in `app/routes.ts` before being implemented under `app/routes/`
- `TooltipProvider` is globally wrapped in `app/root.tsx`; features MUST NOT re-wrap it
- All components added via shadcn MUST land in app/components/ui/. Local customization is allowed,
  but shared primitives should remain generic and reusable.
- The `cn()` utility from `~/lib/utils` MUST be used for conditional class merging
- `yarn typecheck` MUST pass before marking any task complete
- Features follow the speckit workflow: spec → plan → tasks → implement
- Interactive UI MUST remain keyboard accessible and preserve visible focus states.
- Semantic HTML should be preferred before adding ARIA. No `<div>` soup.

## Governance

This constitution supersedes all other development practices for this repository. Any
practice that conflicts with a principle above is invalid.

**Amendment procedure**: Amendments require updating this file, incrementing the version
per semantic versioning rules (MAJOR: principle removal/redefinition; MINOR: new principle
or section; PATCH: clarification/wording), and updating the Sync Impact Report header.

**Versioning policy**:

- MAJOR: Backward-incompatible governance change (removing or fundamentally redefining a
  principle in a way that invalidates prior decisions made under it).
- MINOR: New principle or substantive new section added.
- PATCH: Clarifications, wording improvements, typo fixes, non-semantic refinements.

**Compliance review**: Every feature plan MUST include a Constitution Check section
(see `plan-template.md`) that verifies each principle is satisfied before implementation
begins. Re-check after Phase 1 design is complete.

**Runtime guidance**: See `CLAUDE.md` for day-to-day development commands and conventions.

### VI. Proof Over Hype

Project descriptions MUST emphasize concrete responsibilities, technical decisions, and measurable outcomes over generic claims. Portfolio content MUST be truthful and must not exaggerate scope, role, or impact.

**Version**: 1.0.0 | **Ratified**: 2026-03-08 | **Last Amended**: 2026-03-08
