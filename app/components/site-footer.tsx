import * as React from "react";
import { Github, Linkedin } from "lucide-react";

const GITHUB_URL = "https://github.com/ryanmcbride";
const LINKEDIN_URL = "https://linkedin.com/in/ryanmcbride";

export default function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row md:px-10 lg:px-14">
        <p>© {new Date().getFullYear()} Ryan McBride</p>

        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="transition-colors duration-200 hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors duration-200 hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
