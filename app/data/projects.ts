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
      getTechnology("vite"),
    ],
    links: {
      repo: "https://github.com/mr-ryan12/ai-chat",
      demo: "https://ai-chat-production-aae2.up.railway.app/",
    },
    featured: true,
    order: 1,
  },
  {
    id: "spectrum-on-demand",
    title: "Spectrum On Demand",
    role: "Software Engineer",
    description:
      "A customer-facing streaming and content discovery experience for Spectrum TV users, built with React, GraphQL, GatsbyJS, and Strapi CMS to support browsing across movies, TV shows, networks, and on-demand content.",
    outcome:
      "Contributed to a high-traffic consumer product serving over 1 million monthly visitors, helping deliver a polished and scalable streaming experience for Spectrum customers.",
    technologies: [
      getTechnology("react"),
      getTechnology("graphql"),
      getTechnology("gatsby"),
      getTechnology("strapi"),
    ],
    links: {
      demo: "https://ondemand.spectrum.net/",
    },
    featured: true,
    order: 2,
  },
];

export const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
