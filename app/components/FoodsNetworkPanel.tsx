"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  MapPin,
  Package,
  ShieldCheck,
  UtensilsCrossed,
  Activity,
  Loader2,
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

const statusStyle: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-800 border-emerald-200",
  deploying: "bg-amber-50 text-amber-900 border-amber-200",
  planned: "bg-black/5 text-[#525252] border-black/10",
};

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

  const activeCount = data.containers.filter((c) => c.status === "active").length;

  return (
    <div className="space-y-8 sm:space-y-10 min-w-0">
      {/* Company bridge */}
      <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 min-w-0">
            <div className="inline-flex items-center gap-2 text-xs tracking-[2px] text-emerald-700 mb-4">
              <ShieldCheck className="w-4 h-4" />
              CONNECTED ON SUPPLIERADVISOR®
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-3">
              Big Five Direct × Big Five Foods
            </h3>
            <p className="text-[#525252] text-sm sm:text-base leading-relaxed mb-4 max-w-xl">
              {data.company.description} Direct builds the last-mile and route-to-market layer on top
              of Foods manufacturing and containerised distribution — so partners see{" "}
              <strong className="text-black">where containers sit</strong> and{" "}
              <strong className="text-black">what food impact</strong> they enable.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {data.company.verified ? "Verified company" : "Listed company"}
              </span>
              {data.company.verifiedOn && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/5 text-[#525252]">
                  Verified {data.company.verifiedOn}
                </span>
              )}
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/5 text-[#525252]">
                Source: {data.source === "live" ? "Live API" : "Published network"}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/5 text-[#525252]">
                As of {data.asOf}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#live-map"
                className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold"
              >
                View live container map
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={data.company.containersUrl ?? SA_CONTAINERS}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5"
              >
                Open containers on SA
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={data.company.containersSettingsUrl ?? SA_CONTAINERS_SETTINGS}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5"
              >
                Manage settings
              </a>
              <a
                href="/foods"
                className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5"
              >
                Foods pillar
              </a>
            </div>
            <p className="mt-4 text-xs text-[#737373] leading-relaxed max-w-xl">
              Live map is embedded from SupplierAdvisor®. Operators update sites in{" "}
              <a
                href={SA_CONTAINERS_SETTINGS}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-black underline underline-offset-2"
              >
                container settings
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 bg-[#0a0a0a] text-white flex flex-col justify-center min-w-0">
            <div className="relative h-14 w-40 mb-6">
              <Image
                src="/foods/supplieradvisor-logo.png"
                alt="SupplierAdvisor"
                fill
                className="object-contain object-left brightness-0 invert opacity-90"
                sizes="160px"
              />
            </div>
            <div className="text-xs tracking-[2px] text-white/40 mb-2">{data.company.legalName}</div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Multi-entity group pattern: Foods, Direct and related entities can share verified
              inventory, sites and fulfilment signals on one network — when live API access is
              enabled for this website.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold tracking-tighter">{activeCount}</div>
                <div className="text-xs text-white/50 mt-1">Active container sites</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold tracking-tighter">
                  {formatNum(data.impact.mealsDelivered)}
                </div>
                <div className="text-xs text-white/50 mt-1">Meals impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food impact */}
      <div>
        <div className="flex items-center gap-2 text-xs tracking-[2px] text-[#c2410c] mb-4">
          <UtensilsCrossed className="w-4 h-4" />
          FOOD IMPACT · BIG FIVE FOODS
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: data.impact.mealsDeliveredLabel,
              value: formatNum(data.impact.mealsDelivered),
            },
            {
              label: data.impact.childrenReachedLabel,
              value: formatNum(data.impact.childrenReached),
            },
            {
              label: "Product ranges",
              value: String(data.impact.productRanges),
            },
            {
              label: "Shelf life (key ranges)",
              value: `${data.impact.shelfLifeMonths} mo`,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 text-center min-w-0"
            >
              <div className="text-2xl sm:text-3xl font-semibold tracking-tighter text-[#c2410c]">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-[#525252] mt-2 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.impact.certifications.map((c) => (
            <span
              key={c}
              className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full border border-black/10 bg-white text-[#404040]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Live SA embed + snapshot list */}
      <div id="live-map" className="scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[2px] text-[#c2410c] mb-2">
              <Package className="w-4 h-4" />
              LIVE ON SUPPLIERADVISOR®
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tighter text-black">
              Where our containers are located
            </h3>
            <p className="text-sm text-[#525252] mt-1 max-w-2xl">
              Live embed from Big Five Foods on SupplierAdvisor® — updates when operators change
              sites in the containers workspace.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Live embed
            </span>
            <a
              href={data.company.containersEmbedUrl ?? SA_CONTAINERS_EMBED}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-black underline underline-offset-2"
            >
              Open embed full screen
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-[#f5f5f5] shadow-sm min-h-[320px] sm:min-h-[420px] md:min-h-[520px] h-[min(70vh,640px)]">
          <iframe
            src={data.company.containersEmbedUrl ?? SA_CONTAINERS_EMBED}
            title="Big Five Foods containers on SupplierAdvisor®"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="geolocation; fullscreen"
          />
        </div>

        <details className="mt-6 group">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-semibold text-black hover:bg-[#fafafa]">
            <span>
              Published snapshot · {data.containers.length} sites · {activeCount} active
            </span>
            <span className="text-xs font-medium text-[#737373] group-open:hidden">Show list</span>
            <span className="text-xs font-medium text-[#737373] hidden group-open:inline">
              Hide list
            </span>
          </summary>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {data.containers.map((site) => (
              <div
                key={site.id}
                className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 flex flex-col min-w-0"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#c2410c] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-black leading-snug">{site.name}</h4>
                      <p className="text-sm text-[#525252]">{site.location}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-[1px] font-semibold px-2 py-1 rounded-full border ${statusStyle[site.status]}`}
                  >
                    {site.status}
                  </span>
                </div>
                <p className="text-sm text-[#404040] leading-relaxed mb-3">{site.role}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#737373]">
                  <span className="inline-flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    {site.region}
                  </span>
                  {typeof site.mealsServed === "number" && (
                    <span>{formatNum(site.mealsServed)} meals impact</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>

      {data.note && (
        <p className="text-xs text-[#737373] leading-relaxed max-w-3xl">{data.note}</p>
      )}
    </div>
  );
}
