"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/photography", label: "Photography" },
  { href: "/films", label: "Films" },
  { href: "/projects", label: "Projects" },
  { href: "/apps", label: "Apps" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl tracking-tight text-parchment">
          Your Name
        </Link>

        <button
          className="sm:hidden text-parchment"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul className="hidden sm:flex items-center gap-7">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-body text-sm transition-colors ${
                    active ? "text-amber" : "text-muted hover:text-parchment"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {open && (
        <ul className="sm:hidden flex flex-col gap-1 px-6 pb-5">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 font-body text-sm ${
                    active ? "text-amber" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="sprocket-rule" />
    </header>
  );
}
