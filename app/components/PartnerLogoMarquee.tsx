"use client";

import Image from "next/image";
import { HOME_PARTNERS } from "../lib/homePartners";

/**
 * Infinite horizontal partner banner — logos scroll left-to-right across the page.
 * Duplicated track for a seamless loop; pauses on hover; respects reduced motion.
 */
export default function PartnerLogoMarquee() {
  // Triple the list so the loop stays filled on wide screens
  const track = [...HOME_PARTNERS, ...HOME_PARTNERS, ...HOME_PARTNERS];

  return (
    <section
      className="border-y border-black/10 bg-white overflow-hidden"
      aria-label="Partners and pathways"
    >
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-4 sm:pb-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
          <div>
            <div className="text-[10px] sm:text-xs tracking-[3px] text-emerald-800 font-semibold mb-1.5 uppercase">
              Partners &amp; pathways
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black text-balance">
              Who we work with across Feed · Educate · Empower
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#737373] max-w-md sm:text-right leading-relaxed">
            Institutional, retail, community and industry partners — logos for identification;
            programmes remain subject to formal agreements.
          </p>
        </div>
      </div>

      <div className="relative py-6 sm:py-8 md:py-10">
        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-24 z-10 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-24 z-10 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />

        <div className="partner-marquee group">
          <div className="partner-marquee__track">
            {track.map((p, i) => (
              <a
                key={`${p.name}-${i}`}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-marquee__item"
                title={p.name}
              >
                <span className="sr-only">{p.name}</span>
                <span
                  className={`relative block h-12 sm:h-14 ${
                    p.wide ? "w-36 sm:w-44" : "w-16 sm:w-20"
                  }`}
                >
                  <Image
                    src={p.logo}
                    alt=""
                    fill
                    className="object-contain object-center opacity-80 group-hover:opacity-100 transition-opacity"
                    sizes={p.wide ? "176px" : "80px"}
                  />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
