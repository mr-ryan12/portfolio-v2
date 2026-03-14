import type { Project } from "~/data/projects";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <h2
          id="projects-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col transition-transform duration-200 hover:-translate-y-1"
            >
              <CardHeader>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <Badge variant="outline" className="w-fit mt-1 border-white/25">
                  {project.role}
                </Badge>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="font-medium">{project.outcome}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
              </CardContent>

              <CardFooter className="flex flex-col items-start gap-3">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech.id} variant="secondary" className="border-white/10">
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                {(project.links.demo ?? project.links.repo) && (
                  <div className="flex flex-wrap gap-2">
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
