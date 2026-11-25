import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/home/Hero";
import AgencyStrip from "@/components/home/AgencyStrip";
import ServicesSection from "@/components/home/ServicesSection";
import QuickAccess from "@/components/home/QuickAccess";
import AudiencesSection from "@/components/home/AudiencesSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import ApproachSection from "@/components/home/ApproachSection";
import CareSection from "@/components/home/CareSection";
import MapSection from "@/components/home/MapSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      {
        title:
          "Sydney's Consulting & General Services — Corporate Compliance, Abuja",
      },
      {
        name: "description",
        content:
          "CAC registration, PENCOM, NSITF, ITF, BPP/IRR, SCUML, DPR, NITDA, NEPC certifications, tax clearance and general contracts — handled end to end from Garki, Abuja.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Hero />
      <AgencyStrip />
      <ServicesSection />
      <QuickAccess />
      <AudiencesSection />
      <LeadershipSection />
      <ApproachSection />
      <CareSection />
      <MapSection />
      <TestimonialsSection />
    </main>
  );
}