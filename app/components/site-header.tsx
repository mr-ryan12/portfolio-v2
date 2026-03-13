import { Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SITE_NAME = "Ryan McBride";

export default function SiteHeader(): React.ReactElement {
  const navigate = useNavigate();

  const handleSiteNameClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/", { replace: true, preventScrollReset: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-canvas/80 backdrop-blur-md border-b border-border">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-14">
        <a
          href="/"
          onClick={(e) => handleSiteNameClick(e)}
          className="text-sm font-semibold text-foreground transition-colors duration-200 hover:text-muted-foreground"
        >
          {SITE_NAME}
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex md:items-center md:gap-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile nav trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-6 pt-10 px-2"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
