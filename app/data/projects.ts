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
    title: "ThreadMind",
    role: "Software Engineer",
    description:
      "Built to move beyond the surface-level buzz around AI tooling and understand the architecture firsthand — vector storage, embeddings, similarity search, and document ingestion. I chose pgvector over a dedicated vector database to explore semantic retrieval within a simpler PostgreSQL-based stack.",
    outcome:
      "The hardest part was making it feel like a coherent application instead of a collection of AI demos. Upload, ingestion, chunking, embeddings, retrieval, and chat all had to work together as a product — not just be technically functional.",
    technologies: [
      getTechnology("remix"),
      getTechnology("typescript"),
      getTechnology("prisma"),
      getTechnology("postgresql"),
    ],
    links: {
      repo: "https://github.com/mr-ryan12/threadmind",
      demo: "https://threadmind.dev/",
    },
    featured: true,
    order: 1,
  },
  {
    id: "spectrum-on-demand",
    title: "Spectrum On Demand",
    role: "Technical Lead",
    description:
      "Served as technical lead on a high-traffic consumer streaming product at Charter Communications, supporting over 1 million monthly visitors. I integrated live TV streaming from the Networks page into Spectrum's external Live TV application and implemented analytics tracking to better understand user behavior across the platform.",
    outcome:
      "The interesting part was working at scale — making product decisions that connected the user experience with measurable behavior, on a platform where changes reached a large audience immediately.",
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
  {
    id: "phish",
    title: "Phish",
    role: "Software Engineer",
    description:
      "A frontend product showcase built around music discovery and interaction design — not just a generic music player. I wanted to create an experience where users could browse and engage with a deep catalog of content in a way that felt fast, clear, and usable.",
    outcome:
      "Built in about three days under a compressed timeline, so the strongest part is the frontend thinking and product direction: polished client-side discovery, playlist-style interaction, and a focus on making the experience feel intentional despite the tight scope.",
    technologies: [
      getTechnology("react"),
      getTechnology("react-router"),
      getTechnology("cypress"),
    ],
    links: {
      repo: "https://github.com/mr-ryan12/phish",
      demo: "https://phish-showcase.vercel.app/",
    },
    featured: true,
    order: 3,
  },
];

export const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
