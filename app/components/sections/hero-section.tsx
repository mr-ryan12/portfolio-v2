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
        "relative overflow-hidden py-20 md:py-24 md:pb-26",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Radial glow behind portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-175 w-175 md:right-[5%] -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, #0b1022 0%, transparent 70%)",
          opacity: 0.7,
        }}
      />
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-14 flex flex-col-reverse gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p
            className={cn(
              "text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6 transition-[opacity,translate] duration-500 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            {config.tagline}
          </p>

          <h1
            id="hero-heading"
            className={cn(
              "text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-4 transition-[opacity,translate] duration-500 ease-out delay-100",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            {config.name}
          </h1>

          <p
            className={cn(
              "text-base leading-7 text-muted-foreground mb-6 transition-[opacity,translate] duration-500 ease-out delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            {config.heroHeadline}
          </p>

          <div
            className={cn(
              "flex flex-wrap gap-2 mb-8 transition-[opacity,translate] duration-500 ease-out delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            {config.targetRoles.map((role) => (
              <Badge key={role} variant="outline" className="border-white/25 text-[#4d98a2]">
                {role}
              </Badge>
            ))}
          </div>

          <div
            className={cn(
              "flex flex-wrap gap-3 mt-8 transition-[opacity,translate] duration-500 ease-out delay-[400ms]",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            <Button asChild variant="default">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>

        {/* Headshot with gradient glow ring */}
        <div
          className={cn(
            "shrink-0 flex justify-center md:justify-end transition-[opacity,scale] duration-600 ease-out delay-200",
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95",
          )}
        >
          <div className="relative">
            {/* Gradient glow behind the image */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-full opacity-60 blur-sm"
              style={{
                background:
                  "conic-gradient(from 180deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)",
              }}
            />
            <img
              src="/images/headshot.jpg"
              alt={`${config.name} headshot`}
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover object-top ring-2 ring-white/15 brightness-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
