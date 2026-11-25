import { Link } from "@tanstack/react-router";
import { ArrowUpRight, HandHeart, ShieldCheck, Timer } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/data/site";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Integrity first",
    body: "Every filing is done the proper way, at the proper agency, with nothing left to chance.",
  },
  {
    icon: Timer,
    title: "Unhurried follow-through",
    body: "Calls returned the same day, and a straight answer about where your application actually stands.",
  },
  {
    icon: HandHeart,
    title: "Generosity, quietly",
    body: "Registrations funded for first-time entrepreneurs and community education supported in Abuja — rarely mentioned.",
  },
];

export default function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="relative overflow-hidden border-t border-ink/10 bg-ivory py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-brand/8 blur-[130px]"
      />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[28px] border border-brand/25" />
            <div className="relative overflow-hidden rounded-[26px] bg-brand-deep shadow-[0_50px_90px_-50px_rgba(74,19,48,0.7)]">
              <Image
                src={SITE.ceoPhoto}
                alt="Chimaobi Okparaeke, Chief Executive Officer of Sydney's Consulting & General Services"
                className="aspect-[4/5] w-full object-cover [filter:contrast(1.07)_saturate(1.06)_brightness(1.02)]"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.33}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/45 to-transparent p-6 pt-16">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold">
                  {SITE.ceoTitle}
                </p>
                <p className="mt-2 font-display text-xl text-white">
                  {SITE.ceoName}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                  Founder
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              Leadership
            </span>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light leading-[1.06] tracking-[-0.03em] text-ink">
              The standard starts at the{" "}
              <span className="font-editorial italic text-brand">top of the desk.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-7 space-y-5 text-[14.5px] leading-[1.8] text-slate">
              <p>
                Chimaobi Okparaeke built this practice on a simple conviction: compliance is
                a form of stewardship. A certificate is not paperwork — it is the difference
                between a contract won and a bid disqualified, between a business that
                survives an audit and one that does not.
              </p>
              <p>
                He is known among clients for a work ethic that is unglamorous and
                exacting — files submitted early, questions answered plainly, and a
                standing rule that no client is ever left guessing about where their
                application stands. Away from the office, that same discipline becomes
                generosity: business registrations quietly funded for young entrepreneurs
                starting out, and steady support for community education in Abuja. He
                would rather the work speak than the giving be announced.
              </p>
            </div>
          </Reveal>

          <div className="mt-9 space-y-4">
            {PRINCIPLES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={0.1 + i * 0.05}>
                  <div className="flex gap-4 border-t border-ink/10 pt-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand/20 text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-medium text-ink">{item.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <Link
              to="/book"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
            >
              Meet the team in person
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}