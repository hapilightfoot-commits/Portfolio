export const metadata = { title: "Photography — Hapi Lightfoot" };

const SERIES = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: `Series ${String(i + 1).padStart(2, "0")}`,
}));

export default function Photography() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
      <p className="eyebrow mb-5">Photography</p>
      <h1 className="font-display text-4xl sm:text-5xl mb-4">Selected work</h1>
      <p className="text-muted max-w-xl mb-12">
        Swap these placeholder frames for your own images — drop files in{" "}
        <code className="text-parchment">/public/photography</code> and reference them
        here with Next's <code className="text-parchment">Image</code> component.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {SERIES.map((s) => (
          <div
            key={s.id}
            className="aspect-[4/5] rounded-lg border border-line flex items-end p-4"
            style={{
              background: `linear-gradient(160deg, #1D1B15, #14130F)`,
            }}
          >
            <span className="eyebrow">{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
