import * as React from "react";
import { GithubIcon, LinkedinIcon } from "~/components/brand-icons";
import { siteConfig } from "~/data/config";

export default function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row md:px-10 lg:px-14">
        <p>© {new Date().getFullYear()} Ryan McBride</p>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="transition-colors duration-200 hover:text-foreground"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors duration-200 hover:text-foreground"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
