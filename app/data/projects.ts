import type { Technology } from "~/data/technologies";
import { getTechnology } from "~/data/technologies";

export type ProjectLinks = {
  demo?: string;
  repo?: string;
};

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  outcome: string;
  technologies: Technology[];
  links: ProjectLinks;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: "portfolio-v2",
    title: "Portfolio Site v2",
    role: "Solo Engineer & Designer",
    description:
      "A personal portfolio site built with React Router v7 in SSR mode, TailwindCSS v4, and shadcn/ui. Designed mobile-first with a focus on performance and accessibility.",
    outcome:
      "Fully server-rendered portfolio with sub-second load times and a clean, typographic design that presents work clearly to potential employers.",
    technologies: [
      getTechnology("react-router"),
      getTechnology("typescript"),
      getTechnology("tailwindcss"),
      getTechnology("react"),
    ],
    links: {
      repo: "https://github.com/ryanmcbride/portfolio-v2",
    },
    featured: true,
    order: 1,
  },
  {
    id: "task-manager",
    title: "Team Task Manager",
    role: "Full-Stack Engineer",
    description:
      "A collaborative task management application with real-time updates, role-based access control, and an audit log. Built with Node.js, PostgreSQL, and React.",
    outcome:
      "Reduced task coordination overhead for a 12-person team by centralizing work tracking and automated status notifications.",
    technologies: [
      getTechnology("react"),
      getTechnology("typescript"),
      getTechnology("nodejs"),
      getTechnology("postgresql"),
      getTechnology("docker"),
    ],
    links: {
      repo: "https://github.com/ryanmcbride/task-manager",
      demo: "https://tasks.example.com",
    },
    featured: true,
    order: 2,
  },
];

export const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
