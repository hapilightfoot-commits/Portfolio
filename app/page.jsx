import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import WorksList from "@/components/WorksList";

const FEATURED = [
  { id: "soulful-mourning", title: "Soulful Mourning", category: "Short Film", videoId: "PfUpaZ1OTNA" },
  { id: "mirrors-latest", title: "Mirrors to Stages", category: "Live Music Experience", videoId: "ZIsB_kciPfs" },
  { id: "culture-alchemists", title: "Culture Alchemists", category: "Docuseries", videoId: "ugt-gk6E9gw" },
];

export default function Home() {
  return (
    <div>
      {/* Full-bleed cinematic hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(232,163,61,0.10), transparent 60%), linear-gradient(180deg, #14130F, #0F0E0A)",
          }}
        />
        <div className="max-w-6xl mx-auto w-full">
          <p className="eyebrow mb-6">Hapi Lightfoot</p>
          <h1 className="hero-title text-parchment max-w-5xl">
            Stories. Images.
            <br />
            Ideas. Tools.
          </h1>
          <p className="font-body text-muted text-lg sm:text-xl mt-8 max-w-xl leading-relaxed">
            I create films, photographs, essays, and digital experiences that explore
            people, culture, creativity, and technology. This is where I share my work,
            document my journey, and build tools that help others create and learn.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted animate-bounce">
          <ArrowDown size={18} />
        </div>
      </section>

      {/* Featured work */}
      <section className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl sm:text-4xl">Selected work</h2>
            <Link href="/portfolio" className="eyebrow hover:text-amber transition-colors">
              View all
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <WorksList works={FEATURED} />
        </Reveal>
      </section>
    </div>
  );
}
