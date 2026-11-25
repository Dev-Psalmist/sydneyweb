import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, X } from "lucide-react";

const TYPE_CLASS = {
  serif: "font-display italic",
  grotesk: "font-body font-semibold uppercase",
  mono: "font-mono uppercase",
  editorial: "font-editorial",
};

const TYPE_SIZE = {
  serif: "text-[clamp(1.9rem,3.1vw,2.6rem)] leading-[1.03] tracking-[-0.025em]",
  grotesk: "text-[clamp(1.55rem,2.7vw,2.25rem)] leading-[0.95] tracking-[-0.04em]",
  mono: "text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.2] tracking-[0.06em]",
  editorial: "text-[clamp(2.05rem,3.4vw,2.9rem)] leading-[1] tracking-[-0.01em]",
};

export default function ServiceCard({ service, active, flipped, onActivate }) {
  const isOpen = active && flipped;

  return (
    <div
      className="relative h-[clamp(390px,42vw,450px)] w-full preserve-3d transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)]"
      style={{ transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)" }}
    >
      {/* Front — the sealed file */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[26px] glass p-6 backface-hidden md:p-7"
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onActivate();
          }}
          aria-label={`Open ${service.name}`}
          className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-[76px] w-[108px] shrink-0 place-items-center overflow-hidden rounded-2xl border border-brand/15 bg-white/90 px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_6px_18px_rgba(20,45,35,0.06)]">
              {service.logo ? (
                <>
                  <img
                    src={service.logo}
                    alt={`${service.seal} agency logo`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="max-h-[60px] max-w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                      event.currentTarget.nextElementSibling.hidden = false;
                    }}
                  />
                  <span className="hidden font-mono text-[10px] font-semibold tracking-[0.04em] text-brand-deep">
                    {service.seal}
                  </span>
                </>
              ) : (
                <span className="font-mono text-[10px] font-semibold tracking-[0.04em] text-brand-deep">{service.seal}</span>
              )}
            </div>
            <span className="pt-1 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-slate/55">
              {service.kicker}
            </span>
          </div>

          <div className="mt-auto">
            <h3 className={`${TYPE_CLASS[service.type]} ${TYPE_SIZE[service.type]} text-ink extrude`}>
              {service.name}
            </h3>
            <p className="mt-3.5 max-w-[36ch] text-[13px] leading-relaxed text-slate">
              {service.summary}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-brand">
              Open the file
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Back — click the scope area to return; the booking link remains a separate action. */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[26px] glass-dark p-6 text-white backface-hidden md:p-7"
        style={{
          transform: "rotateY(180deg)",
          pointerEvents: isOpen ? "auto" : "none",
          cursor: "pointer",
        }}
        onClick={(e) => {
          if (e.target.closest("a, button")) return;
          onActivate();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") onActivate();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold">
              {service.seal} · scope
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onActivate();
              }}
              aria-label="Flip back to service overview"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              Back
            </button>
          </div>

          <h3 className="mt-4 font-display text-[22px] leading-tight text-white extrude-light">
            {service.name}
          </h3>

          <ul className="mt-4 space-y-2.5">
            {service.items.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-2.5 text-[12px] leading-snug text-white/80">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
              Typical turnaround
            </p>
            <p className="mt-1 text-[12.5px] text-white/85">{service.turnaround}</p>
            <Link
              to="/book"
              search={{ service: service.id }}
              onClick={(e) => e.stopPropagation()}
              className="group mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-[12.5px] font-medium text-brand-deep transition-colors hover:bg-gold hover:text-ink"
            >
              Book this service
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}