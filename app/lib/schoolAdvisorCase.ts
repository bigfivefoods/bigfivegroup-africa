/**
 * SupplierAdvisor® · SchoolAdvisor module — case study response to
 * national school kitchen food-safety compliance gaps under NSNP.
 *
 * External context: News24 reporting (Prega Govender, Aug 2026) on NSNP
 * kitchen safety compliance. Cite as journalism — not Big Five audited metrics.
 */

import { NSNP } from "./nsnp";

/** Public article that frames the problem this case answers */
export const SCHOOL_MEAL_SAFETY_SOURCE = {
  outlet: "News24",
  author: "Prega Govender",
  title:
    "School meal crisis: Millions of SA pupils fed from kitchens without safety compliance",
  publishedLabel: "August 2026",
  url: "https://www.news24.com/southafrica/education/school-meal-crisis-millions-of-sa-pupils-fed-from-kitchens-without-safety-compliance-20260811-1221",
  /** Headline stats as reported / widely cited from that reporting */
  nsnpPupilsDaily: "9.4M",
  compliantShareSixProvinces: "18%",
  nonCompliantKitchenFraming:
    "Only about 18% of schools in six provinces operating feeding schemes meet legal requirements for food handling — leaving millions of learners dependent on kitchens that have not met the safety bar the law expects.",
  schoolsUncertifiedFraming:
    "Public reporting around the same story has put the non-compliant kitchen footprint in the multi-thousand range across the six provinces examined — a scale problem that circulars and ad-hoc inspections cannot close alone.",
} as const;

export const SCHOOL_ADVISOR_CASE = {
  id: "schooladvisor-kitchen-safety-nsnp",
  logoSrc: "/supplieradvisor-logo-transparent.png",
  logoAlt: "SupplierAdvisor®",
  siteUrl: "https://www.supplieradvisor.com/",
  moduleName: "SchoolAdvisor",
  eyebrow: "CASE STUDY · SCHOOLADVISOR · SUPPLIERADVISOR®",
  title: "Kitchen safety compliance for NSNP — visibility the department can govern",
  headline: "When millions eat at school, every kitchen must be on a compliance OS",
  ambition: "9.4M",
  ambitionUnit: "pupils fed daily under NSNP (reported programme scale)",
  secondaryStat: { value: "18%", label: "schools meeting food-handling rules · 6 provinces (reported)" },
  tagline: "SchoolAdvisor on SupplierAdvisor® — compliance where meals are cooked",
  problemLead:
    "South Africa’s National School Nutrition Programme is one of the largest daily feeding systems on the continent. The operational risk is not only what is on the menu — it is whether the kitchen that prepares the meal is legally fit to handle food.",
  problemBody:
    "Investigative reporting in August 2026 (News24) put a stark number in public view: of schools operating feeding schemes across six provinces, only about 18% meet legal requirements for food handling, while roughly 9.4 million pupils receive food through NSNP each school day. When kitchens are uncertified or under-inspected, learners carry the food-safety risk — and the Department of Basic Education (with provincial education departments) inherits a governance problem that paper directories cannot solve at scale.",
  problemContext:
    "Certificates expire. Inspections lag. Service providers and school kitchens improvise. Without a shared live register of kitchen readiness, food-handler competence, incidents and corrective action, non-compliance is discovered after the meal is served — if it is discovered at all.",
  /** How SchoolAdvisor answers DBE / PEDs */
  solutionLead:
    "SchoolAdvisor is the school-feeding module on SupplierAdvisor® (www.supplieradvisor.com) — the operating layer Big Five Connect deploys so education authorities can see, score and improve kitchen food-safety compliance in the same OS that already holds approved products, menus and supplier trade.",
  actors: [
    {
      t: "Department of Basic Education · PEDs",
      d: "Set national/provincial kitchen and food-handling standards on the platform; see compliance heatmaps by province, district and school; drive remediation with a live trail.",
    },
    {
      t: "Schools & NSNP kitchens",
      d: "Register kitchen sites, upload certificates, complete food-safety checklists, log incidents and CAPA — compliance becomes daily work, not a once-a-year scramble.",
    },
    {
      t: "Service providers & suppliers",
      d: "Trade and deliver against schools that can show kitchen readiness; verified offtake links product, provider and plate on one chain.",
    },
  ],
  howItWorks: [
    {
      t: "Kitchen register & certificates",
      d: "Every participating school kitchen is a governed site on SchoolAdvisor — certificate status, expiry alerts and legal food-handling requirements in one profile the department can query.",
    },
    {
      t: "Food-safety & SHEQ controls",
      d: "SupplierAdvisor® SHEQ patterns (incidents, hazards, NCR/CAPA, checklists) applied to school kitchens — holds and corrective action before the next serving day, not only after a crisis.",
    },
    {
      t: "Competence & training trail",
      d: "Food-handler training and role competence live next to the kitchen record so PEDs know who is authorised to prepare programme meals.",
    },
    {
      t: "Inspection & audit packs",
      d: "District and provincial inspections log findings on-platform; exportable auditor packs give DBE and oversight bodies a single evidence set.",
    },
    {
      t: "Tied to approved products & menus",
      d: "SchoolAdvisor sits on the same SupplierAdvisor® fabric as approved NSNP products and menus — so compliance is about both what is cooked and where it is cooked.",
    },
    {
      t: "Incentives & escalation",
      d: "Dashboards surface non-compliant sites; programmes can prioritise support, restrict risky offtake pathways, and reward kitchens that stay inside the rules.",
    },
  ],
  outcomes: [
    "A national-to-school visibility model for kitchen food-safety status under NSNP — not scattered paper files",
    "Earlier detection of expired certificates, failed inspections and open CAPA on feeding sites",
    "Stronger assurance that the 9.4 million daily meals are prepared in kitchens the department can govern",
    "One OS linking DBE/PEDs, schools, service providers and suppliers for both product rules and kitchen readiness",
    "A scalable response to the public compliance gap reported across six provinces — designed for rollout, not a pilot spreadsheet",
  ],
  whyItMatters:
    "Feeding 9.4 million learners is a nutrition victory only if every plate is safe. SchoolAdvisor turns kitchen compliance into live operating data for the Department of Basic Education — so legal food-handling requirements are managed where meals are actually cooked, on the same SupplierAdvisor® network that already aligns products, menus and trade.",
  programmeNote: `${NSNP.shortName} is led by the ${NSNP.department}. SchoolAdvisor is a SupplierAdvisor® module for school-feeding programme operations (kitchen compliance, SHEQ, inspections, offtake context). It complements — and can share data with — the DBE approved products & menus network described in our KZN compliance case study.`,
  pillars: ["Connect", "Foods", "Impact", "Access"],
  stats: [
    { value: "9.4M", label: "Pupils fed daily · NSNP (reported)" },
    { value: "18%", label: "Meet food-handling rules · 6 provinces (reported)" },
    { value: "SchoolAdvisor", label: "Module on SupplierAdvisor®" },
    { value: "DBE · PEDs", label: "Govern kitchen compliance live" },
  ],
  note:
    "Pupil count (≈9.4 million daily) and the ≈18% food-handling compliance figure for schools in six provinces are drawn from public News24 reporting (August 2026) and related public discussion of that story. They are external journalistic / programme-context figures — not Big Five audited metrics or a live census. SchoolAdvisor capabilities describe the platform design for how education authorities can address the problem; live configuration, provincial coverage and enforcement rules are confirmed in dated partner briefs with Big Five Connect.",
  source: SCHOOL_MEAL_SAFETY_SOURCE,
  ctaPrimary: {
    href: "https://www.supplieradvisor.com/onboarding?type=business",
    label: "Open SupplierAdvisor® · SchoolAdvisor",
    external: true,
  },
  ctaSecondary: {
    href: "/connect#case-study-sa",
    label: "DBE × KZN products & menus case",
  },
  ctaTertiary: {
    href: "/contact?interest=connect&topic=schooladvisor",
    label: "Book a SchoolAdvisor briefing",
  },
  ctaFoods: { href: "/foods#case-study", label: "Foods · NSNP product case" },
} as const;
