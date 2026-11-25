import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { SITE } from "@/data/site";

export default function BrandMark({ compact = false, invert = false }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={SITE.name}>
      <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_22px_-14px_rgba(20,16,15,0.6)] ring-1 ring-ink/12 transition-transform duration-500 group-hover:-translate-y-0.5 md:h-[62px] md:w-[62px] md:rounded-[18px]">
        <Image
          src={SITE.logo}
          alt={SITE.name}
          className="h-full w-full object-cover"
          fittingType="fill"
        />
      </span>
      <span className="leading-none">
        <span
          className={`block text-[19px] font-semibold tracking-[-0.03em] md:text-[23px] ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          Sydney&rsquo;s
        </span>
        {!compact && (
          <span
            className={`mt-1.5 block font-mono text-[8px] uppercase tracking-[0.18em] md:text-[9px] md:tracking-[0.2em] ${
              invert ? "text-white/60" : "text-brand/80"
            }`}
          >
            Consulting &amp; General Services
          </span>
        )}
      </span>
    </Link>
  );
}