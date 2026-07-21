/**
 * Investor portal model — ILLUSTRATIVE scenario planning only.
 * Not audited financials, not a prospectus, not a guarantee of results.
 * Assumptions are directional for discussion with authorised investors under NDA.
 *
 * Currency: United States dollars (USD), shown as USD millions / billions.
 * Horizon: “current traction” = near-term operating footprint; scenarios = 5-year
 * and 10-year illustrative annual run-rate revenue potential at stated penetration.
 *
 * Equity ask: 10% of Big Five Group holding company + board seat; use of funds
 * 10% operations / 90% asset acquisition & product development (see INVESTMENT_ASK).
 */

export type ScenarioKey = "conservative" | "moderate" | "aggressive";

export type ScenarioMetrics = {
  /** Illustrative annual revenue potential at year 5 (USDm) */
  y5RevenueUSDm: number;
  /** Illustrative annual revenue potential at year 10 (USDm) */
  y10RevenueUSDm: number;
  penetration: string;
  social: string;
  economic: string;
  environmental: string;
};

export type OpcoInvestorModel = {
  slug: string;
  name: string;
  fullName: string;
  color: string;
  avenue: string;
  /** Where we have traction today */
  currentState: {
    markets: string;
    traction: string[];
    constraints: string;
  };
  /** Future-state narrative at continental scale */
  futureState: string;
  problemsAddressed: string[];
  howWeAddress: string;
  scenarios: Record<ScenarioKey, ScenarioMetrics>;
};

export type AfricaProblem = {
  id: string;
  title: string;
  stats: { value: string; label: string }[];
  narrative: string;
  sources: { label: string; href: string }[];
  opcos: string[];
};

export const SCENARIO_META: Record<
  ScenarioKey,
  { label: string; blurb: string; accent: string }
> = {
  conservative: {
    label: "Conservative",
    blurb: "Disciplined entry · deep proof in priority corridors · slower capital deploy",
    accent: "#64748b",
  },
  moderate: {
    label: "Moderate",
    blurb: "Base case · multi-country scale with institutional programmes and verified trade",
    accent: "#0ea5e9",
  },
  aggressive: {
    label: "Aggressive",
    blurb: "Fast corridor expansion · category leadership in fortification + OS + PMO",
    accent: "#d97706",
  },
};

export const AFRICA_PROBLEMS: AfricaProblem[] = [
  {
    id: "hunger",
    title: "Hunger & food insecurity",
    stats: [
      { value: "307M", label: "People in Africa faced hunger in 2024 (>20% of population)" },
      { value: "~60%", label: "Of people projected undernourished by 2030 could be in Africa" },
      { value: "2.3B", label: "People with moderate or severe food insecurity globally (2024)" },
    ],
    narrative:
      "Hunger is rising in Africa even as some global indicators improve. Climate shocks, conflict, weak logistics and under-investment in regenerative production keep food systems fragile.",
    sources: [
      {
        label: "WHO / FAO / IFAD / UNICEF / WFP — SOFI 2025",
        href: "https://www.who.int/news/item/28-07-2025-global-hunger-declines-but-rises-in-africa-and-western-asia-un-report",
      },
      {
        label: "Global Report on Food Crises",
        href: "https://www.wfp.org/publications/global-report-food-crises-grfc",
      },
    ],
    opcos: ["agri", "foods", "direct", "access", "impact"],
  },
  {
    id: "malnutrition",
    title: "Child malnutrition",
    stats: [
      { value: "62M", label: "Stunted children under 5 in sub-Saharan Africa" },
      { value: "13M", label: "Children with acute malnutrition in Eastern & Southern Africa (UNICEF call)" },
      { value: "45%", label: "Of under-five deaths linked to undernutrition as underlying cause (global framing)" },
    ],
    narrative:
      "Sub-Saharan Africa remains a focus of stunting and micronutrient deficiency. Affordable fortified diets, school feeding and last-mile logistics are structural answers — not one-off campaigns.",
    sources: [
      {
        label: "UNICEF malnutrition data",
        href: "https://data.unicef.org/topic/nutrition/malnutrition/",
      },
      {
        label: "UNICEF/WHO/World Bank Joint Child Malnutrition Estimates",
        href: "https://www.who.int/data/gho/data/themes/topics/joint-child-malnutrition-estimates-unicef-who-wb",
      },
    ],
    opcos: ["foods", "direct", "foundation", "impact"],
  },
  {
    id: "disease",
    title: "Broader disease & health vulnerability",
    stats: [
      { value: "Dual", label: "Infectious disease + rising NCDs stretch systems and households" },
      { value: "Cycle", label: "Illness deepens poverty and hunger; undernutrition worsens outcomes" },
      { value: "Care", label: "Caregivers lose income and food access during chronic or acute illness" },
    ],
    narrative:
      "Communities face a broad disease burden. Clinical care is essential; food security, livelihoods and trusted delivery are complementary infrastructure for household resilience.",
    sources: [
      { label: "WHO African Region", href: "https://www.afro.who.int/" },
      { label: "WHO Global Health Observatory", href: "https://www.who.int/data/gho" },
      { label: "World Bank Health", href: "https://www.worldbank.org/en/topic/health" },
    ],
    opcos: ["foods", "agri", "direct", "leadership", "impact"],
  },
  {
    id: "markets",
    title: "Broken last-mile markets & opaque trade",
    stats: [
      { value: "Leakage", label: "Value and trust leak before help reaches households" },
      { value: "SME gap", label: "Capable suppliers locked out of institutional capital and tenders" },
      { value: "Proof", label: "DFIs and governments need audit trails — not slide-deck claims" },
    ],
    narrative:
      "Without verified trade rails, provenance and professional programme delivery, African excellence struggles to scale. Middlemen, siloed systems and weak PMOs destroy margin and trust.",
    sources: [
      {
        label: "World Bank — Agriculture & Food",
        href: "https://www.worldbank.org/en/topic/agriculture",
      },
      {
        label: "SupplierAdvisor® positioning (operating product)",
        href: "https://www.supplieradvisor.com/",
      },
    ],
    opcos: ["direct", "connect", "access", "global", "impact"],
  },
  {
    id: "leadership",
    title: "Leadership capacity under complexity",
    stats: [
      { value: "70–76%", label: "Leadership developable (Super-Cube® DBA research framing)" },
      { value: "AI age", label: "Tools without ethical judgment multiply harm" },
      { value: "Ubuntu", label: "Africa needs world-class models rooted in local values" },
    ],
    narrative:
      "Programmes fail when leaders cannot hold multi-stakeholder complexity. Whole-person, ethical leadership is a continental competitive advantage — not a soft extra.",
    sources: [
      {
        label: "Super-Cube® / Leadership (site methodology)",
        href: "https://bigfivegroup.africa/methodology",
      },
      { label: "super-cube.com", href: "https://www.super-cube.com" },
    ],
    opcos: ["leadership", "impact", "foundation"],
  },
];

export const OPCO_MODELS: OpcoInvestorModel[] = [
  {
    slug: "agri",
    name: "Agri",
    fullName: "Big Five Agri",
    color: "#10b981",
    avenue: "Regenerative production · farmer partnership · provenance supply",
    currentState: {
      markets: "KwaZulu-Natal base; priority African corridors building (with Group Global)",
      traction: [
        "Programme design with regenerative protocols and provenance narrative",
        "Linkage into Foods / Direct institutional demand",
        "Continental ambition framing: 2.8M ha opportunity · 50k+ farmers · 54-nation vision (plan)",
      ],
      constraints: "Scale capital, land partnerships, verification stack and patient offtake",
    },
    futureState:
      "Verified regenerative supply platforms feeding institutional and commercial offtake across priority African corridors, with carbon/biodiversity co-benefits.",
    problemsAddressed: ["hunger", "disease", "markets"],
    howWeAddress:
      "Restore productive land, train farmers, prove provenance, and pull produce into Foods, Direct and institutional programmes.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 18,
        y10RevenueUSDm: 55,
        penetration: "Deep SA + 2–3 corridors; proof farms & co-ops only",
        social: "5k–12k farmers in structured programmes",
        economic: "Local offtake premiums; limited export",
        environmental: "Tens of thousands ha under regenerative management",
      },
      moderate: {
        y5RevenueUSDm: 45,
        y10RevenueUSDm: 140,
        penetration: "Multi-country SA/SADC + East Africa hubs",
        social: "25k–40k farmers trained/enabled",
        economic: "Cross-border offtake into Foods + retail",
        environmental: "Hundreds of thousands ha regenerative opportunity unlocked",
      },
      aggressive: {
        y5RevenueUSDm: 90,
        y10RevenueUSDm: 320,
        penetration: "Pan-African platform play with DFIs & sovereigns",
        social: "50k+ farmers; community equity models",
        economic: "Category leadership in verified regen supply",
        environmental: "Towards multi-million ha ambition pipeline",
      },
    },
  },
  {
    slug: "foods",
    name: "Foods",
    fullName: "Big Five Foods",
    color: "#f59e0b",
    avenue: "Fortified nutrition · institutional & household · NSNP pathway",
    currentState: {
      markets: "South Africa manufacturing / institutional focus; Kenya company setup supports East Africa ambition",
      traction: [
        "Fortified porridges, soya, one-pots, soups — certified manufacturing narrative",
        "NSNP programme landed (DBE) — planned to feed 2.5m children/day (plan scale, not current daily count)",
        "Department of Health pathway via Impact (Director General of Health) — SA DoH + African health systems over time",
        "Initial-stage group turnover ~$45k / R750k (management-reported); ~$3.0m / R50m pipeline next 6 months as market penetration builds",
        "Programme-reported delivery totals (meals / children) + internal cost/nutrition analyses",
      ],
      constraints: "Working capital to convert pipeline, tender cycles, distribution partners, fortification capacity",
    },
    futureState:
      "Default fortified staple partner for schools, institutions and affordable retail across priority African markets.",
    problemsAddressed: ["hunger", "malnutrition", "disease"],
    howWeAddress:
      "Affordable fortified formats, school/institutional packs, long shelf life, SupplierAdvisor® ordering where applicable.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 35,
        y10RevenueUSDm: 95,
        penetration: "SA institutional depth + selective export",
        social: "Steady programme meals; limited multi-country scale",
        economic: "Defensive margins via fortification & logistics discipline",
        environmental: "Lower waste via shelf-stable design; regen offtake pull",
      },
      moderate: {
        y5RevenueUSDm: 85,
        y10RevenueUSDm: 240,
        penetration: "SA + SADC + East Africa institutional + retail",
        social: "Material NSNP / school pathway contribution toward ambition",
        economic: "Category presence in affordable fortification",
        environmental: "Scaled offtake of regen grains; less food loss in last mile",
      },
      aggressive: {
        y5RevenueUSDm: 180,
        y10RevenueUSDm: 520,
        penetration: "Multi-region leadership in fortified staples",
        social: "Path toward 2.5m children/day ambition at full institutional depth",
        economic: "Anchor brand for ethical African nutrition",
        environmental: "Integrated farm-to-fork carbon & waste metrics",
      },
    },
  },
  {
    slug: "direct",
    name: "Direct",
    fullName: "Big Five Direct",
    color: "#f97316",
    avenue: "Route-to-market · micro-hubs · last-mile dignity",
    currentState: {
      markets: "Building with Foods corridors; container / hub model narrative",
      traction: [
        "Last-mile and route-to-market design with Foods impact linkage",
        "Micro-hub / container staging concepts for underserved areas",
        "SupplierAdvisor® visibility where trade is verified",
      ],
      constraints: "Capex for hubs, partner operators, density economics",
    },
    futureState:
      "Replicable hub network that keeps more value with producers and lands fortified supply on time.",
    problemsAddressed: ["markets", "hunger", "malnutrition"],
    howWeAddress:
      "Cut opaque middle layers, stage inventory closer to demand, and instrument routes for OTIF proof.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 12,
        y10RevenueUSDm: 40,
        penetration: "Hubs only on proven Foods / institutional lanes",
        social: "Local logistics jobs on active lanes",
        economic: "Higher producer retention on pilot corridors",
        environmental: "Fewer failed trips / spoilage on instrumented routes",
      },
      moderate: {
        y5RevenueUSDm: 40,
        y10RevenueUSDm: 120,
        penetration: "Multi-country hub clusters co-located with demand",
        social: "Thousands of enabled last-mile livelihoods",
        economic: "Meaningful share of Group logistics margin",
        environmental: "Measurable reduction in food loss on priority SKUs",
      },
      aggressive: {
        y5RevenueUSDm: 95,
        y10RevenueUSDm: 280,
        penetration: "Continental franchise hub play",
        social: "Mass employment in distribution micro-enterprise",
        economic: "Logistics platform multiple on corridor density",
        environmental: "Network-level carbon & waste dashboards",
      },
    },
  },
  {
    slug: "access",
    name: "Access",
    fullName: "Big Five Access",
    color: "#3b82f6",
    avenue: "Tenders · CSI · DFI pathways · institutional capital",
    currentState: {
      markets: "South Africa public/institutional orientation; Group delivery attached",
      traction: [
        "Positioning as clean capital pathways for verified enterprises",
        "NSNP programme landed with Foods — credibility platform into other SA departments and African public sector as proof compounds",
        "Impact channel: Director General of Health helps open Department of Health product pathways (SA + Africa)",
        "PMO hand-off so awards become delivery, not paper",
      ],
      constraints: "Public cycle times, compliance capacity, reputation risk",
    },
    futureState:
      "Preferred packaging partner for African SMEs and implementers into government, CSI and development finance — with Group delivery attached.",
    problemsAddressed: ["markets", "hunger", "malnutrition"],
    howWeAddress:
      "Verify counterparties, match opportunities, professionalise bids, attach Foods/Direct/Impact delivery.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 8,
        y10RevenueUSDm: 25,
        penetration: "Fees on SA-centric programmes only",
        social: "Fewer, deeper institutional wins",
        economic: "Success fees + retainers on closed mandates",
        environmental: "Indirect via programme design standards",
      },
      moderate: {
        y5RevenueUSDm: 22,
        y10RevenueUSDm: 70,
        penetration: "Multi-country public + CSI book",
        social: "SME inclusion into formal value chains",
        economic: "Recurring advisory + delivery attach",
        environmental: "Green procurement filters in tenders",
      },
      aggressive: {
        y5RevenueUSDm: 50,
        y10RevenueUSDm: 150,
        penetration: "Pan-African access franchise with DFIs",
        social: "Large SME cohort into verified supply",
        economic: "Platform economics on deal flow",
        environmental: "Standard clauses for regen & fortification",
      },
    },
  },
  {
    slug: "connect",
    name: "Connect",
    fullName: "Big Five Connect",
    color: "#06b6d4",
    avenue: "SupplierAdvisor® OS · SAM · verified trade · SaaS + transaction",
    currentState: {
      markets: "Global product (SupplierAdvisor®) with Group as strategic operator / customer",
      traction: [
        "Live OS: modules, verification, lots, SHEQ, Live pulse, SAM messenger",
        "Foods / Foundation pathways on verified rails",
        "30-day trial positioning; free-to-start commercial motion",
      ],
      constraints: "Enterprise sales cycles, onboarding quality, network effects",
    },
    futureState:
      "Default digital nervous system for ethical African (and global) supply chains — B2B, B2G, B2C on one fabric.",
    problemsAddressed: ["markets", "leadership"],
    howWeAddress:
      "Replace spreadsheets with verified trade, pedigree, ratings and AI guidance (SAM).",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 15,
        y10RevenueUSDm: 50,
        penetration: "Group + founding partners; selective enterprise",
        social: "Transparency for workers & communities in closed networks",
        economic: "SaaS seats + limited GMV take-rate",
        environmental: "Lot-level waste & recall reduction in pilots",
      },
      moderate: {
        y5RevenueUSDm: 55,
        y10RevenueUSDm: 180,
        penetration: "Regional category OS for mid-market + public",
        social: "Millions of verified transactions with audit trails",
        economic: "SaaS + marketplace + data services mix",
        environmental: "Network metrics on spoilage, holds, CAPA",
      },
      aggressive: {
        y5RevenueUSDm: 120,
        y10RevenueUSDm: 400,
        penetration: "Global African-led trade OS brand",
        social: "Default trust layer for ethical commerce",
        economic: "High-multiple software + network business",
        environmental: "Industry benchmarks for chain integrity",
      },
    },
  },
  {
    slug: "leadership",
    name: "Leadership",
    fullName: "Big Five Leadership",
    color: "#eab308",
    avenue: "Super-Cube® programmes · public & private cohorts · licensing",
    currentState: {
      markets: "SA / Africa programmes; global IP via Super-Cube®",
      traction: [
        "Doctoral Super-Cube® model (UKZN DBA lineage)",
        "FMCG construct-lift case narrative; developability 70–76% framing",
        "Pairing with Connect (SAM) for decision culture",
      ],
      constraints: "Facilitator capacity, public procurement of training, brand discipline",
    },
    futureState:
      "Reference whole-person leadership system for African governments, enterprises and youth pipelines.",
    problemsAddressed: ["leadership", "disease", "markets"],
    howWeAddress:
      "Assess, develop and multiply ethical leaders who can run multi-pillar programmes under AI-era complexity.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 6,
        y10RevenueUSDm: 18,
        penetration: "Flagship cohorts + corporate retainers",
        social: "Hundreds of certified leaders / year",
        economic: "Premium programme fees",
        environmental: "Indirect via better capital & ops decisions",
      },
      moderate: {
        y5RevenueUSDm: 20,
        y10RevenueUSDm: 65,
        penetration: "Multi-country public + enterprise academy",
        social: "Thousands of leaders in pipeline",
        economic: "Licensing + academy economics",
        environmental: "ESG decision culture in client orgs",
      },
      aggressive: {
        y5RevenueUSDm: 45,
        y10RevenueUSDm: 140,
        penetration: "Continental academy + digital scale",
        social: "Mass leadership formation at African cost points",
        economic: "IP platform multiple",
        environmental: "Embedded regen / ethics standards in curricula",
      },
    },
  },
  {
    slug: "foundation",
    name: "Foundation",
    fullName: "Big Five Foundation",
    color: "#0d9488",
    avenue: "NPO · catalytic grants · community programmes (not pure P&L)",
    currentState: {
      markets: "Community / donor programmes linked to Group delivery",
      traction: [
        "NPO positioning; SupplierAdvisor® listed narrative",
        "Social & economic programme families with Impact PMO",
        "Transparent design over vanity deploy figures on public web",
      ],
      constraints: "Donor cycles, measurement cost, independence governance",
    },
    futureState:
      "Catalytic philanthropy that de-risks Group corridors and proves models for public/DFI scale-up.",
    problemsAddressed: ["malnutrition", "hunger", "leadership"],
    howWeAddress:
      "Grant and co-fund community nutrition, skills and resilience — delivered with Group muscle.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 3,
        y10RevenueUSDm: 8,
        penetration: "Focused donor book; SA depth",
        social: "Targeted community cohorts with proof",
        economic: "Blended finance pilots",
        environmental: "Community regen pilots",
      },
      moderate: {
        y5RevenueUSDm: 10,
        y10RevenueUSDm: 30,
        penetration: "Multi-country donor + CSI blend",
        social: "Scaled school/community nutrition grants",
        economic: "Crowding-in commercial capital",
        environmental: "Portfolio-level impact reporting",
      },
      aggressive: {
        y5RevenueUSDm: 25,
        y10RevenueUSDm: 75,
        penetration: "Continental catalytic fund",
        social: "Mass community outcomes via Group rails",
        economic: "Fund management fees + catalytic returns framing",
        environmental: "Landscape-scale partnerships",
      },
    },
  },
  {
    slug: "impact",
    name: "Impact",
    fullName: "Big Five Impact",
    color: "#7c3aed",
    avenue: "Cross-pillar PMO · health-system channel · programme fees · delivery assurance",
    currentState: {
      markets: "Group programmes; government / CSI multi-pillar briefs; SA DoH pathway building",
      traction: [
        "Director General of Health within Big Five Impact — helps drive Group products into SA Department of Health and African health pathways",
        "PMO narrative: gates, KPIs, field assurance",
        "Strategic overview deck for partner briefing",
        "Connective tissue across all operating pillars (incl. Foods institutional supply)",
      ],
      constraints: "Talent density, multi-country programme risk, public procurement cycle times",
    },
    futureState:
      "Default continental delivery office for complex Feed · Educate · Empower programmes — with Group products in health-system supply where programmes require them.",
    problemsAddressed: ["markets", "hunger", "malnutrition", "disease", "leadership"],
    howWeAddress:
      "Design, orchestrate and report multi-pillar programmes so funding becomes outcomes; use Impact leadership (incl. Director General of Health) to open Department of Health and multi-country health channels for Group products.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 10,
        y10RevenueUSDm: 30,
        penetration: "Group-internal + few flagship external PMOs",
        social: "High integrity on fewer programmes",
        economic: "Day-rate / fixed PMO fees",
        environmental: "Programme ESG reporting packs",
      },
      moderate: {
        y5RevenueUSDm: 30,
        y10RevenueUSDm: 90,
        penetration: "Regional PMO franchise for DFIs & ministries",
        social: "Many concurrent multi-country programmes",
        economic: "Retainer + success components",
        environmental: "Standard climate/nutrition KPIs",
      },
      aggressive: {
        y5RevenueUSDm: 70,
        y10RevenueUSDm: 200,
        penetration: "Continental PMO brand",
        social: "Default implementer for complex African programmes",
        economic: "Platform of delivery IP + fees",
        environmental: "Portfolio carbon & nutrition dashboards",
      },
    },
  },
  {
    slug: "global",
    name: "Global",
    fullName: "Big Five Global",
    color: "#0ea5e9",
    avenue: "Distribution · international corridors · partnership development",
    currentState: {
      markets:
        "12 priority markets: 9 African (ZA, KE company, GH, ZM, CD, TZ, NA, ZW, LS) + DE · HU · GE (Europe)",
      traction: [
        "Route-to-market strategy building in priority nations",
        "Kenya company setup for East Africa hub",
        "European corridor development (Germany, Hungary, Georgia)",
      ],
      constraints: "Partner quality, working capital, regulatory market entry",
    },
    futureState:
      "African excellence exported with standards intact — distribution partnerships on four continents.",
    problemsAddressed: ["markets", "hunger"],
    howWeAddress:
      "Open corridors, co-design market entry, and pull Group products/services into new demand centres.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 8,
        y10RevenueUSDm: 28,
        penetration: "Fees on corridor development; limited own P&L",
        social: "Jobs in export-linked logistics",
        economic: "Partnership margins on priority 12",
        environmental: "Standards clauses in export contracts",
      },
      moderate: {
        y5RevenueUSDm: 25,
        y10RevenueUSDm: 85,
        penetration: "Material GMV on African + EU corridors",
        social: "Broader producer access to foreign demand",
        economic: "Trading + agency economics",
        environmental: "Verified regen/ fortification in export SKUs",
      },
      aggressive: {
        y5RevenueUSDm: 60,
        y10RevenueUSDm: 200,
        penetration: "Global African brand distribution network",
        social: "Continental employment in trade services",
        economic: "High-scale corridor platform",
        environmental: "Global proof of African standards",
      },
    },
  },
  {
    slug: "royal",
    name: "Royal",
    fullName: "Big Five Royal",
    color: "#d97706",
    avenue: "Community legitimacy · planned royal & tribal partnership · social licence",
    currentState: {
      markets: "KwaZulu-Natal / traditional authority orientation",
      traction: [
        "Close ties to the royal family; planning formal partnership with royal family & tribal authorities",
        "Support for their community work; service narrative (not extractive)",
        "Cross-cutting legitimacy for Feed · Educate · Empower programmes",
      ],
      constraints: "Relationship care, non-commercialisation of heritage, governance clarity",
    },
    futureState:
      "Deep community partnership model that de-risks Group programmes and multiplies dignity outcomes.",
    problemsAddressed: ["leadership", "hunger", "malnutrition"],
    howWeAddress:
      "Align programmes with traditional leadership, listen first, and deliver with respect and proof.",
    scenarios: {
      conservative: {
        y5RevenueUSDm: 1,
        y10RevenueUSDm: 4,
        penetration: "Partnership enablement fees limited; mostly strategic",
        social: "Stronger community acceptance of pilots",
        economic: "Indirect value via de-risked Group revenue",
        environmental: "Community-stewarded regen projects",
      },
      moderate: {
        y5RevenueUSDm: 4,
        y10RevenueUSDm: 12,
        penetration: "Structured partnership programmes",
        social: "Scaled community programmes under traditional guidance",
        economic: "Joint ventures / programme vehicles",
        environmental: "Landscape partnerships with authority buy-in",
      },
      aggressive: {
        y5RevenueUSDm: 10,
        y10RevenueUSDm: 35,
        penetration: "Replicable traditional-authority partnership IP",
        social: "National model for ethical community enterprise",
        economic: "Licensable partnership methodology",
        environmental: "Authority-led conservation + regen corridors",
      },
    },
  },
];

export function sumScenario(
  key: ScenarioKey,
  horizon: "y5" | "y10"
): number {
  const field = horizon === "y5" ? "y5RevenueUSDm" : "y10RevenueUSDm";
  return OPCO_MODELS.reduce((acc, o) => acc + o.scenarios[key][field], 0);
}

/** Format as USD millions / billions (explicit currency label for investors). */
export function formatUSDm(n: number): string {
  if (n >= 1000) return `USD ${(n / 1000).toFixed(1)}B`;
  return `USD ${n}M`;
}

/**
 * Equity raise framing — Big Five Group holding company.
 * Subject to legal docs / term sheet; portal text is orientation only.
 */
export const INVESTMENT_ASK = {
  entity: "Big Five Group (holding company)",
  equityOffered: "10%",
  equityNote:
    "We are seeking an investment for 10% equity in Big Five Group — the holding company — to help accelerate continental growth across the operating companies.",
  boardSeat: true,
  boardNote:
    "The investment is expected to include a board seat at holding-company level, so the investor participates in strategic oversight of continental scale-up.",
  /** Planned corporate architecture (orientation only — not tax or legal advice). */
  corporateStructure: {
    holding: "Seychelles",
    holdingNote:
      "We plan to establish the Big Five Group holding company in the Seychelles and to house Group intellectual property (IP) at holding level for tax and group structuring purposes, subject to professional legal and tax advice and applicable law.",
    ipNote:
      "Core IP is intended to sit in the holding company so licences, brand, models and platforms can support multiple operating companies cleanly.",
    opcos:
      "We plan to set up operating companies in end markets — as we have done with a company setup in Kenya — to accelerate growth, local execution and stakeholder buy-in where we sell, hire and deliver.",
    kenyaExample:
      "Kenya is the model for East Africa: a registered local company presence that anchors corridor expansion while remaining part of the Group system.",
  },
  useOfFunds: [
    {
      pct: 10,
      label: "Operational costs",
      detail:
        "Working capital for people, systems, compliance and day-to-day operating capacity that keeps multi-country programmes running.",
    },
    {
      pct: 90,
      label: "Asset acquisition & product development",
      detail:
        "Capital deployed into productive assets (e.g. manufacturing, hubs, inventory, land-linked programmes) and product / platform development across Foods, Agri, Direct, Connect and related opcos.",
    },
  ],
  purpose:
    "Accelerate continental growth — deepen priority markets via local operating companies, fund capacity, and compound the Group’s integrated Feed · Educate · Empower model under a Seychelles holding structure.",
} as const;

/** Consolidated impact narrative (group-level, scenario-aware wording) */
export const GROUP_IMPACT_PILLARS = {
  social: {
    title: "Social impact",
    items: [
      "Nutrition security for learners and households (Foods · Foundation · Direct)",
      "Farmer and community livelihoods (Agri · Direct · Royal)",
      "Leadership capacity for public and private decision-makers (Leadership)",
      "SME inclusion into verified institutional supply (Access · Connect)",
    ],
  },
  economic: {
    title: "Economic impact",
    items: [
      "Multi-opco revenue stack: product, logistics, SaaS, advisory, PMO, corridors",
      "Value retained in African producer and logistics communities",
      "Institutional programme spend converted to delivery (Access · Impact)",
      "Export corridors for African excellence (Global)",
    ],
  },
  environmental: {
    title: "Environmental impact",
    items: [
      "Regenerative land ambition and provenance (Agri)",
      "Lower food loss via shelf-stable design and instrumented routes (Foods · Direct)",
      "Verified chain controls reducing waste and recall risk (Connect)",
      "Programme-level ESG / climate KPIs via Impact PMO",
    ],
  },
} as const;

export const MODEL_DISCLAIMER =
  "All forward-looking revenue and impact figures on this investor portal are illustrative scenario models in United States dollars (USD) for authorised discussion only. Near-term market traction is management-reported in South African rand (ZAR) and shown in headline USD at an approximate mid-market conversion (~16.5 ZAR per USD, July 2026) — not audited financial statements. They are not forecasts or guarantees. Equity percentage, board participation, use-of-funds splits, and planned Seychelles holding / IP / end-market opco architecture are investment-framing statements subject to definitive legal and tax advice and agreements — not tax or legal advice from this website. Actual results depend on capital, execution, regulation, partnerships and market conditions. Request NDA data-room materials for diligence-grade numbers with dates, scopes and sensitivities.";

/**
 * Near-term commercial traction (management-reported in ZAR; headlines in USD).
 * FX: ~16.5 ZAR per USD (approx mid-market, July 2026) for investor-facing USD headlines.
 * Pipeline is opportunity-stage — not booked revenue. NSNP 2.5m is programme plan scale.
 */
export const MARKET_TRACTION = {
  /** Approximate mid-market ZAR per 1 USD used for headline conversion (July 2026). */
  fxZarPerUsd: 16.5,
  fxNote: "USD headlines ≈ mid-market ~16.5 ZAR/USD (July 2026); underlying management figures in ZAR",
  initialTurnover: {
    /** Headline for investor decks / portal */
    value: "~$45k",
    valueZar: "R750k",
    numericZar: 750_000,
    numericUsdApprox: 45_000,
    label: "Initial-stage turnover",
    detail:
      "Management-reported turnover of R750k (~USD 45k at ~16.5 ZAR/USD) realised in the initial market stages as traction and penetration build.",
  },
  pipeline6m: {
    value: "~$3.0m",
    valueZar: "R50m",
    numericZar: 50_000_000,
    numericUsdApprox: 3_000_000,
    label: "Pipeline · next 6 months",
    detail:
      "Commercial pipeline of R50m (~USD 3.0m at ~16.5 ZAR/USD) over the next six months as market traction and penetration deepen. Pipeline is opportunity-stage — not contracted or booked revenue until converted.",
  },
  nsnp: {
    value: "2.5m",
    label: "Children / day · NSNP plan",
    detail:
      "Big Five Foods has landed the National School Nutrition Programme (NSNP) pathway with the Department of Basic Education — planned to feed 2.5 million children per day. Scale is a delivery plan, not a claim of current daily headcount.",
  },
  credibility: {
    title: "Credibility → multi-department & continental government pathways",
    detail:
      "Landing NSNP builds institutional credibility that should open doors into other government departments in South Africa and, as proof compounds, into public-sector programmes across Africa — always with Group delivery capacity attached. Separately, Big Five Impact includes the Director General of Health, who will help drive Group products into South Africa’s Department of Health and into health pathways in other African countries (relationship and channel — not claimed as closed multi-country DoH awards).",
  },
  healthChannel: {
    title: "Director General of Health · Big Five Impact",
    detail:
      "The Director General of Health is within Big Five Impact and will help drive Group products into South Africa’s Department of Health and counterpart health departments across Africa as programmes mature.",
  },
  asOfNote:
    "Management-reported in ZAR; USD headlines at ~16.5 ZAR/USD (July 2026 approx). Pipeline conversion only under NDA diligence packs.",
} as const;

/** Unit economics sketches — Foods & Connect first (illustrative for diligence discussion). */
export const UNIT_ECONOMICS = [
  {
    slug: "foods",
    name: "Foods",
    engine: "Price × volume × gross margin on fortified SKUs",
    levers: [
      { k: "Price", v: "Institutional pack pricing vs retail (dual track)" },
      { k: "Volume", v: "Schools / programmes + household SKUs on priority corridors" },
      { k: "Margin", v: "Fortification + shelf-life + logistics discipline" },
      { k: "Capital", v: "Working capital for inventory & offtake; plant/pack capacity" },
    ],
    path: "Initial turnover (~$45k / R750k) → convert ~$3.0m / R50m pipeline → NSNP plan scale (2.5m/day) → multi-country institutional + retail",
    kill: "If pipeline conversion and NSNP delivery rhythm stall after capital for working inventory, pause aggressive multi-corridor volume expansion.",
  },
  {
    slug: "connect",
    name: "Connect",
    engine: "Seats × ARPU + (optional) take-rate on verified GMV",
    levers: [
      { k: "Seats", v: "Verified companies on SupplierAdvisor® (Group + open market)" },
      { k: "ARPU", v: "Module depth (trade, inventory, SHEQ, Live, SAM)" },
      { k: "Network", v: "B2B / B2G density → matching and trust effects" },
      { k: "Capital", v: "Product, onboarding, and enterprise sales capacity" },
    ],
    path: "Group + founding partners → mid-market corridors → regional OS default",
    kill: "If activation and retention of verified suppliers stay below threshold after paid cohorts, cut GTM burn and refocus on Group rails.",
  },
] as const;

/** 12–18 month milestone roadmap (orientation — not a commitment schedule). */
export const MILESTONES_12_18 = [
  {
    q: "0–6 mo",
    title: "Foundation",
    items: [
      "Convert ~$3.0m (R50m) commercial pipeline into contracted offtake (working capital + delivery)",
      "Stand up NSNP delivery rhythm toward 2.5m children/day plan scale",
      "Advance SA Department of Health product pathway via Impact (Director General of Health)",
      "Advance Seychelles holdco + IP architecture with counsel",
    ],
  },
  {
    q: "6–12 mo",
    title: "Corridors",
    items: [
      "Use NSNP + DoH channel credibility for adjacent SA government pathways",
      "First health-system product introductions outside education-only menus where appropriate",
      "2–3 priority African corridors with measurable offtake / logistics",
      "Connect: verified supplier activation on Group + pilot enterprises",
    ],
  },
  {
    q: "12–18 mo",
    title: "Compound",
    items: [
      "Second end-market opco setup (beyond Kenya template)",
      "Cross-border health and public-sector briefs on SA institutional proof",
      "Impact PMO on multi-pillar programmes with gates & KPIs",
      "Unit-economics dashboard: Foods volume/margin + Connect seats/ARPU",
    ],
  },
] as const;

/** Risk register — top risks and mitigants. */
export const INVESTOR_RISKS = [
  {
    risk: "Public / tender cycle delays",
    mitigate: "Dual track: institutional + retail/household; Access only attaches real delivery capacity.",
  },
  {
    risk: "FX & multi-country cash complexity",
    mitigate: "Local opcos for end-market P&L; holdco treasury discipline; USD reporting for investors.",
  },
  {
    risk: "Execution / talent density",
    mitigate: "PMO (Impact) gates; Leadership pipeline; don’t open corridors without operators.",
  },
  {
    risk: "Tax / legal structure (Seychelles holdco + IP)",
    mitigate: "Counsel-led setup; no reliance on website framing as advice; staged implementation.",
  },
  {
    risk: "Food safety & brand trust",
    mitigate: "Certifications, fortification QA, SupplierAdvisor® verification and hold/lot controls.",
  },
  {
    risk: "Focus dilution across 10 pillars",
    mitigate: "Capital 90% to assets/product on priority rails (Foods, Connect, corridors); kill criteria per opco.",
  },
] as const;

/** Brutal honesty: what is true today vs ambition. */
export const TRACTION_VS_AMBITION = {
  trueToday: [
    "Initial-stage turnover ~$45k / R750k (management-reported) as market traction starts",
    "~$3.0m / R50m commercial pipeline over the next 6 months as penetration builds (opportunity-stage, not booked)",
    "NSNP programme landed with DBE — planned to feed 2.5m children/day (programme plan scale)",
    "Director General of Health within Big Five Impact — channel to help drive Group products into SA DoH and African health pathways",
    "Foods fortified product story + programme-reported meals / children where stated",
    "Kenya company setup as East Africa hub template",
    "12 priority distribution markets listed (9 Africa + DE · HU · GE)",
    "SupplierAdvisor® live product (Connect); SAM positioning",
    "Super-Cube® IP / research lineage (Leadership)",
    "Close ties to royal family; partnership planned (not claimed as completed deal)",
  ],
  notYetTrue: [
    "~$3.0m (R50m) pipeline fully converted to contracted / recognised revenue",
    "2.5m children fed per day as current operational headcount",
    "Department of Health supply awards closed at multi-country scale",
    "Other SA government departments and pan-African public awards already closed at scale",
    "Full Seychelles holdco + IP stack live as final legal structure",
    "2.8M ha regenerative land under management as completed fact",
    "Aggressive Y5/Y10 USD revenue run-rates as booked financials",
    "Opcos live in every priority market with full P&L scale",
    "Audited group consolidated statements on this portal",
  ],
} as const;
