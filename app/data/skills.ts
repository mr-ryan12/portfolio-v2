import type { Technology } from "~/data/technologies";
import { getTechnology } from "~/data/technologies";

export interface SkillGroup {
  id: string;
  label: string;
  description?: string;
  order: number;
  technologies: Technology[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    order: 1,
    technologies: [
      getTechnology("typescript"),
      getTechnology("javascript"),
      getTechnology("react"),
      getTechnology("remix"),
      getTechnology("vuejs"),
      getTechnology("html"),
      getTechnology("css"),
      getTechnology("tailwindcss"),
      getTechnology("tanstack-query"),
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    order: 2,
    technologies: [
      getTechnology("nodejs"),
      getTechnology("graphql"),
      getTechnology("postgresql"),
      getTechnology("redis"),
      getTechnology("kafka"),
      getTechnology("prisma"),
      getTechnology("sql"),
    ],
  },
  {
    id: "tools-workflow",
    label: "Tools & Methodologies",
    order: 3,
    technologies: [
      getTechnology("git"),
      getTechnology("api-integration"),
      getTechnology("agile"),
      getTechnology("cypress"),
      getTechnology("jest"),
      getTechnology("vitest"),
      getTechnology("mocha"),
      getTechnology("chai"),
      getTechnology("tdd"),
    ],
  },
  {
    id: "agentic-workflow",
    label: "Agentic Development",
    order: 4,
    technologies: [
      getTechnology("kiro"),
      getTechnology("claude-code"),
      getTechnology("codex"),
      getTechnology("speckit"),
      getTechnology("sdd"),
    ],
  },
].sort((a, b) => a.order - b.order);
