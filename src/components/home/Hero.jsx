import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { AGENCIES, SITE } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-52 h-[540px] w-[540px] rounded-full bg-brand/10 blur-[130px]" />
        <div className="absolute right-[-12%] top-[-8%] h-[460px] w-[460px] rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,16,15,0.05)_1px,transparent_1px)] bg-[length:104px_100%] opacity-50" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate">
              Corporate compliance &amp; advisory — Abuja
            </span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2.35rem,5.2vw,4.35rem)] font-light leading-[1.02] tracking-[-0.03em] text-ink">
            Every filing, every
            <br className="hidden sm:block" /> certificate — handled
            <br className="hidden sm:block" />{" "}
            <span className="font-editorial italic text-brand">with precision.</span>
          </h1>

          <p className="mt-7 max-w-[54ch] text-[15px] leading-[1.75] text-slate md:text-base">
            Sydney&rsquo;s Consulting &amp; General Services helps Nigerian companies
            register, certify and stay compliant — CAC incorporation to tax clearance,
            PENCOM to NITDA — with one accountable team and a single point of contact.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-[13.5px] font-medium text-white shadow-[0_24px_40px_-24px_rgba(123,35,82,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              Book an appointment
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-6 py-3.5 text-[13.5px] font-medium text-ink transition-colors duration-300 hover:border-brand/40 hover:text-brand"
            >
              Explore the services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12.5px] text-slate">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-brand">
              <span className="font-mono text-[11px] tracking-[0.04em]">{SITE.phone}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-brand/70" />
              {SITE.hours}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-[30px] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate/70">
                The practice
              </span>
              <span className="rounded-full border border-brand/15 bg-white/60 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-brand">
                Abuja · NG
              </span>
            </div>

            <p className="mt-6 font-display text-[26px] font-light leading-tight tracking-[-0.02em] text-ink">
              Eleven filings.
              <br />
              One desk.
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {AGENCIES.map((agency) => (
                <span
                  key={agency}
                  className="rounded-full border border-ink/10 bg-white/55 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-slate"
                >
                  {agency}
                </span>
              ))}
            </div>

            <div className="my-6 h-px bg-ink/10" />

            <div className="flex gap-3 text-[12.5px] leading-relaxed text-slate">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand/60" />
              <span>
                {SITE.addressLines[0]}
                <br />
                {SITE.addressLines[1]}
              </span>
            </div>

            <Link
              to="/book"
              className="group mt-7 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-brand"
            >
              Reserve a consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-2xl border border-ink/10 bg-bone/90 px-4 py-3 shadow-[0_24px_50px_-30px_rgba(20,16,15,0.6)] backdrop-blur md:block">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate/60">
              Response time
            </p>
            <p className="mt-1 font-display text-lg text-ink">Same business day</p>
          </div>
        </div>
      </div>
    </section>
  );
}