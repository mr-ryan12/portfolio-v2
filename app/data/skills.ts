import type { Technology } from "~/data/technologies";
import { getTechnology } from "~/data/technologies";

export interface SkillGroup {
  id: string;
  label: string;
  order: number;
  technologies: Technology[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    order: 1,
    technologies: [
      getTechnology("react"),
      getTechnology("remix"),
      getTechnology("typescript"),
      getTechnology("tanstack-query"),
      getTechnology("tailwindcss"),
      getTechnology("vuejs"),
    ],
  },
  {
    id: "backend",
    label: "Backend",
    order: 2,
    technologies: [
      getTechnology("nodejs"),
      getTechnology("postgresql"),
      getTechnology("prisma"),
      getTechnology("redis"),
      getTechnology("graphql"),
    ],
  },
  {
    id: "tools-workflow",
    label: "Tools & Workflow",
    order: 3,
    technologies: [
      getTechnology("git"),
      getTechnology("agile"),
      getTechnology("oop"),
      getTechnology("tdd"),
      getTechnology("sdd"),
      getTechnology("cypress"),
      getTechnology("jest"),
      getTechnology("vitest"),
    ],
  },
  {
    id: "agentic-workflow",
    label: "Agentic Workflow",
    order: 4,
    technologies: [
      getTechnology("claude-code"),
      getTechnology("kiro"),
      getTechnology("speckit"),
    ],
  },
].sort((a, b) => a.order - b.order);
