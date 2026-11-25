import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  Loader2,
  MapPin,
  Phone as PhoneIcon,
  Video,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { SERVICES, findService } from "@/data/services";
import { SITE } from "@/data/site";

const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30"];
const MODES = [
  { value: "In-office", label: "In-office", icon: MapPin },
  { value: "Virtual", label: "Virtual", icon: Video },
  { value: "Phone", label: "Phone call", icon: PhoneIcon },
];
const TYPES = [
  "New business owner",
  "Established company",
  "Government contractor",
  "Individual",
];

function makeReference() {
  const raw =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  return `SC-${raw.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()}`;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate/70">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-red-600">{error}</span>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 text-[13px] text-ink outline-none transition-colors placeholder:text-slate/40 focus:border-brand/50 focus:bg-white";

export default function BookingForm({ initialService }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    service_id: initialService && findService(initialService) ? initialService : SERVICES[0].id,
    preferred_date: "",
    time_slot: "",
    mode: "In-office",
    client_type: "Established company",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [booking, setBooking] = useState(null);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (form.full_name.trim().length < 2) next.full_name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a reachable phone number.";
    if (!form.preferred_date) next.preferred_date = "Choose a preferred date.";
    else if (minDate && form.preferred_date < minDate)
      next.preferred_date = "Choose today or a later date.";
    if (!form.time_slot) next.time_slot = "Select a time slot.";
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    const service = findService(form.service_id);

    try {
      const record = await base44.entities.Appointment.create({
        reference: makeReference(),
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        service_id: form.service_id,
        service_name: service?.name ?? "General enquiry",
        preferred_date: form.preferred_date,
        time_slot: form.time_slot,
        mode: form.mode,
        client_type: form.client_type,
        notes: form.notes.trim(),
        status: "Pending",
      });
      setBooking(record);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done" && booking) {
    return (
      <div className="glass rounded-[26px] p-7 md:p-9">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
          <Check className="h-5 w-5" />
        </span>
        <h2 className="mt-5 font-display text-[26px] font-light text-ink">
          Your slot is requested.
        </h2>
        <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-slate">
          We&rsquo;ll confirm by phone or email within one business day. Keep the
          reference below — you can quote it when you call.
        </p>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-white/70 p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-slate/60">
            Booking reference
          </p>
          <p className="mt-1 font-mono text-lg tracking-[0.08em] text-brand-deep">
            {booking.reference}
          </p>
          <dl className="mt-4 grid gap-3 border-t border-ink/10 pt-4 text-[12.5px] sm:grid-cols-2">
            <div>
              <dt className="text-slate/60">Service</dt>
              <dd className="mt-0.5 text-ink">{booking.service_name}</dd>
            </div>
            <div>
              <dt className="text-slate/60">Date &amp; time</dt>
              <dd className="mt-0.5 text-ink">
                {format(parseISO(booking.preferred_date), "EEE, d MMM yyyy")} ·{" "}
                {booking.time_slot}
              </dd>
            </div>
            <div>
              <dt className="text-slate/60">Format</dt>
              <dd className="mt-0.5 text-ink">{booking.mode}</dd>
            </div>
            <div>
              <dt className="text-slate/60">Status</dt>
              <dd className="mt-0.5 text-ink">{booking.status}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[12.5px] font-medium text-white transition-colors hover:bg-brand"
          >
            Open my dashboard
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              setBooking(null);
              setStatus("idle");
              setForm((f) => ({ ...f, preferred_date: "", time_slot: "", notes: "" }));
            }}
            className="rounded-full border border-ink/15 px-5 py-3 text-[12.5px] font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-[26px] p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-brand">
          <CalendarCheck className="h-4 w-4" />
        </span>
        <p className="text-[13px] font-medium text-ink">Reserve a consultation</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="What do you need?" error={errors.service_id}>
            <div className="relative">
              <select
                value={form.service_id}
                onChange={update("service_id")}
                className={`${inputClass} appearance-none pr-9`}
              >
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate/50">
                ▾
              </span>
            </div>
          </Field>
        </div>

        <Field label="Full name" error={errors.full_name}>
          <input
            value={form.full_name}
            onChange={update("full_name")}
            placeholder="e.g. Adaeze Okonkwo"
            className={inputClass}
          />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input
            value={form.phone}
            onChange={update("phone")}
            placeholder="+234 …"
            inputMode="tel"
            className={inputClass}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Email" error={errors.email}>
            <input
              value={form.email}
              onChange={update("email")}
              type="email"
              placeholder="you@company.com"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Preferred date" error={errors.preferred_date}>
          <input
            value={form.preferred_date}
            onChange={update("preferred_date")}
            type="date"
            min={minDate || undefined}
            className={inputClass}
          />
        </Field>

        <Field label="I am a" error={errors.client_type}>
          <div className="relative">
            <select
              value={form.client_type}
              onChange={update("client_type")}
              className={`${inputClass} appearance-none pr-9`}
            >
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate/50">
              ▾
            </span>
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Time slot" error={errors.time_slot}>
            <div className="flex flex-wrap gap-2">
              {SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, time_slot: slot }))}
                  className={`rounded-full border px-4 py-2 font-mono text-[11.5px] transition-all ${
                    form.time_slot === slot
                      ? "border-brand bg-brand text-white"
                      : "border-ink/15 bg-white/60 text-slate hover:border-brand/40 hover:text-brand"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="How should we meet?">
            <div className="grid grid-cols-3 gap-2">
              {MODES.map((mode) => {
                const Icon = mode.icon;
                const active = form.mode === mode.value;
                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, mode: mode.value }))}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-[11.5px] transition-all ${
                      active
                        ? "border-brand bg-brand/5 text-brand"
                        : "border-ink/15 bg-white/60 text-slate hover:border-brand/30"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Anything we should know? (optional)">
            <textarea
              value={form.notes}
              onChange={update("notes")}
              rows={3}
              placeholder="Company name, documents you already hold, deadlines…"
              className="w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 py-3 text-[13px] text-ink outline-none transition-colors placeholder:text-slate/40 focus:border-brand/50 focus:bg-white"
            />
          </Field>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
          We couldn&rsquo;t save your request. Please try again, or call {SITE.phone}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[13.5px] font-medium text-white transition-all duration-300 hover:bg-brand-deep disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Reserving…
          </>
        ) : (
          <>
            Request this appointment
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-slate/60">
        No payment is taken now. We confirm availability first, then send the scope and
        fee.
      </p>
    </form>
  );
}