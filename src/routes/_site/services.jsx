import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import Reveal from "@/components/site/Reveal";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/_site/services")({
  head: () => ({
    meta: [
      { title: "Services & certifications — Sydney's Consulting & General Services" },
      {
        name: "description",
        content:
          "CAC registration, PENCOM, NSITF, ITF, BPP/IRR, SCUML, DPR permits, NITDA, NEPC export registration, tax clearance certificates and general contracts — handled in Abuja.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Every registration,{" "}
            <span className="font-editorial italic text-brand">one accountable desk.</span>
          </>
        }
        description="Eleven files, each with its own agency, checklist and timeline. Pick the one you need — or bring us the whole compliance pack and we will sequence it for you."
      >
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-brand-deep"
        >
          Book a consultation
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 0.05}>
                <article className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-bone p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_36px_70px_-50px_rgba(20,16,15,0.55)]">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-brand/15 bg-white text-brand-deep">
                      <span className="font-mono text-[9px] font-medium tracking-[0.04em]">
                        {service.seal}
                      </span>
                    </span>
                    <span className="text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-slate/50">
                      {service.kicker}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-[22px] leading-tight tracking-[-0.02em] text-ink">
                    {service.name}
                  </h2>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.items.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2 text-[12px] leading-snug text-slate">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand/70" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate/55">
                      {service.turnaround}
                    </span>
                    <Link
                      to="/book"
                      search={{ service: service.id }}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brand"
                    >
                      Book
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="relative overflow-hidden rounded-[26px] bg-brand-deep px-7 py-12 text-white md:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/25 blur-[100px]"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold">
                  Not sure which you need?
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-tight text-white">
                  Tell us what you are bidding for — we will build the compliance pack.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-medium text-brand-deep transition-colors hover:bg-gold hover:text-ink"
                >
                  Book an appointment
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[13px] font-medium text-white transition-colors hover:border-white/60"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}