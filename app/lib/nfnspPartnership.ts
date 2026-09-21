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
  pdfLabel: "Download proposal (PDF) · September 2026 · v2.0",
  pdfVersion: "v2.0 · September 2026",
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
  execSummaryLead:
    "South Africa has a Plan. What it needs now is an implementation partner that can put a lawful plate on the table, a verified smallholder lot behind that plate, and proof that both happened — without claiming a government contract that has not been awarded.",
  execSummary: [
    "The National Food and Nutrition Security Plan 2027–2037 (NFNSP-2 Draft 2.2, July 2026, and Results Framework 27 August 2026) is the Department of Agriculture’s blueprint for Goals 1–3 and Enablers A–C: reduce hunger; scale nutrition for the first 1 000 days and school feeding; build inclusive food systems with a rising smallholder share of public procurement; and enable that work through governance, data (MELIA), and a lawful finance/procurement path.",
    "The Plan’s own numbers are the case for urgency. GHS 2024: 22.2% of households have inadequate or severely inadequate food access (Northern Cape 34.3%, Eastern Cape 31.2%, North West 30%). NFNSS 2023: about 29% of children under five stunted; 15% severely stunted (Framework working baseline 27%). Poverty Trends 2025: 17.6% of people below the food poverty line of R777 per person per month (2023 prices); 71% of the poor in 2023 were under 35. Plan targets: 10% / 20% / 30% smallholder share of government food procurement by 2029 / 2033 / 2037, and complementary feeding in 50% of high-risk areas by 2029.",
    "Big Five Group (Pty) Ltd proposes to operationalise those goals as one coherent system — not nine disconnected companies. Agri trains and verifies smallholders. Foods turns that grain into fortified ambient meals (porridge, soya, OnePot, soups) in 5 kg institutional formats for NSNP, ECD, CNDC and holiday packs. Direct takes the plate to the last mile (SANTACO-rank and rural nodes — pathway design). Connect (SupplierAdvisor®) is the farm-to-fork operating system: identity, lots, invoices, HACCP holds, GL. Leadership (Super-Cube®) forms the people who run kitchens, hubs and municipal SLAs. Access opens capital pathways. Impact is the PMO. Foundation channels 10% of group profits with proof. Global holds standards when corridors extend.",
    "SupplierAdvisor® does not replace BAS or LOGIS. It is the trade and quality layer those systems do not have. Extracts sit inside MELIA, not beside it. No learner names. No beneficiary databases on this portal.",
    "We ask for 90 days: a closed technical briefing; KwaZulu-Natal named as joint demonstration province (two local municipalities + one metro cluster); a time-boxed PFMA/MFMA workstream; a MELIA data protocol; and a seat at the private-sector round tables the 27 August 2026 Framework is already written for. Scale only after a closed circuit holds. A second high-inadequacy province (Eastern Cape is the Plan’s own reference) is Phase 2 — not a current claim.",
    "This workspace is a confidential partner briefing. It is not a government publication, not an awarded tender, and not a claim of current NSNP daily headcount. Programme-reported meals to date are in the hundreds of thousands (355 000 on the Group site, programme-reported). The 2.5 million children-per-day NSNP figure is a DBE-pathway plan, not a current daily headcount.",
  ],
  planGoals: [
    {
      id: "g1",
      n: "Goal 1",
      title: "Reduce hunger — plates that can be bought and proved",
      problem:
        "GHS 2024: 22.2% of households have inadequate or severely inadequate food access. The worst provinces are Northern Cape 34.3%, Eastern Cape 31.2% and North West 30%. Hunger here is an access and last-mile problem as much as a production problem.",
      source: "GHS 2024, as cited in NFNSP-2",
      planAsks:
        "A meal that institutions can buy lawfully (PFMA/MFMA), that kitchens can cook in minutes, that holds ambient, and that can be proved by lot — not a slogan.",
      weDeliver: [
        "Foods: fortified porridge, soya, OnePot and soups at approximate institutional cost points (~R1.10 soup / ~R1.30 soya / ~R2.50 OnePot per meal). Internal comparison: ~50% below wholesale/retail. 24-month ambient shelf life (product specification).",
        "Direct: last-mile nodes so the plate reaches rank, rural and informal-trade markets. SANTACO 15 000 containers is pathway design, not a live national fleet.",
        "Connect: purchase orders, invoices and lot holds so a school or CNDC can show what was received.",
        "Impact: programme gates so delivery is reported as programme-reported until audited.",
      ],
      pillars: ["Foods", "Direct", "Connect", "Impact"],
    },
    {
      id: "g2",
      n: "Goal 2",
      title: "Scale nutrition — first 1 000 days and school feeding",
      problem:
        "NFNSS 2023: about 29% of children under five stunted; 15% severely stunted. Framework working baseline: 27%. Complementary feeding in 50% of high-risk areas by 2029 is a Plan target, not a Group delivery claim.",
      source: "NFNSS 2023 · Framework 27 Aug 2026",
      planAsks:
        "High-impact nutrition for women, infants and children; NSNP/ECD/CNDC plates that are fortified, fast to cook, and safe; people in kitchens who can run the protocol.",
      weDeliver: [
        "Foods: one SKU family across NSNP, ECD, CNDC and holiday packs. 5 kg institutional formats. 5-minute porridge / 20-minute OnePot. 74% more nutrition / 185% more fortification are formulation/design claims — lab pack in the first 90 days.",
        "Leadership (Super-Cube®): whole-person capability for implementers, school-environment support, and municipal nutrition officers.",
        "Connect / SchoolAdvisor: kitchen gates and lot-and-kitchen proof. No learner names.",
        "Foundation: 10% of group profits (standing Group policy) as a complementary CSI rail — not a substitute for the fiscus.",
      ],
      pillars: ["Foods", "Leadership", "Connect", "Foundation"],
    },
    {
      id: "g3",
      n: "Goal 3",
      title: "Inclusive food systems — smallholder share of public procurement",
      problem:
        "The Plan targets 10% (2029) / 20% (2033) / 30% (2037) smallholder share of government food procurement. That target fails if the smallholder has no identity, no GPS, no lot and no invoice that PFMA can see.",
      source: "NFNSP-2 procurement horizons",
      planAsks:
        "Verified producers, aggregation, a mill that can take a lot, and a buying path that is lawful — not a database of names without trade.",
      weDeliver: [
        "Agri: regenerative onboarding, soil and practice verification, offtake into Foods. Farmers are trained as suppliers, not as beneficiaries of a once-off drop.",
        "Connect (SupplierAdvisor®): identity, GPS, lots, invoices so the 10% target survives PFMA.",
        "Foods mill: BOM, MPS, MRP, HACCP — the lot becomes a plate.",
        "Access: institutional, CSI and DFI pathways that finance real offtake, not workshops.",
        "Direct: local markets so smallholder value is not trapped at the farm gate.",
      ],
      pillars: ["Agri", "Connect", "Foods", "Access", "Direct"],
    },
  ],
  planEnablers: [
    {
      id: "ea",
      n: "Enabler A",
      title: "Governance and coordination",
      planAsks:
        "A multi-department briefing that can actually sit: NFNSP TWG, DoA secretariat, DBE NSNP, DoH nutrition, DSD food-centre / ECD, KZN Treasury, SALGA KZN. Private-sector round tables and municipal roadshows the 27 August 2026 Framework is written for.",
      weDeliver: [
        "Impact as PMO: one programme plan, one risk register, one reporting cadence.",
        "Leadership: Super-Cube® for public servants and implementers so coordination is a skill, not a meeting.",
        "90-day ask 1 and 5: the closed briefing and the seat at tables already in the Framework.",
      ],
      pillars: ["Impact", "Leadership"],
    },
    {
      id: "eb",
      n: "Enabler B",
      title: "Data and MELIA",
      planAsks:
        "Evidence that a plate was produced, held, shipped and received — inside the Plan’s monitoring architecture, not in a parallel dashboard.",
      weDeliver: [
        "SupplierAdvisor® extracts sit inside MELIA, not beside it (90-day ask 4).",
        "Lot-and-kitchen proof only. No learner names. No beneficiary PII on this portal. POPIA purpose-limited.",
        "SchoolAdvisor gates: a kitchen that is not ready does not receive the next lot.",
      ],
      pillars: ["Connect", "Impact"],
    },
    {
      id: "ec",
      n: "Enabler C",
      title: "Finance and procurement",
      planAsks:
        "A time-boxed answer to how a fortified ambient meal and a smallholder-linked lot can be bought lawfully — and which rule the 2029 10% target actually requires.",
      weDeliver: [
        "90-day ask 3: PFMA/MFMA workstream before any scale claim.",
        "Access: capital pathways for verified nodes and producers.",
        "Connect: GL / AR / AP / VAT and selected bank feeds (FNB Integration Channel, BankLink) so money and lots reconcile.",
        "Foundation: 10% of group profits as a complementary rail.",
      ],
      pillars: ["Access", "Connect", "Foundation"],
    },
  ],
  coherenceLead:
    "The Department does not need nine vendors. It needs one circuit that can put a lot on a mill, a plate in a kitchen, and proof in MELIA.",
  coherence: [
    "Agri opens a verified lot. Connect records identity, GPS, invoice and hold. Foods mills the lot into a fortified ambient plate. Direct moves the plate to school, ECD, CNDC, rank and rural node. Leadership forms the people who run the kitchen. Impact reports the delivery as programme-reported until it is audited.",
    "That sequence is one NFNSP delivery — not nine slide decks. SupplierAdvisor® is the spine: the trade and quality layer BAS and LOGIS do not have. Extracts sit inside MELIA. No learner names.",
    "Access finances offtake, not workshops. Foundation channels 10% of group profits with proof — complementary CSI, not a substitute for the fiscus. Global holds standards when a closed KwaZulu-Natal circuit is ready to travel. That is Phase 2, not a current claim.",
  ],
  pillarMatrix: {
    cols: [
      { id: "g1", label: "G1 Hunger" },
      { id: "g2", label: "G2 Nutrition" },
      { id: "g3", label: "G3 Smallholder" },
      { id: "ea", label: "EA Governance" },
      { id: "eb", label: "EB MELIA" },
      { id: "ec", label: "EC Finance" },
    ],
    rows: [
      { name: "Agri", marks: [false, false, true, false, false, false] },
      { name: "Foods", marks: [true, true, true, false, false, false] },
      { name: "Leadership", marks: [false, true, false, true, false, false] },
      { name: "Connect", marks: [true, true, true, false, true, true] },
      { name: "Direct", marks: [true, false, true, false, false, false] },
      { name: "Access", marks: [false, false, true, false, false, true] },
      { name: "Impact", marks: [true, false, false, true, true, false] },
      { name: "Foundation", marks: [false, true, false, false, false, true] },
      { name: "Global", marks: [false, false, false, false, false, false] },
    ],
    note: "Global is held until a closed KZN circuit — not a current scale claim.",
  },
  systemFlow: {
    title: "How the Group works as one circuit",
    steps: [
      {
        n: "01",
        t: "Agri",
        d: "Smallholders onboard with practice, soil and identity. Grain is a lot, not a donation.",
      },
      {
        n: "02",
        t: "Connect",
        d: "SupplierAdvisor® records the lot, the invoice, the hold. BAS/LOGIS stay. This is the trade layer.",
      },
      {
        n: "03",
        t: "Foods",
        d: "The mill turns the lot into a fortified ambient plate — porridge, soya, OnePot, soup.",
      },
      {
        n: "04",
        t: "Direct",
        d: "The plate moves to school, ECD, CNDC, rank and rural node. Pathway design until a circuit is closed.",
      },
      {
        n: "05",
        t: "Leadership + Impact",
        d: "People run the kitchen. The PMO reports honestly — programme-reported until audited.",
      },
    ],
  },
  pillars: [
    {
      slug: "agri",
      mission: "Feed",
      name: "Agri",
      serves:
        "Restores soil and smallholder livelihoods; supplies verified produce into Foods and public-procurement lots.",
      nda: "Goal 3 — the 10% smallholder target has no meaning without producers who can invoice.",
    },
    {
      slug: "foods",
      mission: "Feed",
      name: "Foods",
      serves:
        "Fortified ambient meals at institutional cost points for NSNP, ECD, CNDC and holiday packs.",
      nda: "Goals 1 and 2 — the plate. Certifications as published on bigfivegroup.africa/foods.",
    },
    {
      slug: "leadership",
      mission: "Educate",
      name: "Leadership",
      serves:
        "Super-Cube® whole-person leadership for implementers, kitchen teams and public servants.",
      nda: "Goal 2 agency + Enabler A — programmes fail when people are unformed.",
    },
    {
      slug: "connect",
      mission: "Empower",
      name: "Connect",
      serves:
        "SupplierAdvisor®: verified network, lots, HACCP holds, GL, selected bank feeds. Not BAS/LOGIS.",
      nda: "Goal 3 proof + Enablers B and C — the OS the Plan can actually use.",
    },
    {
      slug: "direct",
      mission: "Empower",
      name: "Direct",
      serves:
        "Last-mile nodes and SANTACO-rank containers so the plate reaches where people already are.",
      nda: "Goal 1 access — 15 000 containers is pathway design, to be measured.",
    },
    {
      slug: "access",
      mission: "Empower",
      name: "Access",
      serves: "Institutional, CSI and DFI pathways that finance offtake, not workshops.",
      nda: "Enabler C — capital behind a lawful buy.",
    },
    {
      slug: "impact",
      mission: "Cross-cutting",
      name: "Impact",
      serves: "PMO: plans, gates, risk register, honest reporting across pillars.",
      nda: "Enabler A — one programme, not nine slide decks.",
    },
    {
      slug: "foundation",
      mission: "Cross-cutting",
      name: "Foundation",
      serves: "10% of group profits (standing policy) with proof on SupplierAdvisor®.",
      nda: "Goal 2 complementary feeding CSI — not a substitute for the fiscus.",
    },
    {
      slug: "global",
      mission: "Empower",
      name: "Global",
      serves: "Corridors and standards when demonstration is ready to travel.",
      nda: "After a closed KZN circuit — not a current scale claim.",
    },
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
  { href: "#plan-goals", n: "04", label: "NDA goals & objectives" },
  { href: "#how-we-deliver", n: "05", label: "How we achieve them" },
  { href: "#pillars", n: "06", label: "Nine pillars · one circuit" },
  { href: "#who-we-are", n: "07", label: "Who we are" },
  { href: "#foods", n: "08", label: "Big Five Foods" },
  { href: "#os", n: "09", label: "Farm-to-fork OS" },
  { href: "#workstreams", n: "10", label: "Five workstreams" },
  { href: "#demonstration", n: "11", label: "Demonstration design" },
  { href: "#commercial", n: "12", label: "Commercial model" },
  { href: "#governance", n: "13", label: "Governance and risk" },
  { href: "#ask", n: "14", label: "90-day ask" },
  { href: "#conclusion", n: "15", label: "Conclusion" },
] as const;
