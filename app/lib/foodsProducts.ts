/**
 * Big Five Foods product catalogue — shared by /foods page and Foods strategy deck.
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
