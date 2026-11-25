import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import ServiceDeck from "@/components/home/ServiceDeck";
import Reveal from "@/components/site/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="relative border-t border-ink/10 bg-bone py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-brand/[0.06] blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              What we do
            </span>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,3.6vw,3.1rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              Certifications, arranged like a{" "}
              <span className="font-editorial italic text-brand">library.</span>
            </h2>
          </div>
          <div className="max-w-sm md:text-right">
            <p className="text-[14px] leading-relaxed text-slate">
              Eleven regulatory files, each scoped, prepared and tracked until the
              certificate is in your hands. Open a card to see exactly what is covered.
            </p>
            <Link
              to="/services"
              className="group mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-brand"
            >
              View every service
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-16">
          <ServiceDeck />
        </div>
      </div>
    </section>
  );
}