export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  impact: string;
  icon: "code" | "layout" | "users";
}

export const experiences: Experience[] = [
  {
    id: "charter",
    company: "Charter Communications",
    role: "Software Engineer",
    startDate: "Sept 2022",
    endDate: "Present",
    impact:
      "Technical lead on Spectrum On Demand, a high-traffic streaming product serving 1M+ monthly visitors. Integrated live TV streaming, built analytics tracking, and shipped consumer-facing features at scale.",
    icon: "code",
  },
  {
    id: "vizio",
    company: "Vizio",
    role: "Frontend Software Engineering Intern",
    startDate: "June 2022",
    endDate: "Aug 2022",
    impact:
      "Built frontend features for internal tools and consumer-facing applications during an intensive summer internship.",
    icon: "layout",
  },
  {
    id: "sustainability-recycling",
    company: "SustainAbility Recycling",
    role: "Vocational Program Manager",
    startDate: "Aug 2015",
    endDate: "Sept 2021",
    impact:
      "Managed a vocational program supporting adults with developmental disabilities, an experience that shaped how I think about communication, systems, and building for real people.",
    icon: "users",
  },
];
