import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import BrandMark from "@/components/site/BrandMark";
import { SITE } from "@/data/site";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "CAC registration", to: "/services" },
      { label: "PENCOM & NSITF", to: "/services" },
      { label: "BPP / IRR", to: "/services" },
      { label: "Tax clearance", to: "/services" },
      { label: "All services", to: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Leadership", to: "/", hash: "leadership" },
      { label: "How we work", to: "/", hash: "approach" },
      { label: "Customer care", to: "/support" },
      { label: "Book appointment", to: "/book" },
      { label: "Client dashboard", to: "/dashboard" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-[110px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <BrandMark invert />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
              Corporate registrations, certifications and tax compliance for Nigerian
              businesses — handled end to end from our desk in Garki, Abuja.
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <Instagram className="h-3.5 w-3.5" />
              @sydneys_consulting
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      hash={link.hash}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Visit &amp; contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
                <span>
                  {SITE.addressLines[0]}
                  <br />
                  {SITE.addressLines[1]}
                </span>
              </li>
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-white/45" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white/45" />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
              {SITE.hours}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-7 text-[11.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">
            Abuja · Nigeria — Compliance, handled.
          </p>
        </div>
      </div>
    </footer>
  );
}