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
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
        >
          Skills &amp; Toolbox
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <Badge key={tech.id} variant="secondary">
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
