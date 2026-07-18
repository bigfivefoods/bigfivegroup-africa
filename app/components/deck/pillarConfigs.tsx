import {
  Leaf,
  Tractor,
  LineChart,
  Users,
  Truck,
  Package,
  MapPin,
  Sun,
  Landmark,
  FileCheck,
  Scale,
  Building2,
  MessageSquare,
  Brain,
  Bot,
  ShieldCheck,
  Activity,
  Coins,
  Network,
  Handshake,
} from "lucide-react";
import type { PillarDeckConfig } from "./PillarDeck";
import { sa } from "../../lib/saCopy";

export const agriDeckConfig: PillarDeckConfig = {
  id: "agri-deck",
  printRootId: "agri-deck-print-root",
  themeKey: "emerald",
  eyebrow: `PILLAR DECK · AGRI · ${12} SLIDES`,
  title: "Big Five Agri — strategic deck",
  description:
    "Regenerative production, smallholder livelihoods and verified provenance — the Feed foundation of the Group.",
  sharePath: "/agri#agri-deck",
  shareTitle: "Big Five Agri — Strategic Deck",
  shareText:
    "Regenerative farming, soil health and verified supply for African food security — Big Five Agri.",
  heroTitle: "Regenerate Africa’s soil.",
  heroHighlight: "Feed the continent ethically.",
  heroBody:
    "Big Five Agri partners with farmers, traditional authorities and governments to restore land, verify regenerative practice and supply Foods, Direct and institutional programmes with provenance that markets can trust.",
  meta: [
    "KwaZulu-Natal · Africa",
    "bigfivegroup.africa/agri",
    "Feed pillar",
    "12 slides",
  ],
  agenda: [
    "Why soil and smallholders are food-security infrastructure",
    "How Agri regenerates, verifies and supplies the Group",
    "Proof posture and how we work with Foods & Direct",
    "Who we serve and SDG alignment",
    "How to partner",
  ],
  challengeTitle: "Africa cannot import its way out of empty soil",
  challengeStats: [
    { value: "307M", label: "People in Africa faced hunger in 2024 (SOFI)" },
    { value: "Soil", label: "Degradation undermines yields and resilience" },
    { value: "Smallholders", label: "Feed the continent — often without market power" },
    { value: "Trust", label: "Buyers need provenance, not promises" },
  ],
  challengeBody:
    "Food security starts in the ground. Without regenerative production and fair routes to market, fortification and logistics only treat symptoms. Agri is the Group’s answer at source.",
  solutionTitle: "Regenerative production with proof",
  solutionBody:
    "We onboard farmers with soil and practice data, connect verified produce into Foods and Direct channels, and give governments and buyers dashboards they can audit — AI-assisted monitoring where it multiplies integrity.",
  solutionCards: [
    {
      icon: Leaf,
      t: "Regenerate & verify",
      d: "Soil health, satellite and field verification so regenerative is earned, not claimed.",
    },
    {
      icon: Tractor,
      t: "Smallholder dignity",
      d: "Training, market access and pricing pathways that keep value with producers.",
    },
    {
      icon: LineChart,
      t: "Intelligence at source",
      d: "AI and remote sensing support monitoring, risk and carbon/ESG signals.",
    },
    {
      icon: Network,
      t: "Group supply spine",
      d: "Outputs flow into Foods fortification and Direct last-mile — one system.",
    },
  ],
  proofTitle: "What Agri puts on the table",
  proofStats: [
    { value: "Soil", label: "Regenerative management focus" },
    { value: "Verify", label: "Provenance for buyers & programmes" },
    { value: "AI", label: "Monitoring & integrity signals" },
    { value: "Group", label: "Feeds Foods · Direct · Impact" },
  ],
  proofPoints: [
    "Designed as the regenerative input layer for Big Five Foods",
    "Aligns with national food-security and climate-resilience agendas",
    "Works with traditional authorities and public partners where mandated",
    "On-chain / SA-ready provenance narrative with Connect",
  ],
  howTitle: "How Agri works",
  howSteps: [
    {
      step: "01",
      t: "Regenerate & verify",
      d: "Farmers onboard with soil data, monitoring and regenerative standards.",
    },
    {
      step: "02",
      t: "Connect & transact",
      d: "Buyers access verified inventory, quality evidence and fair contracts.",
    },
    {
      step: "03",
      t: "Impact & scale",
      d: "Dashboards for income, biodiversity and climate-related outcomes.",
    },
  ],
  ecosystemTitle: "Agri inside One Group",
  ecosystemBody:
    "Agri is not a standalone farm project. It is the regenerative spine that makes Foods fortification real, Direct containers meaningful, and Impact programmes honest about supply.",
  ecosystemLinks: [
    { label: "Foods", href: "/foods" },
    { label: "Direct", href: "/direct" },
    { label: "Connect", href: "/connect" },
    { label: "Group", href: "/group" },
    { label: "Impact", href: "/impact" },
  ],
  stakeholdersTitle: "Who partners with Agri",
  stakeholders: [
    {
      icon: Users,
      t: "Farmers & cooperatives",
      d: "Markets, training and verification that raise dignity and income potential.",
    },
    {
      icon: Building2,
      t: "Buyers & institutions",
      d: "Traceable regenerative supply for retail, processing and programmes.",
    },
    {
      icon: Landmark,
      t: "Governments & funds",
      d: "Data for food security, subsidies and climate-linked investment.",
    },
    {
      icon: Handshake,
      t: "Traditional authorities",
      d: "Land and community partnerships with respect for local legitimacy.",
    },
  ],
  sdgTitle: "How Agri serves the Goals",
  sdgs: [
    {
      n: "2",
      t: "Zero Hunger",
      d: "Production systems that sustain supply for nutrition programmes.",
      color: "#DDA63A",
    },
    {
      n: "13",
      t: "Climate Action",
      d: "Regenerative practice and monitoring for resilient landscapes.",
      color: "#3F7E44",
    },
    {
      n: "15",
      t: "Life on Land",
      d: "Soil, biodiversity and land stewardship at the centre of value.",
      color: "#56C02B",
    },
  ],
  whyTitle: "Why organisations choose Agri",
  whyPoints: [
    {
      t: "Source integrity",
      d: "Fortified food stories fail without regenerative, verifiable supply.",
    },
    {
      t: "One Group, not a random farm NGO",
      d: "Built into Foods, Direct, Connect and Impact delivery.",
    },
    {
      t: "Intelligence with humility",
      d: "AI and monitoring serve farmers and buyers — not surveillance theatre.",
    },
    {
      t: "Institutional fluency",
      d: "Traditional authority, government and commercial buyers in one system.",
    },
  ],
  ctaTitle: "Put regeneration on your",
  ctaHighlight: "food-security ambition.",
  ctaBody:
    "Governments, buyers, funds and traditional partners — start a conversation on regenerative supply that feeds Foods and last-mile programmes.",
  ctaSteps: [
    { n: "01", t: "Define the landscape", d: "Regions, crops, partners" },
    { n: "02", t: "Verify the practice", d: "Soil · standards · data" },
    { n: "03", t: "Link the Group", d: "Foods · Direct · Impact" },
  ],
  ctaPrimary: { label: "Partner on Agri", href: "/connect" },
  ctaSecondary: { label: "Explore the Group", href: "/group" },
  ctaEmail: "craig@bigfivegroup.africa",
  footerLine:
    "Big Five Agri · Big Five Group · Feed · Educate · Empower · bigfivegroup.africa/agri",
};

export const directDeckConfig: PillarDeckConfig = {
  id: "direct-deck",
  printRootId: "direct-deck-print-root",
  themeKey: "orange",
  eyebrow: "PILLAR DECK · DIRECT · 12 SLIDES",
  title: "Big Five Direct — strategic deck",
  description:
    "Last-mile distribution, containers and micro-hubs so fortified food and produce reach communities with transparency.",
  sharePath: "/direct#direct-deck",
  shareTitle: "Big Five Direct — Strategic Deck",
  shareText:
    "Last-mile sovereignty: containers, micro-hubs and transparent distribution — Big Five Direct.",
  heroTitle: "Farm gate to market gate.",
  heroHighlight: "No middlemen. Pure value.",
  heroBody:
    "Big Five Direct builds distribution rails — solar micro-hubs, containerised points and transparent logistics — so producers keep value and institutions can see where product sits. Powered with Foods on SupplierAdvisor®.",
  meta: [
    "Last-mile · Containers",
    "bigfivegroup.africa/direct",
    "Empower + Feed",
    "12 slides",
  ],
  agenda: [
    "Why last-mile is where food security fails",
    "Containers, hubs and transparent trade",
    "How Direct multiplies Foods & Agri",
    "Who we serve and SDG alignment",
    "How to partner",
  ],
  challengeTitle: "Value and nutrition die in the last mile",
  challengeStats: [
    { value: "Last mile", label: "Where spoilage, opacity and mark-ups explode" },
    { value: "Producers", label: "Lose margin to stacked intermediaries" },
    { value: "Buyers", label: "Need location, quality and proof — not rumours" },
    { value: "Jobs", label: "Local hubs create dignified distribution work" },
  ],
  challengeBody:
    "You can fortify a porridge and still fail a child if the product never arrives. Direct is the Group’s answer to fragmented logistics and invisible stock.",
  solutionTitle: "Distribution you can see",
  solutionBody:
    "Micro-hubs, container networks and AI-assisted matching move Foods and Agri outputs to markets and programmes — with SupplierAdvisor® visibility and fairer producer economics.",
  solutionCards: [
    {
      icon: Package,
      t: "Container network",
      d: "Deployable distribution points with live map visibility for partners.",
    },
    {
      icon: Sun,
      t: "Solar micro-hubs",
      d: "Infrastructure that creates local jobs and reduces diesel dependency.",
    },
    {
      icon: Truck,
      t: "Direct matching",
      d: "Connect producers to verified buyers with leaner fee structures.",
    },
    {
      icon: MapPin,
      t: "Transparent locations",
      d: "Know where fortified stock sits — critical for institutional feeding.",
    },
  ],
  proofTitle: "What Direct puts on the table",
  proofStats: [
    { value: "Live map", label: "SupplierAdvisor® container embed" },
    { value: "Foods", label: "150k meals · 100k children (Group Foods)" },
    { value: "Hubs", label: "Micro-franchise distribution model" },
    { value: "SA", label: "Verified trade rails" },
  ],
  proofPoints: [
    "Live container network for Big Five Foods on SupplierAdvisor®",
    "Designed to keep more value with producers and communities",
    "Complements school, institutional and retail channels",
    "Part of one Group PMO with Impact — not a lone logistics vendor",
  ],
  howTitle: "How Direct works",
  howSteps: [
    {
      step: "01",
      t: "Activate hubs",
      d: "Deploy micro-hubs and containers where communities need access.",
    },
    {
      step: "02",
      t: "Match & move",
      d: "Connect supply to buyers with transparent tracking.",
    },
    {
      step: "03",
      t: "Scale & prove",
      d: "Replicate unit economics; report jobs and reach with partners.",
    },
  ],
  ecosystemTitle: "Direct inside One Group",
  ecosystemBody:
    "Direct is the blood vessel. Agri and Foods create value; Direct delivers it; Connect verifies it; Impact runs multi-pillar programmes with gates and KPIs.",
  ecosystemLinks: [
    { label: "Foods", href: "/foods" },
    { label: "Agri", href: "/agri" },
    { label: "Connect", href: "/connect" },
    { label: "Impact", href: "/impact" },
    { label: "Group", href: "/group" },
  ],
  stakeholdersTitle: "Who partners with Direct",
  stakeholders: [
    {
      icon: Users,
      t: "Producers",
      d: "Fairer routes to market and retained value.",
    },
    {
      icon: Building2,
      t: "Institutions & schools",
      d: "Reliable last-mile for fortified and staple supply.",
    },
    {
      icon: Coins,
      t: "Investors",
      d: "Infrastructure with measurable jobs and coverage.",
    },
    {
      icon: Network,
      t: "Retail & programmes",
      d: "Transparent stock positions and distribution partners.",
    },
  ],
  sdgTitle: "How Direct serves the Goals",
  sdgs: [
    {
      n: "2",
      t: "Zero Hunger",
      d: "Gets nutrition and staples to the last mile that matters.",
      color: "#DDA63A",
    },
    {
      n: "8",
      t: "Decent Work",
      d: "Local hub and distribution jobs with dignity.",
      color: "#A21942",
    },
    {
      n: "9",
      t: "Industry & Infrastructure",
      d: "Container and hub infrastructure for trade.",
      color: "#FD6925",
    },
  ],
  whyTitle: "Why organisations choose Direct",
  whyPoints: [
    {
      t: "Visibility",
      d: "Live container transparency beats black-box logistics.",
    },
    {
      t: "Mission-aligned",
      d: "Built for fortified food and regenerative produce — not generic haulage.",
    },
    {
      t: "Producer fairness",
      d: "Designed to cut wasteful intermediaries.",
    },
    {
      t: "One accountable Group",
      d: "Foods + Direct + Connect + Impact under one relationship.",
    },
  ],
  ctaTitle: "Put a last-mile system on your",
  ctaHighlight: "nutrition ambition.",
  ctaBody:
    "Governments, programmes and commercial partners — deploy containers and hubs that keep value local and stock visible.",
  ctaSteps: [
    { n: "01", t: "Map the corridor", d: "Origins · destinations" },
    { n: "02", t: "Deploy rails", d: "Hubs · containers · SA" },
    { n: "03", t: "Prove delivery", d: "Jobs · reach · visibility" },
  ],
  ctaPrimary: { label: "Partner on Direct", href: "/connect" },
  ctaSecondary: {
    label: "View SA containers",
    href: "https://www.supplieradvisor.com/dashboard/containers",
    external: true,
  },
  ctaEmail: "craig@bigfivegroup.africa",
  footerLine:
    "Big Five Direct · containers · micro-hubs · bigfivegroup.africa/direct",
};

export const accessDeckConfig: PillarDeckConfig = {
  id: "access-deck",
  printRootId: "access-deck-print-root",
  themeKey: "blue",
  eyebrow: "PILLAR DECK · ACCESS · 12 SLIDES",
  title: "Big Five Access — strategic deck",
  description:
    "Pathways to tenders, CSI and development capital for verified African enterprise — with delivery partners who can execute.",
  sharePath: "/access#access-deck",
  shareTitle: "Big Five Access — Strategic Deck",
  shareText:
    "Capital and institutional access for verified African enterprises — Big Five Access.",
  heroTitle: "Open doors to capital.",
  heroHighlight: "Close the gap between policy and people.",
  heroBody:
    "Big Five Access helps SMEs, cooperatives and implementers qualify for government, CSI and development finance — then deliver with Group pillars so funding becomes outcomes, not paper.",
  meta: [
    "Tenders · CSI · DFI",
    "bigfivegroup.africa/access",
    "Empower pillar",
    "12 slides",
  ],
  agenda: [
    "Why capital fails to reach African implementers",
    "How Access verifies, matches and supports delivery",
    "Link to Connect, Impact and the operating pillars",
    "Who we serve and SDG alignment",
    "How to partner",
  ],
  challengeTitle: "Money exists. Pathways and trust do not.",
  challengeStats: [
    { value: "Tenders", label: "Complex, opaque, paperwork-heavy" },
    { value: "CSI / ESG", label: "Need verified projects, not theatre" },
    { value: "SMEs", label: "Locked out without professional packaging" },
    { value: "Delivery", label: "Funding without PMO becomes waste" },
  ],
  challengeBody:
    "Africa does not only lack capital — it lacks professional routes from opportunity to audited delivery. Access exists to open those doors and hand off to a Group that can execute.",
  solutionTitle: "Institutional access with delivery attached",
  solutionBody:
    "Verify enterprises, match opportunities with AI-assisted workflows, and connect winners to Foods, Direct, Connect and Impact so capital becomes meals, jobs and infrastructure — not only awards letters.",
  solutionCards: [
    {
      icon: FileCheck,
      t: "Verify & onboard",
      d: "KYC, financials and impact readiness so counterparties can trust the node.",
    },
    {
      icon: Scale,
      t: "Match & apply",
      d: "Opportunity matching and bid support that levels the field for SMEs.",
    },
    {
      icon: Landmark,
      t: "Institutional fluency",
      d: "Governments, CSI and DFIs with audit language they recognise.",
    },
    {
      icon: ShieldCheck,
      t: "Deliver with the Group",
      d: "Impact PMO + operating pillars turn wins into outcomes.",
    },
  ],
  proofTitle: "What Access puts on the table",
  proofStats: [
    { value: "Access", label: "Tenders · CSI · development capital" },
    { value: "Verify", label: "Trusted enterprise nodes" },
    { value: "Match", label: "AI-assisted opportunity routing" },
    { value: "Deliver", label: "Group PMO + pillars" },
  ],
  proofPoints: [
    "Built for African SMEs and cooperatives that deserve a fair shot",
    "Designed for clean public procurement and CSI accountability",
    "Never access without a path to delivery capacity",
    "SupplierAdvisor® verification culture across the Group",
  ],
  howTitle: "How Access works",
  howSteps: [
    {
      step: "01",
      t: "Verify & onboard",
      d: "Rigorous readiness so partners enter as trusted nodes.",
    },
    {
      step: "02",
      t: "Match & apply",
      d: "Opportunities matched; applications strengthened.",
    },
    {
      step: "03",
      t: "Win & deliver",
      d: "Execution with Impact and operating pillars.",
    },
  ],
  ecosystemTitle: "Access inside One Group",
  ecosystemBody:
    "Access opens the door; Connect verifies the trade; Foods and Direct deliver the goods; Impact runs the programme. One relationship for funders who are tired of fragmented vendors.",
  ecosystemLinks: [
    { label: "Connect", href: "/connect" },
    { label: "Impact", href: "/impact" },
    { label: "Foods", href: "/foods" },
    { label: "Direct", href: "/direct" },
    { label: "Group", href: "/group" },
  ],
  stakeholdersTitle: "Who partners with Access",
  stakeholders: [
    {
      icon: Landmark,
      t: "Government",
      d: "Cleaner supplier bases and deliverable programmes.",
    },
    {
      icon: Building2,
      t: "Corporates (CSI/ESG)",
      d: "Verified projects with traceability and reporting.",
    },
    {
      icon: Users,
      t: "SMEs & cooperatives",
      d: "Professional pathways into capital and contracts.",
    },
    {
      icon: Coins,
      t: "DFIs & funds",
      d: "Deploy with implementers who can execute.",
    },
  ],
  sdgTitle: "How Access serves the Goals",
  sdgs: [
    {
      n: "8",
      t: "Decent Work",
      d: "Enterprise access that creates real economic participation.",
      color: "#A21942",
    },
    {
      n: "9",
      t: "Industry & Innovation",
      d: "SMEs into formal, verifiable value chains.",
      color: "#FD6925",
    },
    {
      n: "17",
      t: "Partnerships",
      d: "Public, private and community capital aligned on delivery.",
      color: "#19486A",
    },
  ],
  whyTitle: "Why organisations choose Access",
  whyPoints: [
    {
      t: "Not a tender mill",
      d: "Access is fused to delivery capacity across the Group.",
    },
    {
      t: "Trust culture",
      d: "Verification and SupplierAdvisor® standards reduce risk.",
    },
    {
      t: "Institutional language",
      d: "Governments and CSI teams get audit-ready partners.",
    },
    {
      t: "Mission-aligned capital",
      d: "Funding that can become meals, hubs and leadership — not only invoices.",
    },
  ],
  ctaTitle: "Put professional pathways on your",
  ctaHighlight: "capital and CSI ambition.",
  ctaBody:
    "Ministries, CSI teams, DFIs and SME networks — open access with partners who can deliver Feed · Educate · Empower outcomes.",
  ctaSteps: [
    { n: "01", t: "Define the opportunity", d: "Tender · CSI · fund" },
    { n: "02", t: "Verify the implementers", d: "KYC · readiness" },
    { n: "03", t: "Deliver with the Group", d: "PMO · pillars · proof" },
  ],
  ctaPrimary: { label: "Partner on Access", href: "/connect" },
  ctaSecondary: { label: "Explore the Group", href: "/group" },
  ctaEmail: "craig@bigfivegroup.africa",
  footerLine:
    "Big Five Access · capital pathways · bigfivegroup.africa/access",
};

export const connectDeckConfig: PillarDeckConfig = {
  id: "connect-deck",
  printRootId: "connect-deck-print-root",
  themeKey: "cyan",
  eyebrow: "PILLAR DECK · CONNECT · SAM · 13 SLIDES",
  title: "Big Five Connect — strategic deck",
  description:
    "SupplierAdvisor® supply-chain OS with SAM messenger, AI trust and on-chain-ready trade — the digital nervous system of the Group.",
  sharePath: "/connect#connect-deck",
  shareTitle: "Big Five Connect — Strategic Deck",
  shareText:
    "SupplierAdvisor® + SAM: ERP that ships, trust that blocks risk, messenger that teaches the chain.",
  heroTitle: "ERP that ships.",
  heroHighlight: "SAM that teaches the chain.",
  heroBody: `${sa.heroSubtitle} ${sa.sam.oneLiner}`,
  meta: [
    "SupplierAdvisor® · SAM",
    "bigfivegroup.africa/connect",
    "AI · On-chain",
    "13 slides",
  ],
  agenda: [
    "Why African trade needs an OS, not more spreadsheets",
    "SupplierAdvisor® modules and trust layer",
    "SAM — Grok-powered messenger",
    "AI, Live pulse and Super-Cube® leadership link",
    "How to start free and trade with proof",
  ],
  challengeTitle: "Trust is the bottleneck — not ambition",
  challengeStats: [
    { value: "Opaque", label: "Chains hide risk until goods fail" },
    { value: "Silos", label: "Inventory, SHEQ, finance, trade disconnected" },
    { value: "Manual", label: "Teams relearn every system; support queues stall" },
    { value: "Proof", label: "DFIs & governments need audit trails" },
  ],
  challengeBody:
    "Africa’s operators are asked to scale nutrition, manufacturing and public programmes without a single system for verification, lots, ratings and guidance. Connect is that system.",
  solutionTitle: "One supply-chain OS for verified trade",
  solutionBody:
    "Big Five Connect operationalises SupplierAdvisor® for the Group: inventory, manufacturing, distribution, SHEQ, finance, ratings and on-chain pedigree — with SAM as the always-on co-pilot.",
  solutionCards: [
    {
      icon: ShieldCheck,
      t: "Trust that blocks risk",
      d: "Verification, OTIFEF, holds and lot control on the same chain as trade.",
    },
    {
      icon: MessageSquare,
      t: "SAM messenger",
      d: "Grok-powered how-to and ops answers inside the OS.",
    },
    {
      icon: Activity,
      t: "Live pulse",
      d: "Enterprise telemetry across supply, demand, finance and ops.",
    },
    {
      icon: Brain,
      t: "AI-powered trust",
      d: "Matching, insights and risk intelligence that serve operators.",
    },
  ],
  proofTitle: "What Connect puts on the table",
  proofStats: [
    { value: "25+", label: "Modules in the OS" },
    { value: "SAM", label: "Grok-powered messenger" },
    { value: "30d", label: "Free trial" },
    { value: "On-chain", label: "Pedigree when it matters" },
  ],
  proofPoints: [
    "Same platform culture as SupplierAdvisor® globally",
    "Foods and Foundation registered / verified pathways",
    "Live container embed for Foods distribution partners",
    "Super-Cube® leadership culture for the humans who run the system",
  ],
  howTitle: "How Connect works",
  howSteps: [
    {
      step: "01",
      t: "Register & verify",
      d: "Company profile, certificates, multi-entity workspaces.",
    },
    {
      step: "02",
      t: "Trade & ask SAM",
      d: "POs, partners, lots — with in-app guidance.",
    },
    {
      step: "03",
      t: "Prove & improve",
      d: "SHEQ, traceability, ratings and continuous control.",
    },
  ],
  ecosystemTitle: "Connect inside One Group",
  ecosystemBody:
    "Connect is the digital nervous system. Agri, Foods, Direct, Access and Impact run cleaner when verification, inventory and messaging live in one OS.",
  ecosystemLinks: [
    { label: "SAM deep-dive", href: "/connect/sam" },
    { label: "Foods", href: "/foods" },
    { label: "Direct", href: "/direct" },
    { label: "Access", href: "/access" },
    { label: "Group", href: "/group" },
  ],
  stakeholdersTitle: "Who runs on Connect",
  stakeholders: [
    {
      icon: Building2,
      t: "Enterprises & multi-entity groups",
      d: "Foods, Direct, Access-style operators on shared discipline.",
    },
    {
      icon: Users,
      t: "SMEs & suppliers",
      d: "Verified identity and fairer access to trade.",
    },
    {
      icon: Landmark,
      t: "Government & schools",
      d: "Transparent procurement and programme supply.",
    },
    {
      icon: Bot,
      t: "Ops teams",
      d: "SAM + Live pulse so systems teach as they run.",
    },
  ],
  intelTitle: "SAM · AI · Live pulse · Super-Cube®",
  intelBody: sa.sam.promise,
  intelCards: [
    {
      icon: MessageSquare,
      t: sa.sam.name,
      d: sa.sam.tagline + " — " + sa.sam.useCases[0].desc,
    },
    {
      icon: Brain,
      t: "AI trust",
      d: "Verification, matching and risk intelligence on one chain.",
    },
    {
      icon: Activity,
      t: "Live pulse",
      d: "Telemetry so exceptions surface before goods go dark.",
    },
    {
      icon: ShieldCheck,
      t: "On-chain ready",
      d: "Product passports and PO escrow when pedigree or capital must prove.",
    },
  ],
  sdgTitle: "How Connect serves the Goals",
  sdgs: [
    {
      n: "8",
      t: "Decent Work",
      d: "Formal, verifiable trade infrastructure for operators.",
      color: "#A21942",
    },
    {
      n: "12",
      t: "Responsible Consumption",
      d: "Traceability and quality holds on the same chain as commerce.",
      color: "#BF8B2E",
    },
    {
      n: "17",
      t: "Partnerships",
      d: "Shared OS for public, private and programme partners.",
      color: "#19486A",
    },
  ],
  whyTitle: "Why organisations choose Connect",
  whyPoints: [
    {
      t: "Not another dashboard",
      d: "Verification, lots, SHEQ and trade in one light OS.",
    },
    {
      t: "SAM reduces ramp time",
      d: "Teams learn inside the product — not from PDFs alone.",
    },
    {
      t: "Group-native",
      d: "Built for Foods, Direct, Access and multi-entity African operators.",
    },
    {
      t: "Honest AI",
      d: "Intelligence that multiplies dignity and proof — not hype.",
    },
  ],
  ctaTitle: "Stop running trust on spreadsheets.",
  ctaHighlight: "Run it on one OS — with SAM.",
  ctaBody: sa.finalBody,
  ctaSteps: [
    { n: "01", t: "Start free trial", d: "30 days · SA onboarding" },
    { n: "02", t: "Meet SAM", d: "In-app messenger" },
    { n: "03", t: "Trade with proof", d: "Lots · ratings · holds" },
  ],
  ctaPrimary: {
    label: "Start free trial",
    href: "https://www.supplieradvisor.com/onboarding?type=business",
    external: true,
  },
  ctaSecondary: { label: "About SAM", href: "/connect/sam" },
  ctaEmail: "craig@bigfivegroup.africa",
  footerLine:
    "Big Five Connect · SupplierAdvisor® · SAM · bigfivegroup.africa/connect",
};
