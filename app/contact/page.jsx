import { Mail, Instagram, Linkedin } from "lucide-react";

export const metadata = { title: "Contact — Hapi Lightfoot" };

const LINKS = [
  {
    label: "Email",
    href: "mailto:hapi@hybridstudiohp.com",
    icon: Mail,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hapidanielle/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hapi-lightfoot/",
    icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
      <p className="eyebrow mb-5">Contact</p>

      <h1 className="font-display text-4xl sm:text-5xl mb-6">
        Let's talk.
      </h1>

      <p className="text-muted mb-12 max-w-md leading-relaxed">
        I'm always interested in meaningful collaborations, creative projects,
        storytelling opportunities, and conversations that move culture forward.
        If you'd like to work together, commission a project, or simply connect,
        I'd love to hear from you.
      </p>

      <div className="flex flex-col gap-3">
        {LINKS.map((l) => {
          const Icon = l.icon;

          return (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 border border-line rounded-xl px-5 py-4 hover:border-amber/60 transition-colors"
            >
              <Icon size={18} className="text-amber" />
              <span className="font-body text-sm">{l.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
