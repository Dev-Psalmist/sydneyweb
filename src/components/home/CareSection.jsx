import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Mail, MessageSquare, Phone, TicketCheck } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { openChat } from "@/components/site/ChatWidget";
import { SITE } from "@/data/site";

export default function CareSection() {
  return (
    <section id="care" className="relative border-t border-ink/10 bg-bone py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
            Customer care
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink">
            A desk that answers —{" "}
            <span className="font-editorial italic text-brand">online and in person.</span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-slate">
            Three ways to reach us, each with a record of the conversation. Every request
            gets a reference, a priority and a person responsible for closing it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-ivory p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-ink">Live chat</h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate">
                Ask about documents, timelines or which agency applies to you. Our
                assistant answers instantly and hands anything complex to the desk.
              </p>
              <button
                type="button"
                onClick={openChat}
                className="mt-6 inline-flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-[12.5px] font-medium text-white transition-colors hover:bg-brand"
              >
                Start a chat
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-ivory p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand/20 text-brand">
                <TicketCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-ink">Ticketing</h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate">
                Log a request with a priority level and track it by reference. Urgent
                filings are triaged first, and nothing closes without a resolution note.
              </p>
              <Link
                to="/support"
                className="mt-6 inline-flex items-center justify-between rounded-xl border border-ink/15 px-4 py-3 text-[12.5px] font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
              >
                Open a ticket
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-brand-deep p-7 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-gold">
                <Clock className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-white">Walk in or call</h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-white/70">
                Prefer a face-to-face conversation? The office is open{" "}
                {SITE.hours.toLowerCase()}, and the phone is answered by a person during
                those hours.
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-[12.5px] font-medium text-brand-deep transition-colors hover:bg-gold hover:text-ink"
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 rounded-xl border border-white/20 px-4 py-3 text-[12px] text-white/80 transition-colors hover:border-white/50 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{SITE.email}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-ink/10 bg-ivory px-6 py-4 text-[12px] text-slate">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brand">
              Priority levels
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate/40" /> Low — general enquiry
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Normal — active filing
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> High — deadline within 5 days
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Urgent — tender closing
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}