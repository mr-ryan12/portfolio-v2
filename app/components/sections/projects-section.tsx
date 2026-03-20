import type { Project } from "~/data/projects";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="projects"
      aria-labelledby="projects-heading"
      className={cn(
        "py-20 md:py-28 transition-[opacity,translate] duration-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <h2
          id="projects-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Projects
        </h2>

        <div className="flex flex-col gap-6 mt-12">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10 hover:-translate-y-0.5 transition-[opacity,translate,box-shadow] duration-500 ease-out hover:ring-accent-violet/25 hover:shadow-[0_4px_24px_-4px_var(--color-accent-violet,#8b5cf6)/15]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              )}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              {/* Violet accent edge */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-accent-violet/60 transition-opacity duration-300 group-hover:opacity-100 opacity-40"
              />

              <div className="flex flex-col md:flex-row">
                {/* Left column — metadata */}
                <div className="p-6 md:w-[38%] md:py-8 md:pl-8 md:pr-6 flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="w-fit mt-2 border-white/25 text-accent-violet"
                    >
                      {project.role}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech.id}
                        variant="outline"
                        className="bg-surface-muted border-white/25 text-muted-foreground"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>

                  {(project.links.demo ?? project.links.repo) && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.links.demo && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.links.repo && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-border md:mx-0 md:my-6 md:h-auto md:w-px" />

                {/* Right column — narrative */}
                <div className="p-6 md:w-[62%] md:py-8 md:pr-8 md:pl-6 flex flex-col justify-center">
                  <p className="font-medium leading-7">{project.outcome}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-6">
                    {project.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
