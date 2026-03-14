export interface TechnologyLinks {
  github?: string;
  docs?: string;
  website?: string;
}

export interface Technology {
  id: string;
  name: string;
  description?: string;
  links?: TechnologyLinks;
}

export const technologies: Technology[] = [
  {
    id: "typescript",
    name: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript.",
    links: {
      website: "https://www.typescriptlang.org",
      docs: "https://www.typescriptlang.org/docs",
      github: "https://github.com/microsoft/TypeScript",
    },
  },
  {
    id: "react",
    name: "React",
    description: "Library for building user interfaces with a component model.",
    links: {
      website: "https://react.dev",
      docs: "https://react.dev/reference/react",
      github: "https://github.com/facebook/react",
    },
  },
  {
    id: "react-router",
    name: "React Router",
    description: "Full-stack framework for React with SSR and data loading.",
    links: {
      website: "https://reactrouter.com",
      docs: "https://reactrouter.com/start/framework/installation",
      github: "https://github.com/remix-run/react-router",
    },
  },
  {
    id: "remix",
    name: "Remix",
    description: "Full-stack framework for React with SSR and data loading.",
    links: {
      website: "https://v2.remix.run",
      docs: "https://v2.remix.run/docs",
      github: "https://github.com/remix-run/remix",
    },
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "JavaScript runtime built on V8 for server-side applications.",
    links: {
      website: "https://nodejs.org",
      docs: "https://nodejs.org/en/docs",
      github: "https://github.com/nodejs/node",
    },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Advanced open-source relational database system.",
    links: {
      website: "https://www.postgresql.org",
      docs: "https://www.postgresql.org/docs",
    },
  },
  {
    id: "tailwindcss",
    name: "TailwindCSS",
    description: "Utility-first CSS framework for rapid UI development.",
    links: {
      website: "https://tailwindcss.com",
      docs: "https://tailwindcss.com/docs",
      github: "https://github.com/tailwindlabs/tailwindcss",
    },
  },
  {
    id: "docker",
    name: "Docker",
    description:
      "Platform for building, shipping, and running containerized applications.",
    links: {
      website: "https://www.docker.com",
      docs: "https://docs.docker.com",
      github: "https://github.com/docker",
    },
  },
  {
    id: "git",
    name: "Git",
    description:
      "Distributed version control system for tracking code changes.",
    links: {
      website: "https://git-scm.com",
      docs: "https://git-scm.com/doc",
      github: "https://github.com/git/git",
    },
  },
  {
    id: "prisma",
    name: "Prisma",
    description: "Next-generation ORM for Node.js and TypeScript.",
    links: {
      website: "https://www.prisma.io",
      docs: "https://www.prisma.io/docs",
      github: "https://github.com/prisma/prisma",
    },
  },
  {
    id: "vite",
    name: "Vite",
    description: "Fast build tool and dev server for modern web projects.",
    links: {
      website: "https://vitejs.dev",
      docs: "https://vitejs.dev/guide",
      github: "https://github.com/vitejs/vite",
    },
  },
  {
    id: "gatsby",
    name: "GatsbyJS",
    description: "React based static site generator",
    links: {
      website: "https://www.gatsbyjs.com/",
      docs: "https://www.gatsbyjs.com/docs/",
      github: "https://github.com/gatsbyjs/gatsby",
    },
  },
  {
    id: "strapi",
    name: "Strapi",
    description: "Node.js-based headless Content Management System",
    links: {
      website: "https://strapi.io/",
      docs: "https://docs.strapi.io/",
      github: "https://github.com/strapi/strapi",
    },
  },
  {
    id: "graphql",
    name: "GraphQL",
    description: "Open-source query language for APIs",
    links: {
      website: "https://graphql.org/",
      docs: "https://graphql.org/learn/",
      github: "https://github.com/graphql",
    },
  },
  {
    id: "cypress",
    name: "Cypress",
    description:
      "Open-source front-end testing tool built for modern web applications",
    links: {
      website: "https://www.cypress.io/",
      docs: "https://docs.cypress.io/",
      github: "https://github.com/cypress-io/cypress",
    },
  },
  {
    id: "tanstack-query",
    name: "TanStack Query",
    description:
      "Powerful asynchronous state management, server-state utilities and data fetching",
    links: {
      website: "https://tanstack.com/query/latest",
      docs: "https://tanstack.com/query/latest/docs/framework/react/overview",
      github: "https://github.com/TanStack/query",
    },
  },
  {
    id: "redis",
    name: "Redis",
    description:
      "An open-source, in-memory, NoSQL key-value data store used as a cache, database, and message broker",
    links: {
      website: "https://redis.io/",
      docs: "https://redis.io/docs/latest/",
      github: "https://github.com/redis/redis",
    },
  },
  {
    id: "agile",
    name: "Agile",
    description:
      "Project management framework that breaks projects into smaller phases so teams can adapt as they go and keep improving",
    links: {
      website: "https://agilealliance.org/",
      docs: "https://agilealliance.org/agile101/",
    },
  },
  {
    id: "oop",
    name: "OOP",
    description:
      "A programming paradigm that organizes code around objects, which are data fields with unique attributes and behaviors",
    links: {},
  },
  {
    id: "tdd",
    name: "TDD",
    description: `A practice where developers write automated tests before writing the actual functional code, following a "Red-Green-Refactor" cycle`,
    links: {},
  },
  {
    id: "sdd",
    name: "Spec-Driven Dev",
    description:
      "Engineering approach where structured specifications are the primary artifact, created before implementation to define behavioral constraints",
    links: {},
  },
  {
    id: "vuejs",
    name: "Vue.js",
    description:
      "An approachable, performant and versatile framework for building web user interfaces.",
    links: {
      website: "https://vuejs.org/",
      docs: "https://vuejs.org/guide/introduction.html",
      github: "https://github.com/vuejs",
    },
  },
  {
    id: "jest",
    name: "Jest",
    description:
      "An open-source JavaScript testing framework designed to ensure the correctness and quality of any JavaScript or TypeScript codebase",
    links: {
      website: "https://jestjs.io/",
      docs: "https://jestjs.io/docs/getting-started",
      github: "https://github.com/jestjs/jest",
    },
  },
  {
    id: "vitest",
    name: "Vitest",
    description:
      "A modern JavaScript unit testing framework powered by Vite, designed to be a lightweight, Jest-compatible alternative",
    links: {
      website: "https://vitest.dev/",
      docs: "https://vitest.dev/guide/",
      github: "https://github.com/vitest-dev/vitest",
    },
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description:
      "Anthropic's agentic AI coding tool that operates in the terminal and understands entire codebases.",
    links: {
      website: "https://claude.ai/code",
      docs: "https://docs.anthropic.com/en/docs/claude-code/overview",
    },
  },
  {
    id: "kiro",
    name: "Kiro",
    description:
      "Amazon's AI-powered IDE featuring spec-driven development with autonomous coding agents.",
    links: {
      website: "https://kiro.dev",
    },
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    description:
      "REST API for accessing OpenAI's language and reasoning models for AI-powered application development.",
    links: {
      website: "https://openai.com",
      docs: "https://platform.openai.com/docs",
    },
  },
  {
    id: "rag",
    name: "RAG",
    description:
      "Retrieval-Augmented Generation — a pattern for grounding LLM responses with external knowledge sources at inference time.",
    links: {},
  },
  {
    id: "speckit",
    name: "SpecKit",
    description:
      "Spec-driven development workflow toolkit for AI-assisted feature planning, specification, and implementation.",
    links: {
      github: "https://github.com/github/spec-kit",
    },
  },
];

export function getTechnology(id: string): Technology {
  const tech = technologies.find((t) => t.id === id);
  if (!tech) throw new Error(`Technology "${id}" not found`);
  return tech;
}
