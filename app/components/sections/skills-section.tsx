import type { SkillGroup } from "~/data/skills";
import { Badge } from "~/components/ui/badge";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
}

export default function SkillsSection({ skillGroups }: SkillsSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="skills"
      aria-labelledby="skills-heading"
      className={cn(
        "py-20 md:py-28 transition-[opacity,translate] duration-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <h2
          id="skills-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Skills &amp; Toolbox
        </h2>
        <p className="text-base leading-7 text-muted-foreground mt-4 max-w-2xl">
          I work across frontend, backend, and modern development workflows,
          including AI-assisted tools that help me build more intentionally.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:items-start">
          {skillGroups.map((group, index) => (
            <div
              key={group.id}
              className={cn(
                "rounded-xl border border-border bg-surface p-6 transition-[opacity,translate] duration-500 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              )}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <Badge
                    key={tech.id}
                    variant="outline"
                    className="bg-surface-muted border-white/25"
                  >
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
