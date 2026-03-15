# Ryan McBride — Portfolio

Personal portfolio site for Ryan McBride, a software engineer based in Denver, CO.

**Live site:** [rmcbride.dev](https://rmcbride.dev)

## Tech Stack

- **React Router v7** — SSR framework mode
- **TypeScript 5.9** — strict mode
- **TailwindCSS v4** — CSS-variable-based theming
- **shadcn/ui** — component library (radix-nova style, neutral base)
- **Vite** — build tooling
- **Yarn v4** (Berry) — package manager

## Getting Started

```bash
yarn install
```

### Development

```bash
yarn dev
```

Starts the dev server with HMR at `http://localhost:5173`.

### Type checking

```bash
yarn typecheck
```

### Production build

```bash
yarn build
yarn start
```

## Project Structure

```
app/
├── components/
│   ├── sections/     # Page sections (Hero, Projects, About, Skills, Contact)
│   └── ui/           # shadcn/ui components
├── data/             # Static data modules (config, projects, skills, technologies)
├── hooks/            # Custom React hooks
├── lib/              # Utilities (cn, etc.)
├── routes/           # React Router route modules
└── app.css           # Global styles and Tailwind theme tokens
```

## Contact

- Email: mr.ryan444@gmail.com
- LinkedIn: [j-ryan-mcbride](https://www.linkedin.com/in/j-ryan-mcbride/)
- GitHub: [mr-ryan12](https://github.com/mr-ryan12/)
