import type { SiteConfig } from "~/data/config";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-heading"
      className={cn(
        "py-20 md:py-30 md:pb-40 transition-[opacity,transform] duration-600ms ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-14 flex flex-col-reverse gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {config.tagline}
          </p>

          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-4"
          >
            {config.name}
          </h1>

          <p className="text-base leading-7 text-muted-foreground mb-6">
            {config.about.headline}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {config.targetRoles.map((role) => (
              <Badge key={role} variant="outline" className="border-white/25">
                {role}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild variant="default">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>

        <div className="shrink-0 flex justify-center md:justify-end">
          <img
            src="/images/headshot.jpg"
            alt={`${config.name} headshot`}
            className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover object-top ring-1 ring-border"
          />
        </div>
      </div>
    </section>
  );
}
