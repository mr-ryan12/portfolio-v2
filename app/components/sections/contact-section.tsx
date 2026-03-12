import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { SiteConfigContact } from "~/data/config";

interface ContactSectionProps {
  contact: SiteConfigContact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            Let's Work Together
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            I'm open to full-stack, frontend, and software engineering roles. Reach out and let's
            start a conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2">
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
                <Linkedin className="h-4 w-4" />
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
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
