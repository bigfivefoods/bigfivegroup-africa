import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "../lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Big Five Group — vision to help Africa prosper, mission to feed, educate and empower, values of humanity and innovation, and founder Dr. Craig R. Muller.",
  openGraph: {
    title: "About Us | Big Five Group Africa",
    description:
      "We exist so Africa can prosper. Feed. Educate. Empower. Led by Dr. Craig R. Muller.",
    images: [SITE_OG_IMAGE],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
