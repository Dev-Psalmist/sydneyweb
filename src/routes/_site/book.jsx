import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Video } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import BookingForm from "@/components/book/BookingForm";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/_site/book")({
  validateSearch: (search) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book an appointment — Sydney's Consulting & General Services" },
      {
        name: "description",
        content:
          "Reserve a consultation in our Garki, Abuja office or online. Choose your service, date and time, and receive a booking reference.",
      },
    ],
  }),
  component: BookPage,
});

const POINTS = [
  {
    icon: Clock,
    title: "Confirmed within one business day",
    body: "We check the diary, then call or email to confirm your slot — no waiting in the dark.",
  },
  {
    icon: MapPin,
    title: "No 9 Port Harcourt Crescent, Area 11",
    body: "Two minutes from the Area 11 roundabout, with parking on the street.",
  },
  {
    icon: Video,
    title: "Virtual and phone appointments",
    body: "For clients outside Abuja, or anyone who would rather not travel.",
  },
];

function BookPage() {
  const { service } = Route.useSearch();

  return (
    <main>
      <PageHeader
        eyebrow="Appointments"
        title={
          <>
            Book a{" "}
            <span className="font-editorial italic text-brand">consultation.</span>
          </>
        }
        description="Tell us what you need and when suits you. Most first conversations take twenty minutes — enough to scope the work, name the agencies involved and give you a straight answer on timing."
      >
        <div className="rounded-2xl border border-ink/10 bg-white/60 px-5 py-4 backdrop-blur">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-slate/60">
            Prefer to talk now?
          </p>
          <a
            href={SITE.phoneHref}
            className="mt-1 flex items-center gap-2 text-[14px] font-medium text-ink transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4 text-brand" />
            {SITE.phone}
          </a>
        </div>
      </PageHeader>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-tight tracking-[-0.02em] text-ink">
              What happens after you book
            </h2>
            <div className="mt-7 space-y-6">
              {POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/15 bg-brand/5 text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-medium text-ink">{point.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate">
                        {point.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 rounded-2xl border border-ink/10 bg-bone p-5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brand">
                Office hours
              </p>
              <p className="mt-2 text-[13.5px] text-ink">{SITE.hours}</p>
              <p className="mt-1 text-[12.5px] text-slate">{SITE.hoursNote}</p>
            </div>
          </div>

          <div>
            <BookingForm key={service ?? "default"} initialService={service} />
          </div>
        </div>
      </section>
    </main>
  );
}