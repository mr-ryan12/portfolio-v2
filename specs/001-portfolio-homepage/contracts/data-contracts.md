# Data Contracts: Portfolio Homepage

**Type**: TypeScript interface contracts for static data layer
**Feature**: 001-portfolio-homepage
**Date**: 2026-03-09

---

## Purpose

This portfolio is currently a frontend-only application with no external API (Prisma + PostgreSQL will come in a later feature). Contracts here define the shape of the static data that flows from `app/data/` modules → React Router loaders → React components. These contracts enforce consistency and enable TypeScript to catch data mismatches at compile time.

**Naming conventions**: PascalCase for all interfaces and type aliases — no `I` or `T` prefixes.

When PostgreSQL + Prisma is introduced, these interface shapes remain unchanged — only the data source (static modules vs. Prisma service layer) changes. See `data-model.md` → "Future: Database Layer" for the migration plan.

---

## Contract: Technology

**File**: `app/data/technologies.ts`
**Consumed by**: `Project.technologies`, `SkillGroup.skills`, `ProjectCard`, `SkillsSection`

```typescript
export interface TechnologyLinks {
  website?: string;
  docs?: string;
}

export interface Technology {
  id: string;
  name: string;
  description?: string;
  links?: TechnologyLinks;
}

// Exported registry — all technologies used across projects and skills
export const technologies: Technology[];

// Convenience lookup by id
export function getTechnology(id: string): Technology;
```

**Invariants**:
- `id` values are unique and URL-safe
- `name` matches common industry naming

---

## Contract: Project

**File**: `app/data/projects.ts`
**Consumed by**: `HomeLoaderData`, `ProjectCard` component

```typescript
type ProjectLinks = {
  demo?: string;
  repo?: string;
};

export interface Project {
  id: string;
  title: string;
  role: string;
  outcome: string;
  description: string;
  technologies: Technology[];
  links?: ProjectLinks;
  image?: string;
  featured: boolean;
  order: number;
}

// Exported helpers
export const projects: Project[];
export const featuredProjects: Project[]; // projects.filter(p => p.featured).sort((a, b) => a.order - b.order)
```

**Invariants enforced at runtime (dev assertions)**:
- `featuredProjects.length` is between 3 and 5 inclusive
- No two projects share the same `id`
- No `outcome` value is an empty string

---

## Contract: SkillGroup

**File**: `app/data/skills.ts`
**Consumed by**: `HomeLoaderData`, `SkillsSection` component

```typescript
export interface SkillGroup {
  category: string;
  skills: Technology[];
  order: number;
}

// Exported helper
export const skillGroups: SkillGroup[]; // sorted by order ascending
```

**Invariants**:
- Category names are unique
- Each group has at least 1 skill

---

## Contract: SiteConfig

**File**: `app/data/config.ts`
**Consumed by**: `HomeLoaderData`, `HeroSection`, `AboutSection`, `ContactSection`, `SiteHeader` (name), `root.tsx` (meta)

```typescript
export interface SiteConfigAbout {
  headline: string;
  paragraphs: string[];
}

export interface SiteConfigContact {
  email: string;
  linkedin: string;
  github: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  targetRoles: string[];
  about: SiteConfigAbout;
  contact: SiteConfigContact;
  resume?: string;
}

// Exported singleton
export const siteConfig: SiteConfig;
```

---

## Contract: HomeLoaderData

**Defined in**: `app/routes/home.tsx` (loader return type)
**Auto-generated type**: `.react-router/types/app/routes/home.d.ts` (via `yarn typecheck`)

```typescript
// Loader return shape (not a manual interface — inferred from loader function)
// Components consume via Route.ComponentProps["loaderData"]
{
  config: SiteConfig;
  projects: Project[];
  skillGroups: SkillGroup[];
}
```

---

## Contract: NavLink

**Defined in**: `app/components/site-header.tsx` (inline constant — not a data module)

```typescript
interface NavLink {
  label: string;   // Display text (e.g., "Projects")
  href: string;    // Anchor href (e.g., "#projects") or route path
}

const NAV_LINKS: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];
```

---

## Breaking Change Policy

These contracts are internal to the portfolio application. Since this is a solo-maintained site with no external consumers, breaking changes to these interfaces are acceptable as long as:

1. All consuming components are updated in the same commit
2. `yarn typecheck` passes after the change
3. No runtime errors occur on the homepage
