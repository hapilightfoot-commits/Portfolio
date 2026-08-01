export const metadata = { title: "About — Your Name" };

const SKILLS = [
  "Photography",
  "Filmmaking",
  "Product Design",
  "Frontend Engineering",
  "Editing",
  "Sound Design",
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
      <p className="eyebrow mb-5">About</p>
      <h1 className="font-display text-4xl sm:text-5xl mb-8">A short bio goes here.</h1>
      <div className="space-y-5 font-body text-parchment/90 leading-relaxed">
        <p>
          Replace this paragraph with a few sentences about your background — where you
          work, what you shoot, what you build, and what draws you to it. Keep it
          conversational; this is the page people read when they want to know who's
          behind the work.
        </p>
        <p>
          A second paragraph can cover how the disciplines connect for you — photography
          informing design, film informing motion in your apps, or whatever the real
          throughline is.
        </p>
      </div>

      <div className="mt-14">
        <p className="eyebrow mb-4">Currently working with</p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="text-sm font-body border border-line rounded-full px-4 py-1.5 text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
