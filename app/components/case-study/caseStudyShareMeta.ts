/** Canonical share targets for case studies (absolute path + hash). */
export type CaseStudyShareId = "sa-dbe-kzn" | "schooladvisor-kitchen" | "nsnp-foods";

export type CaseStudyShareMeta = {
  id: CaseStudyShareId;
  path: string;
  title: string;
  text: string;
  /** Short label for UI */
  label: string;
};

export const CASE_STUDY_SHARE: Record<CaseStudyShareId, CaseStudyShareMeta> = {
  "sa-dbe-kzn": {
    id: "sa-dbe-kzn",
    path: "/connect#case-study-sa",
    label: "DBE × KZN network",
    title: "SupplierAdvisor® · DBE school nutrition compliance network | Big Five Connect",
    text:
      "How SupplierAdvisor® aligns the Department of Basic Education with ~1,800 service providers and ~6,000 KZN schools — approved products, menus and compliance incentives on one OS.",
  },
  "schooladvisor-kitchen": {
    id: "schooladvisor-kitchen",
    path: "/connect#case-study-schooladvisor",
    label: "SchoolAdvisor · kitchen safety",
    title: "SchoolAdvisor® · NSNP kitchen food-safety compliance | Big Five Connect",
    text:
      "Only ~18% of schools in six provinces meet legal food-handling rules while ~9.4M pupils eat via NSNP (News24). How SchoolAdvisor on SupplierAdvisor® helps DBE govern kitchen compliance.",
  },
  "nsnp-foods": {
    id: "nsnp-foods",
    path: "/foods#case-study",
    label: "NSNP · Big Five Foods",
    title: "NSNP pathway · fortified school nutrition | Big Five Foods",
    text:
      "Big Five Foods has landed the NSNP pathway with DBE — fortified institutional packs at plan scale of 2.5 million children per day. Read the case study.",
  },
};

export function caseStudyAbsoluteUrl(path: string, withUtm = true): string {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://bigfivegroup.africa";
  const base = `${origin}${path}`;
  if (!withUtm) return base;
  try {
    const u = new URL(base, "https://bigfivegroup.africa");
    if (!u.searchParams.has("utm_source")) {
      u.searchParams.set("utm_source", "case_study_share");
      u.searchParams.set("utm_medium", "social");
      u.searchParams.set(
        "utm_campaign",
        path.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "case_study"
      );
    }
    // Preserve hash after search params for share tools that strip order oddly
    return u.toString();
  } catch {
    return base;
  }
}
