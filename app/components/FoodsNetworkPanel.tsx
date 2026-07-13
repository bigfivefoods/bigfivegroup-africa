"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  MapPin,
  Package,
  ShieldCheck,
  UtensilsCrossed,
  Heart,
  Users,
  Loader2,
  Leaf,
} from "lucide-react";
import type { FoodsNetworkPayload } from "../lib/saFoodsNetwork";
import {
  SA_URL,
  SA_CONTAINERS,
  SA_CONTAINERS_SETTINGS,
  SA_CONTAINERS_EMBED,
} from "../lib/saCopy";

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

export default function FoodsNetworkPanel() {
  const [data, setData] = useState<FoodsNetworkPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/network/foods");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as FoodsNetworkPayload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError("Unable to load Foods network data.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-8 text-center text-[#525252]">
        {error}{" "}
        <a href={SA_URL} className="font-semibold text-black underline underline-offset-2">
          Open SupplierAdvisor®
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-12 flex items-center justify-center gap-3 text-[#525252]">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading Big Five Foods network…
      </div>
    );
  }

  const embedSrc = data.company.containersEmbedUrl ?? SA_CONTAINERS_EMBED;

  return (
    <div className="space-y-12 sm:space-y-16 min-w-0">
      {/* Impact story band */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-[#431407] via-[#9a3412] to-[#c2410c] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#fbbf24,transparent_50%),radial-gradient(circle_at_80%_80%,#fff,transparent_40%)]" />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-10 md:p-12">
          <div className="lg:col-span-7 min-w-0">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-orange-100/90 mb-4 font-medium">
              <ShieldCheck className="w-4 h-4" />
              TRANSPARENCY · DIGNITY · NOURISHMENT
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter leading-[1.1] mb-4 text-balance">
              Every container is a promise kept — food that reaches people who need it.
            </h3>
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-6">
              Big Five Direct and Big Five Foods work as one system on SupplierAdvisor®: verified
              production, containerised distribution, and last-mile access you can see. This is not
              charity theatre — it is professional logistics in service of{" "}
              <strong className="text-white">human dignity</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#live-map"
                className="premium-button inline-flex items-center justify-center gap-2 bg-white text-[#9a3412] px-6 py-3 rounded-full text-sm font-semibold"
              >
                Explore the live map
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href="/foods"
                className="premium-button inline-flex items-center justify-center gap-2 border border-white/35 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10"
              >
                Big Five Foods
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 min-w-0 content-start">
            {[
              {
                icon: UtensilsCrossed,
                value: formatNum(data.impact.mealsDelivered),
                label: "Meals enabled",
              },
              {
                icon: Users,
                value: formatNum(data.impact.childrenReached),
                label: "Children reached",
              },
              {
                icon: Package,
                value: String(data.impact.productRanges),
                label: "Product ranges",
              },
              {
                icon: Leaf,
                value: `${data.impact.shelfLifeMonths} mo`,
                label: "Shelf life on key lines",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 sm:p-5 min-w-0"
              >
                <s.icon className="w-5 h-5 text-orange-100 mb-3 opacity-90" />
                <div className="text-2xl sm:text-3xl font-semibold tracking-tighter tabular-nums">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs text-white/70 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live map — sized so SA embed (min-h-dvh layout) fills without nested scroll */}
      <div id="live-map" className="scroll-mt-24 sm:scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-1">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#c2410c] mb-3 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            LIVE ON SUPPLIERADVISOR®
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance">
            Where our containers are located
          </h3>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
            A living map of Big Five Foods distribution points — the same network Direct uses to get
            fortified nutrition from plant to community. Transparent. Auditable. Built for good.
          </p>
        </div>

        {/* Full-bleed on large screens within section; height matches embed's full-viewport layout */}
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-[#f8fafc] shadow-[0_25px_50px_-12px_rgb(0_0_0_/0.18)]">
          <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-black/5 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative h-7 w-24 sm:w-28 shrink-0">
                <Image
                  src="/foods/supplieradvisor-logo.png"
                  alt="SupplierAdvisor"
                  fill
                  className="object-contain object-left"
                  sizes="112px"
                />
              </div>
              <span className="hidden sm:inline text-xs text-[#737373] truncate">
                Big Five Foods · live containers
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
              <a
                href={embedSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-black hover:opacity-70"
              >
                Expand
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/*
            SA embed uses min-h-dvh for its root layout. The iframe viewport IS that
            "dvh", so we give the frame a tall, fixed viewport-relative height and
            hide overflow so the map fills the frame without double scrollbars.
          */}
          <div
            className="relative w-full bg-[#f8fafc] overflow-hidden
              h-[min(78dvh,34rem)]
              sm:h-[min(80dvh,40rem)]
              md:h-[min(82dvh,46rem)]
              lg:h-[min(85dvh,52rem)]
              xl:h-[min(88dvh,56rem)]"
          >
            <iframe
              src={embedSrc}
              title="Big Five Foods containers on SupplierAdvisor® — live map"
              className="absolute inset-0 block h-full w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="geolocation; fullscreen"
              // Reduce chrome if the embed ever supports query flags
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#737373]">
          <p className="leading-relaxed max-w-2xl">
            Map updates when the Big Five Foods team changes sites in SupplierAdvisor®.{" "}
            <a
              href={SA_CONTAINERS_SETTINGS}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-black underline underline-offset-2"
            >
              Manage container settings
            </a>
          </p>
          <a
            href={data.company.containersUrl ?? SA_CONTAINERS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-black underline underline-offset-2 shrink-0"
          >
            Open full dashboard
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Why it matters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {[
          {
            icon: Heart,
            t: "Food with dignity",
            d: "Fortified porridges, soya, one-pot meals and soups — affordable nutrition designed for households, schools and institutions.",
          },
          {
            icon: MapPin,
            t: "Last mile that works",
            d: "Containers and micro-hubs shorten the gap between factory and community so more of every rand reaches plates, not middlemen.",
          },
          {
            icon: ShieldCheck,
            t: "Proof, not promises",
            d: "Verified on SupplierAdvisor® — professional rails for trade, quality and transparency partners can audit.",
          },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-7 min-w-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#c2410c] flex items-center justify-center mb-4">
              <c.icon className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-black mb-2">{c.t}</h4>
            <p className="text-sm text-[#525252] leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      {/* Trust + certs strip */}
      <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 min-w-0">
        <div className="lg:flex-1 min-w-0">
          <div className="text-xs tracking-[2px] text-[#737373] mb-2">QUALITY THE MARKET CAN AUDIT</div>
          <p className="text-base sm:text-lg text-black font-medium leading-snug mb-2">
            {data.company.legalName}
            {data.company.verified ? " — verified ethical company" : ""}
          </p>
          <p className="text-sm text-[#525252] leading-relaxed">
            Direct routes Foods products to market with the same integrity we demand on the
            manufacturing floor.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end lg:max-w-md">
          {data.impact.certifications.map((c) => (
            <span
              key={c}
              className="text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-full border border-black/10 bg-[#fafafa] text-[#404040]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
