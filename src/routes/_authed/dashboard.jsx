import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import {
  ArrowUpRight,
  CalendarPlus,
  Check,
  Loader2,
  MessageSquare,
  TicketCheck,
  X,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { openChat } from "@/components/site/ChatWidget";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({
    meta: [{ title: "My dashboard — Sydney's Consulting & General Services" }],
  }),
  component: DashboardPage,
});

const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-emerald-100 text-emerald-800",
  Completed: "bg-blue-100 text-blue-800",
  Cancelled: "bg-red-100 text-red-800",
  Open: "bg-amber-100 text-amber-800",
  "In progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-emerald-100 text-emerald-800",
};

function StatusPill({ status }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${
        STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const [appointments, setAppointments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const [appt, tix] = await Promise.all([
      base44.entities.Appointment.filter(
        { created_by_id: user.id },
        { sort: "-created_date", limit: 20 },
      ),
      base44.entities.Ticket.filter(
        { created_by_id: user.id },
        { sort: "-created_date", limit: 20 },
      ),
    ]);
    setAppointments(appt?.items ?? (Array.isArray(appt) ? appt : []));
    setTickets(tix?.items ?? (Array.isArray(tix) ? tix : []));
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await load();
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const cancel = async (id) => {
    setBusyId(id);
    try {
      await base44.entities.Appointment.update(id, { status: "Cancelled" });
      await load();
    } finally {
      setBusyId(null);
    }
  };

  const firstName = (user?.full_name || "there").split(" ")[0];

  return (
    <main className="py-12 md:py-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand">
              Client dashboard
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-light leading-tight tracking-[-0.03em] text-ink">
              Good day, {firstName}.
            </h1>
            <p className="mt-2 text-[13.5px] text-slate">
              Your appointments, tickets and quick actions in one place.
            </p>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 self-start rounded-full bg-brand px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-brand-deep"
          >
            <CalendarPlus className="h-4 w-4" />
            New appointment
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Appointments", value: appointments.length, note: "on your account" },
            { label: "Open tickets", value: tickets.filter((t) => t.status !== "Resolved").length, note: "awaiting resolution" },
            { label: "Next visit", value: appointments.find((a) => a.status !== "Cancelled")?.time_slot ?? "—", note: appointments.find((a) => a.status !== "Cancelled")?.preferred_date ? format(parseISO(appointments.find((a) => a.status !== "Cancelled").preferred_date), "d MMM") : "nothing booked" },
            { label: "Support", value: "9–5", note: "Mon to Fri" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-ink/10 bg-bone p-5"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate/60">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-2xl text-ink">{stat.value}</p>
              <p className="mt-0.5 text-[11px] text-slate/70">{stat.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={openChat}
            className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand/30"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
              <MessageSquare className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[12.5px] font-medium text-ink">Live chat</span>
              <span className="block text-[11px] text-slate/70">Ask the desk anything</span>
            </span>
          </button>
          <Link
            to="/support"
            className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
              <TicketCheck className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[12.5px] font-medium text-ink">Track a ticket</span>
              <span className="block text-[11px] text-slate/70">Reference + email</span>
            </span>
          </Link>
          <a
            href={SITE.phoneHref}
            className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[12.5px] font-medium text-ink">Call the office</span>
              <span className="block font-mono text-[10.5px] text-slate/70">{SITE.phone}</span>
            </span>
          </a>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Your appointments</h2>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate/50">
              Latest 20
            </span>
          </div>

          {loading ? (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-ink/10 bg-bone p-6 text-[12.5px] text-slate">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading your appointments…
            </div>
          ) : appointments.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-ink/15 bg-bone p-8 text-center">
              <p className="text-[13px] text-slate">No appointments on this account yet.</p>
              <Link
                to="/book"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-brand"
              >
                Book your first appointment
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-bone">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex flex-col gap-3 border-b border-ink/10 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-medium text-ink">
                        {appt.service_name}
                      </p>
                      <StatusPill status={appt.status} />
                    </div>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-slate/60">
                      {appt.reference} ·{" "}
                      {appt.preferred_date
                        ? format(parseISO(appt.preferred_date), "EEE d MMM yyyy")
                        : "date pending"}{" "}
                      · {appt.time_slot} · {appt.mode}
                    </p>
                  </div>
                  {appt.status !== "Cancelled" && appt.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() => cancel(appt.id)}
                      disabled={busyId === appt.id}
                      className="inline-flex items-center gap-1.5 self-start rounded-full border border-ink/15 px-3.5 py-2 text-[11.5px] text-slate transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                    >
                      {busyId === appt.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Your tickets</h2>
            <Link
              to="/support"
              className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-brand"
            >
              Open a ticket
            </Link>
          </div>

          {loading ? (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-ink/10 bg-bone p-6 text-[12.5px] text-slate">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading your tickets…
            </div>
          ) : tickets.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-ink/15 bg-bone p-8 text-center">
              <p className="text-[13px] text-slate">
                No tickets yet. Log one and it will appear here with its status.
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-bone">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col gap-2 border-b border-ink/10 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-medium text-ink">{ticket.subject}</p>
                      <StatusPill status={ticket.status} />
                      <span className="rounded-full bg-ink/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-slate/70">
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-slate/60">
                      {ticket.reference} ·{" "}
                      {ticket.created_date
                        ? format(parseISO(ticket.created_date), "d MMM yyyy")
                        : ""}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] text-slate/60">
                    <Check className="h-3.5 w-3.5 text-brand/60" />
                    {ticket.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="mt-8 text-[11.5px] leading-relaxed text-slate/60">
          Appointments booked while signed in appear here automatically. If you booked as a
          guest, quote your reference when you call the desk and we will attach it to your
          account.
        </p>
      </div>
    </main>
  );
}