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
    tagline: "Regenerative Farming • Lot Traceability • On-Chain Ready",
    description:
      "Regenerative agriculture on the SupplierAdvisor® supply-chain OS — verified farmers, lot pedigree, OTIFEF deliveries, and on-chain product passports when authenticity must be proven.",
    heroText: "Regenerating Africa's Soil. Feeding the World Ethically.",
    howItWorks: [
      { step: 1, title: "Regenerate & Verify", desc: "Farmers onboard with soil health data, satellite monitoring, and AI analysis. Every hectare is verified regenerative." },
      { step: 2, title: "Connect & Transact", desc: "Buyers access live inventory, quality CoAs, and carbon proofs. Smart contracts handle POs and logistics." },
      { step: 3, title: "Impact & Scale", desc: "Real-time dashboards show farmer income uplift, biodiversity gains, and CO₂ sequestered." }
    ],
    forStakeholders: [
      { title: "For Farmers", desc: "Access to premium markets, fair pricing, training, and on-chain finance. Average income increase of 240%." },
      { title: "For Buyers & Retailers", desc: "100% traceable, regenerative-certified supply with live ESG dashboards." },
      { title: "For Governments & Impact Funds", desc: "Verifiable data for subsidies, carbon markets, and national food security." }
    ],
    impact: "Over 124,000 hectares under regenerative management. 47,000+ smallholder families lifted. 2.1M tonnes CO₂ sequestered."
  },
  {
    slug: "foods",
    name: "Foods",
    fullName: "Big Five Foods",
    color: "#f59e0b",
    icon: "Wheat",
    tagline: "Fortified Nutrition • QA Holds & HACCP • Manufacturing OS",
    description:
      "Fortified nutrition run as a SupplierAdvisor® manufacturing entity — BOMs, work orders, QA holds that block ship, HACCP, and lot-level recall packs. Factory physics, not spreadsheets.",
    heroText: "Nourishing a Continent. One Fortified Meal at a Time.",
    howItWorks: [
      { step: 1, title: "Source & Fortify", desc: "Regeneratively grown grains are milled and precision-fortified with 18 essential micronutrients." },
      { step: 2, title: "Package & Verify", desc: "Smart packaging with QR codes linking to full farm-to-fork journey and 24-month shelf life." },
      { step: 3, title: "Distribute & Impact", desc: "Micro-franchise model + school feeding programs. 20 direct jobs per distribution container." }
    ],
    forStakeholders: [
      { title: "For Governments & NGOs", desc: "Cost-effective, high-impact nutrition programs with measurable stunting reduction." },
      { title: "For Retail & Distributors", desc: "Premium margins, long shelf life, and story-driven products." },
      { title: "For Families", desc: "Affordable, delicious, life-changing nutrition. Every purchase funds the next generation's health." }
    ],
    impact: "12.4 million meals delivered. 89,000 children reached. 73.9% higher nutrient retention."
  },
  {
    slug: "direct",
    name: "Direct",
    fullName: "Big Five Direct",
    color: "#f97316",
    icon: "Truck",
    tagline: "Direct-to-Market • Distribution OS • Live OTIF Tracking",
    description:
      "Last-mile and direct trade on SupplierAdvisor® — inbound/outbound logistics, carriers, event-level tracking, and OTIF scorecards so every mile and handoff is visible.",
    heroText: "From Farm Gate to Market Gate. No Middlemen. Pure Value.",
    howItWorks: [
      { step: 1, title: "Hub Activation", desc: "Solar-powered, IoT-enabled micro-hubs deployed in underserved areas. Each hub creates 20+ local jobs." },
      { step: 2, title: "Direct Matching", desc: "AI-powered platform connects producers to verified buyers in real time with max 8% fees." },
      { step: 3, title: "Scale & Replicate", desc: "Proven unit economics: 14-month payback. 340+ hubs live. Expanding to 2,000 by 2028." }
    ],
    forStakeholders: [
      { title: "For Small Producers", desc: "Keep 92% of value. Access working capital and training." },
      { title: "For Urban Markets", desc: "Reliable, traceable supply at competitive prices with volume guarantees." },
      { title: "For Investors", desc: "Asset-backed infrastructure with measurable job creation." }
    ],
    impact: "47,800+ direct jobs created. $184M value retained in rural economies. 13 countries active."
  },
  {
    slug: "access",
    name: "Access",
    fullName: "Big Five Access",
    color: "#3b82f6",
    icon: "Landmark",
    tagline: "Verified Network • B2G Procurement • Transparent Capital",
    description:
      "Capital and tender access for verified companies on the SupplierAdvisor® network — CIPC-style verification, auditable trading relationships, and institutional-grade process for B2G and CSI.",
    heroText: "Opening Doors to Capital. Closing the Gap Between Policy and People.",
    howItWorks: [
      { step: 1, title: "Verify & Onboard", desc: "Rigorous KYC, financials, and impact scoring. Every participant becomes a trusted node." },
      { step: 2, title: "Match & Apply", desc: "AI matches opportunities. Automated bid writing and real-time tender tracking. 70% faster." },
      { step: 3, title: "Win & Deliver", desc: "Win rate 3.2x industry average. Full project management and on-chain reporting." }
    ],
    forStakeholders: [
      { title: "For Government", desc: "Clean, auditable supplier base. Reduced corruption risk." },
      { title: "For Corporations (CSI/ESG)", desc: "Verified, high-impact projects with full traceability." },
      { title: "For SMEs & Cooperatives", desc: "Level playing field. Access to capital and contracts previously out of reach." }
    ],
    impact: "R2.8 billion in contracts facilitated. 14,700 SMEs onboarded. 92% repeat funding rate."
  },
  {
    slug: "connect",
    name: "Connect",
    fullName: "Big Five Connect",
    color: "#06b6d4",
    icon: "Link",
    tagline: "SupplierAdvisor® • Supply Chain OS • OTIFEF · SHEQ · On-chain",
    description:
      "The supply-chain OS for verified trade — inventory, manufacturing, distribution, SHEQ & food safety, finance, ratings, and on-chain pedigree in one light workspace. When a lot fails, the ship stops.",
    heroText: "ERP that ships. Trust that blocks risk.",
    howItWorks: [
      {
        step: 1,
        title: "Register & verify",
        desc: "Company profile, team, certificates. Multi-entity groups get separate workspaces.",
      },
      {
        step: 2,
        title: "Connect & trade",
        desc: "Discover or invite partners. Handshakes, POs, docs, and OTIFEF scorecards.",
      },
      {
        step: 3,
        title: "Operate · prove · improve",
        desc: "Inventory, manufacturing, distribution, finance — plus SHEQ incidents, QA holds, traceability, CAPA, and auditor packs when it matters.",
      },
    ],
    forStakeholders: [
      {
        title: "Business",
        desc: "Manufacturers, distributors, traders — full ops OS with verified network.",
      },
      {
        title: "Government",
        desc: "Transparent procurement and decision tools for public sector impact.",
      },
      {
        title: "Consumers",
        desc: "Scan passports, support ethical brands, shop with real provenance.",
      },
    ],
    impact:
      "One chain. Zero blind spots. 30-day free trial, then from R499/mo — first 50 companies free for life on SupplierAdvisor®.",
  },
  {
    slug: "leadership",
    name: "Leadership",
    fullName: "Big Five Leadership",
    color: "#eab308",
    icon: "Award",
    tagline: "Super-Cube® • Signal over Noise • Leadership Intelligence",
    description:
      "Super-Cube® leadership development for the humans who run the system — the same Intelligence layer on SupplierAdvisor® that pairs enterprise health with doctoral-grade decision capability.",
    heroText: "Leadership That Builds Nations. Not Just Companies.",
    howItWorks: [
      { step: 1, title: "Assess & Diagnose", desc: "Proprietary Super-Cube® 360° assessment measuring 8 dimensions of ethical leadership." },
      { step: 2, title: "Develop & Embed", desc: "Immersive programs combining AI coaching, peer masterminds, and on-chain credentialing." },
      { step: 3, title: "Scale & Multiply", desc: "Graduates become certified facilitators. Organizational transformation programs for governments and corporates." }
    ],
    forStakeholders: [
      { title: "For Executives & Founders", desc: "Transform personal leadership. Build high-trust, high-performance teams." },
      { title: "For Governments", desc: "Develop ethical, future-fit public servants. Reduce corruption." },
      { title: "For Youth & Emerging Leaders", desc: "World-class training at fraction of global cost." }
    ],
    impact: "2,847 leaders certified. 41 organizations transformed. 3.2x improvement in ethical decision-making."
  },
  {
    slug: "foundation",
    name: "Foundation",
    fullName: "Big Five Foundation",
    color: "#0d9488",
    icon: "Heart",
    tagline: "On-Chain Impact • Verified Spend • SDG Alignment",
    description:
      "Philanthropy with the same discipline as trade: verified counterparties, traceable deployment, and transparent chains that support Zero Hunger, Responsible Consumption, and Climate Action.",
    heroText: "Every Rand Tracked. Every Life Changed. Forever.",
    howItWorks: [
      { step: 1, title: "Design & Fund", desc: "Co-create initiatives with communities. Every project has clear theory of change and on-chain escrow." },
      { step: 2, title: "Deliver & Verify", desc: "Real-time data collection via mobile apps and IoT. AI cross-checks impact claims on blockchain." },
      { step: 3, title: "Report & Learn", desc: "Beautiful public dashboards. Lessons published openly. Successful models replicated." }
    ],
    forStakeholders: [
      { title: "For Donors & Impact Investors", desc: "100% transparency. See exactly where every rand goes and the lives it touches." },
      { title: "For Communities", desc: "Co-ownership of solutions. Skills transfer. Sustainable exit strategies." },
      { title: "For Partners", desc: "Shared infrastructure, verified data, and collective impact reporting." }
    ],
    impact: "R187 million deployed. 1.2 million direct beneficiaries. 94% of projects met or exceeded targets."
  },
  {
    slug: "impact",
    name: "Impact",
    fullName: "Big Five Impact",
    color: "#7c3aed",
    icon: "Target",
    tagline: "Portfolio & Milestones • Cross-Entity Delivery • Live Controls",
    description:
      "Programme delivery across Big Five entities on one OS — projects, milestones, verified suppliers, and SHEQ/QA controls so trust and operations never diverge.",
    heroText: "From Strategy to Delivery. Across Africa. On Time. On Impact.",
    howItWorks: [
      { step: 1, title: "Scope & Design", desc: "Define outcomes with governments, funders, and communities. Align every workstream to SDGs and commercial sustainability." },
      { step: 2, title: "Orchestrate & Execute", desc: "Cross-pillar PMO delivery — agri, nutrition, logistics, capital access, and leadership — under one accountable programme office." },
      { step: 3, title: "Measure & Report", desc: "Live dashboards, SupplierAdvisor®-linked commerce where applicable, and verified impact reporting stakeholders can trust." }
    ],
    forStakeholders: [
      { title: "For Governments & DFIs", desc: "One delivery partner that can plan, execute, and report multi-sector programmes with institutional discipline." },
      { title: "For Corporates & CSI", desc: "End-to-end programme management with ethical supply chains and transparent outcomes." },
      { title: "For Communities", desc: "Projects that land on the ground — jobs, nutrition, markets, and skills — not slide decks." }
    ],
    impact: "The connective tissue of the group: turning multi-pillar ambition into continental delivery."
  },
  {
    slug: "global",
    name: "Global",
    fullName: "Big Five Global",
    color: "#0ea5e9",
    icon: "Globe",
    tagline: "Verified Network • Multi-Company Groups • Global Trade",
    description:
      "International partners join the same verified trading network — membership-scoped workspaces, OTIFEF ratings, and on-chain options when capital or pedigree must be proven across borders.",
    heroText: "Africa Rising. The World Watching. Leading with Purpose.",
    howItWorks: [
      { step: 1, title: "Build Global Alliances", desc: "Form strategic partnerships with governments, institutions, and corporations across continents." },
      { step: 2, title: "Export African Excellence", desc: "Share Super-Cube® leadership, regenerative agriculture, and on-chain traceability models worldwide." },
      { step: 3, title: "Create Global Impact", desc: "Position Africa as a global leader in ethical, sustainable, and sovereign development." }
    ],
    forStakeholders: [
      { title: "For International Partners", desc: "Access to verified African supply chains, ethical leadership training, and high-impact investment opportunities." },
      { title: "For African Companies", desc: "Global market access, international credibility, and world-class standards." },
      { title: "For Global Citizens", desc: "Support African-led solutions to climate, nutrition, and leadership challenges." }
    ],
    impact: "Partnerships across 4 continents. 12 global alliances active. Setting new international standards for ethical African business."
  }
];

export const getCompanyBySlug = (slug: string) => companies.find(c => c.slug === slug);
