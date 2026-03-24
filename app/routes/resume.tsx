import type { Route } from "./+types/resume";
import { resume } from "~/data/resume";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Download } from "lucide-react";
import SiteHeader from "~/components/site-header";
import SiteFooter from "~/components/site-footer";
import StarField from "~/components/star-field";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Resume — Ryan McBride" },
    { name: "description", content: "Ryan McBride's resume — Software Engineer in Denver, CO." },
  ];
}

export async function loader(_args: Route.LoaderArgs) {
  try {
    return { resume };
  } catch (e) {
    console.error("Error in resume loader: ", e);
    throw new Response("Failed to load resume data", { status: 500 });
  }
}

export default function ResumePage({ loaderData }: Route.ComponentProps) {
  const { resume } = loaderData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <StarField />
      <SiteHeader />
      <main id="main-content" className="min-h-screen py-20 md:py-28">
        <div
          ref={ref}
          className={cn(
            "mx-auto max-w-3xl px-6 md:px-10 lg:px-14 transition-[opacity,translate] duration-600 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          )}
        >
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                {resume.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {resume.title} · {resume.location}
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit shrink-0">
              <a href="/ryan-mcbride-resume.pdf" download>
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </a>
            </Button>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground leading-7 mt-8">
            {resume.summary}
          </p>

          {/* Skills */}
          <section className="mt-12" aria-labelledby="resume-skills">
            <h2
              id="resume-skills"
              className="text-xl font-semibold tracking-tight border-b border-border pb-2"
            >
              Skills
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {resume.skills.map((group) => (
                <div key={group.label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-x-2">
                  <span className="text-sm font-medium sm:w-40 sm:shrink-0">
                    {group.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {group.items.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="mt-12" aria-labelledby="resume-experience">
            <h2
              id="resume-experience"
              className="text-xl font-semibold tracking-tight border-b border-border pb-2"
            >
              Experience
            </h2>
            <div className="mt-6 flex flex-col gap-8">
              {resume.experience.map((job) => (
                <div key={`${job.company}-${job.title}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.company} — {job.location}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="w-fit border-white/25 text-muted-foreground text-xs shrink-0"
                    >
                      {job.startDate} – {job.endDate}
                    </Badge>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {job.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-6 flex gap-2"
                      >
                        <span
                          aria-hidden="true"
                          className="text-accent-violet mt-0.5 shrink-0"
                        >
                          &bull;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mt-12" aria-labelledby="resume-education">
            <h2
              id="resume-education"
              className="text-xl font-semibold tracking-tight border-b border-border pb-2"
            >
              Education
            </h2>
            <div className="mt-6 flex flex-col gap-8">
              {resume.education.map((edu) => (
                <div key={`${edu.institution}-${edu.field}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {edu.credential}: {edu.field}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution} — {edu.location}
                      </p>
                      {edu.honors && (
                        <p className="text-sm text-muted-foreground italic">
                          {edu.honors}
                        </p>
                      )}
                    </div>
                    {edu.date && (
                      <Badge
                        variant="outline"
                        className="w-fit border-white/25 text-muted-foreground text-xs shrink-0"
                      >
                        {edu.date}
                      </Badge>
                    )}
                  </div>
                  {edu.bullets && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {edu.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-6 flex gap-2"
                        >
                          <span
                            aria-hidden="true"
                            className="text-accent-violet mt-0.5 shrink-0"
                          >
                            &bull;
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
