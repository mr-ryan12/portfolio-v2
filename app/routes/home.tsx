import type { Route } from "./+types/home";
import { siteConfig } from "~/data/config";
import { experiences } from "~/data/experience";
import { featuredProjects } from "~/data/projects";
import { skillGroups } from "~/data/skills";
import SiteHeader from "~/components/site-header";
import SiteFooter from "~/components/site-footer";
import HeroSection from "~/components/sections/hero-section";
import ProjectsSection from "~/components/sections/projects-section";
import AboutSection from "~/components/sections/about-section";
import ExperienceSection from "~/components/sections/experience-section";
import SkillsSection from "~/components/sections/skills-section";
import ContactSection from "~/components/sections/contact-section";
import StarField from "~/components/star-field";

const SITE_URL = "https://rmcbride.dev";
const OG_IMAGE_URL = `${SITE_URL}/og/portfolio-preview.png`;

export function meta(_args: Route.MetaArgs) {
  const pageTitle = `${siteConfig.name} — ${siteConfig.title}`;
  const description = siteConfig.tagline;

  return [
    { title: pageTitle },
    { name: "description", content: description },

    { property: "og:title", content: pageTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:image", content: OG_IMAGE_URL },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE_URL },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  try {
    return {
      config: siteConfig,
      experiences,
      projects: featuredProjects,
      skillGroups,
    };
  } catch (e) {
    console.error("Error in loader: ", e);
    throw new Response("Failed to load page data", { status: 500 });
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { config, experiences, projects, skillGroups } = loaderData;

  return (
    <>
      <StarField />
      <SiteHeader />
      <main id="main-content" className="min-h-screen">
        <HeroSection config={config} />
        <ProjectsSection projects={projects} />
        <AboutSection about={config.about} />
        <ExperienceSection experiences={experiences} />
        <SkillsSection skillGroups={skillGroups} />
        <ContactSection contact={config.contact} />
      </main>
      <SiteFooter />
    </>
  );
}
