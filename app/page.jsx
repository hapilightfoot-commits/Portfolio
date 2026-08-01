import Link from "next/link";

const TILES = [
  { href: "/photography", label: "Photography", note: "Stills, series, and contact sheets" },
  { href: "/films", label: "Films", note: "Short films and video work" },
  { href: "/projects", label: "Projects", note: "Design and engineering work" },
  { href: "/apps", label: "Apps", note: "Small tools, each with its own page" },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="py-24 sm:py-32">
        <p className="eyebrow mb-5">Portfolio</p>
        <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] max-w-3xl">
          Photography, film, and things I build.
        </h1>
        <p className="font-body text-muted text-lg mt-6 max-w-xl">
          A running record of visual and technical work — replace this with a line or two
          about who you are and what you make.
        </p>
        <div className="flex gap-4 mt-9">
          <Link
            href="/projects"
            className="bg-amber text-ink font-body text-sm font-medium px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            See the work
          </Link>
          <Link
            href="/contact"
            className="border border-line text-parchment font-body text-sm font-medium px-5 py-3 rounded-full hover:border-muted transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="sprocket-rule mb-10" />
        <div className="grid sm:grid-cols-2 gap-4">
          {TILES.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              className="group border border-line rounded-2xl px-6 py-6 hover:border-amber/60 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="font-display text-2xl mt-3 group-hover:text-amber transition-colors">
                {t.label}
              </h2>
              <p className="text-muted text-sm mt-1">{t.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
