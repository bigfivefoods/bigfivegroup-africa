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
  GraduationCap,
  Award,
  BookOpen,
  Heart,
  TrendingUp,
  Globe,
} from "lucide-react";
import type { PillarDeckConfig } from "./PillarDeck";
import { sa } from "../../lib/saCopy";
import { SUPER_CUBE_FMCG_CASE } from "../../lib/superCubeCase";

export const agriDeckConfig: PillarDeckConfig = {
  id: "agri-deck",
  printRootId: "agri-deck-print-root",
  themeKey: "emerald",
  eyebrow: "PILLAR DECK · AGRI · 13 SLIDES",
  title: "Big Five Agri — strategic deck",
  description:
    "Regenerative production, smallholder livelihoods and verified provenance — the Feed foundation of the Group.",
  sharePath: "/agri#agri-deck",
  shareTitle: "Big Five Agri — Strategic Deck",
  shareText:
    "Regenerative farming, soil health and verified supply for African food security — Big Five Agri.",
  heroImage: "/agri-hero.jpg",
  heroTitle: "Regenerate Africa’s soil.",
  heroHighlight: "Feed the continent ethically.",
  heroBody:
    "Big Five Agri partners with farmers, traditional authorities and governments to restore land, verify regenerative practice and supply Foods, Direct and institutional programmes with provenance that markets can trust.",
  meta: [
    "KwaZulu-Natal · Africa",
    "bigfivegroup.africa/agri",
    "Feed pillar",
    "13 slides",
  ],
  agenda: [
    "Group vision, mission and values",
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
  eyebrow: "PILLAR DECK · DIRECT · 13 SLIDES",
  title: "Big Five Direct — strategic deck",
  description:
    "Last-mile distribution, containers and micro-hubs so fortified food and produce reach communities with transparency.",
  sharePath: "/direct#direct-deck",
  shareTitle: "Big Five Direct — Strategic Deck",
  shareText:
    "Last-mile sovereignty: containers, micro-hubs and transparent distribution — Big Five Direct.",
  heroImage: "/container-action-1.jpg",
  heroTitle: "Farm gate to market gate.",
  heroHighlight: "No middlemen. Pure value.",
  heroBody:
    "Big Five Direct builds distribution rails — solar micro-hubs, containerised points and transparent logistics — so producers keep value and institutions can see where product sits. Powered with Foods on SupplierAdvisor®.",
  meta: [
    "Last-mile · Containers",
    "bigfivegroup.africa/direct",
    "Empower + Feed",
    "13 slides",
  ],
  agenda: [
    "Group vision, mission and values",
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
  eyebrow: "PILLAR DECK · ACCESS · 13 SLIDES",
  title: "Big Five Access — strategic deck",
  description:
    "Pathways to tenders, CSI and development capital for verified African enterprise — with delivery partners who can execute.",
  sharePath: "/access#access-deck",
  shareTitle: "Big Five Access — Strategic Deck",
  shareText:
    "Capital and institutional access for verified African enterprises — Big Five Access.",
  heroImage: "/access-hero.jpg",
  heroTitle: "Open doors to capital.",
  heroHighlight: "Close the gap between policy and people.",
  heroBody:
    "Big Five Access helps SMEs, cooperatives and implementers qualify for government, CSI and development finance — then deliver with Group pillars so funding becomes outcomes, not paper.",
  meta: [
    "Tenders · CSI · DFI",
    "bigfivegroup.africa/access",
    "Empower pillar",
    "13 slides",
  ],
  agenda: [
    "Group vision, mission and values",
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
  eyebrow: "PILLAR DECK · CONNECT · SAM · 14 SLIDES",
  title: "Big Five Connect — strategic deck",
  description:
    "SupplierAdvisor® supply-chain OS with SAM messenger, AI trust and on-chain-ready trade — the digital nervous system of the Group.",
  sharePath: "/connect#connect-deck",
  shareTitle: "Big Five Connect — Strategic Deck",
  shareText:
    "SupplierAdvisor® + SAM: ERP that ships, trust that blocks risk, messenger that teaches the chain.",
  heroImage: "/connect-hero.jpg",
  heroTitle: "ERP that ships.",
  heroHighlight: "SAM that teaches the chain.",
  heroBody: `${sa.heroSubtitle} ${sa.sam.oneLiner}`,
  meta: [
    "SupplierAdvisor® · SAM",
    "bigfivegroup.africa/connect",
    "AI · On-chain",
    "14 slides",
  ],
  agenda: [
    "Group vision, mission and values",
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

export const leadershipDeckConfig: PillarDeckConfig = {
  id: "leadership-deck",
  printRootId: "leadership-deck-print-root",
  themeKey: "gold",
  eyebrow: "PILLAR DECK · LEADERSHIP · SUPER-CUBE® · 17 SLIDES",
  title: "Big Five Leadership — strategic deck",
  description:
    "Super-Cube® ethical leadership for nations and enterprises — the Educate pillar of Feed · Educate · Empower.",
  sharePath: "/leadership#leadership-deck",
  shareTitle: "Big Five Leadership — Strategic Deck",
  shareText:
    "Super-Cube® doctoral leadership model for ethical decision-makers across Africa — Big Five Leadership.",
  heroImage: "/leadership-hero.jpg",
  heroTitle: "Leadership that builds nations.",
  heroHighlight: "Not just companies.",
  heroBody:
    "Big Five Leadership develops ethical, whole-person decision-makers through the Super-Cube® doctoral model — so public servants, executives and emerging leaders can run organisations and nations with integrity in an AI-enabled age.",
  meta: [
    "Super-Cube®",
    "bigfivegroup.africa/leadership",
    "Educate pillar",
    "17 slides",
  ],
  agenda: [
    "Group vision, mission and values",
    "Why ethical leadership is African infrastructure",
    "The Super-Cube® Leadership Model — six constructs, you at the centre",
    "Case study: African FMCG value-chain intervention & measured lifts",
    "How programmes work · who we serve · SDGs · partner",
  ],
  challengeTitle: "Skills gaps are also leadership gaps",
  challengeStats: [
    { value: "Ethics", label: "Public and private decisions shape food, capital and trust" },
    { value: "Capacity", label: "Programmes fail when leaders cannot hold complexity" },
    { value: "AI age", label: "Tools without ethical judgment multiply harm" },
    { value: "Ubuntu", label: "Africa needs world-class models rooted in local values" },
  ],
  challengeBody:
    "You can fund fortification and last-mile logistics and still fail if decision-makers lack ethical, whole-person capacity. Leadership is the Educate pillar that makes Feed and Empower sustainable — especially where rapid population growth, talent abundance, skills shortages, poverty and institutional weaknesses collide.",
  solutionTitle: "Super-Cube® ethical leadership development",
  solutionBody:
    "A multidimensional, human-centric framework that integrates six constructs into a cubic structure with the individual (“you”) at the centre — building leadership capacity at personal, organisational and network levels for Africa’s complex FMCG and public-service environments.",
  solutionCards: [
    {
      icon: Award,
      t: "Super-Cube® model",
      d: "Six faces · Choices · Principles · Mental · Emotional · Physical · Spiritual — around you.",
    },
    {
      icon: GraduationCap,
      t: "Assess & develop",
      d: "360° diagnosis, blended NQF-aligned programmes and peer masterminds.",
    },
    {
      icon: Brain,
      t: "Ethical AI coaching",
      d: "Intelligence that supports judgement — never replaces accountability.",
    },
    {
      icon: BookOpen,
      t: "Empirically grounded",
      d: "DBA thesis (UKZN, 2020) · CFA + qualitative validation · peer-reviewed papers.",
    },
  ],
  superCubeModel: {
    logoSrc: "/super-cube-logo.png",
    logoAlt: "Super-Cube®",
    modelTitle: "The Super-Cube® Leadership Model",
    modelSubtitle:
      "A multidimensional, human-centric leadership skills development framework — developed by Dr. Craig Ross Muller (DBA) in 2020 as the core output of his doctoral thesis at the University of KwaZulu-Natal.",
    modelBody:
      "The model positions the individual (“you”) at the centre of a cube whose six faces are Choices, Principles, Mental, Emotional, Physical and Spiritual. Development begins with deliberate investment in the person, then radiates to organisations, networks and industry — so Africa’s leaders can navigate complexity with integrity.",
    highlights: [
      { value: "You", label: "At the centre of the cube" },
      { value: "6 faces", label: "Human-centric constructs" },
      { value: "70–76%", label: "Leadership is developable" },
      { value: "2020", label: "DBA · UKZN · Africa FMCG" },
    ],
    constructs: [
      {
        name: "Choices",
        icon: "/choices-icon.png",
        color: "#ef4444",
        blurb:
          "Decision-making intelligence for complex, dynamic contexts — balancing ethics and outcomes.",
        elements: "Moral values · judgement · risk-taking · choice theory",
      },
      {
        name: "Principles",
        icon: "/principles-icon.png",
        color: "#a855f7",
        blurb:
          "Ethical foundations and governance that build trust — especially where institutions are under stress.",
        elements: "Integrity · contextual awareness · situational judgement · governance",
      },
      {
        name: "Mental",
        icon: "/mental-icon.png",
        color: "#f97316",
        blurb:
          "Cognitive capacity to process complexity, set vision and apply knowledge in African markets.",
        elements: "Strategic thinking · problem-solving · vision · knowledge application",
      },
      {
        name: "Emotional",
        icon: "/emotional-icon.png",
        color: "#22c55e",
        blurb:
          "Emotional intelligence that builds trust, motivation and high-quality relationships.",
        elements: "Empathy · social relationships · motivation · inspiration",
      },
      {
        name: "Physical",
        icon: "/physical-icon.png",
        color: "#3b82f6",
        blurb:
          "Bodily resilience and energy management so leaders can sustain high performance.",
        elements: "Health · fitness · nutrition · energy · resilience",
      },
      {
        name: "Spiritual",
        icon: "/spiritual-icon.png",
        color: "#1e40af",
        blurb:
          "Purpose, meaning and transcendence that anchor authentic integrity over time.",
        elements: "Purpose · meaning · faith · spiritual intelligence",
      },
    ],
    originsTitle: "From DBA thesis to Africa-centric practice",
    originsBody:
      "Developed and tested within an African FMCG business-network, the Super-Cube® model addresses leadership capacity where population growth, talent abundance, skills shortages, corruption pressures and weak institutions demand whole-person leaders. It is among the first empirically validated, Africa-centric leadership development frameworks of its kind.",
    foundations: [
      {
        t: "Integrated leadership theories",
        d: "Trait · relational · charismatic · evolutionary · entrepreneurial leadership — synthesised for African FMCG networks.",
      },
      {
        t: "Buber’s I–Thou philosophy",
        d: "Leaders and followers as multidimensional equals — mutual respect, not people as objects.",
      },
      {
        t: "Illeris learning theory",
        d: "Content · incentive · interaction — blended programmes aligned with South Africa’s NQF.",
      },
    ],
    levelsTitle: "Five progressive levels of application",
    levels: [
      { n: "01", t: "Individual", d: "Personal development plans at the core" },
      { n: "02", t: "Business", d: "Leadership pipelines in single organisations" },
      { n: "03", t: "Group", d: "Enterprise-wide capacity across a business group" },
      { n: "04", t: "Network", d: "Supply-chain and alliance leadership" },
      { n: "05", t: "Industry", d: "Broader African FMCG / sector impact" },
    ],
    validationTitle: "Empirical validation & open resources",
    validationPoints: [
      "Mixed-methods design: confirmatory factor analysis (online survey, n=132) with acceptable model fit",
      "Qualitative validation: thematic analysis of interviews with 10 senior decision-makers",
      "Peer-reviewed publications (SAJEMS 2022 · JCM 2022) · free Super-Cube® book PDF",
      "Honest scope: single-case study within an African FMCG network — wider industry testing is recommended",
    ],
    bookHref: "/the-super-cube-leadership-model.pdf",
    bookLabel: "Download free book",
    siteHref: "https://www.super-cube.com",
    siteLabel: "Explore super-cube.com",
    caseStudy: {
      eyebrow: SUPER_CUBE_FMCG_CASE.eyebrow,
      title: SUPER_CUBE_FMCG_CASE.title,
      body: SUPER_CUBE_FMCG_CASE.body,
      context: SUPER_CUBE_FMCG_CASE.context,
      lifts: SUPER_CUBE_FMCG_CASE.lifts.map((l) => ({
        name: l.name,
        icon: l.icon,
        color: l.color,
        lift: l.lift,
        label: l.label,
      })),
      continentalTitle: SUPER_CUBE_FMCG_CASE.continentalTitle,
      continentalBody: SUPER_CUBE_FMCG_CASE.continentalBody,
      continentalImpacts: SUPER_CUBE_FMCG_CASE.continentalImpacts.map((x) => ({
        t: x.t,
        d: x.d,
      })),
      note: SUPER_CUBE_FMCG_CASE.note,
    },
  },
  proofTitle: "What Leadership puts on the table",
  proofStats: [
    { value: "+45.1%", label: "Principles lift · FMCG case" },
    { value: "+39.5%", label: "Emotional intelligence lift" },
    { value: "+29.7%", label: "Mental intelligence lift" },
    { value: "6 faces", label: "All Super-Cube® constructs improved" },
  ],
  proofPoints: [
    "FMCG value-chain intervention (local + international businesses): Choices +26.6% · Principles +45.1% · Mental +29.7% · Emotional +39.5% · Physical +27.7% · Spiritual +24.7%",
    "Dr. Craig Ross Muller (DBA, UKZN) — Super-Cube® Leadership Model, 2020",
    "Pairs with Connect (SAM) and Impact for decision culture + programme delivery",
    "Youth, executive and public-service pathways under one Africa-centric framework",
  ],
  howTitle: "How Leadership programmes work",
  howSteps: [
    {
      step: "01",
      t: "Assess & diagnose",
      d: "Super-Cube® 360° across the six human-centric constructs.",
    },
    {
      step: "02",
      t: "Develop & embed",
      d: "Blended learning (Illeris content · incentive · interaction), AI coaching and peer accountability.",
    },
    {
      step: "03",
      t: "Scale & multiply",
      d: "Facilitators and organisational transformation across the five application levels.",
    },
  ],
  ecosystemTitle: "Leadership inside One Group",
  ecosystemBody:
    "Leadership educates the humans who run Agri, Foods, Direct, Access, Connect, Foundation and Impact. Without ethical, whole-person decision-makers, the system cannot hold trust or scale with dignity.",
  ecosystemLinks: [
    { label: "Super-Cube® site", href: "https://www.super-cube.com" },
    { label: "Free book PDF", href: "/the-super-cube-leadership-model.pdf" },
    { label: "Connect · SAM", href: "/connect" },
    { label: "Impact", href: "/impact" },
    { label: "Group", href: "/group" },
    { label: "About", href: "/about" },
  ],
  stakeholdersTitle: "Who we develop",
  stakeholders: [
    {
      icon: Building2,
      t: "Executives & founders",
      d: "High-trust teams and ethical enterprise decisions under Super-Cube®.",
    },
    {
      icon: Landmark,
      t: "Governments & public servants",
      d: "Future-fit leadership for policy, delivery and institutional integrity.",
    },
    {
      icon: Users,
      t: "Youth & emerging leaders",
      d: "World-class formation rooted in African context and Ubuntu.",
    },
    {
      icon: Globe,
      t: "Institutions & partners",
      d: "Capability programmes that travel across borders and networks.",
    },
  ],
  sdgTitle: "How Leadership serves the Goals",
  sdgs: [
    {
      n: "4",
      t: "Quality Education",
      d: "Leadership formation as lifelong, ethical education — NQF-aligned pathways.",
      color: "#C5192D",
    },
    {
      n: "16",
      t: "Peace & Institutions",
      d: "Stronger public and private institutions through character and governance.",
      color: "#00689D",
    },
    {
      n: "8",
      t: "Decent Work",
      d: "Leaders who create dignified jobs and fair organisations.",
      color: "#A21942",
    },
  ],
  whyTitle: "Why organisations choose Leadership",
  whyPoints: [
    {
      t: "Not generic MBA theatre",
      d: "Super-Cube® is whole-person, Africa-centric and empirically validated.",
    },
    {
      t: "Mission-critical Educate pillar",
      d: "Feed and Empower fail without ethical decision capacity.",
    },
    {
      t: "Developable leadership (70–76%)",
      d: "Deliberate practice and structured interventions beat pure heredity.",
    },
    {
      t: "Group-integrated · AI with conscience",
      d: "Same north star as Foods, Connect and Impact — humans remain accountable.",
    },
  ],
  ctaTitle: "Put Super-Cube® on your",
  ctaHighlight: "nation or enterprise ambition.",
  ctaBody:
    "Governments, boards and leadership teams — develop ethical, whole-person decision-makers who can hold complexity and serve people.",
  ctaSteps: [
    { n: "01", t: "Define the cohort", d: "Public · private · youth" },
    { n: "02", t: "Assess & design", d: "Super-Cube® six-construct pathway" },
    { n: "03", t: "Develop & multiply", d: "Five levels · capability that scales" },
  ],
  ctaPrimary: { label: "Start a leadership conversation", href: "/connect" },
  ctaSecondary: {
    label: "Explore Super-Cube®",
    href: "https://www.super-cube.com",
    external: true,
  },
  ctaEmail: "craig@bigfivegroup.africa",
  footerLine:
    "Big Five Leadership · Super-Cube® · Educate · bigfivegroup.africa/leadership",
};

export const foundationDeckConfig: PillarDeckConfig = {
  id: "foundation-deck",
  printRootId: "foundation-deck-print-root",
  themeKey: "teal",
  eyebrow: "PILLAR DECK · FOUNDATION · NPO · 13 SLIDES",
  title: "Big Five Foundation — strategic deck",
  description:
    "Verified philanthropy for social, economic and environmental development — registered on SupplierAdvisor®, delivered with Impact.",
  sharePath: "/foundation#foundation-deck",
  shareTitle: "Big Five Foundation — Strategic Deck",
  shareText:
    "Social, economic and environmental development with proof — Big Five Foundation, registered on SupplierAdvisor®.",
  heroImage: "/foundation-hero.jpg",
  heroTitle: "Impact you can verify.",
  heroHighlight: "Social. Economic. Environmental.",
  heroBody:
    "Big Five Foundation is the Group’s philanthropic engine — designing, funding and measuring programmes that advance people, prosperity and planet. Registered on SupplierAdvisor® so partners can trust who they fund.",
  meta: [
    "Registered NPO · SA listed",
    "bigfivegroup.africa/foundation",
    "Cross-cutting impact",
    "13 slides",
  ],
  agenda: [
    "Group vision, mission and values",
    "Why philanthropy needs proof",
    "Social, economic & environmental pillars of development",
    "How Foundation designs, delivers and reports",
    "SDGs and how to partner or donate",
  ],
  challengeTitle: "Intention without proof is not development",
  challengeStats: [
    { value: "Social", label: "Communities need dignity, skills and nutrition — not handouts alone" },
    { value: "Economic", label: "Jobs and enterprise pathways must outlast projects" },
    { value: "Environmental", label: "Soil, climate and land determine long-term food security" },
    { value: "Trust", label: "Donors and CSI need audit trails, not theatre" },
  ],
  challengeBody:
    "Africa’s development challenge is multi-dimensional. Funding that ignores social dignity, economic agency or environmental integrity will not hold. Foundation exists to fund what can be proven — and delivered through the Group.",
  solutionTitle: "Development across three dimensions",
  solutionBody:
    "We co-design programmes with communities, deploy capital with transparent structure, and deliver via Big Five Impact PMO — linking Foods, Agri, Direct, Leadership and Connect where the outcome requires an operating system, not a one-off grant.",
  solutionCards: [
    {
      icon: Users,
      t: "Social development",
      d: "Nutrition, skills, community co-ownership and dignity-first design.",
    },
    {
      icon: TrendingUp,
      t: "Economic development",
      d: "Jobs, micro-enterprise, fair markets and pathways out of dependency.",
    },
    {
      icon: Leaf,
      t: "Environmental development",
      d: "Regenerative land, resilient food systems and climate-aware programmes.",
    },
    {
      icon: ShieldCheck,
      t: "Verified philanthropy",
      d: "Registered on SupplierAdvisor® — transparency partners can audit.",
    },
  ],
  proofTitle: "What Foundation puts on the table",
  proofStats: [
    { value: "Social", label: "People · dignity · skills · nutrition" },
    { value: "Economic", label: "Jobs · enterprise · fair value" },
    { value: "Environmental", label: "Soil · resilience · stewardship" },
    { value: "SA", label: "Registered · verifiable presence" },
  ],
  proofPoints: [
    "Big Five Foundation registered on SupplierAdvisor®",
    "Theory of change, budgets and delivery via Impact PMO",
    "SDG-aligned design (Zero Hunger, education, work, partnerships)",
    "Links to operating pillars so grants become systems, not silos",
  ],
  howTitle: "How Foundation works",
  howSteps: [
    {
      step: "01",
      t: "Design & fund",
      d: "Co-create with communities. Clear theory of change and accountable capital.",
    },
    {
      step: "02",
      t: "Deliver & verify",
      d: "Impact PMO + field evidence. Commerce rails where trade applies.",
    },
    {
      step: "03",
      t: "Report & learn",
      d: "Shared truth for donors and communities. Replicate what works.",
    },
  ],
  ecosystemTitle: "Foundation inside One Group",
  ecosystemBody:
    "Foundation funds and stewards. Impact delivers. Agri, Foods, Direct, Leadership and Connect supply the operating muscle — so social, economic and environmental outcomes reinforce each other.",
  ecosystemLinks: [
    { label: "Impact PMO", href: "/impact" },
    { label: "Foods", href: "/foods" },
    { label: "Agri", href: "/agri" },
    { label: "Leadership", href: "/leadership" },
    { label: "Group", href: "/group" },
  ],
  stakeholdersTitle: "Who partners with Foundation",
  stakeholders: [
    {
      icon: Heart,
      t: "Donors & family offices",
      d: "Transparent capital with outcomes you can see.",
    },
    {
      icon: Building2,
      t: "Corporate CSI / ESG",
      d: "Verified programmes with professional delivery.",
    },
    {
      icon: Users,
      t: "Communities",
      d: "Co-ownership, skills transfer, sustainable exits.",
    },
    {
      icon: Landmark,
      t: "Governments & partners",
      d: "Shared infrastructure and collective impact reporting.",
    },
  ],
  sdgTitle: "How Foundation serves the Goals",
  sdgs: [
    {
      n: "1",
      t: "No Poverty",
      d: "Economic pathways and dignity beyond short-term aid.",
      color: "#E5243B",
    },
    {
      n: "2",
      t: "Zero Hunger",
      d: "Nutrition programmes linked to Foods and last-mile delivery.",
      color: "#DDA63A",
    },
    {
      n: "17",
      t: "Partnerships",
      d: "Donors, CSI, communities and operating pillars as one system.",
      color: "#19486A",
    },
  ],
  whyTitle: "Why partners choose Foundation",
  whyPoints: [
    {
      t: "Three-dimensional development",
      d: "Social, economic and environmental — not single-issue theatre.",
    },
    {
      t: "Proof culture",
      d: "Registered on SupplierAdvisor®; delivered with Impact discipline.",
    },
    {
      t: "Operating muscle",
      d: "Grants can activate Foods, Agri, Direct and Leadership.",
    },
    {
      t: "Same Group north star",
      d: "Feed · Educate · Empower with values that do not compromise.",
    },
  ],
  ctaTitle: "Fund development that can be",
  ctaHighlight: "proven — and delivered.",
  ctaBody:
    "Foundations, CSI leads and partners — structure programmes with transparent capital and a Group that can execute social, economic and environmental outcomes.",
  ctaSteps: [
    { n: "01", t: "Define the outcome", d: "Social · economic · environment" },
    { n: "02", t: "Design with proof", d: "Theory of change · budget" },
    { n: "03", t: "Deliver & report", d: "Impact PMO · SA transparency" },
  ],
  ctaPrimary: { label: "Partner with Foundation", href: "/connect" },
  ctaSecondary: { label: "See Big Five Impact", href: "/impact" },
  ctaEmail: "craig@bigfivegroup.africa",
  footerLine:
    "Big Five Foundation · NPO · SupplierAdvisor® · social · economic · environmental · bigfivegroup.africa/foundation",
};
