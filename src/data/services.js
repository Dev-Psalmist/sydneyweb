export const SERVICES = [
  {
    id: "cac",
    logo: "https://www.cac.gov.ng/logo.svg",
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
    logo: "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/PenCom.jpg",
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
    logo: "https://nisi.nsitf.gov.ng/static/nsitf_logo/nsitf_logo.png",
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
    logo: "https://www.itf.gov.ng/logo_5.jpeg",
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
    logo: "https://pcoms.bpp.gov.ng/attachment/cf6a7a35-52b3-4bba-a763-1450d7ac7f19",
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
    logo: "https://scumlportal.efcc.gov.ng/assets/images/brand/EFCC%20-%20Logo.png",
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
    logo: "https://elps.nuprc.gov.ng/Content/assets/img/nuprc.png",
    name: "DPR Permits",
    seal: "DPR",
    kicker: "NUPRC · successor to DPR",
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
    logo: "https://we-gov.org/wp-content/uploads/2019/02/Nitda_Nigeria_Logo_Final.png",
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
    logo: "https://pbs.twimg.com/profile_images/1494592071822422068/yBftbSCL.png",
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
    logo: "https://pbs.twimg.com/profile_images/2006499685482008576/zjEcbGlS.jpg",
    name: "Tax Clearance",
    seal: "TCC",
    kicker: "Nigeria Revenue Service (NRS)",
    type: "editorial",
    summary:
      "Tax identification, filings and Tax Clearance Certificates (TCC) through Nigeria’s current revenue administration framework.",
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