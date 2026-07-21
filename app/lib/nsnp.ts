/**
 * South Africa’s National School Nutrition Programme (NSNP)
 * Official programme under the Department of Basic Education (DBE).
 *
 * NSNP provides one nutritious meal per school day to learners in
 * quintile 1–3 public schools (and selected special schools), to enhance
 * learning capacity, attendance and food security among school-age children.
 *
 * Primary official reference (DBE):
 * https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx
 *
 * Additional government overview:
 * https://www.gov.za/about-sa/education
 */

export const NSNP = {
  name: "National School Nutrition Programme",
  shortName: "NSNP",
  department: "Department of Basic Education",
  departmentShort: "DBE",
  /** Primary official programme page */
  officialUrl:
    "https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx",
  /** Government education overview (secondary context) */
  govEducationUrl: "https://www.gov.za/about-sa/education",
  summary:
    "South Africa’s National School Nutrition Programme (NSNP), led by the Department of Basic Education, provides one nutritious meal on each school day to learners in quintile 1–3 public schools (and selected special schools), supporting attendance, concentration and food security.",
} as const;

/**
 * Big Five Foods × NSNP case study (high-level, partner-facing).
 * Programme landed with DBE; 2.5m children/day is planned delivery scale (not current daily headcount).
 */
export const NSNP_CASE = {
  id: "nsnp-fortified-school-nutrition",
  eyebrow: "CASE STUDY · SCHOOL NUTRITION",
  title: "2.5 million children a day — fortified porridges & soya on the NSNP pathway",
  headline: "NSNP programme landed — national school nutrition at plan scale",
  ambition: "2.5 million",
  ambitionUnit: "children a day (plan)",
  productFocus:
    "NSNP-approved institutional SKUs — Enriched Porridge 5kg, Beef Soya Mince 5kg and One-Pot Chicken Biryani Mix 5kg — plus household and catering ranges designed for school-day feeding at scale.",
  approval:
    "Big Five Foods has landed the National School Nutrition Programme (NSNP) pathway with South Africa’s Department of Basic Education — planned to feed 2.5 million children per day with fortified porridges, soya minces and one-pot meals. That scale is a high-level delivery plan as the programme ramps, not a claim of current daily operational headcount.",
  whatWeDeliver: [
    "NSNP-approved Enriched Porridge 5kg for high-volume school kitchens and feeding schemes",
    "NSNP-approved Beef Soya Mince 5kg for protein-forward, cost-efficient daily menus",
    "NSNP-approved One-Pot Chicken Biryani Mix 5kg for complete institutional meal formats",
    "Shelf-stable 5kg packs that support logistics into schools and institutional stores",
    "Ordering and verification pathways via SupplierAdvisor® where programme procurement allows",
  ],
  whyItMatters:
    "When children eat well, they can learn. NSNP is one of the country’s flagship interventions for learner wellbeing. Landing this programme builds institutional credibility that should open pathways into other government departments locally and, as proof compounds, into public-sector programmes across Africa — with Group delivery capacity attached.",
  pillars: ["Foods", "Direct", "Impact", "Connect", "Access"],
  ctaPrimary: { href: "/contact?interest=foods", label: "Discuss school nutrition supply" },
  ctaSecondary: { href: "/foods#foods-deck", label: "Foods product deck" },
} as const;
