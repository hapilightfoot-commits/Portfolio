import Reveal from "@/components/Reveal";
import WorksList from "@/components/WorksList";

export const metadata = { title: "Portfolio — Hapi Lightfoot" };

const WORKS = [
  {
    id: "soulful-mourning",
    title: "Soulful Mourning",
    category: "Short Film",
    videoId: "PfUpaZ1OTNA",
  },
  {
    id: "mirrors-ep1",
    title: "Mirrors to Stages — Episode 1",
    category: "Live Music Experience",
    videoId: "mfAOpGYoV7c",
  },
  {
    id: "mirrors-latest",
    title: "Mirrors to Stages — Latest Episode",
    category: "Live Music Experience",
    videoId: "ZIsB_kciPfs",
  },
  {
    id: "culture-alchemists",
    title: "Culture Alchemists",
    category: "Docuseries",
    videoId: "ugt-gk6E9gw",
  },
  {
    id: "on-earth",
    title: "On Earth As It Is In Heaven",
    category: "Experimental Short Film",
    videoId: "ho17-WMFXAs",
  },
];

export default function Portfolio() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-28">
      <Reveal>
        <p className="eyebrow mb-5">Portfolio</p>
        <h1 className="font-display text-4xl sm:text-6xl mb-4">Selected work</h1>
        <p className="text-muted max-w-xl mb-16">
          Films, live music documentation, and series work. Click a title to watch.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <WorksList works={WORKS} />
      </Reveal>
    </div>
  );
}
