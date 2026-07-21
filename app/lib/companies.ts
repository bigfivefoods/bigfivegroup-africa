export interface Company {
  slug: string;
  name: string;
  fullName: string;
  color: string;
  icon: string;
  tagline: string;
  description: string;
  heroText: string;
  howItWorks: Array<{ step: number; title: string; desc: string }>;
  forStakeholders: Array<{ title: string; desc: string; cta?: string }>;
  impact: string;
}

export const companies: Company[] = [
  {
    slug: "agri",
    name: "Agri",
    fullName: "Big Five Agri",
    color: "#10b981",
    icon: "Leaf",
    tagline: "Regenerative Farming • Provenance • Farmer Partnership",
    description:
      "Regenerative agriculture with farmers, traditional authorities and governments — restoring land, verifying practice, and supplying Foods, Direct and institutional programmes with provenance markets can trust.",
    heroText: "Regenerating Africa's Soil. Feeding the World Ethically.",
    howItWorks: [
      {
        step: 1,
        title: "Regenerate & verify",
        desc: "Farmers onboard with soil data, monitoring and regenerative protocols — so every hectare we claim is measured, not assumed.",
      },
      {
        step: 2,
        title: "Connect & transact",
        desc: "Buyers access inventory, quality evidence and provenance. Where applicable, orders run through SupplierAdvisor®.",
      },
      {
        step: 3,
        title: "Impact & scale",
        desc: "Dashboards for income, biodiversity and climate outcomes — ready for governments, DFIs and buyers as programmes mature.",
      },
    ],
    forStakeholders: [
      {
        title: "For Farmers",
        desc: "Pathways to premium markets, fairer pricing, training and partnership — designed with producers, not imposed on them.",
      },
      {
        title: "For Buyers & Retailers",
        desc: "Traceable regenerative supply with evidence buyers and programmes can use.",
      },
      {
        title: "For Governments & Impact Funds",
        desc: "Verifiable data for food security, rural livelihoods and climate-smart agriculture.",
      },
    ],
    impact:
      "Continental ambition: plan to unlock 2.8M hectares of regenerative opportunity, train 50k+ farmers, target ~47% income increase potential, and reach 54 nations in our African vision — delivered step by step with partners.",
  },
  {
    slug: "foods",
    name: "Foods",
    fullName: "Big Five Foods",
    color: "#f59e0b",
    icon: "Wheat",
    tagline: "Fortified Nutrition • Shelf-Stable • Institutional & Household",
    description:
      "Fortified African staples and ready meals — porridges, soya, one-pots and soups — for households, schools and institutions, with certifications and SupplierAdvisor® ordering pathways.",
    heroText: "Nourishing a Continent. One Fortified Meal at a Time.",
    howItWorks: [
      {
        step: 1,
        title: "Source & fortify",
        desc: "Quality grains milled and fortified for institutional and household nutrition programmes.",
      },
      {
        step: 2,
        title: "Package & verify",
        desc: "Shelf-stable formats, clear labelling and quality systems designed for schools and last-mile logistics.",
      },
      {
        step: 3,
        title: "Distribute & impact",
        desc: "Direct, Access and Connect pathways — including NSNP-aligned ambition for school-day feeding at scale.",
      },
    ],
    forStakeholders: [
      {
        title: "For Governments & NGOs",
        desc: "Cost-effective fortified nutrition with programme-facing evidence and institutional pack formats.",
      },
      {
        title: "For Retail & Distributors",
        desc: "African staples with long shelf life, certifications and a clear brand story.",
      },
      {
        title: "For Families",
        desc: "Affordable, fortified meals designed for dignity at the table.",
      },
    ],
    impact:
      "Programme-reported delivery to date (e.g. meals and children reached) plus internal cost/nutrition comparisons — and the NSNP programme landed with DBE, planned to feed 2.5 million children a day (plan scale). See /methodology.",
  },
  {
    slug: "direct",
    name: "Direct",
    fullName: "Big Five Direct",
    color: "#f97316",
    icon: "Truck",
    tagline: "Route-to-Market • Micro-Hubs • Last-Mile Dignity",
    description:
      "Last-mile and route-to-market infrastructure — micro-hubs, containerised distribution and digital matching — so producers and institutions keep more value and communities eat with dignity.",
    heroText: "From Farm Gate to Market Gate. Clear Routes. Pure Value.",
    howItWorks: [
      {
        step: 1,
        title: "Hub design",
        desc: "Solar-capable micro-hub and container models for storage, staging and local jobs where programmes require them.",
      },
      {
        step: 2,
        title: "Direct matching",
        desc: "Connect producers to verified buyers with transparent commerce rails — including SupplierAdvisor® where applicable.",
      },
      {
        step: 3,
        title: "Scale with proof",
        desc: "Replicate routes that work — measured by OTIF delivery, community reach and partner reporting, not vanity hub counts.",
      },
    ],
    forStakeholders: [
      {
        title: "For Small Producers",
        desc: "Shorter chains, clearer pricing and routes to markets that value provenance.",
      },
      {
        title: "For Urban Markets & Institutions",
        desc: "Reliable, traceable supply with logistics built for real African conditions.",
      },
      {
        title: "For Investors & Partners",
        desc: "Infrastructure models tied to measurable jobs, meals and corridor growth.",
      },
    ],
    impact:
      "Logistics pillar for Foods and institutional programmes — route-to-market ambition across priority nations, with programme-reported nutrition impact shared where Direct and Foods deliver together.",
  },
  {
    slug: "access",
    name: "Access",
    fullName: "Big Five Access",
    color: "#3b82f6",
    icon: "Landmark",
    tagline: "Government Funding • CSI Optimization • Sovereign Capital Access",
    description:
      "Government, CSI and development capital pathways for verified African enterprises — including institutional access that supports school nutrition ambitions such as NSNP for the DBE.",
    heroText: "Opening Doors to Capital. Closing the Gap Between Policy and People.",
    howItWorks: [
      {
        step: 1,
        title: "Verify & onboard",
        desc: "KYC, financials and impact scoring. Trusted nodes only — counterparties you can put in front of auditors.",
      },
      {
        step: 2,
        title: "Match & apply",
        desc: "Match opportunities to capability. Bid support and tracking keep you ahead of deadlines.",
      },
      {
        step: 3,
        title: "Win & deliver",
        desc: "Secure awards with clean process, then deliver with Group capacity and transparent reporting for funders.",
      },
    ],
    forStakeholders: [
      {
        title: "For Government",
        desc: "Clean, auditable supplier base. Reduced corruption risk.",
      },
      {
        title: "For Corporations (CSI/ESG)",
        desc: "Verified, high-impact projects with full traceability.",
      },
      {
        title: "For SMEs & Cooperatives",
        desc: "Level playing field. Access to capital and contracts previously out of reach.",
      },
    ],
    impact:
      "Planning to feed 2.5 million children a day via the National School Nutrition Programme (NSNP) for the Department of Basic Education (DBE) — institutional access that turns public mandates into daily meals.",
  },
  {
    slug: "connect",
    name: "Connect",
    fullName: "Big Five Connect",
    color: "#06b6d4",
    icon: "Link",
    tagline: "SupplierAdvisor® • SAM Messenger • AI-Powered Trust • On-Chain Ready",
    description:
      "The operating system for ethical African commerce — SupplierAdvisor® with SAM (Grok-powered messenger), AI trust, lot-level control and on-chain pedigree. Big Five Connect is how the Group trades the future.",
    heroText: "Verified. Intelligent. Accelerating Humanity.",
    howItWorks: [
      {
        step: 1,
        title: "Verify & onboard",
        desc: "AI + human verification, certificates and ethical scoring — SAM guides teams through setup without a manual.",
      },
      {
        step: 2,
        title: "Connect, trade & ask SAM",
        desc: "Smart matching, on-chain POs, live tracking, RIAD risk — and SAM for in-app how-to while you operate.",
      },
      {
        step: 3,
        title: "Prove & improve",
        desc: "Traceability, Live pulse and AI insights so every purchase can prove OTIFEF, SHEQ and SDG contribution.",
      },
    ],
    forStakeholders: [
      {
        title: "For Conscious Consumers",
        desc: "Scan any product. See the complete verified story. Shop only verified ethical brands.",
      },
      {
        title: "For Business",
        desc: "Total visibility from farm to shelf. SAM + AI matching, predictive logistics and audit-ready trade.",
      },
      {
        title: "For Government",
        desc: "Transparent public procurement, verified suppliers and intelligence that supports ethical delivery.",
      },
    ],
    impact:
      "SupplierAdvisor® globally — with SAM intelligence and Big Five Connect as the Group’s digital nervous system. Product scope and terms: supplieradvisor.com.",
  },
  {
    slug: "leadership",
    name: "Leadership",
    fullName: "Big Five Leadership",
    color: "#eab308",
    icon: "Award",
    tagline: "Super-Cube® Doctoral Model • Ethical AI Leadership • SAM-Ready Decision Culture",
    description:
      "World-class leadership development rooted in Dr. Craig R. Muller’s Super-Cube® doctoral model — paired with ethical AI coaching so leaders can run nations, enterprises and intelligent supply systems.",
    heroText: "Leadership That Builds Nations. Not Just Companies.",
    howItWorks: [
      {
        step: 1,
        title: "Assess & diagnose",
        desc: "Super-Cube® whole-person assessment and diagnostics across the six constructs of the model.",
      },
      {
        step: 2,
        title: "Develop with coaching",
        desc: "Programmes combining Super-Cube®, deliberate practice, peer masterminds and ethical AI coaching.",
      },
      {
        step: 3,
        title: "Scale & multiply",
        desc: "Graduates and facilitators carry the model into boards, public service and enterprise culture.",
      },
    ],
    forStakeholders: [
      {
        title: "For Executives & Founders",
        desc: "Personal leadership transformation and high-trust team culture.",
      },
      {
        title: "For Governments",
        desc: "Ethical, future-fit public servants and decision culture for complex delivery.",
      },
      {
        title: "For Youth & Emerging Leaders",
        desc: "World-class formation rooted in Ubuntu and evidence from Super-Cube® research.",
      },
    ],
    impact:
      "Super-Cube® DBA research (UKZN, 2020): leadership is substantially developable (about 70–76% through deliberate practice). Cohort and organisational outcomes shared in partner briefings — see /leadership and /methodology.",
  },
  {
    slug: "foundation",
    name: "Foundation",
    fullName: "Big Five Foundation",
    color: "#0d9488",
    icon: "Heart",
    tagline: "Registered NPO • SupplierAdvisor® Listed • Measurable Impact",
    description:
      "The philanthropic engine of the group — registered on SupplierAdvisor®. We design, fund and measure high-impact initiatives with radical transparency.",
    heroText: "Every Rand Tracked. Every Life Changed. Forever.",
    howItWorks: [
      {
        step: 1,
        title: "Design & fund",
        desc: "Co-create initiatives with communities. Clear theory of change and transparent capital structure.",
      },
      {
        step: 2,
        title: "Deliver & verify",
        desc: "Field delivery with Big Five Impact PMO where needed — data, partners and SupplierAdvisor® rails when commerce applies.",
      },
      {
        step: 3,
        title: "Report & learn",
        desc: "Open learning, partner reporting and replication of models that work.",
      },
    ],
    forStakeholders: [
      {
        title: "For Donors & Impact Investors",
        desc: "Transparency on design, delivery and outcomes — formal packs on request.",
      },
      {
        title: "For Communities",
        desc: "Co-ownership of solutions, skills transfer and sustainable exit strategies.",
      },
      {
        title: "For Partners",
        desc: "Shared infrastructure, verified data and collective impact reporting.",
      },
    ],
    impact:
      "NPO philanthropy linked to Group delivery — transparent programmes and Partner-grade reporting. Specific deployment totals are shared in dated briefs, not as open website vanity figures.",
  },
  {
    slug: "impact",
    name: "Impact",
    fullName: "Big Five Impact",
    color: "#7c3aed",
    icon: "Target",
    tagline: "Project Management • Cross-Pillar Delivery • Continental Results",
    description:
      "The project management arm of Big Five Group — orchestrating programmes across Agri, Foods, Direct, Access, Connect, Leadership and Foundation to deliver measurable impact across the African continent.",
    heroText: "From Strategy to Delivery. Across Africa. On Time. On Impact.",
    howItWorks: [
      {
        step: 1,
        title: "Scope & design",
        desc: "Define outcomes with governments, funders and communities. Align workstreams to SDGs and commercial sustainability.",
      },
      {
        step: 2,
        title: "Orchestrate & execute",
        desc: "Cross-pillar PMO delivery — agri, nutrition, logistics, capital access and leadership — under one accountable programme office.",
      },
      {
        step: 3,
        title: "Measure & report",
        desc: "Live dashboards, SupplierAdvisor®-linked commerce where applicable, and verified impact reporting stakeholders can trust.",
      },
    ],
    forStakeholders: [
      {
        title: "For Governments & DFIs",
        desc: "One delivery partner that can plan, execute and report multi-sector programmes with institutional discipline.",
      },
      {
        title: "For Corporates & CSI",
        desc: "End-to-end programme management with ethical supply chains and transparent outcomes.",
      },
      {
        title: "For Communities",
        desc: "Projects that land on the ground — jobs, nutrition, markets and skills — not slide decks.",
      },
    ],
    impact:
      "The connective tissue of the group: turning multi-pillar ambition into continental delivery with gates, KPIs and field proof.",
  },
  {
    slug: "global",
    name: "Global",
    fullName: "Big Five Global",
    color: "#0ea5e9",
    icon: "Globe",
    tagline: "Distribution • Route-to-Market • African Standards Abroad",
    description:
      "Building distribution and route-to-market strategy across priority African and European markets — exporting regenerative supply, fortified nutrition and ethical commerce with African standards intact.",
    heroText: "Building Distribution. Route to Market. Expanding with Purpose.",
    howItWorks: [
      {
        step: 1,
        title: "Priority corridors",
        desc: "Twelve priority nations today — nine in Africa plus Germany, Hungary and Georgia (Europe) — with Kenya company setup for East Africa.",
      },
      {
        step: 2,
        title: "Partner before scale",
        desc: "Governments, institutions and local enterprises co-design entry so expansion earns trust.",
      },
      {
        step: 3,
        title: "Export African excellence",
        desc: "Share Super-Cube® leadership, regenerative agri and ethical trade models without diluting standards.",
      },
    ],
    forStakeholders: [
      {
        title: "For International Partners",
        desc: "Access to verified African supply chains, ethical leadership and high-integrity investment pathways.",
      },
      {
        title: "For African Companies",
        desc: "Global market access, international credibility and world-class standards.",
      },
      {
        title: "For Global Citizens",
        desc: "Support African-led solutions to climate, nutrition and leadership challenges.",
      },
    ],
    impact:
      "Twelve priority distribution markets (including DE · HU · GE in Europe) and a clear expansion horizon across Africa and the world — see /global.",
  },
  {
    slug: "royal",
    name: "Royal",
    fullName: "Big Five Royal",
    color: "#d97706",
    icon: "Crown",
    tagline: "Close Ties · Planned Partnership · Support · Feed · Educate · Empower",
    description:
      "Big Five has close ties to the royal family, is planning to partner with the royal family and tribal authorities, and supports them and the work they do — serving communities with dignity starting in KwaZulu-Natal and across Africa.",
    heroText:
      "Close ties to the royal family. Planning to partner. Supporting them and the work they do.",
    howItWorks: [
      {
        step: 1,
        title: "Close ties & planned partnership",
        desc: "Build on close ties to the royal family and plan formal partnership with the royal family and tribal authorities — rooted in respect and local guidance.",
      },
      {
        step: 2,
        title: "Support their work",
        desc: "Support the royal family and the work they do for communities — and deliver food security, skills, leadership and fair opportunity with people, not imposed on them.",
      },
      {
        step: 3,
        title: "Feed · Educate · Empower",
        desc: "Through Foods, Leadership, Access and Foundation pathways, we aim to feed, educate and empower the communities we serve.",
      },
    ],
    forStakeholders: [
      {
        title: "For the royal family & tribal authorities",
        desc: "A trusted enterprise partner with close ties, planning formal partnership, and committed to supporting their work and community wellbeing.",
      },
      {
        title: "For communities",
        desc: "Practical programmes that put nutrition, skills and opportunity into local hands.",
      },
      {
        title: "For institutional partners",
        desc: "A clear channel to support community impact alongside royal and tribal leadership.",
      },
    ],
    impact:
      "Close ties and planned partnership with the royal family — supporting their work and putting communities first: feed, educate and empower.",
  },
];

export const getCompanyBySlug = (slug: string) => companies.find((c) => c.slug === slug);
