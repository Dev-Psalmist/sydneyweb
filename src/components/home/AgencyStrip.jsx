import { AGENCIES } from "@/data/site";

export default function AgencyStrip() {
  const items = [...AGENCIES, ...AGENCIES];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-bone/70">
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee items-center">
          {items.map((agency, i) => (
            <span
              key={`${agency}-${i}`}
              className="flex items-center gap-8 pr-8 font-mono text-[10px] uppercase tracking-[0.24em] text-slate/55"
            >
              {agency}
              <span className="h-1 w-1 rounded-full bg-brand/35" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}