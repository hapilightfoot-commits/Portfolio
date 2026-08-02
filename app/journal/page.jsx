import Reveal from "@/components/Reveal";

export const metadata = { title: "Journal — Hapi Lightfoot" };

const ENTRIES = [
  {
    title: "Entry title goes here",
    date: "Month Year",
    excerpt: "A short excerpt or opening line from the entry, giving readers a sense of what it's about before they click in.",
  },
  {
    title: "Entry title goes here",
    date: "Month Year",
    excerpt: "A short excerpt or opening line from the entry, giving readers a sense of what it's about before they click in.",
  },
  {
    title: "Entry title goes here",
    date: "Month Year",
    excerpt: "A short excerpt or opening line from the entry, giving readers a sense of what it's about before they click in.",
  },
];

export default function Journal() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-28">
      <Reveal>
        <p className="eyebrow mb-5">Journal</p>
        <h1 className="font-display text-4xl sm:text-6xl mb-4">Notes &amp; essays</h1>
        <p className="text-muted max-w-xl mb-16">
          Reflections on the work, the process, and the ideas behind it. Replace these
          placeholder entries with your own writing.
        </p>
      </Reveal>

      <div className="flex flex-col">
        {ENTRIES.map((entry, i) => (
          <Reveal key={entry.title + i} delay={i * 80}>
            <div className="work-row-wrap">
              <div className="py-8">
                <span className="eyebrow">{entry.date}</span>
                <h2 className="font-display text-2xl sm:text-3xl mt-2">{entry.title}</h2>
                <p className="text-muted text-sm mt-2 leading-relaxed max-w-xl">
                  {entry.excerpt}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
