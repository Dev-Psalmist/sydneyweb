export const SERVICES = [
  {
    id: "cac",
    name: "CAC Registration",
    seal: "CAC",
    kicker: "Corporate Affairs Commission",
    type: "serif",
    summary:
      "Company incorporation, business names and every post-incorporation filing — prepared, filed and followed through to certificate.",
    items: [
      "Name reservation and availability search",
      "Incorporation — LTD, PLC and LLP",
      "Business name registration",
      "Post-incorporation filings and annual returns",
    ],
    turnaround: "3 – 7 working days",
  },
  {
    id: "pencom",
    name: "PENCOM Compliance",
    seal: "PENCOM",
    kicker: "National Pension Commission",
    type: "grotesk",
    summary:
      "Employer registration and pension compliance certificates, kept current so your bids and contracts never stall.",
    items: [
      "Employer registration and employee PINs",
      "Monthly contribution schedules",
      "Compliance certificate issuance and renewal",
      "Arrears reconciliation",
    ],
    turnaround: "5 – 10 working days",
  },
  {
    id: "nsitf",
    name: "NSITF",
    seal: "NSITF",
    kicker: "Employee Compensation Scheme",
    type: "mono",
    summary:
      "Employee Compensation Scheme registration and contributions, with the certificate your tender documents ask for.",
    items: [
      "Employer registration under the ECS",
      "Monthly employee contributions",
      "Compliance certificate",
      "Claims and incident documentation",
    ],
    turnaround: "5 – 10 working days",
  },
  {
    id: "itf",
    name: "ITF Contribution",
    seal: "ITF",
    kicker: "Industrial Training Fund",
    type: "editorial",
    summary:
      "Industrial Training Fund registration, annual contributions and the certificate that keeps you eligible to bid.",
    items: [
      "Employer registration and profiling",
      "Annual contribution filing",
      "ITF compliance certificate",
      "Training reimbursement guidance",
    ],
    turnaround: "5 – 10 working days",
  },
  {
    id: "bpp",
    name: "BPP / IRR",
    seal: "BPP",
    kicker: "Bureau of Public Procurement",
    type: "grotesk",
    summary:
      "Federal contractor registration and the Interim Registration Report that opens the door to public contracts.",
    items: [
      "Contractor registration on the BPP portal",
      "Interim Registration Report (IRR)",
      "Document assembly and verification",
      "Renewal and database updates",
    ],
    turnaround: "7 – 14 working days",
  },
  {
    id: "scuml",
    name: "SCUML",
    seal: "SCUML",
    kicker: "EFCC · Anti-money laundering",
    type: "serif",
    summary:
      "Registration with the Special Control Unit Against Money Laundering — required for designated non-financial businesses.",
    items: [
      "SCUML registration and certificate",
      "Designated business category review",
      "Bank and tender documentation support",
      "Renewal and update filings",
    ],
    turnaround: "7 – 21 working days",
  },
  {
    id: "dpr",
    name: "DPR Permits",
    seal: "DPR",
    kicker: "Petroleum regulatory permits",
    type: "editorial",
    summary:
      "Oil and gas service company registration and petroleum permits, including migration to current regulator requirements.",
    items: [
      "Oil service company registration",
      "DPR / NUPRC permit applications",
      "Facility and equipment documentation",
      "Permit renewal and variations",
    ],
    turnaround: "14 – 30 working days",
  },
  {
    id: "nitda",
    name: "NITDA",
    seal: "NITDA",
    kicker: "Data protection & IT services",
    type: "mono",
    summary:
      "Registration with the National Information Technology Development Agency, including data protection compliance.",
    items: [
      "NITDA registration for IT service providers",
      "Data protection compliance documentation",
      "Data audit readiness",
      "Renewal and advisory",
    ],
    turnaround: "10 – 20 working days",
  },
  {
    id: "nepc",
    name: "NEPC Export",
    seal: "NEPC",
    kicker: "Export promotion council",
    type: "grotesk",
    summary:
      "Exporter registration and export certificates for businesses moving goods and services across borders.",
    items: [
      "Exporter registration",
      "Export certificate processing",
      "Product documentation guidance",
      "Renewal and updates",
    ],
    turnaround: "5 – 12 working days",
  },
  {
    id: "tax",
    name: "Tax Clearance",
    seal: "TCC",
    kicker: "FIRS & state revenue",
    type: "editorial",
    summary:
      "Tax identification, filings and clearance certificates — the single document most tenders will ask for first.",
    items: [
      "TIN registration and verification",
      "Company and personal tax filings",
      "Tax Clearance Certificate (TCC)",
      "Backlog and waiver advisory",
    ],
    turnaround: "3 – 10 working days",
  },
  {
    id: "contracts",
    name: "General Contracts",
    seal: "GCS",
    kicker: "Procurement & advisory",
    type: "serif",
    summary:
      "Contract documentation, bid packaging and advisory support for companies pursuing public and private work.",
    items: [
      "Bid and tender document packaging",
      "Contract drafting and review",
      "Compliance file assembly",
      "Ongoing advisory retainer",
    ],
    turnaround: "Scoped per engagement",
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => ({ value: s.id, label: s.name }));

export function findService(id) {
  return SERVICES.find((s) => s.id === id) ?? null;
}