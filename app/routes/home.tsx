import type { Route } from "./+types/home";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060816] text-white">
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">
            Full-Stack Software Engineer
          </p>

          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Design-minded engineering.{" "}
            <span className="text-white/60">Real-world impact.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
            I build modern web applications with a focus on usability,
            performance, and maintainable systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              View Selected Work
            </a>
            <a
              href="/resume"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white"
            >
              Resume
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
