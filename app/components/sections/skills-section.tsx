import type { SkillGroup } from "~/data/skills";
import { Badge } from "~/components/ui/badge";

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
}

export default function SkillsSection({ skillGroups }: SkillsSectionProps) {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <h2
          id="skills-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Skills &amp; Toolbox
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:items-start">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <Badge key={tech.id} variant="outline" className="bg-surface-muted border-white/25">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
