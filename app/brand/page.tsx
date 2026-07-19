import Image from "next/image";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "../lib/contact";

export const metadata = {
  title: "Brand kit",
  description:
    "Big Five Group and Super-Cube® brand assets, usage notes, and press contact.",
  openGraph: {
    title: "Brand kit | Big Five Group",
    url: "/brand",
    images: [{ url: "/home-hero.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/brand" },
};

const assets = [
  {
    name: "Big Five Group logo (hero / dark)",
    src: "/bigfivegroup-logo.png",
    note: "Official mark with white→transparent, black→white for dark heroes.",
  },
  {
    name: "Big Five Group logo (original)",
    src: "/bigfivegroup-logo.jpg",
    note: "Official import (black disc, white cutouts on white field).",
  },
  {
    name: "Big Five Foods logo",
    src: "/bigfivefoods-logo.png",
    note: "Foods pillar mark.",
  },
  {
    name: "Super-Cube® logo (transparent)",
    src: "/super-cube-logo-transparent.png",
    note: "Preferred on dark and light backgrounds.",
  },
  {
    name: "Super-Cube® logo (original)",
    src: "/super-cube-logo.png",
    note: "Full-colour wordmark with cube.",
  },
  {
    name: "SupplierAdvisor® logo",
    src: "/supplieradvisor-logo.png",
    note: "Connect / commerce OS mark. Third-party brand — use with permission; always include ® where practical.",
  },
];

export default function BrandPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <section className="bg-[#0a0a0a] text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] sm:text-xs tracking-[3px] text-amber-400 mb-4">BRAND</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
            Brand kit
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Logos and usage notes for partners, press and designers. For custom packages, email us.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-black mb-3">Wordmarks</h2>
          <ul className="text-sm text-[#404040] space-y-2 mb-4">
            <li>
              <strong>Big Five Group</strong> — group brand; pillars as Big Five Foods, Leadership,
              etc.
            </li>
            <li>
              <strong>Super-Cube®</strong> — registered leadership model; always include ® on first
              prominent mention where practical.
            </li>
            <li>
              <strong>SupplierAdvisor®</strong> — Connect / commerce OS; third-party brand with
              permission.
            </li>
          </ul>
          <p className="text-xs text-[#737373]">
            Do not recolour Super-Cube® cube faces arbitrarily. Do not place logos on busy photos
            without a clear field.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((a) => (
            <div
              key={a.src}
              className="rounded-2xl border border-black/10 bg-white p-5 flex flex-col min-w-0"
            >
              <div className="relative h-24 mb-4 flex items-center justify-center bg-[#f5f5f5] rounded-xl">
                <Image
                  src={a.src}
                  alt={a.name}
                  width={220}
                  height={48}
                  className="object-contain max-h-16 w-auto"
                  unoptimized
                />
              </div>
              <div className="font-semibold text-black text-sm mb-1">{a.name}</div>
              <p className="text-xs text-[#525252] mb-4 flex-1">{a.note}</p>
              <a
                href={a.src}
                download
                className="inline-flex items-center gap-2 text-sm font-semibold text-black"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-black mb-2">Press & brand contact</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Brand%20%2F%20press%20enquiry`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-black"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_EMAIL}
          </a>
        </div>

        <Link href="/partner-kit" className="text-sm font-semibold text-black underline underline-offset-2">
          Partner kit (narrative pack) →
        </Link>
      </section>
    </div>
  );
}
