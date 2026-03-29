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
    id: "rapid-quote",
    title: "Rapid Quote (NDA)",
    role: "Software Engineer",
    description:
      "Led development of a greenfield internal platform at Charter Communications, originally scoped for a five-engineer team. Delivered it with a two-engineer team ahead of schedule and under budget.",
    highlights: [
      "Designed and built a dynamic rules engine that controlled field visibility and values based on user selections, turning complex business logic into a maintainable system.",
      "Implemented bidirectional data synchronization with Salesforce, enabling real-time updates and reliable consistency across platforms.",
      "Reduced sales-to-engineering engagement time for ROI analysis from weeks to minutes, earning recognition from VP-level leadership.",
    ],
    technologies: [
      getTechnology("remix"),
      getTechnology("typescript"),
      getTechnology("prisma"),
      getTechnology("postgresql"),
    ],
    links: {},
    featured: true,
    order: 2,
    nda: true,
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
    order: 3,
  },
  {
    id: "reprise",
    title: "Reprise",
    role: "Software Engineer",
    description:
      "A frontend product showcase built around music discovery and interaction design. The goal was to create an experience where users could explore a deep catalog in a way that felt fast, clear, and intentional, not just another generic music player.",
    highlights: [
      "Designed browse and playlist-style interaction flows focused on search, discovery, and ease of navigation.",
      "Built a polished, responsive UI with dark/light themes.",
      "A rebuilt of an existing project with upgraded technologies and SSR.",
    ],
    technologies: [
      getTechnology("react"),
      getTechnology("typescript"),
      getTechnology("react-router"),
      getTechnology("prisma"),
      getTechnology("postgresql"),
      getTechnology("claude-code"),
      getTechnology("speckit"),
    ],
    links: {
      repo: "https://github.com/mr-ryan12/reprise",
      demo: "https://reprise.dev/",
    },
    featured: true,
    order: 4,
  },
];

export const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
