import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import MapSection from "@/components/home/MapSection";
import CareSection from "@/components/home/CareSection";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact & directions — Sydney's Consulting & General Services" },
      {
        name: "description",
        content:
          "Visit us at No 9 Port Harcourt Crescent, Area 11, Garki, Abuja. Call +234 706 784 2575, email sydneysconsultingltd@gmail.com, or get live directions.",
      },
    ],
  }),
  component: ContactPage,
});

const DETAILS = [
  { icon: MapPin, label: "Office", value: SITE.address },
  { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, label: "Hours", value: `${SITE.hours} · ${SITE.hoursNote}` },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@sydneys_consulting",
    href: SITE.instagram,
    external: true,
  },
];

function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Come to the desk, or{" "}
            <span className="font-editorial italic text-brand">call us first.</span>
          </>
        }
        description="We are in Area 11, Garki — a short drive from anywhere in central Abuja. For clients elsewhere in Nigeria and abroad, most engagements are handled entirely by phone, email and video."
      />

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {DETAILS.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon className="h-4 w-4 text-brand" />
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-slate/60">
                    {item.label}
                  </p>
                  <p className="mt-1.5 break-words text-[12.5px] leading-relaxed text-ink">
                    {item.value}
                  </p>
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  className="bg-bone p-5 transition-colors hover:bg-white"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="bg-bone p-5">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MapSection />
      <CareSection />
    </main>
  );
}