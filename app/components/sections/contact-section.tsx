import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "~/components/brand-icons";
import { Button } from "~/components/ui/button";
import type { SiteConfigContact } from "~/data/config";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { cn } from "~/lib/utils";

interface ContactSectionProps {
  contact: SiteConfigContact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className={cn(
        "py-20 md:py-28 transition-[opacity,translate] duration-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            Let's Work Together
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            I'm open to full-stack, frontend, and software engineering roles.
            Reach out and let's start a conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent("Portfolio Inquiry")}`}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
