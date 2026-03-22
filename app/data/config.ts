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
  heroHeadline: string;
  targetRoles: string[];
  about: SiteConfigAbout;
  contact: SiteConfigContact;
}

export const siteConfig: SiteConfig = {
  name: "Ryan McBride",
  title: "Software Engineer",
  tagline: "DENVER, CO \u00B7 SOFTWARE ENGINEER",
  heroHeadline:
    "Product-minded software engineer building polished, user-facing web applications.",
  targetRoles: ["Software Engineer", "Frontend Focus", "Backend Experience"],
  about: {
    headline: "Why I build the way I do.",
    paragraphs: [
      "I didn't take the most direct path into software engineering, which is part of why it matters to me. After studying Engineering Technology, I spent several years managing a vocational program and mentoring adults with developmental disabilities. That experience shaped how I think about communication, patience, and building systems that work for real people. Over time, I realized I wanted to build things in a more direct, iterative way. Software drew me in because it combines problem-solving, creativity, and real product impact.",
      "I'm product-minded, which means I'm not just thinking about whether the code works. I'm thinking about whether what we're building is clear, usable, maintainable, and worth building in the first place. In practice, that shows up in how much attention I pay to UI polish, interaction details, hierarchy, and whether the implementation supports those choices cleanly. I care about both the user experience and the engineering decisions behind it.",
      "When I'm not writing code, I'm hiking in the Rockies or at a concert.",
    ],
  },
  contact: {
    email: "mr.ryan444@gmail.com",
    linkedin: "https://www.linkedin.com/in/j-ryan-mcbride/",
    github: "https://github.com/mr-ryan12/",
  },
};
