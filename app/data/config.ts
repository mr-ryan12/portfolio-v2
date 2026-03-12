export interface SiteConfigAbout {
  headline: string;
  paragraphs: string[];
}

export interface SiteConfigContact {
  email: string;
  linkedin: string;
  github: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  targetRoles: string[];
  about: SiteConfigAbout;
  contact: SiteConfigContact;
}

export const siteConfig: SiteConfig = {
  name: "Ryan McBride",
  title: "Full-Stack Software Engineer",
  tagline:
    "Building polished, modern web applications with a focus on usability, performance, and maintainable systems.",
  targetRoles: ["Full-Stack Engineer", "Software Engineer", "Frontend Engineer"],
  about: {
    headline: "Design-minded engineer. Real-world impact.",
    paragraphs: [
      "I'm a full-stack software engineer with a passion for crafting web experiences that are as thoughtful in their implementation as they are in their design. I bring equal care to the systems I build and the interfaces users interact with.",
      "My experience spans the full stack — from designing relational data models and building resilient server-side APIs to implementing pixel-perfect UIs with modern frontend frameworks. I value clean abstractions, strong type safety, and code that teams can maintain and extend with confidence.",
      "When I'm not writing code, I'm thinking about product, studying design systems, or exploring new tools that make software development faster and more reliable.",
    ],
  },
  contact: {
    email: "ryan@example.com",
    linkedin: "https://www.linkedin.com/in/j-ryan-mcbride/",
    github: "https://github.com/mr-ryan12/",
  },
};
