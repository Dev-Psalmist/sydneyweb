export const SITE = {
  name: "Sydney's Consulting & General Services",
  shortName: "Sydney's",
  descriptor: "Consulting & General Services",
  tagline: "Corporate compliance & advisory, Abuja",
  phone: "+234 706 784 2575",
  phoneHref: "tel:+2347067842575",
  email: "sydneysconsultingltd@gmail.com",
  instagram: "https://www.instagram.com/sydneys_consulting",
  address: "No 9 Port Harcourt Crescent, Area 11, Garki, Abuja",
  addressLines: ["No 9 Port Harcourt Crescent", "Area 11, Garki — Abuja"],
  hours: "Mon – Fri · 9:00 – 17:00",
  hoursNote: "Saturdays by appointment",
  mapQuery: "No 9 Port Harcourt Crescent, Area 11, Garki, Abuja, Nigeria",
  logo: "https://media.base44.com/images/public/user_6b05ede4444a63279ef926d6/da55af015cd0f5688128280afddf7435_sydneyLogo.jpg",
  ceoName: "Chimaobi Okparaeke",
  ceoTitle: "Chief Executive Officer",
  ceoPhoto:
    "https://media.base44.com/images/public/user_6b05ede4444a63279ef926d6/cd43361f5b2255a6c7060bf6937d46d7_CEO.JPG",
};

const q = encodeURIComponent(SITE.mapQuery);

export const MAPS_EMBED = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`;
export const MAPS_PLACE = `https://www.google.com/maps/search/?api=1&query=${q}`;

export const AGENCIES = [
  "CAC",
  "PENCOM",
  "NSITF",
  "ITF",
  "BPP",
  "SCUML",
  "DPR",
  "NITDA",
  "NEPC",
  "Tax clearance",
];