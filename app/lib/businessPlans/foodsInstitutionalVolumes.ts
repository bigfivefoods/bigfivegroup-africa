/**
 * Big Five Foods — illustrative institutional volume model (NSNP + DoH).
 * For investor business plan / deck. Not a forecast or contracted offtake schedule.
 *
 * KZN NSNP scale anchored to provincial EPRE / public programme reporting
 * (~5,400 schools · ~2.5m learners). Menu pattern per management design:
 * - Enriched Porridge 5kg · daily school days
 * - Beef Soya Mince 5kg · Mondays
 * - One-Pot mix 5kg · Fridays
 *
 * DoH: fortified porridge pathway — illustrative beneficiary meal-days growing
 * with programme penetration (not a closed DoH award claim).
 */

/** KZN NSNP programme scale (public provincial reporting · planning anchor). */
export const KZN_NSNP_SCALE = {
  schools: 5_406,
  learners: 2_500_000,
  schoolDaysPerYear: 200,
  /** Mondays / Fridays in a ~200-day school year */
  mondaysPerYear: 40,
  fridaysPerYear: 40,
  sourceNote:
    "KZN Education EPRE / NSNP reporting: ~5,406 participating schools and ~2.5 million learners targeted (2024/25–2025/26 programme language). Aligns with Group NSNP plan-scale narrative.",
} as const;

/**
 * Dry grams per learner per serving (institutional kitchen planning assumptions).
 * Confirm on menu / tender specs under NDA.
 */
export const NSNP_PORTION_G = {
  porridgeDaily: 40,
  soyaMonday: 30,
  onepotFriday: 50,
} as const;

const PACK_KG = 5;

function tonnesFrom(
  learners: number,
  gramsPerServing: number,
  days: number,
  sharePct: number
): number {
  const kg = learners * (gramsPerServing / 1000) * days * (sharePct / 100);
  return kg / 1000;
}

function packsFromTonnes(tonnes: number): number {
  return (tonnes * 1000) / PACK_KG;
}

/** Addressable KZN tonnes at 100% share of the stated menu pattern. */
const _kznPorridge100 = tonnesFrom(
  KZN_NSNP_SCALE.learners,
  NSNP_PORTION_G.porridgeDaily,
  KZN_NSNP_SCALE.schoolDaysPerYear,
  100
);
const _kznSoya100 = tonnesFrom(
  KZN_NSNP_SCALE.learners,
  NSNP_PORTION_G.soyaMonday,
  KZN_NSNP_SCALE.mondaysPerYear,
  100
);
const _kznOnepot100 = tonnesFrom(
  KZN_NSNP_SCALE.learners,
  NSNP_PORTION_G.onepotFriday,
  KZN_NSNP_SCALE.fridaysPerYear,
  100
);

export const KZN_NSNP_ADDRESSABLE_100 = {
  porridgeTonnes: _kznPorridge100,
  soyaTonnes: _kznSoya100,
  onepotTonnes: _kznOnepot100,
  totalTonnes: _kznPorridge100 + _kznSoya100 + _kznOnepot100,
} as const;

/**
 * Base-case market share of KZN addressable NSNP volume for Big Five Foods SKUs.
 * Year 0 = landing / first operational year.
 */
export const KZN_SHARE_PCT_BASE = {
  y0: 2,
  y1: 8,
  y2: 15,
  y3: 25,
  y4: 35,
  y5: 45,
} as const;

/**
 * Multi-province expansion — incremental national NSNP learners beyond KZN
 * that BFF supplies at the stated share of those provinces’ addressable menus.
 * National NSNP ~9.8m learners (DBE/PMG provincial breakdown); KZN ~2.5m.
 */
export const NATIONAL_NSNP_LEARNERS = 9_801_224;
export const NON_KZN_LEARNERS = NATIONAL_NSNP_LEARNERS - KZN_NSNP_SCALE.learners;

/** Share of non-KZN national addressable that BFF captures (base case). */
export const NON_KZN_SHARE_PCT_BASE = {
  y0: 0,
  y1: 0,
  y2: 3,
  y3: 8,
  y4: 14,
  y5: 22,
} as const;

export type VolumeYearKey = "y0" | "y1" | "y2" | "y3" | "y4" | "y5";

export const VOLUME_YEAR_LABELS: Record<VolumeYearKey, string> = {
  y0: "Y0 · Landing",
  y1: "Y1",
  y2: "Y2",
  y3: "Y3",
  y4: "Y4",
  y5: "Y5",
};

function nsnpYearTonnes(
  kznShare: number,
  nonKznShare: number
): {
  porridge: number;
  soya: number;
  onepot: number;
  total: number;
  porridgePacks: number;
  soyaPacks: number;
  onepotPacks: number;
  totalPacks: number;
} {
  const porridge =
    tonnesFrom(
      KZN_NSNP_SCALE.learners,
      NSNP_PORTION_G.porridgeDaily,
      KZN_NSNP_SCALE.schoolDaysPerYear,
      kznShare
    ) +
    tonnesFrom(
      NON_KZN_LEARNERS,
      NSNP_PORTION_G.porridgeDaily,
      KZN_NSNP_SCALE.schoolDaysPerYear,
      nonKznShare
    );
  const soya =
    tonnesFrom(
      KZN_NSNP_SCALE.learners,
      NSNP_PORTION_G.soyaMonday,
      KZN_NSNP_SCALE.mondaysPerYear,
      kznShare
    ) +
    tonnesFrom(
      NON_KZN_LEARNERS,
      NSNP_PORTION_G.soyaMonday,
      KZN_NSNP_SCALE.mondaysPerYear,
      nonKznShare
    );
  const onepot =
    tonnesFrom(
      KZN_NSNP_SCALE.learners,
      NSNP_PORTION_G.onepotFriday,
      KZN_NSNP_SCALE.fridaysPerYear,
      kznShare
    ) +
    tonnesFrom(
      NON_KZN_LEARNERS,
      NSNP_PORTION_G.onepotFriday,
      KZN_NSNP_SCALE.fridaysPerYear,
      nonKznShare
    );
  const total = porridge + soya + onepot;
  return {
    porridge,
    soya,
    onepot,
    total,
    porridgePacks: packsFromTonnes(porridge),
    soyaPacks: packsFromTonnes(soya),
    onepotPacks: packsFromTonnes(onepot),
    totalPacks: packsFromTonnes(total),
  };
}

export const NSNP_VOLUME_BASE = {
  y0: nsnpYearTonnes(KZN_SHARE_PCT_BASE.y0, NON_KZN_SHARE_PCT_BASE.y0),
  y1: nsnpYearTonnes(KZN_SHARE_PCT_BASE.y1, NON_KZN_SHARE_PCT_BASE.y1),
  y2: nsnpYearTonnes(KZN_SHARE_PCT_BASE.y2, NON_KZN_SHARE_PCT_BASE.y2),
  y3: nsnpYearTonnes(KZN_SHARE_PCT_BASE.y3, NON_KZN_SHARE_PCT_BASE.y3),
  y4: nsnpYearTonnes(KZN_SHARE_PCT_BASE.y4, NON_KZN_SHARE_PCT_BASE.y4),
  y5: nsnpYearTonnes(KZN_SHARE_PCT_BASE.y5, NON_KZN_SHARE_PCT_BASE.y5),
} as const;

/**
 * Department of Health — fortified porridge pathway (illustrative).
 * No closed multi-province DoH award claimed. Planning base grows with
 * programme penetration (clinic / facility / complementary feeding style offtake).
 */
export const DOH_PORRIDGE = {
  /** Dry grams per beneficiary meal-day */
  gramsPerMealDay: 40,
  /** Illustrative beneficiary meal-days per year at 100% of planning base */
  mealDaysAddressableY5: 80_000_000, // e.g. ~400k beneficiaries × 200 days
  sharePct: {
    y0: 0,
    y1: 2,
    y2: 6,
    y3: 12,
    y4: 20,
    y5: 30,
  } as Record<VolumeYearKey, number>,
  detail:
    "Department of Health pathway — fortified porridge (5kg institutional) as programmes mature. Volumes are illustrative market-share ramps against a planning addressable; not a claim of closed DoH supply awards.",
} as const;

function dohPorridgeTonnes(sharePct: number): number {
  const kg =
    DOH_PORRIDGE.mealDaysAddressableY5 *
    (DOH_PORRIDGE.gramsPerMealDay / 1000) *
    (sharePct / 100);
  return kg / 1000;
}

export const DOH_VOLUME_BASE = {
  y0: dohPorridgeTonnes(DOH_PORRIDGE.sharePct.y0),
  y1: dohPorridgeTonnes(DOH_PORRIDGE.sharePct.y1),
  y2: dohPorridgeTonnes(DOH_PORRIDGE.sharePct.y2),
  y3: dohPorridgeTonnes(DOH_PORRIDGE.sharePct.y3),
  y4: dohPorridgeTonnes(DOH_PORRIDGE.sharePct.y4),
  y5: dohPorridgeTonnes(DOH_PORRIDGE.sharePct.y5),
} as const;

export function formatTonnes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}kt`;
  if (n >= 100) return `${Math.round(n).toLocaleString("en-ZA")} t`;
  if (n >= 10) return `${n.toFixed(0)} t`;
  return `${n.toFixed(1)} t`;
}

export function formatPacks(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `${Math.round(n / 1000).toLocaleString("en-ZA")}k`;
  return Math.round(n).toLocaleString("en-ZA");
}

export const INSTITUTIONAL_MENU = [
  {
    sku: "NSNP Enriched Porridge 5kg",
    cadence: "Daily (every school day)",
    days: KZN_NSNP_SCALE.schoolDaysPerYear,
    portionG: NSNP_PORTION_G.porridgeDaily,
    role: "Staple breakfast / meal starch fortification",
  },
  {
    sku: "NSNP Beef Soya Mince 5kg",
    cadence: "Mondays",
    days: KZN_NSNP_SCALE.mondaysPerYear,
    portionG: NSNP_PORTION_G.soyaMonday,
    role: "Protein-forward mid-week menu",
  },
  {
    sku: "NSNP One-Pot mix 5kg",
    cadence: "Fridays",
    days: KZN_NSNP_SCALE.fridaysPerYear,
    portionG: NSNP_PORTION_G.onepotFriday,
    role: "Complete institutional meal format",
  },
] as const;

export const INSTITUTIONAL_VOLUME_DISCLAIMER =
  "Illustrative only — not contracted volumes or audited forecasts. Built from public KZN NSNP learner/school scale, management menu cadence (porridge daily · soya Mondays · one-pot Fridays), planning portion grams, and assumed market-share ramps. DoH porridge volumes are a separate planning pathway. Confirm menus, grams, school-day calendars, tender share and pricing under NDA.";
