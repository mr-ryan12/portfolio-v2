# Data Model: Portfolio Homepage

**Phase**: 1 — Design & Contracts
**Feature**: 001-portfolio-homepage
**Date**: 2026-03-09

---

## Naming Conventions

- PascalCase for all interfaces and type aliases — no `I` or `T` prefixes (e.g., `Project`, `SiteConfig`, `ProjectLinks`)
- These conventions apply to all TypeScript files in this project

---

## Overview

All portfolio data is currently static and author-controlled. Data lives in typed TypeScript modules under `app/data/` and is consumed by React Router loaders. No database, no API, no CMS — **for now**. See [Future: Database Layer](#future-database-layer) below for the planned PostgreSQL + Prisma migration path.

---

## Entity: Technology

Represents a technology, framework, or tool. Used as a structured tag on projects and as individual entries in skill groups. Defined as a first-class entity (not a bare string) so the shape is compatible with a future database-backed implementation.

```typescript
interface TechnologyLinks {
  website?: string;  // Official website URL
  docs?: string;     // Documentation URL
}

interface Technology {
  id: string;           // URL-safe slug (e.g., "react", "typescript", "postgresql")
  name: string;         // Display name (e.g., "React", "TypeScript", "PostgreSQL")
  description?: string; // Optional: 1-sentence description of what the tech is/does
  links?: TechnologyLinks;
}
```

**Validation rules**:
- `id` MUST be unique across all technologies and MUST be URL-safe (lowercase, hyphens only)
- `name` MUST match common industry recognition (e.g., "TypeScript" not "TS", "PostgreSQL" not "Postgres")

**Future (Prisma)**: Maps to a `technologies` table. Will gain an `iconUrl` or `iconSlug` field for logo display.

---

## Entity: Project

Represents a featured engineering project displayed in the Projects section.

```typescript
interface Project {
  id: string;                 // URL-safe slug (e.g., "order-management-dashboard")
  title: string;              // Project name (e.g., "Order Management Dashboard")
  role: string;               // Engineer's role (e.g., "Lead Frontend Engineer")
  outcome: string;            // 1-2 sentence outcome-first summary (what was achieved and why it mattered)
  description: string;        // 2-4 sentence expanded summary for accessibility/detail
  technologies: Technology[]; // Ordered list: primary technologies first
  links: ProjectLinks;
  image?: string;             // Optional: path to project image in /public (e.g., "/projects/order-dashboard.png")
  featured: boolean;          // If true, shown in homepage projects section
  order: number;              // Display order (ascending)
}

type ProjectLinks = {
  demo?: string;  // Live URL (external, opens in new tab)
  repo?: string;  // GitHub repo URL (external, opens in new tab)
};
```

**Validation rules**:
- `outcome` MUST be non-empty and MUST NOT start with a technology name (it must lead with impact)
- `technologies` MUST have at least 1 item
- `featured` projects: maximum 5 shown on homepage (spec FR-003: 3-5 projects)
- `links` MUST have at least one of `demo` or `repo` when available; can be empty `{}` if neither exists

**Future (Prisma)**: Maps to a `projects` table. `technologies` becomes a many-to-many relation via a `project_technologies` join table. `links` fields become columns or a separate `project_links` table.

---

## Entity: SkillGroup

Represents a categorized group of technologies in the Skills/Toolbox section.

```typescript
interface SkillGroup {
  category: string;         // Display label (e.g., "Frontend", "Backend", "Infrastructure", "Tools")
  skills: Technology[];     // Ordered list of technologies within this category (primary first)
  order: number;            // Display order for the category group (ascending)
}
```

**Validation rules**:
- Each `category` value MUST be unique across all `SkillGroup` entries
- `skills` MUST have at least 1 item

**Future (Prisma)**: Maps to a `skill_groups` table. `skills` becomes a many-to-many relation to the shared `technologies` table.

---

## Entity: SiteConfig

Singleton configuration object for the engineer's identity and contact information, consumed by the hero, about, and contact sections.

```typescript
interface SiteConfigAbout {
  headline: string;      // Short about section heading (e.g., "About Me")
  paragraphs: string[];  // 2-4 paragraphs of personal narrative
}

interface SiteConfigContact {
  email: string;         // Direct email address
  linkedin: string;      // Full LinkedIn profile URL
  github: string;        // Full GitHub profile URL
}

interface SiteConfig {
  name: string;            // Full name (e.g., "Ryan McBride")
  title: string;           // Professional identity line (e.g., "Software Engineer")
  tagline: string;         // Hero sub-headline (value proposition, 1 sentence)
  targetRoles: string[];   // Role types being targeted (e.g., ["Senior Frontend Engineer", "Full-Stack Engineer"])
  about: SiteConfigAbout;
  contact: SiteConfigContact;
  resume?: string;         // Optional: path to resume PDF in /public or external URL
}
```

**Validation rules**:
- `targetRoles` MUST have at least 1 item
- `about.paragraphs` MUST have at least 2 paragraphs (avoids single-paragraph bios that feel shallow)
- `contact.email`, `contact.linkedin`, `contact.github` are all required (FR-007, FR-014)
- `tagline` MUST NOT contain generic phrases — enforced by author judgment per Constitution VI (Proof Over Hype)

**Future**: This entity remains static config (it is personal identity data, not user-generated content). No Prisma migration planned for `SiteConfig`.

---

## Data File Layout

```text
app/
└── data/
    ├── technologies.ts  # Technology[] — shared technology registry
    ├── projects.ts      # Project[] array, exports `projects` (all) and `featuredProjects` (filtered + ordered)
    ├── skills.ts        # SkillGroup[] array, exports `skillGroups`
    └── config.ts        # SiteConfig singleton, exports `siteConfig`
```

`technologies.ts` is a shared registry — both `projects.ts` and `skills.ts` should source technology entries from the shared registry in `technologies.ts` to avoid duplicated strings and inconsistent labels.

---

## Loader Data Shape

The home route loader (`app/routes/home.tsx`) returns:

```typescript
interface HomeLoaderData {
  config: SiteConfig;
  projects: Project[];       // Featured projects only, sorted by `order`
  skillGroups: SkillGroup[]; // All skill groups, sorted by `order`
}
```

This loader return type is used directly by React Router auto-generated types via `Route.LoaderArgs` and `Route.ComponentProps`. `HomeLoaderData` is the shape the loader returns — React Router infers it; you do not need to manually annotate it.

---

## State Transitions

This feature has no mutable state — it is a read-only presentation layer. No forms, no user accounts, no persisted state. The only client-side state is:

- **Mobile navigation open/closed**: Local `useState` in the Header component (UI-only, ephemeral, no SSR concern)

---

## Future: Database Layer

When PostgreSQL + Prisma is introduced (planned as a separate future feature), the migration path is:

### What changes

| Layer | Change |
|-------|--------|
| `app/data/` modules | Replaced by a `app/services/` layer (Prisma queries) |
| Home route `loader` | Calls service functions instead of importing static arrays |
| Components | **No change** — they consume `Project`, `Technology`, etc. identically |
| Interfaces | **No change** — the same PascalCase interfaces remain the contracts |

### Future Prisma entities

```
technologies              ← Technology (id, name, description, links)
projects                  ← Project (id, title, role, outcome, description, image, featured, order)
project_technologies      ← join table (projectId, technologyId, isPrimary, displayOrder)
skill_groups              ← SkillGroup (id, category, order)
skill_group_technologies  ← join table (skillGroupId, technologyId, displayOrder)
```

### Why the current design accommodates this

- `Technology` is already a first-class entity (not a `string[]`), so `Project.technologies` and `SkillGroup.skills` already have the correct shape for relational data
- All data access is encapsulated behind the loader — no component directly imports from `app/data/`
- Swapping `import { featuredProjects } from '~/data/projects'` for `await projectService.getFeatured()` in the loader is the only change required to go live with the database layer
