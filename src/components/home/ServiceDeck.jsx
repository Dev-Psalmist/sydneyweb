import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/home/ServiceCard";
import { SERVICES } from "@/data/services";

export default function ServiceDeck() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const touchStart = useRef(null);

  const total = SERVICES.length;

  const go = useCallback(
    (next) => {
      setIndex((next + total) % total);
      setFlipped(false);
    },
    [total],
  );

  const handleActivate = (i) => {
    if (i === index) setFlipped((f) => !f);
    else {
      setIndex(i);
      setFlipped(false);
    }
  };

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? index + 1 : index - 1);
    touchStart.current = null;
  };

  return (
    <div
      className="relative select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      tabIndex={-1}
    >
      <div
        className="relative mx-auto h-[clamp(400px,44vw,470px)] w-full max-w-[1100px] preserve-3d"
        style={{ perspective: "1800px" }}
      >
        {SERVICES.map((service, i) => {
          const offset = i - index;
          const abs = Math.abs(offset);
          const visible = abs <= 2;
          return (
            <div
              key={service.id}
              onClick={() => handleActivate(i)}
              className="absolute left-1/2 top-1/2 w-[min(80vw,360px)] transition-all duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] md:w-[min(46vw,400px)]"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 54}%) translateZ(${
                  -abs * 130
                }px) rotateY(${offset * -14}deg) scale(${1 - abs * 0.07})`,
                opacity: visible ? (abs === 0 ? 1 : 0.4) : 0,
                zIndex: 30 - abs,
                pointerEvents: visible ? "auto" : "none",
                cursor: abs === 0 ? "pointer" : "pointer",
              }}
              aria-hidden={!visible}
            >
              <ServiceCard
                service={service}
                active={i === index}
                flipped={flipped}
                onActivate={() => handleActivate(i)}
              />
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-9 flex max-w-[1100px] items-center justify-between gap-6 px-1">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous service"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-brand/50 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next service"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-brand/50 hover:text-brand"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center gap-1.5">
          {SERVICES.map((service, i) => (
            <button
              key={service.id}
              type="button"
              onClick={() => go(i)}
              aria-label={service.name}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-brand" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
          {String(index + 1).padStart(2, "0")}
          <span className="text-slate/40"> / {String(total).padStart(2, "0")}</span>
        </p>
      </div>

      <p className="mt-4 text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate/50">
        Tap a card to open it — swipe or use the arrows to browse
      </p>
    </div>
  );
}