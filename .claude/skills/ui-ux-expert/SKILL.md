---
name: ui-ux-expert
description: UI/UX conventions for this project — design tokens, shadcn/ui components, mobile-first layout, typography, accessibility, and dark canvas patterns.
user-invokable: false
---

# UI/UX Expert

This project is a **dark, premium portfolio site** built with TailwindCSS v4, shadcn/ui (radix-nova style, neutral base), and Inter/Geist fonts. The canvas uses the `bg-canvas` token with white/foreground text. The aesthetic is design-conscious and intentional — clean, typographic, and restrained.

---

## Design Tokens

All colors come from CSS variables defined in `app/app.css`. **Never use hardcoded hex values.**

### Canvas / surface colors

| Token | Value | Use for |
|---|---|---|
| `bg-canvas` | `#060816` | Page background (body default) |
| `bg-surface` | `#0b1022` | Elevated surfaces (cards, panels) |
| `bg-surface-muted` | `#11172a` | Subtly raised elements within surfaces |

### shadcn/ui semantic tokens (oklch-based, dark-mode aware)

| Token | Use for |
|---|---|
| `bg-background` / `text-foreground` | Semantic background and body text |
| `text-muted-foreground` | Secondary/subdued text |
| `bg-card` / `text-card-foreground` | Card backgrounds |
| `bg-primary` / `text-primary-foreground` | Primary action surfaces |
| `bg-secondary` / `text-secondary-foreground` | Secondary action surfaces |
| `bg-accent` / `text-accent-foreground` | Hover states and accents |
| `border-border` | All borders |
| `bg-destructive` | Destructive action indicators |
| `ring-ring` | Focus rings |

### Radius scale

```
--radius-sm   calc(var(--radius) * 0.6)
--radius-md   calc(var(--radius) * 0.8)
--radius-lg   var(--radius)               ← 0.625rem base
--radius-xl   calc(var(--radius) * 1.4)
--radius-2xl  calc(var(--radius) * 1.8)
```

Use `rounded-lg` / `rounded-xl` / `rounded-2xl` — avoid arbitrary `rounded-[Npx]`.

---

## Typography

- **Primary font**: Inter (loaded via Google Fonts in `root.tsx`)
- **Code/mono accent**: Geist Variable (loaded via `@fontsource-variable/geist` in `app.css`)
- The primary font is set globally, so individual elements usually do not need `font-sans`

### Text scale conventions

| Use | Classes |
|---|---|
| Section headings `<h2>` | `text-3xl md:text-4xl font-semibold tracking-tight` |
| Sub-headings `<h3>` | `text-xl font-semibold` |
| Body text | `text-base leading-7 text-muted-foreground` |
| Eyebrow / label | `text-sm uppercase tracking-[0.2em] text-muted-foreground` |
| Small/meta | `text-sm text-muted-foreground` |

All heading elements use `text-foreground` (white on dark canvas). Secondary prose uses `text-muted-foreground`.
Section headings should use consistent hierarchy and visual treatment across the page.

---

## shadcn/ui Components

Installed components live in `app/components/ui/`. Use them as the foundation — never re-implement their functionality from scratch.

| Component | Import | Use for |
|---|---|---|
| `Button` | `~/components/ui/button` | All interactive buttons and link-styled CTAs |
| `Card`, `CardHeader`, `CardContent`, `CardFooter` | `~/components/ui/card` | Project cards, content containers |
| `Badge` | `~/components/ui/badge` | Technology tags, role labels, status indicators |
| `Input` | `~/components/ui/input` | Text form inputs |
| `Textarea` | `~/components/ui/textarea` | Multi-line form inputs |
| `Tooltip`, `TooltipTrigger`, `TooltipContent` | `~/components/ui/tooltip` | Hover labels (provider is global in `root.tsx`) |
| `Sheet`, `SheetTrigger`, `SheetContent` | `~/components/ui/sheet` | Mobile navigation drawer |
| `Separator` | `~/components/ui/separator` | Dividers between sections or list items |

Add new components with: `yarn dlx shadcn@latest add <component-name>`

### Button variants

```tsx
<Button variant="default">Primary</Button>       // filled, high emphasis
<Button variant="secondary">Secondary</Button>   // muted fill
<Button variant="outline">Outline</Button>       // bordered, low fill
<Button variant="ghost">Ghost</Button>           // no background, hover only
<Button variant="link">Link</Button>             // text-only, underline on hover
<Button variant="destructive">Delete</Button>    // red, destructive actions
```

### Badge variants

```tsx
<Badge variant="default">React</Badge>           // primary fill — project tech
<Badge variant="secondary">TypeScript</Badge>    // muted fill — skills section
<Badge variant="outline">Featured</Badge>        // bordered — role/status labels
```

Use `default` badges for project technology tags and `secondary` or `outline` for skills, so the two contexts are visually distinct.

---

## Mobile-First Layout

Design for mobile first, then scale up with `md:` and `lg:` breakpoints. Never write desktop-only styles without a mobile baseline.

```tsx
// Correct — mobile base, desktop modifier
<div className="px-6 md:px-10 lg:px-14">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<h1 className="text-4xl md:text-6xl lg:text-7xl">

// Wrong — no mobile consideration
<div className="px-14">
<div className="grid grid-cols-3 gap-6">
```

### Standard container

```tsx
<div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
```

### Section spacing

```tsx
<section className="py-20 md:py-28">
```

Use consistent vertical rhythm between sections — prefer spacing tokens over arbitrary pixel values.

---

## Accessibility

Every interactive element must be keyboard navigable and use semantic HTML.

- Use semantic elements: `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`, `<h1>`–`<h3>`
- All `<section>` elements should have `aria-labelledby` pointing to their heading `id`
- Icon-only buttons **must** have `aria-label`:
  ```tsx
  <button aria-label="Open navigation menu">
    <Menu className="h-5 w-5" />
  </button>
  ```
- Never suppress focus rings with `outline-none` unless a visible replacement (`focus-visible:ring-2`) is present — shadcn components include focus rings by default
- Minimum tap target size: 44×44px for all interactive elements on mobile
- Skip-to-content link: `<a href="#main-content">Skip to content</a>` — visually hidden until focused, rendered first in `<body>`
- External links: always `target="_blank" rel="noopener noreferrer"` with a visual indicator (e.g., `ExternalLink` icon from lucide-react)

---

## Anchor Navigation

This is a single-page layout with section-based anchor navigation. All section `id` values are kebab-case.

```
#hero
#projects
#about
#skills
#contact
```

Nav links are plain `<a href="#section">` elements — not React Router `<Link>`. The main content area has `id="main-content"` for the skip link.

---

## Icons

Use **lucide-react** for all icons. Do not add other icon libraries.

```tsx
import { ExternalLink, Github, Linkedin, Mail, Menu, X } from "lucide-react";

// Sizing — use className, not size prop, for Tailwind consistency
<ExternalLink className="h-4 w-4" />
<Menu className="h-5 w-5" />
```

Common icons by use case:

| Use | Icon |
|---|---|
| External link indicator | `ExternalLink` |
| GitHub link | `Github` |
| LinkedIn link | `Linkedin` |
| Email link | `Mail` |
| Mobile nav open | `Menu` |
| Mobile nav close | `X` |

---

## Interaction & Transitions

```tsx
// Hover lift on cards
className="transition-transform duration-200 hover:-translate-y-1"

// Color/opacity transitions
className="transition-colors duration-200"

// Backdrop blur for sticky header
className="bg-canvas/80 backdrop-blur-md"
```

- Color/opacity: `duration-200`
- Transforms (card lift, slide): `duration-300 ease-in-out`
- Do not animate layout properties (`width`, `height`) — prefer `transform` and `opacity`

---

## Component Structure

- Prefer one primary component per file under `app/components/`
- Props interface defined directly above the component function, typed inline or as a named interface
- Default export for components
- Section components receive all data via props from the route — no direct imports from `app/data/`

```tsx
interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      ...
    </section>
  );
}
```

---

## Common Mistakes

| Mistake | Correct Pattern |
|---|---|
| Hardcoded hex colors (`#fff`, `#060816`) | Use `bg-canvas`, `text-foreground`, etc. |
| Re-implementing button/card styles with raw Tailwind | Use shadcn/ui `Button`, `Card` components |
| Desktop-only grid without mobile base | Always start with `grid-cols-1`, add `md:grid-cols-2` |
| Plain `<div onClick>` for interactive elements | Use `<button>` with proper `aria-label` |
| `outline-none` without a focus-visible replacement | Leave shadcn defaults intact |
| External links without `rel="noopener noreferrer"` | Always include both attributes |
| Arbitrary spacing values (`mt-[37px]`) | Use Tailwind spacing scale (`mt-10`, `mt-12`) |
| Importing from `app/data/` in a section component | Receive data via props from the route loader |
