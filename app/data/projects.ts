import type { Technology } from "~/data/technologies";
import { getTechnology } from "~/data/technologies";

export type ProjectLinks = {
  demo?: string;
  demoLabel?: string;
  repo?: string;
};

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  highlights: string[];
  technologies: Technology[];
  links: ProjectLinks;
  featured: boolean;
  order: number;
  nda?: boolean;
}

export const projects: Project[] = [
  {
    id: "ai-chat",
    title: "ThreadMind",
    role: "Software Engineer",
    description:
      "Built to move past the surface-level buzz around AI and understand the architecture firsthand. Created a document-aware chat application that lets users upload files and ask questions grounded in their own content.",
    highlights: [
      "Designed the full ingestion pipeline, including upload, chunking, embedding, and semantic retrieval, using pgvector within a PostgreSQL-based stack.",
      "Built a cohesive product with threaded conversations, context-aware responses, and document ingestion, not just a basic chat interface.",
      "Deployed as a solo project, supporting document-aware chat across multiple file types including PDF, DOCX, and plain text.",
    ],
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
      "Technical lead on a high-traffic consumer streaming product at Charter Communications, serving 1M+ monthly visitors. Led feature delivery across the On Demand platform while coordinating closely with product and design teams.",
    highlights: [
      "Integrated Apple TV+, Xumo, and Peacock into Spectrum's marketing experience, expanding content discovery for over 1M monthly users.",
      "Built analytics tracking to surface user behavior patterns and support more informed product decisions.",
      "Led implementation across the On Demand platform, translating product requirements into consumer-facing features at scale.",
    ],
    technologies: [
      getTechnology("react"),
      getTechnology("graphql"),
      getTechnology("gatsby"),
      getTechnology("strapi"),
    ],
    links: {
      demo: "https://ondemand.spectrum.net/",
      demoLabel: "View Site",
    },
    featured: true,
    order: 2,
  },
  {
    id: "phish",
    title: "Phish",
    role: "Software Engineer",
    description:
      "A frontend product showcase built around music discovery and interaction design, not just a generic music player. I wanted to create an experience where users could explore a deep catalog of Phish's music in a way that felt fast, clear, and easy to navigate.",
    outcome:
      "Built in about three days under a compressed timeline, the project's strongest point is its frontend thinking and product direction: polished client-side discovery, playlist-style interaction, and a focus on making the experience feel intentional despite the tight scope.",
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
