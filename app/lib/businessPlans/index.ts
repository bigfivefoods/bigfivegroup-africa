/**
 * Registry of operating-company business plans for the investor portal.
 * Start with Big Five Foods; additional opcos added as authored.
 */

import { foodsBusinessPlan } from "./foodsBusinessPlan";
import type { BusinessPlan } from "./types";

export type BusinessPlanRegistryEntry = {
  slug: string;
  opcoSlug: string;
  name: string;
  fullName: string;
  status: "published" | "coming_soon";
  blurb: string;
  plan?: BusinessPlan;
};

export const BUSINESS_PLANS: BusinessPlanRegistryEntry[] = [
  {
    slug: "foods",
    opcoSlug: "foods",
    name: "Foods",
    fullName: "Big Five Foods",
    status: "published",
    blurb:
      "Fortified staples · retail listings · KZN NSNP · Howick packing→blending · R80m 4-month pipeline · Africa acceleration",
    plan: foodsBusinessPlan,
  },
  {
    slug: "agri",
    opcoSlug: "agri",
    name: "Agri",
    fullName: "Big Five Agri",
    status: "coming_soon",
    blurb: "Regenerative production & offtake — business plan forthcoming",
  },
  {
    slug: "direct",
    opcoSlug: "direct",
    name: "Direct",
    fullName: "Big Five Direct",
    status: "coming_soon",
    blurb: "Last-mile containers & mobility hubs — business plan forthcoming",
  },
  {
    slug: "connect",
    opcoSlug: "connect",
    name: "Connect",
    fullName: "Big Five Connect",
    status: "coming_soon",
    blurb: "SupplierAdvisor® operating system — business plan forthcoming",
  },
  {
    slug: "access",
    opcoSlug: "access",
    name: "Access",
    fullName: "Big Five Access",
    status: "coming_soon",
    blurb: "Public & development pathways — business plan forthcoming",
  },
  {
    slug: "impact",
    opcoSlug: "impact",
    name: "Impact",
    fullName: "Big Five Impact",
    status: "coming_soon",
    blurb: "Programme PMO & delivery — business plan forthcoming",
  },
  {
    slug: "leadership",
    opcoSlug: "leadership",
    name: "Leadership",
    fullName: "Big Five Leadership",
    status: "coming_soon",
    blurb: "Super-Cube® formation — business plan forthcoming",
  },
  {
    slug: "foundation",
    opcoSlug: "foundation",
    name: "Foundation",
    fullName: "Big Five Foundation",
    status: "coming_soon",
    blurb: "Philanthropic & community rails — business plan forthcoming",
  },
  {
    slug: "global",
    opcoSlug: "global",
    name: "Global",
    fullName: "Big Five Global",
    status: "coming_soon",
    blurb: "International route-to-market — business plan forthcoming",
  },
];

export function getBusinessPlan(slug: string): BusinessPlan | undefined {
  return BUSINESS_PLANS.find((e) => e.slug === slug && e.status === "published")?.plan;
}

export { foodsBusinessPlan } from "./foodsBusinessPlan";
export type { BusinessPlan, BusinessPlanChapter, BusinessPlanBlock } from "./types";
