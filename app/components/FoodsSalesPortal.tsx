"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Package,
  ShoppingBag,
  Building2,
  ShieldCheck,
} from "lucide-react";
import {
  FOODS_RANGE_LABELS,
  FOODS_SHOP_PRODUCTS,
  type FoodsRangeId,
  type FoodsShopProduct,
} from "../lib/foodsProducts";
import {
  SA_FOODS_STORE_URL,
  SA_STOREFRONT_COPY,
  saFoodsOnboardUrl,
  saFoodsOrderUrl,
  saFoodsQuoteEnquiryUrl,
} from "../lib/saStorefront";
import { track } from "../lib/analytics";

const ACCENT_DARK = "#b45309";

/** Display order for category sections */
const RANGE_ORDER: FoodsRangeId[] = ["porridge", "soya", "onepot", "soup", "nsnp"];

const FILTERS: { id: "all" | FoodsRangeId; label: string }[] = [
  { id: "all", label: "All products" },
  ...RANGE_ORDER.map((id) => ({ id, label: FOODS_RANGE_LABELS[id] })),
];

function ProductCard({ product }: { product: FoodsShopProduct }) {
  const orderUrl = saFoodsOrderUrl({
    productId: product.id,
    sku: product.sku,
    channel: product.channel,
    productName: product.name,
  });
  const quoteUrl = saFoodsQuoteEnquiryUrl({
    productId: product.id,
    productName: product.name,
    channel: product.channel,
  });
  const onboardUrl = saFoodsOnboardUrl({
    productId: product.id,
    sku: product.sku,
    channel: product.channel,
    productName: product.name,
  });

  const primaryHref = product.quoteFirst ? quoteUrl : orderUrl;
  const primaryLabel = product.quoteFirst ? "Request quote" : "Order on SA";
  const primaryExternal = !product.quoteFirst;

  return (
    <article className="group flex flex-col rounded-xl border border-black/10 bg-white overflow-hidden hover:border-amber-300/50 transition-colors min-w-0 h-full">
      {/* Full product pack — contained, not cropped */}
      <div className="relative h-28 sm:h-32 bg-[#f8f7f5] border-b border-black/[0.06] flex items-center justify-center p-2.5 sm:p-3">
        <div className="relative w-full h-full max-w-[7.5rem] sm:max-w-[8.5rem] mx-auto">
          <Image
            src={product.src}
            alt={product.name}
            fill
            className="object-contain object-center"
            sizes="140px"
          />
        </div>
        {product.badge && (
          <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-emerald-700 text-white leading-none">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-3 sm:p-3.5 min-w-0">
        <h3 className="text-sm font-semibold tracking-tight text-black leading-snug mb-0.5 line-clamp-2">
          {product.shortName}
        </h3>
        <p className="text-[11px] text-[#737373] mb-1.5">{product.pack}</p>
        <p className="text-[11px] sm:text-xs text-[#525252] leading-snug line-clamp-2 mb-3 flex-1">
          {product.blurb}
        </p>
        <div className="flex flex-col gap-1.5 mt-auto">
          {primaryExternal ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("foods_sa_order_click", {
                  productId: product.id,
                  channel: product.channel,
                })
              }
              className="premium-button inline-flex items-center justify-center gap-1.5 bg-black text-white px-3 py-2 rounded-full text-[11px] sm:text-xs font-semibold w-full"
            >
              {primaryLabel}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <Link
              href={primaryHref}
              onClick={() =>
                track("foods_quote_click", {
                  productId: product.id,
                  channel: product.channel,
                })
              }
              className="premium-button inline-flex items-center justify-center gap-1.5 bg-black text-white px-3 py-2 rounded-full text-[11px] sm:text-xs font-semibold w-full"
            >
              {primaryLabel}
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          <div className="flex gap-1.5">
            {!product.quoteFirst ? (
              <Link
                href={quoteUrl}
                className="flex-1 inline-flex items-center justify-center text-[10px] font-semibold text-[#525252] border border-black/10 rounded-full py-1.5 hover:bg-[#fafafa]"
              >
                Quote
              </Link>
            ) : (
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-0.5 text-[10px] font-semibold text-[#525252] border border-black/10 rounded-full py-1.5 hover:bg-[#fafafa]"
              >
                Store
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
            <a
              href={onboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center text-[10px] font-semibold text-amber-900 border border-amber-200 bg-amber-50/70 rounded-full py-1.5 hover:bg-amber-50"
            >
              Join SA
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function CategorySection({
  range,
  products,
}: {
  range: FoodsRangeId;
  products: FoodsShopProduct[];
}) {
  if (products.length === 0) return null;
  const isNsnp = range === "nsnp";

  return (
    <div id={`shop-${range}`} className="scroll-mt-28">
      <div className="flex items-end justify-between gap-3 mb-3 sm:mb-4 border-b border-black/10 pb-2.5">
        <div className="min-w-0">
          <h3
            className={`text-base sm:text-lg font-semibold tracking-tight ${
              isNsnp ? "text-emerald-900" : "text-black"
            }`}
          >
            {FOODS_RANGE_LABELS[range]}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#737373] mt-0.5">
            {products.length} product{products.length === 1 ? "" : "s"}
            {isNsnp ? " · institutional / quote-first" : ""}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function FoodsSalesPortal() {
  const [filter, setFilter] = useState<"all" | FoodsRangeId>("all");

  const grouped = useMemo(() => {
    const ranges = filter === "all" ? RANGE_ORDER : [filter];
    return ranges.map((range) => ({
      range,
      products: FOODS_SHOP_PRODUCTS.filter((p) => p.range === range),
    }));
  }, [filter]);

  const totalShown = grouped.reduce((n, g) => n + g.products.length, 0);

  return (
    <section
      id="shop"
      className="scroll-mt-24 border-b border-black/10 bg-[#fafafa] py-14 sm:py-20 md:py-24"
      aria-labelledby="foods-shop-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl min-w-0">
            <div
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] font-semibold uppercase mb-3"
              style={{ color: ACCENT_DARK }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {SA_STOREFRONT_COPY.eyebrow}
            </div>
            <h2
              id="foods-shop-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-black text-balance leading-[1.05]"
            >
              {SA_STOREFRONT_COPY.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed">
              {SA_STOREFRONT_COPY.subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
            <a
              href={saFoodsOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("foods_sa_store_open", { source: "portal_header" })}
              className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-full text-sm font-semibold"
            >
              Open Big Five Foods store
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={saFoodsOnboardUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 py-3 rounded-full text-sm font-semibold"
            >
              Register on SupplierAdvisor®
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {SA_STOREFRONT_COPY.steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 min-w-0"
            >
              <div className="text-[10px] font-bold tracking-[2px] text-amber-800 mb-1.5">
                {s.n}
              </div>
              <div className="text-sm font-semibold text-black mb-1">{s.t}</div>
              <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 rounded-2xl border border-amber-200/80 bg-amber-50/50 px-4 py-3.5">
          <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
          <p className="text-xs sm:text-sm text-[#404040] leading-relaxed flex-1 min-w-0">
            <strong className="text-black">{SA_STOREFRONT_COPY.seller}</strong>
            {" — "}
            {SA_STOREFRONT_COPY.note}
          </p>
          <a
            href={SA_FOODS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-950 underline underline-offset-2 shrink-0"
          >
            Store URL
          </a>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-semibold border transition-colors ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white text-[#404040] border-black/10 hover:border-amber-300/70"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Products by category */}
        <div className="space-y-10 sm:space-y-12">
          {grouped.map(({ range, products }) => (
            <CategorySection key={range} range={range} products={products} />
          ))}
        </div>

        {totalShown === 0 && (
          <p className="text-center text-sm text-[#737373] py-12">No products in this range.</p>
        )}

        {/* Bottom CTAs */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 flex gap-4 items-start">
            <Package className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-black mb-1">Wholesale & programmes</h3>
              <p className="text-sm text-[#525252] leading-relaxed mb-3">
                Volume, NSNP institutional packs, and multi-site supply — request a quote and we
                fulfil via SupplierAdvisor® where programme rules allow.
              </p>
              <Link
                href="/contact?interest=foods&intent=order"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 hover:underline"
              >
                Institutional / volume enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 flex gap-4 items-start">
            <Building2 className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-black mb-1">New to SupplierAdvisor®?</h3>
              <p className="text-sm text-[#525252] leading-relaxed mb-3">
                Create a free business workspace, verify your company, then trade with Big Five
                Foods on the same OS as inventory and proof.
              </p>
              <a
                href={saFoodsOnboardUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 hover:underline"
              >
                Start free trial on SA
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
