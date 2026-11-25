import { Quote, Star } from "lucide-react";
import Reveal from "@/components/site/Reveal";

const FEEDBACK = [
  {
    quote:
      "They took our PENCOM and ITF certificates from overdue to filed in under two weeks. Our bid went in on time — and we won the contract.",
    name: "Adaeze O.",
    role: "Managing Director · Logistics, Abuja",
    initials: "AO",
  },
  {
    quote:
      "I registered my company, got the TIN and the tax clearance without visiting a single office. Every step was explained before I paid anything.",
    name: "Ibrahim M.",
    role: "Founder · Oilfield services, Port Harcourt",
    initials: "IM",
  },
  {
    quote:
      "Sydney's keeps a compliance calendar for us and calls before every renewal. Our auditors now ask far fewer questions.",
    name: "Chinelo A.",
    role: "Finance Manager · Construction group, Abuja",
    initials: "CA",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="feedback" className="border-t border-ink/10 bg-bone py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              Client feedback
            </span>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink">
              Quiet work,{" "}
              <span className="font-editorial italic text-brand">loud results.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate">
              Feedback from clients in Abuja and across Nigeria
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {FEEDBACK.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-ivory p-7 transition-shadow duration-300 hover:shadow-[0_30px_60px_-45px_rgba(20,16,15,0.5)]">
                <Quote className="h-6 w-6 text-brand/25" />
                <blockquote className="mt-4 flex-1 font-display text-[17px] font-light leading-[1.6] text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 font-mono text-[10.5px] text-brand-deep">
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-ink">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.1em] text-slate/70">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}