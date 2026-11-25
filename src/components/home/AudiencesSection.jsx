import { Building2, Landmark, Sprout, UserRound } from "lucide-react";
import Reveal from "@/components/site/Reveal";

const AUDIENCES = [
  {
    icon: Sprout,
    title: "New business owners",
    body: "Name search, incorporation and the first year of statutory filings — so your company starts clean and stays clean.",
  },
  {
    icon: Building2,
    title: "Established companies",
    body: "Renewals, compliance calendars and audit-ready files for finance and HR teams that cannot afford gaps.",
  },
  {
    icon: Landmark,
    title: "Government contractors",
    body: "BPP / IRR, tax clearance and the full tender compliance pack, assembled in the order evaluators check it.",
  },
  {
    icon: UserRound,
    title: "Individuals & paperwork",
    body: "Tax, documentation and personal filings handled without the queues, the guesswork or the repeated trips.",
  },
];

export default function AudiencesSection() {
  return (
    <section className="border-t border-ink/10 bg-bone py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
            Who we work with
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink">
            From first registration to{" "}
            <span className="font-editorial italic text-brand">full compliance.</span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-slate">
            We serve clients in Abuja and the surrounding areas, across Nigeria, and
            Nigerian businesses operating from abroad. Most filings can be handled
            remotely — you only visit the office when you want to.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-ink/10 bg-ivory p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_30px_60px_-40px_rgba(20,16,15,0.5)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/8 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}