export const metadata = { title: "Projects — Your Name" };

const PROJECTS = [
  { title: "Project One", desc: "A short description of this project and your role in it.", tag: "Design" },
  { title: "Project Two", desc: "A short description of this project and your role in it.", tag: "Engineering" },
  { title: "Project Three", desc: "A short description of this project and your role in it.", tag: "Research" },
  { title: "Project Four", desc: "A short description of this project and your role in it.", tag: "Design" },
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
      <p className="eyebrow mb-5">Projects</p>
      <h1 className="font-display text-4xl sm:text-5xl mb-12">Selected projects</h1>

      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <div key={p.title} className="border border-line rounded-2xl p-6">
            <span className="eyebrow">{p.tag}</span>
            <h2 className="font-display text-2xl mt-3">{p.title}</h2>
            <p className="text-muted text-sm mt-2 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
