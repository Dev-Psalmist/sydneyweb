import { Link } from "@tanstack/react-router";
import {
  CalendarPlus,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  TicketCheck,
} from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { openChat } from "@/components/site/ChatWidget";
import { MAPS_DIRECTIONS, SITE } from "@/data/site";

const TILES = [
  {
    label: "Book an appointment",
    note: "Pick a date and time",
    icon: CalendarPlus,
    to: "/book",
  },
  {
    label: "Track a ticket",
    note: "Reference + email",
    icon: TicketCheck,
    to: "/support",
    hash: "track",
  },
  { label: "Live chat", note: "Answers in seconds", icon: MessageSquare, chat: true },
  { label: "Call the desk", note: SITE.phone, icon: Phone, href: SITE.phoneHref },
  { label: "Email us", note: SITE.email, icon: Mail, href: `mailto:${SITE.email}` },
  {
    label: "Directions",
    note: "Area 11, Garki",
    icon: MapPin,
    href: MAPS_DIRECTIONS,
    external: true,
  },
];

export default function QuickAccess() {
  return (
    <section className="relative border-t border-ink/10 bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
                Quick access
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light tracking-[-0.02em] text-ink">
                Your command desk.
              </h2>
            </div>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-slate">
              Everything you need to reach us, in one row — book, track, chat, call or
              simply walk in.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {TILES.map((tile) => {
              const Icon = tile.icon;
              const inner = (
                <>
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand/12 bg-white/70 text-brand transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="mt-4 block text-[12.5px] font-medium leading-snug text-ink">
                    {tile.label}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[9.5px] uppercase tracking-[0.1em] text-slate/60">
                    {tile.note}
                  </span>
                </>
              );

              const className =
                "group flex h-full flex-col rounded-2xl border border-white/70 bg-white/55 p-4 text-left shadow-[0_20px_40px_-34px_rgba(20,16,15,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/25";

              if (tile.chat) {
                return (
                  <button
                    key={tile.label}
                    type="button"
                    onClick={openChat}
                    className={className}
                  >
                    {inner}
                  </button>
                );
              }
              if (tile.href) {
                return (
                  <a
                    key={tile.label}
                    href={tile.href}
                    target={tile.external ? "_blank" : undefined}
                    rel={tile.external ? "noreferrer noopener" : undefined}
                    className={className}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <Link
                  key={tile.label}
                  to={tile.to}
                  hash={tile.hash}
                  className={className}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}