import { ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { MAPS_DIRECTIONS, MAPS_EMBED, MAPS_PLACE, SITE } from "@/data/site";

export default function MapSection() {
  return (
    <section id="visit" className="border-t border-ink/10 bg-ivory py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              Visit the office
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.2vw,2.7rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink">
              Area 11, Garki —{" "}
              <span className="font-editorial italic text-brand">Abuja.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-slate">
              Two minutes from the Area 11 roundabout. Open the live map for turn-by-turn
              directions from wherever you are.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <div className="text-[13.5px] leading-relaxed text-ink">
                  {SITE.addressLines[0]}
                  <br />
                  {SITE.addressLines[1]}
                </div>
              </div>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 text-[13.5px] text-ink transition-colors hover:text-brand"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                {SITE.phone}
              </a>
              <div className="flex gap-3">
                <span className="mt-1.5 h-4 w-4 shrink-0 rounded-full border border-brand/40" />
                <div className="text-[13px] leading-relaxed text-slate">
                  <span className="block text-ink">{SITE.hours}</span>
                  {SITE.hoursNote}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
              <a
                href={MAPS_PLACE}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
              >
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[26px] border border-ink/10 bg-sand/40 shadow-[0_50px_90px_-60px_rgba(20,16,15,0.65)]">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink">
                  Live map · Abuja
                </span>
              </div>
              <iframe
                title="Sydney's Consulting & General Services — No 9 Port Harcourt Crescent, Area 11, Garki, Abuja"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[340px] w-full border-0 md:h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}