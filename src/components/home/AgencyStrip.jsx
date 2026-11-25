import { AGENCIES } from "@/data/site";

export default function AgencyStrip() {
  const items = [...AGENCIES, ...AGENCIES];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-bone/70">
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee items-center">
          {items.map((agency, i) => (
            <span
              key={`${agency.name}-${i}`}
              className="flex items-center gap-3 pr-9 font-mono text-[10px] uppercase tracking-[0.2em] text-slate/65"
            >
              <span className="grid h-9 w-12 shrink-0 place-items-center rounded-lg border border-ink/10 bg-white/85 px-1.5 py-1 shadow-sm">
                <img
                  src={agency.logo}
                  alt={`${agency.name} logo`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="max-h-7 max-w-full object-contain"
                />
              </span>
              <span>{agency.name}</span>
              <span className="ml-1 h-1 w-1 rounded-full bg-brand/35" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}