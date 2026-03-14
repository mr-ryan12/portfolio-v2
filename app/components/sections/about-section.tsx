import type { SiteConfigAbout } from "~/data/config";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

interface AboutSectionProps {
  about: SiteConfigAbout;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className={cn(
        "py-20 md:py-28 transition-[opacity,translate] duration-[600ms] ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-semibold tracking-tight"
            >
              {about.headline}
            </h2>
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-7 text-muted-foreground mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-2xl bg-surface border border-border p-8 md:p-10 flex flex-col gap-6">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Engineer Background
            </p>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-surface-muted p-4 border border-border">
                <p className="text-sm text-muted-foreground leading-6">
                  Experience spanning application architecture, APIs, data
                  modeling, and UI.
                </p>
              </div>
              <div className="rounded-xl bg-surface-muted p-4 border border-border">
                <p className="text-sm text-muted-foreground leading-6">
                  Strong focus on type safety, clean architecture, and
                  maintainable systems.
                </p>
              </div>
              <div className="rounded-xl bg-surface-muted p-4 border border-border">
                <p className="text-sm text-muted-foreground leading-6">
                  Design-conscious approach focused on shipping interfaces that
                  are both polished and reliable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
