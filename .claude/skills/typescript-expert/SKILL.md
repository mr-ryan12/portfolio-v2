---
name: typescript-expert
description: TypeScript expert knowledge for strict-mode patterns, type system features, narrowing, generics, and project-specific conventions.
---

# TypeScript Expert

Reference for TypeScript strict-mode patterns used in this project (TypeScript 5.9, `"strict": true`).

---

## Project Config Highlights

```json
{
  "strict": true,
  "target": "ES2022",
  "module": "ES2022",
  "moduleResolution": "bundler",
  "verbatimModuleSyntax": true,
  "paths": { "~/*": ["./app/*"] }
}
```

**`verbatimModuleSyntax`** — imports used only as types must use `import type`. Mixing value and type imports in the same statement is fine when the value is also used at runtime.

---

## Naming Conventions

- **Interfaces and type aliases**: PascalCase, no `I` or `T` prefixes
- **Enums**: PascalCase (avoid unless necessary — union types are preferred)
- **Generic type parameters**: single uppercase letter (`T`, `K`, `V`) or descriptive PascalCase (`TItem`, `TKey`) for multi-param generics

```ts
// Good
interface Project { ... }
type ProjectLinks = { demo?: string; repo?: string };

// Avoid
interface IProject { ... }
type TProjectLinks = { ... };
```

---

## Interface vs Type Alias

Prefer **`interface`** for object shapes (extendable, better error messages). Use **`type`** for unions, intersections, mapped types, and aliases.

```ts
// Object shape → interface
interface Technology {
  id: string;
  name: string;
  description?: string;
}

// Union → type
type Status = "idle" | "loading" | "error";

// Intersection → type
type AdminUser = User & { permissions: string[] };

// Mapped type → type
type DraftProject = Partial<Project>;
```

---

## Strict Mode Implications

`"strict": true` enables all of the following:

| Flag | Effect |
|---|---|
| `strictNullChecks` | `undefined` and `null` are not assignable without explicit handling |
| `noImplicitAny` | All parameters and variables must have inferable or explicit types |
| `strictFunctionTypes` | Function parameter types are checked contravariantly |
| `strictPropertyInitialization` | Class properties must be initialized in the constructor |
| `useUnknownInCatchVariables` | `catch (e)` binds `e` as `unknown`, not `any` |

### Handling `unknown` in catch

```ts
try {
  await riskyOperation();
} catch (e) {
  // e is `unknown` — must narrow before use
  const message = e instanceof Error ? e.message : String(e);
  console.error(message);
}
```

---

## Type Narrowing

TypeScript narrows types through control flow. Prefer narrowing over casting.

```ts
// typeof guard
function format(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}

// instanceof guard
function handleError(e: unknown) {
  if (e instanceof Error) return e.message;
  return "Unknown error";
}

// in guard — for discriminated shapes
function render(item: Project | Technology) {
  if ("outcome" in item) {
    // item is Project
  }
}

// Discriminated union — best for mutually exclusive states
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function handle(state: State) {
  switch (state.status) {
    case "success": return state.data; // narrowed — data is available
    case "error":   return state.message;
  }
}
```

### Type predicates (user-defined guards)

```ts
function isTechnology(value: unknown): value is Technology {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}
```

---

## Generics

```ts
// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Constrained generic
function getField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic interface
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}
```

---

## Utility Types

```ts
import type { Route } from "./+types/home";

// Partial — all fields optional
type DraftProject = Partial<Project>;

// Required — all fields required
type StrictConfig = Required<SiteConfig>;

// Pick — subset of fields
type ProjectCard = Pick<Project, "id" | "title" | "outcome" | "technologies">;

// Omit — exclude fields
type ProjectWithoutMeta = Omit<Project, "featured" | "order">;

// Record — typed key-value map
type TechById = Record<string, Technology>;

// Readonly — immutable
const config: Readonly<SiteConfig> = siteConfig;

// Prefer React Router generated route types for route data
type LoaderData = Route.ComponentProps["loaderData"];
```

---

## Import Type

Required by `verbatimModuleSyntax` for type-only imports. Ensures no runtime artifact is emitted for the import.

```ts
// Type-only import — use `import type`
import type { Route } from "./+types/home";
import type { Technology, Project } from "~/data/types";

// Value import — no `type` keyword
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";

// Mixed — allowed when value is used at runtime
import { type SiteConfig, siteConfig } from "~/data/config";
```

---

## Satisfies Operator

Validates a value against a type without widening the inferred type. Preferred over explicit annotation when you want both validation and precise inference.

```ts
// `satisfies` — validates shape but preserves literal types
const routes = [
  index("routes/home.tsx"),
] satisfies RouteConfig;

// Contrast with annotation — widens to RouteConfig, losing tuple info
const routes: RouteConfig = [...];
```

---

## Const Assertions

Use `as const` to infer the narrowest possible literal types.

```ts
const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About",    href: "#about" },
] as const;

// NAV_LINKS[0].label is "Projects", not string
```

---

## Explicit Return Types

Add explicit return types to all non-trivial exported functions (required by project rules). Omit for simple one-liners where inference is obvious.

```ts
// Exported helpers and shared functions should usually have explicit return types.
// Route loaders/actions may rely on framework inference when that improves compatibility with generated route types.
// But helper functions should be explicit:
export function getTechnology(id: string): Technology {
  const tech = technologies.find((t) => t.id === id);
  if (!tech) throw new Error(`Technology "${id}" not found`);
  return tech;
}

// Arrow function — inline return type
const formatName = (t: Technology): string => t.name.toLowerCase();
```

---

## Common Mistakes

| Mistake | Correct Pattern |
|---|---|
| Unjustified `as SomeType` casts to silence errors | Prefer narrowing, better typing, or validating the boundary first |
| `any` to bypass type errors | Use `unknown` + narrowing, or fix the root type |
| `// @ts-ignore` | Fix the underlying type issue |
| `interface IFoo` / `type TBar` | `interface Foo` / `type Bar` (no prefixes) |
| `import { Foo }` for a type-only import | `import type { Foo }` (required by `verbatimModuleSyntax`) |
| Annotating what TypeScript can infer | Let inference work; add annotations only at boundaries |
| `catch (e: Error)` | `catch (e)` — `e` is always `unknown` in strict mode |
