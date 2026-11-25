import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { format, parseISO } from "date-fns";
import { Loader2, Search } from "lucide-react";
import { lookupTicket } from "@/lib/server-fns";

const STATUS_STYLES = {
  Open: "bg-amber-100 text-amber-800",
  "In progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-emerald-100 text-emerald-800",
};

const PRIORITY_STYLES = {
  Low: "bg-slate-100 text-slate-700",
  Normal: "bg-sky-100 text-sky-800",
  High: "bg-amber-100 text-amber-800",
  Urgent: "bg-red-100 text-red-800",
};

const inputClass =
  "h-11 w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 text-[13px] text-ink outline-none transition-colors placeholder:text-slate/40 focus:border-brand/50 focus:bg-white";

export default function TrackTicket() {
  const [form, setForm] = useState({ reference: "", email: "" });
  const [ticket, setTicket] = useState(null);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lookup = useServerFn(lookupTicket);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.reference.trim() || !form.email.trim()) {
      setError("Enter both the reference and the email used on the ticket.");
      return;
    }
    setError("");
    setBusy(true);
    setSearched(false);
    try {
      const res = await lookup({ data: form });
      setTicket(res?.ticket ?? null);
      setSearched(true);
    } catch {
      setError("Lookup failed. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-[26px] border border-ink/10 bg-bone p-6 md:p-7">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brand">
        Track a ticket
      </p>
      <h3 className="mt-3 font-display text-xl text-ink">Where is my request?</h3>
      <p className="mt-2 text-[12.5px] leading-relaxed text-slate">
        Enter the reference from your confirmation and the email you used. Only that pair
        can open a ticket.
      </p>

      <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          value={form.reference}
          onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value.toUpperCase() }))}
          placeholder="TK-XXXXXXXX"
          className={`${inputClass} font-mono uppercase tracking-[0.08em]`}
          maxLength={40}
        />
        <input
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@company.com"
          type="email"
          className={inputClass}
          maxLength={160}
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-[12.5px] font-medium text-white transition-colors hover:bg-brand disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Track
        </button>
      </form>

      {error && <p className="mt-3 text-[12px] text-red-600">{error}</p>}

      {searched && !ticket && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800">
          No ticket matches that reference and email. Check the reference on your
          confirmation, or call the desk.
        </p>
      )}

      {ticket && (
        <div className="mt-5 rounded-2xl border border-ink/10 bg-white p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] ${
                STATUS_STYLES[ticket.status] ?? "bg-slate-100 text-slate-700"
              }`}
            >
              {ticket.status}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] ${
                PRIORITY_STYLES[ticket.priority] ?? "bg-slate-100 text-slate-700"
              }`}
            >
              {ticket.priority} priority
            </span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-slate/60">
              {ticket.reference}
            </span>
          </div>

          <h4 className="mt-3 font-display text-lg text-ink">{ticket.subject}</h4>
          <p className="mt-2 whitespace-pre-line text-[12.5px] leading-relaxed text-slate">
            {ticket.message}
          </p>
          {ticket.created_date && (
            <p className="mt-3 border-t border-ink/10 pt-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-slate/50">
              Logged {format(parseISO(ticket.created_date), "d MMM yyyy · HH:mm")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}