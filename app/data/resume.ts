export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ResumeEducation {
  credential: string;
  field: string;
  institution: string;
  location: string;
  date?: string;
  honors?: string;
  bullets?: string[];
}

export interface Resume {
  name: string;
  title: string;
  location: string;
  summary: string;
  skills: ResumeSkillGroup[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}

export const resume: Resume = {
  name: "Ryan McBride",
  title: "Software Engineer",
  location: "Denver, CO",
  summary:
    "Product-focused Software Engineer experienced in building reliable web applications with TypeScript, React, Node.js, and PostgreSQL. Led greenfield initiatives from architecture through delivery, partnering with product and design teams to turn complex data and workflows into intuitive user experiences.",
  skills: [
    {
      label: "Frontend",
      items: [
        "TypeScript",
        "JavaScript",
        "React",
        "Remix",
        "Vue.js",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "React Query",
      ],
    },
    {
      label: "Backend & Data",
      items: ["Node.js", "Prisma", "PostgreSQL", "Redis", "GraphQL", "SQL"],
    },
    {
      label: "Testing",
      items: ["Cypress", "Jest", "Vitest", "Mocha", "Chai"],
    },
    {
      label: "Tools & Practices",
      items: ["Git", "API Integration", "Test-Driven Development", "Agile"],
    },
    {
      label: "AI-Assisted Development",
      items: ["Kiro", "Claude Code", "Spec Kit"],
    },
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Charter Communications",
      location: "Greenwood Village, CO",
      startDate: "September 2022",
      endDate: "Present",
      bullets: [
        "Led end-to-end development of a greenfield platform originally scoped for five engineers, delivering it with a two-engineer team ahead of schedule and under budget",
        "Implemented AI-assisted development workflows across two high-visibility, revenue-impacting projects, configuring custom agents, project-specific guidance, and documentation to standardize and accelerate feature delivery for a 12-person team",
        "Developed an ROI analysis workflow that reduced sales-to-engineering turnaround time from weeks to minutes",
        "Built a bidirectional Salesforce integration that enabled real-time updates and maintained consistent customer data across platforms",
        "Integrated Apple TV+, Xumo, and Peacock offerings into Spectrum's marketing platform, supporting more than one million monthly visitors",
        "Enhanced customer-behavior analytics to help product teams make data-informed engagement and retention decisions",
        "Served as technical lead for Spectrum On Demand and On Demand Audit applications, guiding architecture, implementation, and team collaboration",
      ],
    },
    {
      title: "Frontend Software Engineering Intern",
      company: "Vizio",
      location: "Denver, CO",
      startDate: "June 2022",
      endDate: "August 2022",
      bullets: [
        "Built key customer-facing features for a Vue.js application, quickly becoming productive in a new framework",
        "Partnered with backend engineers to integrate APIs and deliver cohesive user experiences",
        "Helped teammates adopt modern JavaScript and frontend development practices",
      ],
    },
    {
      title: "Vocational Program Manager",
      company: "SustainAbility Recycling",
      location: "Denver, CO",
      startDate: "August 2015",
      endDate: "September 2021",
      bullets: [
        "Managed and mentored a team of 20 adults with developmental disabilities, strengthening leadership, communication, and problem-solving skills",
        "Oversaw operations for electronics recycling, facility performance, and laptop refurbishment programs",
      ],
    },
  ],
  education: [
    {
      credential: "Certificate of Completion",
      field: "Frontend Engineering",
      institution: "Turing School of Software and Design",
      location: "Denver, CO",
      date: "April 2022",
    },
    {
      credential: "Bachelor of Science",
      field: "Engineering Technology",
      institution: "Texas State University",
      location: "San Marcos, TX",
      honors: "magna cum laude",
    },
  ],
};
