import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Loader2, TicketCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { SITE } from "@/data/site";

const CATEGORIES = ["Registration", "Certification", "Tax", "Billing", "Other"];
const PRIORITIES = [
  { value: "Low", note: "General enquiry" },
  { value: "Normal", note: "Active filing" },
  { value: "High", note: "Deadline < 5 days" },
  { value: "Urgent", note: "Tender closing" },
];

const inputClass =
  "h-11 w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 text-[13px] text-ink outline-none transition-colors placeholder:text-slate/40 focus:border-brand/50 focus:bg-white";

function makeReference() {
  const raw =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  return `TK-${raw.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()}`;
}

export default function TicketForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    category: "Registration",
    priority: "Normal",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [ticket, setTicket] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (form.full_name.trim().length < 2) next.full_name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.subject.trim().length < 4) next.subject = "Add a short subject.";
    if (form.message.trim().length < 12) next.message = "Tell us a little more (12+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const record = await base44.entities.Ticket.create({
        reference: makeReference(),
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        category: form.category,
        priority: form.priority,
        subject: form.subject.trim(),
        message: form.message.trim(),
        status: "Open",
      });
      setTicket(record);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done" && ticket) {
    return (
      <div className="glass rounded-[26px] p-7">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-light text-ink">Ticket logged.</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate">
          Keep this reference — you can track the request any time with it and your email.
        </p>
        <div className="mt-5 rounded-2xl border border-ink/10 bg-white/70 p-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-slate/60">
            Reference
          </p>
          <p className="mt-1 font-mono text-base tracking-[0.08em] text-brand-deep">
            {ticket.reference}
          </p>
          <p className="mt-3 text-[12px] text-slate">
            Priority: <span className="text-ink">{ticket.priority}</span> · Status:{" "}
            <span className="text-ink">{ticket.status}</span>
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="#track"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-brand"
          >
            Track this ticket
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={() => {
              setTicket(null);
              setStatus("idle");
              setForm((f) => ({ ...f, subject: "", message: "" }));
            }}
            className="rounded-full border border-ink/15 px-4 py-2.5 text-[12px] font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            New ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-[26px] p-6 md:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-brand">
          <TicketCheck className="h-4 w-4" />
        </span>
        <p className="text-[13px] font-medium text-ink">Open a support ticket</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
            Full name
          </span>
          <input
            value={form.full_name}
            onChange={update("full_name")}
            className={inputClass}
            placeholder="Your name"
          />
          {errors.full_name && (
            <span className="mt-1 block text-[11px] text-red-600">{errors.full_name}</span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
            Phone (optional)
          </span>
          <input
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
            placeholder="+234 …"
            inputMode="tel"
          />
        </label>

        <div className="sm:col-span-2">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
              Email
            </span>
            <input
              value={form.email}
              onChange={update("email")}
              type="email"
              className={inputClass}
              placeholder="you@company.com"
            />
            {errors.email && (
              <span className="mt-1 block text-[11px] text-red-600">{errors.email}</span>
            )}
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
            Category
          </span>
          <select value={form.category} onChange={update("category")} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
            Priority
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, priority: p.value }))}
                className={`rounded-lg border px-2 py-1.5 text-[11px] transition-all ${
                  form.priority === p.value
                    ? "border-brand bg-brand text-white"
                    : "border-ink/15 bg-white/60 text-slate hover:border-brand/30"
                }`}
              >
                {p.value}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
              Subject
            </span>
            <input
              value={form.subject}
              onChange={update("subject")}
              className={inputClass}
              placeholder="e.g. PENCOM certificate renewal"
            />
            {errors.subject && (
              <span className="mt-1 block text-[11px] text-red-600">{errors.subject}</span>
            )}
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
              How can we help?
            </span>
            <textarea
              value={form.message}
              onChange={update("message")}
              rows={4}
              className="w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 py-3 text-[13px] text-ink outline-none transition-colors placeholder:text-slate/40 focus:border-brand/50 focus:bg-white"
              placeholder="Describe the request, any deadlines, and what you already have…"
            />
            {errors.message && (
              <span className="mt-1 block text-[11px] text-red-600">{errors.message}</span>
            )}
          </label>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
          We couldn&rsquo;t log that ticket. Please try again, or email {SITE.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[13px] font-medium text-white transition-colors hover:bg-brand-deep disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Logging…
          </>
        ) : (
          <>
            Log the ticket
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-slate/60">
        Need it handled today? Call{" "}
        <Link to="/contact" className="text-brand underline-offset-2 hover:underline">
          the desk
        </Link>{" "}
        directly.
      </p>
    </form>
  );
}