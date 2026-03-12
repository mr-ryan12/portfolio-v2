import type { SiteConfig } from "~/data/config";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-14">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
          {config.tagline}
        </p>

        <h1
          id="hero-heading"
          className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-4"
        >
          {config.name}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {config.title}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {config.targetRoles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>

        <p className="text-base leading-7 text-muted-foreground mb-8 max-w-2xl">
          {config.about.headline}
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild variant="default">
            <a href="#projects">View My Work</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
