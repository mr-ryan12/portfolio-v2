---
name: react-router-expert
description: React Router v7 expert knowledge for loaders, actions, routing, error handling, and data patterns in framework (SSR) mode.
---

# React Router v7 Expert

Reference for React Router v7 (framework mode, SSR) patterns used in this project.

---

## Route Declaration

Routes are declared in `app/routes.ts` using the config API — **not** file-based conventions.

```ts
// app/routes.ts
import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  layout("routes/dashboard/layout.tsx", [
    index("routes/dashboard/index.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
  ]),
  ...prefix("api", [
    route("health", "routes/api/health.ts"),
  ]),
] satisfies RouteConfig;
```

After adding or modifying routes, run `yarn typecheck` to regenerate types in `.react-router/types/`.

---

## Loaders

Loaders run server-side and supply data to the route component. Types are auto-generated — never write them manually.

```ts
// app/routes/home.tsx
import type { Route } from "./+types/home";

export async function loader({ request, params }: Route.LoaderArgs) {
  const data = await fetchSomething();
  return { data }; // project convention: keep loader returns as plain objects
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData; // fully typed from loader return
}
```

**Rules:**
- No `useEffect` for data — always use a loader
- No browser-only APIs (`window`, `document`) inside loaders
- Wrap async loader/action logic in `try/catch` when failures need translation into safe route responses; use route error boundaries for surfaced failures
- In this project, prefer plain-object loader returns with serializable, predictable fields

### Throwing from a loader

```ts
import { data } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const project = await getProject(params.id);
  if (!project) throw data("Not found", { status: 404 });
  return { project };
}
```

### Accessing loader data in meta

```ts
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.config.name} — ${data?.config.title}` },
    { name: "description", content: data?.config.tagline },
    { property: "og:title", content: data?.config.name },
  ];
}
```

---

## Actions

Actions handle form mutations (POST, PUT, PATCH, DELETE). They run server-side only.

```ts
import { redirect, data } from "react-router";
import type { Route } from "./+types/contact";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");

  if (!email) {
    return data({ error: "Email is required" }, { status: 422 });
  }

  await sendEmail(email);
  return redirect("/thank-you");
}
```

**Rules:**
- Validate all user input — never trust `formData` values
- Return `data(payload, { status })` for validation errors; use `redirect()` for success
- Do not expose internal error details to the client

### Consuming action data in the component

```ts
import { Form } from "react-router";
import type { Route } from "./+types/contact";

export default function Contact({ actionData }: Route.ComponentProps) {
  return (
    <Form method="post">
      {actionData?.error && <p>{actionData.error}</p>}
      <input name="email" type="email" />
      <button type="submit">Send</button>
    </Form>
  );
}
```

---

## Forms

- Prefer `<Form method="post">` for route mutations
- Use actions for server-side form handling
- Use `actionData`, `useNavigation()`, or `useFetcher()` for validation and pending states
- Prefer native form semantics before custom JS handlers

## Navigation & Links

```tsx
import { Link, NavLink, useNavigate } from "react-router";

// Static link
<Link to="/about">About</Link>

// NavLink — receives isActive/isPending for styling
<NavLink to="/about" className={({ isActive }) => isActive ? "font-bold" : ""}>
  About
</NavLink>

// Anchor links for same-page navigation (no React Router needed)
<a href="#projects">View Work</a>

// Programmatic navigation
const navigate = useNavigate();
navigate("/dashboard");
```

External links always use plain `<a>` with `target="_blank" rel="noopener noreferrer"`.

---

## Pending & Optimistic UI

```ts
import { useNavigation, useFetcher } from "react-router";

// Route-level navigation state
const navigation = useNavigation();
const isLoading = navigation.state === "loading";
const isSubmitting = navigation.state === "submitting";

// Fetcher — fires actions/loaders without navigating
const fetcher = useFetcher();
const busy = fetcher.state !== "idle";
```

---

## Error Handling

Export `ErrorBoundary` from any route to catch loader/action errors and render-time exceptions for that route subtree.

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Thrown via `throw data(...)` or `throw new Response(...)`
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  // Unexpected runtime error
  return <div>Something went wrong.</div>;
}
```

Root-level `ErrorBoundary` in `app/root.tsx` catches anything not caught by a route-level boundary.

---

## SSR Considerations

- Loaders and actions run on the server in framework mode; server-only APIs and secrets are fine there, but never leak them into returned loader/action data
- Never access `window`, `document`, or `localStorage` in loaders, actions, or module-level code
- Client-only code must be guarded: `if (typeof window !== "undefined")`
- `useState` / `useEffect` for UI-only ephemeral state (e.g., mobile nav open/closed) is fine — just not for data fetching

---

## Data Patterns in This Project

All homepage data flows from static modules → loader → component props. Components never import from `app/data/` directly.

```ts
// app/routes/home.tsx
import { featuredProjects } from "~/data/projects";
import { skillGroups } from "~/data/skills";
import { siteConfig } from "~/data/config";

export async function loader() {
  return {
    config: siteConfig,
    projects: featuredProjects,
    skillGroups,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { config, projects, skillGroups } = loaderData;
  return (
    <>
      <HeroSection config={config} />
      <ProjectsSection projects={projects} />
      <SkillsSection skillGroups={skillGroups} />
    </>
  );
}
```

When the data source changes (e.g., Prisma replaces static modules), only the loader changes — components are unaffected.

---

## Type Generation

React Router auto-generates route-specific types into `.react-router/types/` based on `app/routes.ts`.

```ts
import type { Route } from "./+types/home"; // auto-generated — do not edit

// Gives you:
// Route.LoaderArgs     — { request, params, context }
// Route.ActionArgs     — { request, params, context }
// Route.MetaArgs       — { data, params, matches, error }
// Route.ComponentProps — { loaderData, actionData, params, matches }
```

Run `yarn typecheck` after adding routes to regenerate. Never manually edit files inside `.react-router/`.

---

## Common Mistakes

| Mistake | Correct Pattern |
|---|---|
| `useEffect` to fetch data on mount | Use a loader |
| Importing from `app/data/` inside a component | Pass data via props from the route |
| Hardcoding loader return type annotation | Let TypeScript infer from `Route.ComponentProps` |
| `window.location` for redirects | Use `redirect()` from `react-router` |
| Fetching route-dependent data in the component | Load it in the `loader` and read it from `loaderData` |
| Forgetting `await request.formData()` in action | Always parse formData before reading fields |

## Project Defaults

- This project uses React Router v7 in framework mode with SSR
- Routes are declared in `app/routes.ts`
- Homepage data flows from `app/data/*` → route loader → section component props
- Presentational components must not import `app/data/*` directly
- `useEffect` is allowed for UI-only behavior, never for initial route data
- Loader return shapes in this project should remain plain objects with predictable fields
