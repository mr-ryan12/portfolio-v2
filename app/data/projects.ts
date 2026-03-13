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
    id: "ai-chat",
    title: "AI Chatbot",
    role: "Solo Engineer & Designer",
    description: "An AI Chatbot powered by the OpenAI SDK.",
    outcome:
      "A Remix-based chat application with document ingestion and vector search capabilities using OpenAI and PostgreSQL with pgvector.",
    technologies: [
      getTechnology("remix"),
      getTechnology("typescript"),
      getTechnology("prisma"),
      getTechnology("tailwindcss"),
      getTechnology("react"),
      getTechnology("postgresql"),
    ],
    links: {
      repo: "https://github.com/mr-ryan12/ai-chat",
      demo: "https://ai-chat-production-aae2.up.railway.app/",
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
      repo: "https://github.com/mr-ryan12/",
      demo: "https://github.com/mr-ryan12/",
    },
    featured: true,
    order: 2,
  },
];

export const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
