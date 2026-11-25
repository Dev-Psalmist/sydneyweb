import Reveal from "@/components/site/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Scope & documents",
    body: "A short call to confirm what you need, what you already hold, and the exact agency checklist that applies. You get a written scope before anything is filed.",
  },
  {
    n: "02",
    title: "Filing & follow-up",
    body: "We prepare, submit and chase every application — with a named contact and a status update at each stage, not silence until it clears.",
  },
  {
    n: "03",
    title: "Certificate & handover",
    body: "Your certificates, receipts and a compliance calendar are handed over in one organised file, so renewals never surprise you again.",
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="border-t border-ink/10 bg-ivory py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              How we work
            </span>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink">
              Three steps, no{" "}
              <span className="font-editorial italic text-brand">guesswork.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-slate">
            The same method for a single tax clearance or a full contractor compliance
            pack — clear scope, visible progress, clean handover.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.07}>
              <div className="group h-full bg-bone p-7 transition-colors duration-300 hover:bg-white">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brand/60">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}