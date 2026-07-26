import type { Story } from "./types";

/** Initial published stories when the store is empty (matches prior static /updates). */
export function seedStories(): Story[] {
  const now = new Date().toISOString();
  const base = (partial: Omit<Story, "createdAt" | "updatedAt" | "status"> & { publishedAt: string }): Story => ({
    ...partial,
    status: "published",
    createdAt: partial.publishedAt,
    updatedAt: now,
  });

  return [
    base({
      id: "seed_nsnp_2026",
      slug: "school-nutrition-national-scale-nsnp",
      title: "School nutrition at national scale — 2.5 million children a day",
      excerpt:
        "Big Five Foods has landed the NSNP pathway with South Africa’s Department of Basic Education — planned delivery scale for fortified porridges and soya on school menus.",
      tag: "Foods · NSNP",
      publishedAt: "2026-07-01T10:00:00.000Z",
      coverImage: "/foods-hero.jpg",
      body: `## A national pathway for school nutrition

Big Five Foods has landed the **National School Nutrition Programme (NSNP)** pathway with South Africa’s Department of Basic Education — planned to feed **2.5 million children per day** with fortified porridges and soya minces.

That scale is a **high-level delivery plan** as the programme ramps — not a claim of current daily operational headcount.

## What we supply

- NSNP-approved **Enriched Porridge 5kg**
- NSNP-approved **Beef Soya Mince 5kg**
- NSNP-approved **One-Pot Chicken Biryani Mix 5kg**
- Household and catering ranges for broader channels

## Why it matters

When children eat well, they can learn. NSNP is one of the country’s flagship interventions for learner wellbeing. Landing this programme builds institutional credibility that should open pathways into other government departments — always with Group delivery capacity attached.

[Read the Foods case study](/foods#case-study) · [Official NSNP (DBE)](https://www.education.gov.za/Programmes/NationalSchoolNutritionProgramme.aspx)
`,
    }),
    base({
      id: "seed_supplieradvisor_2026",
      slug: "supplieradvisor-dbe-kzn-school-nutrition",
      title: "SupplierAdvisor® aligns DBE with ~1,800 providers and ~6,000 KZN schools",
      excerpt:
        "Big Five Connect uses SupplierAdvisor® so the Department of Basic Education can set approved products and menus — with service providers and schools incentivised to comply for learner nutrition.",
      tag: "Connect · SupplierAdvisor® · DBE",
      publishedAt: "2026-07-20T10:00:00.000Z",
      coverImage: "/connect-hero.jpg",
      body: `## School nutrition compliance on one network

**Big Five Connect** runs **SupplierAdvisor®** so South Africa’s Department of Basic Education can align school nutrition delivery in KwaZulu-Natal: roughly **1,800 service providers** and approximately **6,000 schools** on one verified operating fabric.

## How it works

1. **DBE sets approved products and menus** on the platform — one source of truth.
2. **Service providers and schools** work from the same rules, not parallel spreadsheets.
3. **Incentives** reward compliance with DBE requirements — good behaviour is the path of least resistance.
4. **Learners** are more likely to receive the nutrition the programme designs for them.

Scale figures are **approximate programme scope**, not a real-time census.

[Read the full case study](/connect#case-study-sa) · [Foods · NSNP products](/foods#case-study) · [Meet SAM](/connect/sam)
`,
    }),
    base({
      id: "seed_supercube_fmcg_2026",
      slug: "super-cube-african-fmcg-value-chain",
      title: "Super-Cube® lifts across the African FMCG value chain",
      excerpt:
        "Measured construct improvements after a Super-Cube® intervention for local and international FMCG businesses.",
      tag: "Leadership · FMCG",
      publishedAt: "2026-05-01T10:00:00.000Z",
      coverImage: "/leadership-hero.jpg",
      body: `## Leadership that moves the chain

Measured construct improvements after a **Super-Cube®** intervention for local and international FMCG businesses — including Principles **+45.1%**, Emotional **+39.5%**, and lifts across all six faces of the cube.

## Educate pillar

Super-Cube® is the Group’s Educate engine — whole-person formation for executives, public servants and emerging leaders.

[View the FMCG case study](/leadership#case-study) · [Explore Leadership](/leadership)
`,
    }),
    base({
      id: "seed_supercube_pillar",
      slug: "super-cube-educate-pillar",
      title: "Super-Cube® — from DBA thesis to Group Educate pillar",
      excerpt:
        "Empirically grounded leadership formation for executives, public servants and youth — free book and peer-reviewed papers available.",
      tag: "Leadership",
      publishedAt: "2026-03-01T10:00:00.000Z",
      coverImage: "/leadership-hero.jpg",
      body: `## From research to continental practice

**Super-Cube®** grew from doctoral research into the Educate pillar of Big Five Group — ethical, whole-person leadership for business and public life.

Materials include a free book pathway and peer-reviewed papers partners can reference.

[Explore Leadership](/leadership)
`,
    }),
    base({
      id: "seed_sam",
      slug: "supplieradvisor-sam-messenger-ai",
      title: "SupplierAdvisor® · SAM — ethical commerce and messenger AI",
      excerpt:
        "Verified trade infrastructure and SAM (SupplierAdvisor Messenger) for the humans who run the chain.",
      tag: "Connect",
      publishedAt: "2026-01-15T10:00:00.000Z",
      coverImage: "/connect-hero.jpg",
      body: `## Humans + verified rails

**SAM** (SupplierAdvisor Messenger) sits with SupplierAdvisor® so the people who run the chain have an AI-assisted path into ethical, verified commerce.

[Meet SAM](/connect/sam) · [Connect](/connect)
`,
    }),
  ];
}
