import type { Route } from "./+types/home";
import { siteConfig } from "~/data/config";
import { featuredProjects } from "~/data/projects";
import { skillGroups } from "~/data/skills";
import SiteHeader from "~/components/site-header";
import SiteFooter from "~/components/site-footer";
import HeroSection from "~/components/sections/hero-section";
import ProjectsSection from "~/components/sections/projects-section";
import AboutSection from "~/components/sections/about-section";
import SkillsSection from "~/components/sections/skills-section";
import ContactSection from "~/components/sections/contact-section";

export function meta(_args: Route.MetaArgs) {
  const pageTitle = `${siteConfig.name} — ${siteConfig.title}`;
  const description = siteConfig.tagline;

  return [
    { title: pageTitle },
    { name: "description", content: description },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  try {
    return {
      config: siteConfig,
      projects: featuredProjects,
      skillGroups,
    };
  } catch (e) {
    console.error('Error in loader: ', e)
    throw new Response("Failed to load page data", { status: 500 });
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { config, projects, skillGroups } = loaderData;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-screen">
        <HeroSection config={config} />
        <ProjectsSection projects={projects} />
        <AboutSection about={config.about} />
        <SkillsSection skillGroups={skillGroups} />
        <ContactSection contact={config.contact} />
      </main>
      <SiteFooter />
    </>
  );
}
