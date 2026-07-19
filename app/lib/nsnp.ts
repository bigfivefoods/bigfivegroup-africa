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
 * Scale figure is a group delivery ambition / approved pathway claim as stated by the business.
 */
export const NSNP_CASE = {
  id: "nsnp-fortified-school-nutrition",
  eyebrow: "CASE STUDY · SCHOOL NUTRITION",
  title: "2.5 million children a day — fortified porridges & soya on the NSNP pathway",
  headline: "Serving learners at national scale",
  ambition: "2.5 million",
  ambitionUnit: "children a day",
  productFocus:
    "Fortified porridges and soya minces — designed for institutional and school-day feeding at scale.",
  approval:
    "Big Five Foods is approved to supply fortified porridges and soya minces on pathways aligned with South Africa’s National School Nutrition Programme (NSNP), overseen by the Department of Basic Education — supporting daily school nutrition menus at institutional scale.",
  whatWeDeliver: [
    "Fortified porridge ranges suitable for high-volume school kitchens and feeding schemes",
    "Soya mince products for protein-forward, cost-efficient daily menus",
    "Shelf-stable formats that support logistics into schools and institutional stores",
    "Ordering and verification pathways via SupplierAdvisor® where programme procurement allows",
  ],
  whyItMatters:
    "When children eat well, they can learn. NSNP is one of the country’s flagship interventions for learner wellbeing. Big Five Foods aligns product design — fortification, affordability, and institutional pack formats — with that mission, so approved supply can reach learners every school day.",
  pillars: ["Foods", "Direct", "Impact", "Connect"],
  ctaPrimary: { href: "/contact?interest=foods", label: "Discuss school nutrition supply" },
  ctaSecondary: { href: "/foods#foods-deck", label: "Foods product deck" },
} as const;
