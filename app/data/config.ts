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
  title: "Software Engineer",
  tagline: "DENVER, CO \u00B7 SOFTWARE ENGINEER",
  targetRoles: ["Software Engineer", "Frontend Focus", "Backend Experience"],
  about: {
    headline: "Design-minded engineer with experience across the stack.",
    paragraphs: [
      "I'm a software engineer focused on building web applications that are as thoughtful in their implementation as they are in their design. I care about both the systems behind a product and the experience in front of it.",
      "My experience spans the stack, from data modeling and resilient server-side APIs to polished, intuitive interfaces built with modern frontend frameworks. I value clean abstractions, strong type safety, and code that teams can maintain and extend with confidence.",
      "When I'm not writing code, I'm hiking in the Rockies or at a concert.",
    ],
  },
  contact: {
    email: "mr.ryan444@gmail.com",
    linkedin: "https://www.linkedin.com/in/j-ryan-mcbride/",
    github: "https://github.com/mr-ryan12/",
  },
};
