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
    tagline: "Regenerative Farming • On-Chain Traceability • Carbon Negative",
    description: "Africa's premier regenerative agriculture platform. From soil to soul, we restore ecosystems, empower smallholder farmers, and deliver verified, premium produce with full blockchain provenance.",
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
    tagline: "Fortified Nutrition • 24-Month Shelf Life • 73.9% Superior Formulation",
    description: "Revolutionary African nutrition brand. Our fortified staples and ready-to-eat meals combat malnutrition at scale while creating sustainable jobs.",
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
    tagline: "Direct-to-Market • Micro-Franchise Ecosystems • Last-Mile Sovereignty",
    description: "Eliminating middlemen through solar-powered micro-hubs and containerized distribution points across the continent.",
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
    tagline: "Government Funding • CSI Optimization • Sovereign Capital Access",
    description: "Unlocking billions in government tenders, development finance, and corporate social investment for verified African enterprises.",
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
    tagline: "SupplierAdvisor® • Ethical Blockchain ERP • AI-Powered Trust",
    description: "The operating system for ethical African commerce. Blockchain verification, real-time AI insights, and end-to-end traceability.",
    heroText: "Verified. Transparent. Accelerating Humanity.",
    howItWorks: [
      { step: 1, title: "Verify & Onboard", desc: "Every participant completes AI + human verification with certificates, bank details, and ethical scoring." },
      { step: 2, title: "Connect & Transact", desc: "Smart matching, on-chain POs, live GPS/IoT tracking, automated payments, and RIAD risk scoring." },
      { step: 3, title: "Track & Improve", desc: "QR scan reveals full journey. AI insights predict delays and link every purchase to UN SDGs." }
    ],
    forStakeholders: [
      { title: "For Conscious Consumers", desc: "Scan any product. See the complete verified story. Shop only verified ethical brands." },
      { title: "For Business", desc: "Total visibility from farm to shelf. AI-powered supplier matching and predictive logistics." },
      { title: "For Government", desc: "Transparent public procurement and real-time corruption detection." }
    ],
    impact: "The same platform trusted by SupplierAdvisor® users globally. Now supercharged for African sovereignty."
  },
  {
    slug: "leadership",
    name: "Leadership",
    fullName: "Big Five Leadership",
    color: "#eab308",
    icon: "Award",
    tagline: "Super-Cube® Doctoral Model • Ethical AI Leadership • Sovereign Decision Making",
    description: "World-class leadership development rooted in Dr. Craig R. Muller’s Super-Cube® doctoral model.",
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
    tagline: "On-Chain NPO • Measurable Impact • Sovereign Philanthropy",
    description: "The philanthropic engine of the group. We design, fund, and measure high-impact initiatives with radical transparency.",
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
    slug: "global",
    name: "Global",
    fullName: "Big Five Global",
    color: "#0ea5e9",
    icon: "Globe",
    tagline: "International Partnerships • African Standards • Global Impact",
    description: "Extending African sovereignty, ethical leadership, and regenerative commerce to the world stage through strategic global partnerships.",
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
