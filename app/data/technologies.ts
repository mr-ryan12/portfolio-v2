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
];

export function getTechnology(id: string): Technology {
  const tech = technologies.find((t) => t.id === id);
  if (!tech) throw new Error(`Technology "${id}" not found`);
  return tech;
}
