/**
 * NFNSP-2 implementation partnership — source-tagged copy for the
 * Department of Agriculture partner workspace.
 * Figures from NFNSP-2 Draft 2.2 (July 2026) / Results Framework 27 Aug 2026
 * unless labelled as Group plan / programme-reported / internal.
 */

export const NFNSP = {
  kicker: "PARTNER PORTAL · CONFIDENTIAL · NFNSP-2",
  title: "Implementation partnership",
  subtitle: "Operationalising the National Food and Nutrition Security Plan · 2027–2037",
  pdfHref: "/partners/BigFive_NFNSP_Implementation_Partnership_Proposal.pdf",
  pdfLabel: "Download proposal (PDF) · September 2026 · v1.0",
  pdfVersion: "v1.0 · September 2026",
  website: "https://www.nda.gov.za/",
  honestyLine:
    "Programme-reported meals to date are in the hundreds of thousands (355 000 on the Group site, programme-reported), not millions. The 2.5 million children-per-day NSNP figure is a DBE-pathway plan, not a current daily headcount.",
  stats: [
    {
      value: "22.2%",
      label: "Households with inadequate or severely inadequate food access",
      source: "GHS 2024, as cited in NFNSP-2",
    },
    {
      value: "~29%",
      label: "Children under five stunted",
      source: "NFNSS 2023 (Framework working baseline 27%; severe 15%)",
    },
    {
      value: "17.6%",
      label: "People below the food poverty line of R777 pp/pm (2023 prices)",
      source: "Poverty Trends 2025, as cited in the Plan",
    },
    {
      value: "10% / 20% / 30%",
      label: "Smallholder share of government food procurement",
      source: "Plan targets by 2029 / 2033 / 2037",
    },
  ],
  ghsWorst: [
    { province: "Northern Cape", value: "34.3%" },
    { province: "Eastern Cape", value: "31.2%" },
    { province: "North West", value: "30%" },
  ],
  offers: [
    {
      id: "plate",
      kicker: "01 · PLATE",
      title: "Big Five Foods™",
      desc: "Fortified ambient meals — porridge, soya, OnePot, soups — one SKU family for NSNP, ECD, CNDC and holiday packs. 5 kg institutional formats.",
    },
    {
      id: "chain",
      kicker: "02 · CHAIN",
      title: "SupplierAdvisor®",
      desc: "Farm-to-fork operating system: verified network, lots, invoices, HACCP holds, GL. The trade and quality layer BAS and LOGIS do not have.",
    },
    {
      id: "node",
      kicker: "03 · NODE",
      title: "Direct / SANTACO",
      desc: "Container and micro-hub spec for an IDP / DDM One Plan — taxi-rank and rural nodes. Pathway design, not a live national fleet.",
    },
    {
      id: "mandate",
      kicker: "04 · MANDATE",
      title: "24-month KZN demonstration",
      desc: "Two local municipalities + one metro cluster. Scale only after a closed circuit holds. Second province after the Plan’s own high-inadequacy reference.",
    },
  ],
  execSummary: [
    "The National Food and Nutrition Security Plan 2027–2037 asks the private sector to help operationalise Goals 1–3 and Enablers A–C — plates, producers, municipal markets, and proof.",
    "Big Five Group proposes an implementation partnership: Foods as the institutional meal, SupplierAdvisor® as the farm-to-fork OS, Direct nodes as last-mile markets, and a 24-month KwaZulu-Natal demonstration before any national scale claim.",
    "This workspace is a partner briefing of a confidential proposal. It is not a government publication, not an awarded tender, and not a claim of current NSNP daily headcount.",
  ],
  whyNow: [
    {
      t: "Access is not improving fast enough",
      d: "GHS 2024: 22.2% of households have inadequate or severely inadequate food access. Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%.",
      source: "GHS 2024, as cited in NFNSP-2",
    },
    {
      t: "Stunting remains a first-1 000-days crisis",
      d: "NFNSS 2023: about 29% of children under five stunted; 15% severely stunted. Framework working baseline: 27%. Complementary feeding target: 50% of high-risk areas by 2029.",
      source: "NFNSS 2023 · Framework 27 Aug 2026",
    },
    {
      t: "Poverty is young",
      d: "Poverty Trends 2025: 17.6% of people below the food poverty line of R777 per person per month (2023 prices). 71% of the poor in 2023 were under 35.",
      source: "Poverty Trends 2025, as cited in the Plan",
    },
    {
      t: "Procurement must reach smallholders",
      d: "Plan targets: 10% (2029) / 20% (2033) / 30% (2037) smallholder share of government food procurement. That target only survives PFMA if lots, invoices and identity are real.",
      source: "NFNSP-2 procurement horizons",
    },
  ],
  readingThePlan: [
    "NFNSP-2 Draft 2.2 (July 2026) and the Results Framework of 27 August 2026 are the source documents. This briefing does not replace them.",
    "The 27 August 2026 Framework is written for private-sector round tables and municipal roadshows. The 90-day ask is a seat at those tables — not a claim that they have already been held with Big Five.",
    "Where this page cites official statistics, the source is labelled. Where it cites Group figures, the label is plan, programme-reported, product specification, or internal comparison.",
  ],
  whoWeAre: [
    "Big Five Group (Pty) Ltd — KwaZulu-Natal. Feed (Foods, Agri, Direct), Educate (Super-Cube®), Empower (SupplierAdvisor®, Foundation, Impact).",
    "Dr. Craig R. Muller, Founder — craig@bigfivegroup.africa · +27 (0) 82 581 4215.",
    "This is a private partner workspace for the NFNSP Technical Working Group / Department of Agriculture. It does not speak for the Department.",
  ],
  foods: {
    intro:
      "One SKU family across NSNP, ECD, CNDC and holiday packs. Ambient, fortified, institutional 5 kg formats where school- or clinic-linked.",
    points: [
      {
        t: "~R1.10 soup / ~R1.30 soya / ~R2.50 OnePot per meal",
        label: "Institutional cost points, approximate",
      },
      { t: "~50% below wholesale/retail", label: "Internal cost comparison" },
      { t: "24-month ambient shelf life", label: "Product specification" },
      {
        t: "74% more nutrition / 185% more fortification",
        label: "Formulation / design claims; lab pack in first 90 days",
      },
      {
        t: "ISO 9001, FSSC 22000, Sedex, SANHA Halaal, Kosher, SAAFoST",
        label: "As published on bigfivegroup.africa/foods",
      },
    ],
  },
  os: {
    headline: "SupplierAdvisor® as the farm-to-fork ERP",
    sub: "Written for a DG / Treasury reader. One workspace: network, buy, make, hold, ship, pay, prove.",
    nonClaim:
      "SupplierAdvisor® does not replace BAS or LOGIS. It is the trade and quality layer those systems do not have.",
    modules: [
      "Verified network + OTIFEF",
      "POs, invoices, lot holds",
      "Inventory",
      "BOM / MPS / MRP",
      "GPS shipping",
      "HACCP holds that stop ship",
      "SHEQ",
      "SchoolAdvisor",
      "ContainerAdvisor®",
      "Full GL / AR / AP / VAT",
      "Live bank feeds on selected banks including the FNB Integration Channel and BankLink open-banking",
      "Last-mile Yoco-class acceptance",
    ],
    actors: [
      { actor: "Smallholder", role: "Identity, GPS, lots, invoices so the 10% target survives PFMA." },
      { actor: "Aggregation hub", role: "Receive, grade, lot, hold." },
      { actor: "Foods mill", role: "BOM, MPS, MRP, HACCP, ship-or-hold." },
      { actor: "Trader / distributor", role: "OTIFEF, inventory, invoices." },
      { actor: "School / ECD / CNDC", role: "SchoolAdvisor gates. Lot-and-kitchen proof. No learner names." },
      { actor: "Municipality / Treasury", role: "SLA, IDP/SDBIP annex, PFMA/MFMA workstream." },
      { actor: "Bank / CSI / DFI", role: "FNB Integration Channel and BankLink feeds where selected." },
    ],
  },
  alignment: [
    { goal: "Goal 1", d: "Reduce hunger — plates that can be bought lawfully and proved." },
    { goal: "Goal 2", d: "Scale nutrition for the first 1 000 days and school feeding." },
    { goal: "Goal 3", d: "Inclusive food systems — smallholder share of public procurement." },
    { goal: "Enabler A", d: "Governance and coordination — TWG, round tables, municipal roadshows." },
    { goal: "Enabler B", d: "Data and MELIA — extracts inside MELIA, not beside it." },
    { goal: "Enabler C", d: "Finance and procurement — PFMA/MFMA path for an ambient meal and a smallholder lot." },
  ],
  horizons: [
    { year: "2029", smallholder: "10%", feeding: "Complementary feeding in 50% of high-risk areas" },
    { year: "2033", smallholder: "20%", feeding: "Scale only after closed-circuit demonstration" },
    { year: "2037", smallholder: "30%", feeding: "National pathway — not a current claim" },
  ],
  workstreams: [
    {
      id: "A",
      title: "Plates",
      d: "One SKU family across NSNP, ECD, CNDC and holiday packs. 5 kg institutional packs.",
    },
    {
      id: "B",
      title: "Markets",
      d: "Costed container / micro-hub spec for an IDP / DDM One Plan. SANTACO rank + rural nodes.",
    },
    {
      id: "C",
      title: "Producers",
      d: "SupplierAdvisor® identity, GPS, lots, invoices so the 10% target survives PFMA.",
    },
    {
      id: "D",
      title: "Agency",
      d: "5-minute porridge / 20-minute OnePot; school-environment support; 6–23 month complementary feeding. Super-Cube® for implementers.",
    },
    {
      id: "E",
      title: "Operating system",
      d: "Onboarding, FNB/BankLink feeds, SchoolAdvisor gates, POPIA MELIA extract. Lot-and-kitchen proof. No learner names.",
    },
  ],
  demonstration: {
    phase1:
      "Two KZN local municipalities + one metro cluster (rural Zululand-type, peri-urban, dense informal-trade node in eThekwini or Msunduzi).",
    phase2:
      "A second high-inadequacy province (Eastern Cape is the Plan’s own reference).",
    rule: "Scale only after a closed circuit holds.",
  },
  commercial: [
    {
      t: "355 000 meals",
      label: "Programme-reported, not audited public stats",
    },
    {
      t: "2.5 million children per day",
      label: "DBE-pathway delivery plan, not current headcount",
    },
    {
      t: "15 000 SANTACO containers",
      label: "Pathway design",
    },
    {
      t: "~20 jobs per mature node",
      label: "Design intent, to be measured",
    },
    {
      t: "10% of group profits to Foundation",
      label: "Standing Group policy",
    },
  ],
  risks: [
    {
      risk: "Presented as an awarded NSNP contract",
      mitigation: "This briefing is a proposal. No government contract is claimed.",
    },
    {
      risk: "2.5 million daily meals read as current",
      mitigation: "Labelled as DBE-pathway plan, not current headcount.",
    },
    {
      risk: "BAS/LOGIS replacement fear",
      mitigation: "Explicit non-claim: SupplierAdvisor® does not replace BAS or LOGIS.",
    },
    {
      risk: "Learner data in MELIA extract",
      mitigation: "Lot-and-kitchen proof only. No learner names. POPIA purpose-limited.",
    },
    {
      risk: "PFMA/MFMA cannot buy the meal",
      mitigation: "90-day time-boxed legal workstream is ask 3 — before scale.",
    },
  ],
  asks: [
    {
      n: "01",
      t: "Closed technical briefing",
      d: "NFNSP TWG, DoA secretariat, DBE NSNP, DoH nutrition, DSD food-centre / ECD nutrition, KZN Provincial Treasury, SALGA KZN.",
    },
    {
      n: "02",
      t: "Name KwaZulu-Natal",
      d: "Joint demonstration province — two local municipalities + one metro cluster.",
    },
    {
      n: "03",
      t: "PFMA / MFMA workstream",
      d: "Time-boxed: how a fortified ambient meal and a smallholder-linked lot can be bought lawfully — and which rule the 2029 10% target actually requires.",
    },
    {
      n: "04",
      t: "Data protocol",
      d: "SupplierAdvisor® extracts sit inside MELIA, not beside it. No learner names.",
    },
    {
      n: "05",
      t: "A seat at the tables",
      d: "Private-sector round tables / municipal roadshows the 27 August 2026 Framework is written for.",
    },
  ],
  inReturn: [
    "Costed node pack",
    "Three-menu institutional basket vs a reference school meal",
    "Producer-onboarding protocol",
    "Draft municipal SLA for an IDP/SDBIP annex",
    "One-page risk register",
  ],
  conclusion: [
    "The Plan has the targets. The Group has plates, an OS, and a demonstration design.",
    "What is asked in 90 days is a closed briefing, a named province, a lawful buying path, a MELIA protocol, and a seat at the tables already written into the Framework.",
    "Nothing here is an awarded tender, a current daily NSNP headcount, or a replacement for BAS or LOGIS.",
  ],
  spheres: [
    { value: "national", label: "National" },
    { value: "provincial", label: "Provincial" },
    { value: "municipal", label: "Municipal" },
    { value: "other", label: "Other" },
  ],
} as const;

export const NFNSP_PROPOSAL_NAV = [
  { href: "#exec-summary", n: "01", label: "Executive summary" },
  { href: "#why-now", n: "02", label: "Why now" },
  { href: "#reading-the-plan", n: "03", label: "Reading the Plan" },
  { href: "#who-we-are", n: "04", label: "Who we are" },
  { href: "#foods", n: "05", label: "Big Five Foods" },
  { href: "#os", n: "06", label: "Farm-to-fork OS" },
  { href: "#alignment", n: "07", label: "Goals & enablers" },
  { href: "#workstreams", n: "08", label: "Five workstreams" },
  { href: "#demonstration", n: "09", label: "Demonstration design" },
  { href: "#commercial", n: "10", label: "Commercial model" },
  { href: "#governance", n: "11", label: "Governance and risk" },
  { href: "#ask", n: "12", label: "90-day ask" },
  { href: "#conclusion", n: "13", label: "Conclusion" },
] as const;
