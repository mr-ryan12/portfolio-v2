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
    "Product-focused Full-Stack Software Engineer building reliable user-facing applications with React and TypeScript. Led greenfield products from architecture through delivery, partnering closely with product and design, and using agentic development workflows to accelerate high-quality software delivery.",
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
      items: [
        "Node.js",
        "GraphQL",
        "PostgreSQL",
        "Redis",
        "Kafka",
        "Prisma",
        "SQL",
      ],
    },
    {
      label: "Testing",
      items: [
        "Cypress",
        "Jest",
        "Vitest",
        "Mocha",
        "Chai",
        "Test-Driven Development",
      ],
    },
    {
      label: "Tools & Practices",
      items: ["Git", "API Integration", "Agile"],
    },
    {
      label: "Agentic Development",
      items: ["Kiro", "Claude Code", "Codex", "Spec Kit"],
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
        "Led full-stack development of a greenfield platform from architecture through testing and delivery, completing work originally scoped for five engineers with a two-engineer team ahead of schedule and under budget",
        "Implemented agentic development workflows across two revenue-impacting projects, configuring custom agents, project-specific guidance, and documentation to standardize and accelerate delivery for a 12-person team",
        "Developed an ROI analysis workflow that reduced sales-to-engineering turnaround time from weeks to minutes",
        "Served as technical lead for Spectrum On Demand, guiding architecture and integrating Apple TV+, Xumo, and Peacock into a customer-facing platform supporting 1M+ monthly visitors",
        "Built a bidirectional Salesforce integration that enabled real-time updates and maintained consistent customer data across platforms",
        "Built and delivered a Kafka producer on an accelerated timeline, enabling downstream processing of data from sold projects without delaying the release",
        "Supported production releases and resolved time-sensitive deployment incidents by diagnosing service outages and server-side build failures, coordinating across teams, and implementing fixes within scheduled maintenance windows",
      ],
    },
    {
      title: "Frontend Software Engineering Intern",
      company: "Vizio",
      location: "Denver, CO",
      startDate: "June 2022",
      endDate: "August 2022",
      bullets: [
        "Built customer-facing Vue.js features and partnered with backend engineers to integrate APIs and deliver cohesive user experiences",
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
