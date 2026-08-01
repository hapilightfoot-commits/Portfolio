import Link from "next/link";

export const metadata = { title: "Apps — Your Name" };

// Add a new entry here, and a matching folder at app/apps/<slug>/page.jsx,
// whenever you ship a new app. Each one gets its own route.
const APPS = [
  {
    slug: "still-point",
    title: "Still Point",
    desc: "A daily meditation companion with binaural beats and guided chakra practices.",
  },
];

export default function AppsIndex() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
      <p className="eyebrow mb-5">Apps</p>
      <h1 className="font-display text-4xl sm:text-5xl mb-4">Things I've built</h1>
      <p className="text-muted max-w-xl mb-12">
        Each app lives at its own route — <code className="text-parchment">/apps/&lt;name&gt;</code>.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {APPS.map((a) => (
          <Link
            key={a.slug}
            href={`/apps/${a.slug}`}
            className="group border border-line rounded-2xl p-6 hover:border-amber/60 transition-colors"
          >
            <h2 className="font-display text-2xl group-hover:text-amber transition-colors">
              {a.title}
            </h2>
            <p className="text-muted text-sm mt-2 leading-relaxed">{a.desc}</p>
            <span className="eyebrow inline-block mt-4">/apps/{a.slug}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
