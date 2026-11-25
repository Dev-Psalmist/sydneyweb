import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MessageSquare, Phone } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import TicketForm from "@/components/support/TicketForm";
import TrackTicket from "@/components/support/TrackTicket";
import { openChat } from "@/components/site/ChatWidget";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/_site/support")({
  head: () => ({
    meta: [
      { title: "Customer care & support — Sydney's Consulting & General Services" },
      {
        name: "description",
        content:
          "Reach Sydney's Consulting by live chat, email, phone or a tracked support ticket with priority levels — plus walk-in support at our Garki, Abuja office.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Customer care"
        title={
          <>
            Tell us what you need —{" "}
            <span className="font-editorial italic text-brand">we keep the record.</span>
          </>
        }
        description="Live chat for quick questions, a tracked ticket for anything that needs follow-up, and a phone line answered by a person during office hours."
      >
        <button
          type="button"
          onClick={openChat}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-brand-deep"
        >
          <MessageSquare className="h-4 w-4" />
          Start live chat
        </button>
      </PageHeader>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={SITE.phoneHref}
                className="rounded-2xl border border-ink/10 bg-bone p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30"
              >
                <Phone className="h-4 w-4 text-brand" />
                <p className="mt-3 text-[12px] font-medium text-ink">Call</p>
                <p className="mt-0.5 font-mono text-[10px] text-slate">{SITE.phone}</p>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="rounded-2xl border border-ink/10 bg-bone p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30"
              >
                <Mail className="h-4 w-4 text-brand" />
                <p className="mt-3 text-[12px] font-medium text-ink">Email</p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-slate">
                  {SITE.email}
                </p>
              </a>
              <div className="rounded-2xl border border-ink/10 bg-bone p-4">
                <Clock className="h-4 w-4 text-brand" />
                <p className="mt-3 text-[12px] font-medium text-ink">Hours</p>
                <p className="mt-0.5 font-mono text-[10px] text-slate">{SITE.hours}</p>
              </div>
            </div>

            <TicketForm />
          </div>

          <div className="space-y-6" id="track">
            <TrackTicket />

            <div className="rounded-[26px] border border-ink/10 bg-brand-deep p-6 text-white md:p-7">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold">
                Priority levels
              </p>
              <h3 className="mt-3 font-display text-xl text-white">
                Urgent work is triaged first.
              </h3>
              <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-white/75">
                <li>
                  <span className="text-white">Low</span> — general enquiries and document
                  questions, answered within two working days.
                </li>
                <li>
                  <span className="text-white">Normal</span> — active filings and renewals,
                  answered within one working day.
                </li>
                <li>
                  <span className="text-white">High</span> — a statutory deadline within
                  five days; same-day acknowledgement.
                </li>
                <li>
                  <span className="text-white">Urgent</span> — a tender closing or a
                  blocked payment; call the desk after logging it.
                </li>
              </ul>
              <p className="mt-5 border-t border-white/15 pt-4 text-[11.5px] text-white/50">
                Walk-in support: {SITE.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}