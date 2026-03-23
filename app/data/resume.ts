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
    "Full-stack Software Engineer focused on high-ownership, user-centered product development using TypeScript, React, Node.js, Prisma, and PostgreSQL. I've led complex greenfield initiatives that integrate deeply with Salesforce and analytics systems, working in close partnership with product and design teams.",
  skills: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "HTML", "CSS", "SQL", "GraphQL"],
    },
    {
      label: "Backend / Data",
      items: ["Node.js", "Prisma", "PostgreSQL", "Redis"],
    },
    {
      label: "Frontend",
      items: ["React", "Remix", "Vue.js", "Tailwind", "React Query"],
    },
    {
      label: "Testing",
      items: ["Cypress", "Jest", "Vitest"],
    },
    {
      label: "Tools & Methodologies",
      items: ["Git", "Agile", "OOP", "TDD"],
    },
    {
      label: "Agentic Workflow",
      items: ["Claude Code", "Kiro", "SpecKit"],
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
        "Led end-to-end development of a greenfield platform originally scoped for five engineers; delivered it with a two-engineer team ahead of schedule and under budget, enabling resource reallocation and contract renewals",
        "Designed and implemented bidirectional data synchronization with Salesforce, enabling real-time updates and high-fidelity data consistency across platforms",
        "Reduced sales-to-engineering engagement time for ROI analysis from weeks to minutes",
        "Integrated Apple TV+, Xumo, and NBC Peacock into Spectrum's marketing site, supporting 1M+ monthly visitors",
        "Enhanced customer behavior analytics to drive data-informed decisions, improving engagement and retention",
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
        "Designed and developed key frontend features for a Vue.js application, rapidly becoming productive in the framework despite a React-focused background",
        "Collaborated closely with backend teams to ensure seamless API integration and strong user experience",
        "Supported peers in adopting modern JavaScript frontend practices, contributing to a collaborative learning culture",
      ],
    },
    {
      title: "Vocational Program Manager",
      company: "SustainAbility Recycling",
      location: "Denver, CO",
      startDate: "August 2015",
      endDate: "September 2021",
      bullets: [
        "Mentored and supervised a team of 20 adults with developmental disabilities, strengthening leadership, communication, and problem-solving skills",
        "Oversaw operations for electronics recycling, facility performance, and laptop refurbishment programs",
        "Facilitated individualized support plans emphasizing empathy, organization, and collaboration",
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
      bullets: [
        "Built web applications in a frontend engineering capacity at the only ACCET-accredited accelerated software development program in the US",
        "Applied JavaScript, HTML, CSS, Mocha, Chai, Cypress and React in solo and group projects",
      ],
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
