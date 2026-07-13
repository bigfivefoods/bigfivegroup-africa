import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foods",
  description:
    "Big Five Foods — fortified porridges, soya mince, one-pot meals and soups combating malnutrition at scale.",
  openGraph: {
    title: "Big Five Foods | Fortified African Nutrition",
    description:
      "High-nutrition, affordable African staples with 24-month shelf life and certified manufacturing.",
  },
};

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
