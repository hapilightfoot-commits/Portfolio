export const metadata = { title: "Films — Your Name" };

const FILMS = [
  { title: "Film Title One", year: "2026", note: "Short · 8 min" },
  { title: "Film Title Two", year: "2025", note: "Documentary · 14 min" },
  { title: "Film Title Three", year: "2024", note: "Short · 5 min" },
];

export default function Films() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
      <p className="eyebrow mb-5">Films</p>
      <h1 className="font-display text-4xl sm:text-5xl mb-12">Selected films</h1>

      <div className="flex flex-col">
        {FILMS.map((f, i) => (
          <div key={f.title}>
            <div className="flex items-baseline justify-between py-6">
              <div>
                <span className="eyebrow mr-4">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl">{f.title}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">{f.year}</p>
                <p className="text-xs text-muted mt-0.5">{f.note}</p>
              </div>
            </div>
            {i < FILMS.length - 1 && <div className="sprocket-rule" />}
          </div>
        ))}
      </div>
    </div>
  );
}
