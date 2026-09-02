/**
 * Big Five Foods — illustrative institutional volume + revenue model.
 * Departments: DoE (NSNP), DoH, Defence, Correctional Services.
 * For investor business plan / deck. Not a forecast or contracted offtake.
 *
 * NSNP pack list prices (management):
 * - Enriched Porridge 5kg · R90
 * - Beef Soya Mince 5kg · R150
 * - One-Pot mix 5kg · R200
 */

/** KZN NSNP programme scale (public provincial reporting · planning anchor). */
export const KZN_NSNP_SCALE = {
  schools: 5_406,
  learners: 2_500_000,
  schoolDaysPerYear: 200,
  mondaysPerYear: 40,
  fridaysPerYear: 40,
  sourceNote:
    "KZN Education EPRE / NSNP reporting: ~5,406 participating schools and ~2.5 million learners targeted (2024/25–2025/26 programme language). Aligns with Group NSNP plan-scale narrative.",
} as const;

/** Dry grams per learner per serving (institutional kitchen planning assumptions). */
export const NSNP_PORTION_G = {
  porridgeDaily: 40,
  soyaMonday: 30,
  onepotFriday: 50,
} as const;

const PACK_KG = 5;

/** Institutional 5kg list prices (ZAR · management). */
export const INST_PACK_PRICE_ZAR = {
  porridge5kg: 90,
  soya5kg: 150,
  onepot5kg: 200,
} as const;

export type VolumeYearKey = "y0" | "y1" | "y2" | "y3" | "y4" | "y5";

export const VOLUME_YEAR_KEYS: VolumeYearKey[] = ["y0", "y1", "y2", "y3", "y4", "y5"];

export const VOLUME_YEAR_LABELS: Record<VolumeYearKey, string> = {
  y0: "Y0",
  y1: "Y1",
  y2: "Y2",
  y3: "Y3",
  y4: "Y4",
  y5: "Y5",
};

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

function revenueFromPacks(packs: number, priceZar: number): number {
  return packs * priceZar;
}

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

export const KZN_SHARE_PCT_BASE = {
  y0: 2,
  y1: 8,
  y2: 15,
  y3: 25,
  y4: 35,
  y5: 45,
} as const;

export const NATIONAL_NSNP_LEARNERS = 9_801_224;
export const NON_KZN_LEARNERS = NATIONAL_NSNP_LEARNERS - KZN_NSNP_SCALE.learners;

export const NON_KZN_SHARE_PCT_BASE = {
  y0: 0,
  y1: 0,
  y2: 3,
  y3: 8,
  y4: 14,
  y5: 22,
} as const;

function nsnpYear(
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
  porridgeRevenue: number;
  soyaRevenue: number;
  onepotRevenue: number;
  totalRevenue: number;
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
  const porridgePacks = packsFromTonnes(porridge);
  const soyaPacks = packsFromTonnes(soya);
  const onepotPacks = packsFromTonnes(onepot);
  const porridgeRevenue = revenueFromPacks(porridgePacks, INST_PACK_PRICE_ZAR.porridge5kg);
  const soyaRevenue = revenueFromPacks(soyaPacks, INST_PACK_PRICE_ZAR.soya5kg);
  const onepotRevenue = revenueFromPacks(onepotPacks, INST_PACK_PRICE_ZAR.onepot5kg);
  return {
    porridge,
    soya,
    onepot,
    total: porridge + soya + onepot,
    porridgePacks,
    soyaPacks,
    onepotPacks,
    totalPacks: porridgePacks + soyaPacks + onepotPacks,
    porridgeRevenue,
    soyaRevenue,
    onepotRevenue,
    totalRevenue: porridgeRevenue + soyaRevenue + onepotRevenue,
  };
}

export const NSNP_VOLUME_BASE = {
  y0: nsnpYear(KZN_SHARE_PCT_BASE.y0, NON_KZN_SHARE_PCT_BASE.y0),
  y1: nsnpYear(KZN_SHARE_PCT_BASE.y1, NON_KZN_SHARE_PCT_BASE.y1),
  y2: nsnpYear(KZN_SHARE_PCT_BASE.y2, NON_KZN_SHARE_PCT_BASE.y2),
  y3: nsnpYear(KZN_SHARE_PCT_BASE.y3, NON_KZN_SHARE_PCT_BASE.y3),
  y4: nsnpYear(KZN_SHARE_PCT_BASE.y4, NON_KZN_SHARE_PCT_BASE.y4),
  y5: nsnpYear(KZN_SHARE_PCT_BASE.y5, NON_KZN_SHARE_PCT_BASE.y5),
} as const;

/** DoH — fortified porridge only @ R90/5kg. */
export const DOH_PORRIDGE = {
  gramsPerMealDay: 40,
  mealDaysAddressableY5: 80_000_000,
  sharePct: {
    y0: 0,
    y1: 2,
    y2: 6,
    y3: 12,
    y4: 20,
    y5: 30,
  } as Record<VolumeYearKey, number>,
  detail:
    "Department of Health — fortified porridge (5kg @ R90) as programmes mature. Illustrative share of a planning addressable; not a closed DoH supply award.",
} as const;

function dohYear(sharePct: number) {
  const tonnes =
    (DOH_PORRIDGE.mealDaysAddressableY5 *
      (DOH_PORRIDGE.gramsPerMealDay / 1000) *
      (sharePct / 100)) /
    1000;
  const packs = packsFromTonnes(tonnes);
  return {
    tonnes,
    packs,
    revenue: revenueFromPacks(packs, INST_PACK_PRICE_ZAR.porridge5kg),
  };
}

export const DOH_VOLUME_BASE = {
  y0: dohYear(DOH_PORRIDGE.sharePct.y0),
  y1: dohYear(DOH_PORRIDGE.sharePct.y1),
  y2: dohYear(DOH_PORRIDGE.sharePct.y2),
  y3: dohYear(DOH_PORRIDGE.sharePct.y3),
  y4: dohYear(DOH_PORRIDGE.sharePct.y4),
  y5: dohYear(DOH_PORRIDGE.sharePct.y5),
} as const;

/**
 * Other departments — illustrative institutional feeding (porridge / soya / one-pot cadence).
 * Smaller addressable populations; later share ramps than NSNP.
 */
type DeptMenuScale = {
  id: string;
  name: string;
  shortName: string;
  beneficiaries: number;
  daysPorridge: number;
  daysSoya: number;
  daysOnepot: number;
  portionPorridgeG: number;
  portionSoyaG: number;
  portionOnepotG: number;
  sharePct: Record<VolumeYearKey, number>;
  note: string;
};

function deptYear(scale: DeptMenuScale, sharePct: number) {
  const porridge = tonnesFrom(
    scale.beneficiaries,
    scale.portionPorridgeG,
    scale.daysPorridge,
    sharePct
  );
  const soya = tonnesFrom(scale.beneficiaries, scale.portionSoyaG, scale.daysSoya, sharePct);
  const onepot = tonnesFrom(
    scale.beneficiaries,
    scale.portionOnepotG,
    scale.daysOnepot,
    sharePct
  );
  const porridgePacks = packsFromTonnes(porridge);
  const soyaPacks = packsFromTonnes(soya);
  const onepotPacks = packsFromTonnes(onepot);
  const porridgeRevenue = revenueFromPacks(porridgePacks, INST_PACK_PRICE_ZAR.porridge5kg);
  const soyaRevenue = revenueFromPacks(soyaPacks, INST_PACK_PRICE_ZAR.soya5kg);
  const onepotRevenue = revenueFromPacks(onepotPacks, INST_PACK_PRICE_ZAR.onepot5kg);
  return {
    porridge,
    soya,
    onepot,
    total: porridge + soya + onepot,
    porridgePacks,
    soyaPacks,
    onepotPacks,
    porridgeRevenue,
    soyaRevenue,
    onepotRevenue,
    totalRevenue: porridgeRevenue + soyaRevenue + onepotRevenue,
  };
}

export const DEFENCE_SCALE: DeptMenuScale = {
  id: "defence",
  name: "Department of Defence",
  shortName: "Defence",
  beneficiaries: 73_000, // SANDF active force — planning order of magnitude
  daysPorridge: 250,
  daysSoya: 50,
  daysOnepot: 50,
  portionPorridgeG: 50,
  portionSoyaG: 40,
  portionOnepotG: 60,
  sharePct: { y0: 0, y1: 1, y2: 3, y3: 7, y4: 12, y5: 18 },
  note: "Illustrative SANDF mess / ration pathway using same 5kg institutional SKUs and list prices.",
};

export const CORRECTIONAL_SCALE: DeptMenuScale = {
  id: "correctional",
  name: "Department of Correctional Services",
  shortName: "Correctional Services",
  beneficiaries: 157_000, // SA inmate population — planning order of magnitude
  daysPorridge: 365,
  daysSoya: 52,
  daysOnepot: 52,
  portionPorridgeG: 45,
  portionSoyaG: 35,
  portionOnepotG: 55,
  sharePct: { y0: 0, y1: 1, y2: 4, y3: 8, y4: 14, y5: 20 },
  note: "Illustrative correctional kitchen pathway — fortified staples at institutional list prices.",
};

function buildDeptVolumes(scale: DeptMenuScale) {
  return {
    y0: deptYear(scale, scale.sharePct.y0),
    y1: deptYear(scale, scale.sharePct.y1),
    y2: deptYear(scale, scale.sharePct.y2),
    y3: deptYear(scale, scale.sharePct.y3),
    y4: deptYear(scale, scale.sharePct.y4),
    y5: deptYear(scale, scale.sharePct.y5),
  } as const;
}

export const DEFENCE_VOLUME_BASE = buildDeptVolumes(DEFENCE_SCALE);
export const CORRECTIONAL_VOLUME_BASE = buildDeptVolumes(CORRECTIONAL_SCALE);

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

/** Compact ZAR for table cells (R0.6m, R12m, R1.2bn). */
export function formatZarM(n: number): string {
  const abs = Math.abs(n);
  if (abs < 1) return "R0";
  if (abs >= 1_000_000_000) {
    const v = abs / 1_000_000_000;
    return `R${v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, "")}bn`;
  }
  if (abs >= 1_000_000) {
    const v = abs / 1_000_000;
    if (v >= 100) return `R${Math.round(v)}m`;
    return `R${v.toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (abs >= 1_000) return `R${Math.round(abs / 1000)}k`;
  return `R${Math.round(abs)}`;
}

export type RevenueLineKind = "sku" | "subtotal" | "total";

export type RevenueLine = {
  id: string;
  label: string;
  kind: RevenueLineKind;
  /** Revenue ZAR by year */
  byYear: Record<VolumeYearKey, number>;
};

/** Build department-grouped revenue lines for tables (years as columns). */
export function buildInstitutionalRevenueLines(): RevenueLine[] {
  const years = VOLUME_YEAR_KEYS;
  const line = (
    id: string,
    label: string,
    kind: RevenueLineKind,
    pick: (y: VolumeYearKey) => number
  ): RevenueLine => ({
    id,
    label,
    kind,
    byYear: Object.fromEntries(years.map((y) => [y, pick(y)])) as Record<VolumeYearKey, number>,
  });

  const doePorridge = line("doe-porridge", "Porridge 5kg @ R90", "sku", (y) =>
    NSNP_VOLUME_BASE[y].porridgeRevenue
  );
  const doeSoya = line("doe-soya", "Soya mince 5kg @ R150", "sku", (y) =>
    NSNP_VOLUME_BASE[y].soyaRevenue
  );
  const doeOnepot = line("doe-onepot", "One-pot 5kg @ R200", "sku", (y) =>
    NSNP_VOLUME_BASE[y].onepotRevenue
  );
  const doeSub = line("doe-sub", "Subtotal · DoE (NSNP)", "subtotal", (y) =>
    NSNP_VOLUME_BASE[y].totalRevenue
  );

  const dohPorridge = line("doh-porridge", "Fortified porridge 5kg @ R90", "sku", (y) =>
    DOH_VOLUME_BASE[y].revenue
  );
  const dohSub = line("doh-sub", "Subtotal · DoH", "subtotal", (y) => DOH_VOLUME_BASE[y].revenue);

  const defPorridge = line("def-porridge", "Porridge 5kg @ R90", "sku", (y) =>
    DEFENCE_VOLUME_BASE[y].porridgeRevenue
  );
  const defSoya = line("def-soya", "Soya mince 5kg @ R150", "sku", (y) =>
    DEFENCE_VOLUME_BASE[y].soyaRevenue
  );
  const defOnepot = line("def-onepot", "One-pot 5kg @ R200", "sku", (y) =>
    DEFENCE_VOLUME_BASE[y].onepotRevenue
  );
  const defSub = line("def-sub", "Subtotal · Defence", "subtotal", (y) =>
    DEFENCE_VOLUME_BASE[y].totalRevenue
  );

  const corPorridge = line("cor-porridge", "Porridge 5kg @ R90", "sku", (y) =>
    CORRECTIONAL_VOLUME_BASE[y].porridgeRevenue
  );
  const corSoya = line("cor-soya", "Soya mince 5kg @ R150", "sku", (y) =>
    CORRECTIONAL_VOLUME_BASE[y].soyaRevenue
  );
  const corOnepot = line("cor-onepot", "One-pot 5kg @ R200", "sku", (y) =>
    CORRECTIONAL_VOLUME_BASE[y].onepotRevenue
  );
  const corSub = line("cor-sub", "Subtotal · Correctional Services", "subtotal", (y) =>
    CORRECTIONAL_VOLUME_BASE[y].totalRevenue
  );

  const grand = line(
    "grand",
    "Grand total · institutional",
    "total",
    (y) =>
      NSNP_VOLUME_BASE[y].totalRevenue +
      DOH_VOLUME_BASE[y].revenue +
      DEFENCE_VOLUME_BASE[y].totalRevenue +
      CORRECTIONAL_VOLUME_BASE[y].totalRevenue
  );

  return [
    line("doe-hdr", "DoE · NSNP (DBE)", "subtotal", () => 0), // header marker — filtered in UI
    doePorridge,
    doeSoya,
    doeOnepot,
    doeSub,
    line("doh-hdr", "Department of Health", "subtotal", () => 0),
    dohPorridge,
    dohSub,
    line("def-hdr", "Department of Defence", "subtotal", () => 0),
    defPorridge,
    defSoya,
    defOnepot,
    defSub,
    line("cor-hdr", "Department of Correctional Services", "subtotal", () => 0),
    corPorridge,
    corSoya,
    corOnepot,
    corSub,
    grand,
  ];
}

/** Revenue table rows for plan/deck: department headers + SKUs + subtotals + grand total. */
export type InstRevenueTableRow = {
  id: string;
  label: string;
  role: "header" | "sku" | "subtotal" | "total";
  cells: string[]; // Y0…Y5 formatted
};

export function buildInstitutionalRevenueTable(): {
  headers: string[];
  rows: InstRevenueTableRow[];
  footnote: string;
} {
  const headers = ["Department / SKU", ...VOLUME_YEAR_KEYS.map((y) => VOLUME_YEAR_LABELS[y])];

  const fmtYears = (byYear: Record<VolumeYearKey, number>) =>
    VOLUME_YEAR_KEYS.map((y) => formatZarM(byYear[y]));

  const rows: InstRevenueTableRow[] = [
    {
      id: "doe-hdr",
      label: "DoE · NSNP (DBE)",
      role: "header",
      cells: VOLUME_YEAR_KEYS.map(() => ""),
    },
    {
      id: "doe-porridge",
      label: " Porridge 5kg @ R90 (daily)",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, NSNP_VOLUME_BASE[y].porridgeRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "doe-soya",
      label: " Soya mince 5kg @ R150 (Mondays)",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, NSNP_VOLUME_BASE[y].soyaRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "doe-onepot",
      label: " One-pot 5kg @ R200 (Fridays)",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, NSNP_VOLUME_BASE[y].onepotRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "doe-sub",
      label: "Subtotal · DoE (NSNP)",
      role: "subtotal",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, NSNP_VOLUME_BASE[y].totalRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "doh-hdr",
      label: "Department of Health",
      role: "header",
      cells: VOLUME_YEAR_KEYS.map(() => ""),
    },
    {
      id: "doh-porridge",
      label: " Fortified porridge 5kg @ R90",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, DOH_VOLUME_BASE[y].revenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "doh-sub",
      label: "Subtotal · DoH",
      role: "subtotal",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, DOH_VOLUME_BASE[y].revenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "def-hdr",
      label: "Department of Defence",
      role: "header",
      cells: VOLUME_YEAR_KEYS.map(() => ""),
    },
    {
      id: "def-porridge",
      label: " Porridge 5kg @ R90",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, DEFENCE_VOLUME_BASE[y].porridgeRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "def-soya",
      label: " Soya mince 5kg @ R150",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, DEFENCE_VOLUME_BASE[y].soyaRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "def-onepot",
      label: " One-pot 5kg @ R200",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, DEFENCE_VOLUME_BASE[y].onepotRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "def-sub",
      label: "Subtotal · Defence",
      role: "subtotal",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, DEFENCE_VOLUME_BASE[y].totalRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "cor-hdr",
      label: "Department of Correctional Services",
      role: "header",
      cells: VOLUME_YEAR_KEYS.map(() => ""),
    },
    {
      id: "cor-porridge",
      label: " Porridge 5kg @ R90",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, CORRECTIONAL_VOLUME_BASE[y].porridgeRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "cor-soya",
      label: " Soya mince 5kg @ R150",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, CORRECTIONAL_VOLUME_BASE[y].soyaRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "cor-onepot",
      label: " One-pot 5kg @ R200",
      role: "sku",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, CORRECTIONAL_VOLUME_BASE[y].onepotRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "cor-sub",
      label: "Subtotal · Correctional Services",
      role: "subtotal",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [y, CORRECTIONAL_VOLUME_BASE[y].totalRevenue])
        ) as Record<VolumeYearKey, number>
      ),
    },
    {
      id: "grand",
      label: "Grand total · institutional",
      role: "total",
      cells: fmtYears(
        Object.fromEntries(
          VOLUME_YEAR_KEYS.map((y) => [
            y,
            NSNP_VOLUME_BASE[y].totalRevenue +
              DOH_VOLUME_BASE[y].revenue +
              DEFENCE_VOLUME_BASE[y].totalRevenue +
              CORRECTIONAL_VOLUME_BASE[y].totalRevenue,
          ])
        ) as Record<VolumeYearKey, number>
      ),
    },
  ];

  return {
    headers,
    rows,
    footnote:
      "Illustrative list-price revenue (porridge R90 · soya R150 · one-pot R200 per 5kg). Years are columns; departments grouped with subtotals. NSNP volumes from KZN→multi-province share ramps; DoH / Defence / Correctional Services are later-stage planning pathways. Not contracted offtake or audited forecasts — confirm under NDA.",
  };
}

export const INSTITUTIONAL_MENU = [
  {
    sku: "NSNP Enriched Porridge 5kg",
    cadence: "Daily (every school day)",
    days: KZN_NSNP_SCALE.schoolDaysPerYear,
    portionG: NSNP_PORTION_G.porridgeDaily,
    priceZar: INST_PACK_PRICE_ZAR.porridge5kg,
    role: "Staple breakfast / meal starch fortification",
  },
  {
    sku: "NSNP Beef Soya Mince 5kg",
    cadence: "Mondays",
    days: KZN_NSNP_SCALE.mondaysPerYear,
    portionG: NSNP_PORTION_G.soyaMonday,
    priceZar: INST_PACK_PRICE_ZAR.soya5kg,
    role: "Protein-forward mid-week menu",
  },
  {
    sku: "NSNP One-Pot mix 5kg",
    cadence: "Fridays",
    days: KZN_NSNP_SCALE.fridaysPerYear,
    portionG: NSNP_PORTION_G.onepotFriday,
    priceZar: INST_PACK_PRICE_ZAR.onepot5kg,
    role: "Complete institutional meal format",
  },
] as const;

export const INSTITUTIONAL_VOLUME_DISCLAIMER =
  "Illustrative only — not contracted volumes, awards or audited forecasts. Built from public KZN NSNP learner/school scale, management menu cadence (porridge daily · soya Mondays · one-pot Fridays), planning portion grams, list prices (R90 / R150 / R200 per 5kg), and assumed market-share ramps across DoE, DoH, Defence and Correctional Services. Confirm menus, grams, calendars, tender share and pricing under NDA.";
