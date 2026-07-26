/**
 * SupplierAdvisor® / Big Five Connect case study —
 * DBE-aligned school nutrition network in KwaZulu-Natal.
 * Platform: www.supplieradvisor.com
 *
 * Scale figures are approximate programme scope (not audited headcount).
 */

import { NSNP } from "./nsnp";

export const SA_CASE = {
  id: "sa-dbe-kzn-school-nutrition",
  logoSrc: "/supplieradvisor-logo-transparent.png",
  logoAlt: "SupplierAdvisor®",
  siteUrl: "https://www.supplieradvisor.com/",
  eyebrow: "CASE STUDY · BIG FIVE CONNECT · SUPPLIERADVISOR®",
  title:
    "DBE, ~1,800 service providers and ~6,000 KZN schools on one compliance network",
  headline: "School nutrition compliance — set once, enforced on the network",
  ambition: "~6,000",
  ambitionUnit: "KZN schools · one verified network",
  secondaryStat: { value: "~1,800", label: "service providers" },
  tagline: "The world’s most trusted supplier advice",
  /** Opening narrative */
  body:
    "Big Five Connect runs SupplierAdvisor® so the Department of Basic Education can align school nutrition delivery across KwaZulu-Natal: roughly 1,800 service providers and approximately 6,000 schools on one verified operating fabric — where approved products, menus and compliance incentives live in the same place as trade.",
  context:
    "Without a shared system, approved menus stay in circulars and inboxes while kitchens and contractors improvise. On SupplierAdvisor® the department sets what may be supplied and served; service providers and schools see the same rules — and are incentivised to comply — so learners get the nutrition the programme requires.",
  /** Who is on the network */
  actors: [
    {
      t: "Department of Basic Education",
      d: "Sets approved products and menus on the platform — one source of truth for what may be bought and served under the programme.",
    },
    {
      t: "~1,800 service providers",
      d: "Caterers and suppliers operate against that approved list, with visibility, verification and incentives aligned to DBE requirements.",
    },
    {
      t: "~6,000 KZN schools",
      d: "Schools on the network receive and serve from the same approved products and menus — compliance becomes the path of least resistance.",
    },
  ],
  /** How the model works */
  howItWorks: [
    {
      t: "Approved products & menus",
      d: "DBE publishes what is approved on SupplierAdvisor® — products and menus the network must follow, not a parallel spreadsheet.",
    },
    {
      t: "Shared visibility",
      d: "Service providers and schools work from the same catalogue and rules as the department, reducing ambiguity and unapproved substitution.",
    },
    {
      t: "Incentives to comply",
      d: "Providers and schools are incentivised to stay inside DBE requirements — good behaviour is rewarded on the network, not only policed after the fact.",
    },
    {
      t: "Nutrition that reaches the child",
      d: "When the approved list and the kitchen align, learners are more likely to receive the fortified, programme-grade meals they need to learn.",
    },
  ],
  outcomes: [
    "One network linking the department, service providers and KZN schools for school nutrition delivery",
    "DBE-controlled approved products and menus as live operating rules — not paper only",
    "Compliance incentives for service providers and schools to follow DBE requirements",
    "Stronger assurance that children receive the nutrition the programme designs for them",
    "A B2G proof point for SupplierAdvisor® that Big Five Connect can extend to other departments and provinces",
  ],
  whyItMatters:
    "School feeding only works when the plate matches the policy. Connecting DBE authority with the people who buy, cook and serve — at roughly 1,800 providers and 6,000 schools in KZN — turns SupplierAdvisor® into a compliance and nutrition engine, not just a marketplace.",
  programmeNote: `${NSNP.shortName} context: South Africa’s ${NSNP.name} is led by the ${NSNP.department}. This case study is the Big Five Connect / SupplierAdvisor® operating model that helps enforce approved products and menus across the KZN delivery network.`,
  pillars: ["Connect", "Foods", "Direct", "Impact", "Access"],
  stats: [
    { value: "~1,800", label: "Service providers (approx.)" },
    { value: "~6,000", label: "KZN schools (approx.)" },
    { value: "DBE", label: "Sets products & menus" },
    { value: "Incentives", label: "Compliance by design" },
  ],
  note:
    "Service provider (~1,800) and school (~6,000 KZN) figures are approximate programme-scale estimates for this case study — not a real-time census. Product, menu and incentive rules are as configured with the department on SupplierAdvisor® and may evolve. Confirm live scope with Big Five Connect.",
  ctaPrimary: {
    href: "https://www.supplieradvisor.com/onboarding?type=business",
    label: "Start free trial on SupplierAdvisor®",
    external: true,
  },
  ctaSecondary: { href: "/connect", label: "Big Five Connect · SAM" },
  ctaTertiary: { href: "/contact?interest=connect", label: "Book a Connect briefing" },
  ctaFoods: { href: "/foods#case-study", label: "Foods · NSNP product case" },
} as const;
