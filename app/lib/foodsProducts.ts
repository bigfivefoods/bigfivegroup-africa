/**
 * Big Five Foods product catalogue — page, deck, and sales portal.
 * Order URLs resolve via saStorefront (SupplierAdvisor® system of record).
 */

export const NSNP_PRODUCTS = [
  {
    id: "nsnp-beef-soya-5kg",
    name: "NSNP approved Beef Soya Mince 5kg",
    shortName: "Beef Soya Mince 5kg",
    range: "soya" as const,
    pack: "5kg institutional",
    badge: "NSNP approved",
    src: "/foods/nsnp-beef-soya-5kg.jpg",
    blurb:
      "NSNP-approved beef soya mince in a 5kg institutional pack — protein-forward for school kitchens and feeding schemes at plan scale.",
  },
  {
    id: "nsnp-enriched-porridge-5kg",
    name: "NSNP approved Enriched Porridge 5kg",
    shortName: "Enriched Porridge 5kg",
    range: "porridge" as const,
    pack: "5kg institutional",
    badge: "NSNP approved",
    src: "/foods/nsnp-enriched-porridge-5kg.jpg",
    blurb:
      "NSNP-approved enriched porridge in a 5kg pack — fortified staple for high-volume school-day feeding under the DBE programme pathway.",
  },
  {
    id: "nsnp-onepot-chicken-biryani-5kg",
    name: "NSNP approved One-Pot Chicken Biryani Mix 5kg",
    shortName: "Chicken Biryani Mix 5kg",
    range: "onepot" as const,
    pack: "5kg institutional",
    badge: "NSNP approved",
    src: "/foods/nsnp-onepot-chicken-biryani-5kg.jpg",
    blurb:
      "NSNP-approved one-pot chicken biryani mix in a 5kg pack — complete, fortified meal format for institutional menus and school kitchens.",
  },
] as const;

export type NsnpProduct = (typeof NSNP_PRODUCTS)[number];

export type FoodsRangeId = "porridge" | "soya" | "onepot" | "soup" | "nsnp";

export type FoodsShopProduct = {
  id: string;
  /** Optional SA SKU — set when live on SupplierAdvisor store */
  sku?: string;
  name: string;
  shortName: string;
  range: FoodsRangeId;
  pack: string;
  badge?: string;
  src: string;
  blurb: string;
  /** Prefer quote path (institutional) vs store order */
  quoteFirst?: boolean;
  channel: "retail" | "institutional" | "wholesale";
};

/** Orderable catalogue for the Foods sales portal */
export const FOODS_SHOP_PRODUCTS: FoodsShopProduct[] = [
  {
    id: "porridge-original",
    name: "Fortified Porridge · Original",
    shortName: "Porridge Original",
    range: "porridge",
    pack: "Retail / catering packs",
    src: "/foods/porridge-original.jpg",
    blurb: "Vitamin-enriched instant porridge — locally grown maize, everyday staple.",
    channel: "retail",
  },
  {
    id: "porridge-chocolate",
    name: "Fortified Porridge · Chocolate",
    shortName: "Porridge Chocolate",
    range: "porridge",
    pack: "Retail / catering packs",
    src: "/foods/porridge-chocolate.jpg",
    blurb: "Chocolate fortified porridge — high nutrition that households actually want.",
    channel: "retail",
  },
  {
    id: "porridge-banana",
    name: "Fortified Porridge · Banana",
    shortName: "Porridge Banana",
    range: "porridge",
    pack: "Retail / catering packs",
    src: "/foods/porridge-banana.jpg",
    blurb: "Banana fortified porridge for children and families.",
    channel: "retail",
  },
  {
    id: "porridge-strawberry",
    name: "Fortified Porridge · Strawberry",
    shortName: "Porridge Strawberry",
    range: "porridge",
    pack: "Retail / catering packs",
    src: "/foods/porridge-strawberry.jpg",
    blurb: "Strawberry fortified porridge — taste-forward micronutrient delivery.",
    channel: "retail",
  },
  {
    id: "soya-beef",
    name: "Soya Mince · Rich Beef",
    shortName: "Soya Rich Beef",
    range: "soya",
    pack: "Retail / catering packs",
    src: "/foods/soya-beef.jpg",
    blurb: "Plant-based protein mince — affordable protein that stretches every pot.",
    channel: "retail",
  },
  {
    id: "soya-chilli-beef",
    name: "Soya Mince · Chilli Beef",
    shortName: "Soya Chilli Beef",
    range: "soya",
    pack: "Retail / catering packs",
    src: "/foods/soya-chilli-beef.jpg",
    blurb: "Chilli beef soya mince for households and catering.",
    channel: "retail",
  },
  {
    id: "soya-beef-onion",
    name: "Soya Mince · Beef & Onion",
    shortName: "Soya Beef & Onion",
    range: "soya",
    pack: "Retail / catering packs",
    src: "/foods/soya-beef-onion.jpg",
    blurb: "Beef & onion soya mince — versatile, high protein, low cost.",
    channel: "retail",
  },
  {
    id: "soya-mutton",
    name: "Soya Mince · Mutton",
    shortName: "Soya Mutton",
    range: "soya",
    pack: "Retail / catering packs",
    src: "/foods/soya-mutton.jpg",
    blurb: "Mutton-flavoured soya mince for African household and catering menus.",
    channel: "retail",
  },
  {
    id: "onepot-chicken",
    name: "One-Pot Meal · Chicken",
    shortName: "One-Pot Chicken",
    range: "onepot",
    pack: "1kg → ~4kg prepared",
    src: "/foods/onepot-chicken.jpg",
    blurb: "Complete one-pot chicken meal — balanced nutrition, ~20 minutes cook.",
    channel: "retail",
  },
  {
    id: "onepot-beef",
    name: "One-Pot Meal · Beef",
    shortName: "One-Pot Beef",
    range: "onepot",
    pack: "1kg → ~4kg prepared",
    src: "/foods/onepot-beef.jpg",
    blurb: "Complete one-pot beef meal for families and caterers.",
    channel: "retail",
  },
  {
    id: "onepot-chilli-beef",
    name: "One-Pot Meal · Chilli Beef",
    shortName: "One-Pot Chilli Beef",
    range: "onepot",
    pack: "1kg → ~4kg prepared",
    src: "/foods/onepot-chilli-beef.jpg",
    blurb: "Chilli beef one-pot — complete plate in one pack.",
    channel: "retail",
  },
  {
    id: "onepot-chakalaka",
    name: "One-Pot Meal · Chakalaka",
    shortName: "One-Pot Chakalaka",
    range: "onepot",
    pack: "1kg → ~4kg prepared",
    src: "/foods/onepot-chakalaka.jpg",
    blurb: "Chakalaka one-pot — authentic flavour, fortified convenience.",
    channel: "retail",
  },
  {
    id: "soup-chicken",
    name: "Soup · Chicken",
    shortName: "Chicken Soup",
    range: "soup",
    pack: "Instant soup thickener",
    src: "/foods/soup-chicken.jpg",
    blurb: "Fortified chicken soup thickener — warmth and micronutrients at low cost.",
    channel: "retail",
  },
  {
    id: "soup-brown-onion",
    name: "Soup · Brown Onion",
    shortName: "Brown Onion Soup",
    range: "soup",
    pack: "Instant soup thickener",
    src: "/foods/soup-brown-onion.jpg",
    blurb: "Classic brown onion fortified soup thickener.",
    channel: "retail",
  },
  {
    id: "soup-oxtail",
    name: "Soup · Oxtail",
    shortName: "Oxtail Soup",
    range: "soup",
    pack: "Instant soup thickener",
    src: "/foods/soup-oxtail.jpg",
    blurb: "Oxtail soup thickener — nutrient dense, familiar SA flavour.",
    channel: "retail",
  },
  {
    id: "soup-minestrone",
    name: "Soup · Minestrone",
    shortName: "Minestrone Soup",
    range: "soup",
    pack: "Instant soup thickener",
    src: "/foods/soup-minestrone.jpg",
    blurb: "Minestrone fortified soup thickener for households and catering.",
    channel: "retail",
  },
  // NSNP institutional — quote-first by default
  ...NSNP_PRODUCTS.map(
    (p): FoodsShopProduct => ({
      id: p.id,
      name: p.name,
      shortName: p.shortName,
      range: "nsnp",
      pack: p.pack,
      badge: p.badge,
      src: p.src,
      blurb: p.blurb,
      quoteFirst: true,
      channel: "institutional",
    })
  ),
];

export const FOODS_RANGE_LABELS: Record<FoodsRangeId, string> = {
  porridge: "Porridges",
  soya: "Soya mince",
  onepot: "One-pot meals",
  soup: "Soups",
  nsnp: "NSNP institutional",
};

export function getFoodsShopProduct(id: string): FoodsShopProduct | undefined {
  return FOODS_SHOP_PRODUCTS.find((p) => p.id === id);
}
