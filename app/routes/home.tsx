import type { Route } from "./+types/home";
import { siteConfig } from "~/data/config";
import { featuredProjects } from "~/data/projects";
import { skillGroups } from "~/data/skills";
import SiteHeader from "~/components/site-header";
import SiteFooter from "~/components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ryan McBride | Full-Stack Software Engineer" },
    {
      name: "description",
      content:
        "Portfolio of Ryan McBride, a full-stack software engineer building polished, modern web applications.",
    },
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
      <main id="main-content" className="min-h-screen" />
      <SiteFooter />
    </>
  );
}
