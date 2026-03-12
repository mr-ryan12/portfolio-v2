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
      getTechnology("typescript"),
      getTechnology("tailwindcss"),
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
      getTechnology("react-router"),
    ],
  },
  {
    id: "tools",
    label: "Tools",
    order: 3,
    technologies: [getTechnology("git"), getTechnology("docker")],
  },
].sort((a, b) => a.order - b.order);
