"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Package,
  ShoppingBag,
  Building2,
  ShieldCheck,
  School,
  Store,
  UserPlus,
  FlaskConical,
  ListPlus,
  Check,
  X,
  Clock,
  Boxes,
} from "lucide-react";
import {
  FOODS_RANGE_LABELS,
  FOODS_SHOP_PRODUCTS,
  productTerms,
  type FoodsRangeId,
  type FoodsShopProduct,
} from "../lib/foodsProducts";
import {
  FOODS_BUYER_PATHS,
  SA_FOODS_STORE_URL,
  SA_STOREFRONT_COPY,
  foodsCatalogApiPath,
  saFoodsBuyerPathUrl,
  saFoodsCartHandoffUrl,
  saFoodsLoginUrl,
  saFoodsOnboardUrl,
  saFoodsOrderUrl,
  saFoodsQuoteEnquiryUrl,
  saFoodsSampleEnquiryUrl,
  type SaCatalogProduct,
  type SaCatalogResponse,
  type SaCartLine,
  type SaOrderChannel,
} from "../lib/saStorefront";
import { track } from "../lib/analytics";

const ACCENT_DARK = "#b45309";
const LIST_KEY = "bfg-foods-order-list-v1";

const RANGE_ORDER: FoodsRangeId[] = ["porridge", "soya", "onepot", "soup", "nsnp"];

const FILTERS: { id: "all" | FoodsRangeId; label: string }[] = [
  { id: "all", label: "All products" },
  ...RANGE_ORDER.map((id) => ({ id, label: FOODS_RANGE_LABELS[id] })),
];

type ListItem = { id: string; qty: number };

function toShopProduct(p: SaCatalogProduct): FoodsShopProduct {
  const range = (RANGE_ORDER.includes(p.range as FoodsRangeId)
    ? p.range
    : "porridge") as FoodsRangeId;
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    shortName: p.shortName,
    range,
    pack: p.pack,
    badge: p.badge,
    src: p.src,
    blurb: p.blurb,
    quoteFirst: p.quoteFirst,
    channel: (p.channel || "retail") as SaOrderChannel,
    moqLabel: p.moqLabel,
    leadTimeLabel: p.leadTimeLabel,
    sampleAvailable: p.sampleAvailable,
  };
}

function loadList(): ListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ListItem[];
    return Array.isArray(parsed) ? parsed.filter((x) => x?.id) : [];
  } catch {
    return [];
  }
}

function ProductCard({
  product,
  inList,
  onToggleList,
}: {
  product: FoodsShopProduct;
  inList: boolean;
  onToggleList: (id: string) => void;
}) {
  const terms = productTerms(product);
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
  const sampleUrl = saFoodsSampleEnquiryUrl({
    productId: product.id,
    productName: product.name,
    channel: product.channel,
  });

  const primaryHref = product.quoteFirst ? quoteUrl : orderUrl;
  const primaryLabel = product.quoteFirst ? "Request quote" : "Order on SA";
  const primaryExternal = !product.quoteFirst;

  return (
    <article className="group flex flex-col rounded-xl border border-black/10 bg-white overflow-hidden hover:border-amber-300/50 transition-colors min-w-0 h-full">
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
        <p className="text-[11px] sm:text-xs text-[#525252] leading-snug line-clamp-2 mb-2">
          {product.blurb}
        </p>
        <div className="space-y-1 mb-3 text-[10px] text-[#737373]">
          <div className="flex items-start gap-1">
            <Boxes className="w-3 h-3 shrink-0 mt-0.5 text-amber-800" />
            <span className="leading-snug">{terms.moqLabel}</span>
          </div>
          <div className="flex items-start gap-1">
            <Clock className="w-3 h-3 shrink-0 mt-0.5 text-amber-800" />
            <span className="leading-snug">{terms.leadTimeLabel}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mt-auto">
          <button
            type="button"
            onClick={() => {
              onToggleList(product.id);
              track(inList ? "foods_list_remove" : "foods_list_add", {
                productId: product.id,
              });
            }}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[11px] sm:text-xs font-semibold w-full border transition-colors ${
              inList
                ? "bg-amber-50 border-amber-300 text-amber-950"
                : "bg-white border-black/15 text-black hover:border-amber-300/70"
            }`}
          >
            {inList ? (
              <>
                <Check className="w-3 h-3" /> On your list
              </>
            ) : (
              <>
                <ListPlus className="w-3 h-3" /> Add to order list
              </>
            )}
          </button>
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
            {terms.sampleAvailable && (
              <Link
                href={sampleUrl}
                onClick={() =>
                  track("sample_request", { productId: product.id, source: "shop_card" })
                }
                className="flex-1 inline-flex items-center justify-center gap-0.5 text-[10px] font-semibold text-[#525252] border border-black/10 rounded-full py-1.5 hover:bg-[#fafafa]"
              >
                <FlaskConical className="w-2.5 h-2.5" />
                Sample
              </Link>
            )}
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
          </div>
        </div>
      </div>
    </article>
  );
}

function CategorySection({
  range,
  products,
  listIds,
  onToggleList,
}: {
  range: FoodsRangeId;
  products: FoodsShopProduct[];
  listIds: Set<string>;
  onToggleList: (id: string) => void;
}) {
  if (products.length === 0) return null;
  const isNsnp = range === "nsnp";
  const terms = productTerms(products[0]);

  return (
    <div id={`shop-${range}`} className="scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4 border-b border-black/10 pb-2.5">
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
            {" · "}
            {terms.moqLabel}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            inList={listIds.has(p.id)}
            onToggleList={onToggleList}
          />
        ))}
      </div>
    </div>
  );
}

const PATH_ICONS = {
  institution: School,
  trade: Store,
  new: UserPlus,
} as const;

export default function FoodsSalesPortal() {
  const [filter, setFilter] = useState<"all" | FoodsRangeId>("all");
  const [list, setList] = useState<ListItem[]>([]);
  const [catalogSource, setCatalogSource] = useState<"local" | "supplieradvisor">("local");
  const [shopProducts, setShopProducts] = useState<FoodsShopProduct[]>(() => [
    ...FOODS_SHOP_PRODUCTS,
  ]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setList(loadList());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LIST_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }, [list, hydrated]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(foodsCatalogApiPath());
        if (!res.ok) return;
        const data = (await res.json()) as SaCatalogResponse;
        if (cancelled) return;
        if (data.source) setCatalogSource(data.source);
        if (Array.isArray(data.products) && data.products.length > 0) {
          setShopProducts(data.products.map(toShopProduct));
        }
      } catch {
        /* keep local */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const listIds = useMemo(() => new Set(list.map((x) => x.id)), [list]);

  const toggleList = useCallback((id: string) => {
    setList((prev) => {
      const exists = prev.some((x) => x.id === id);
      if (exists) return prev.filter((x) => x.id !== id);
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const clearList = useCallback(() => setList([]), []);

  const cartLines: SaCartLine[] = useMemo(() => {
    return list
      .map((item) => {
        const p = shopProducts.find((x) => x.id === item.id);
        if (!p) return null;
        return {
          productId: p.id,
          sku: p.sku,
          name: p.name,
          channel: p.channel,
          qty: item.qty,
        } satisfies SaCartLine;
      })
      .filter(Boolean) as SaCartLine[];
  }, [list, shopProducts]);

  const handoffUrl = useMemo(() => saFoodsCartHandoffUrl(cartLines), [cartLines]);

  const quoteListUrl = useMemo(() => {
    if (cartLines.length === 0) return "/contact?interest=foods&intent=order";
    const names = cartLines.map((l) => l.name).join("; ");
    const params = new URLSearchParams();
    params.set("interest", "foods");
    params.set("intent", "order");
    params.set("productName", names.slice(0, 200));
    params.set("products", cartLines.map((l) => l.productId).join(","));
    return `/contact?${params.toString()}`;
  }, [cartLines]);

  const grouped = useMemo(() => {
    const ranges = filter === "all" ? RANGE_ORDER : [filter];
    return ranges.map((range) => ({
      range,
      products: shopProducts.filter((p) => p.range === range),
    }));
  }, [filter, shopProducts]);

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
            <p className="mt-2 text-xs text-[#737373]">
              Catalog:{" "}
              <span className="font-semibold text-[#404040]">
                {catalogSource === "supplieradvisor"
                  ? "SupplierAdvisor® live storefront API"
                  : "Local catalogue · will prefer live SA when API responds"}
              </span>
              {" · "}
              Store:{" "}
              <a
                href={SA_FOODS_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-950 underline underline-offset-2"
              >
                {SA_STOREFRONT_COPY.storePath}
              </a>
              {" · "}
              {SA_STOREFRONT_COPY.deliveryNote}
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
              href={saFoodsLoginUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 py-3 rounded-full text-sm font-semibold"
            >
              Login to SupplierAdvisor®
            </a>
          </div>
        </div>

        {/* Buyer paths — all land on live SA store / onboarding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {FOODS_BUYER_PATHS.map((path) => {
            const Icon = PATH_ICONS[path.id];
            const href = saFoodsBuyerPathUrl(path.id);
            return (
              <a
                key={path.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("foods_buyer_path", { path: path.id })}
                className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 min-w-0 flex flex-col h-full hover:border-amber-300/60 transition-colors text-left"
              >
                <Icon className="w-5 h-5 text-amber-800 mb-2.5" />
                <div className="text-sm font-semibold text-black mb-1">{path.title}</div>
                <p className="text-xs text-[#525252] leading-relaxed flex-1 mb-3">{path.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-950">
                  {path.cta}
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Sample → order ladder */}
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/40 p-5 sm:p-6 mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-4 h-4 text-amber-800" />
            <h3 className="text-sm sm:text-base font-semibold text-black tracking-tight">
              Sample → approve → order on SupplierAdvisor®
            </h3>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {[
              {
                n: "1",
                t: "Request a sample",
                d: "Tell us region, volume interest and pack preference.",
              },
              {
                n: "2",
                t: "Approve the range",
                d: "Taste, fortification and kitchen fit — then shortlist SKUs.",
              },
              {
                n: "3",
                t: "Order on SA",
                d: "Open your list on SupplierAdvisor® for ongoing reorder trade.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-black">{s.t}</div>
                  <p className="text-[11px] text-[#525252] leading-snug mt-0.5">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/contact?interest=foods&intent=sample"
            onClick={() => track("sample_request", { source: "shop_ladder" })}
            className="premium-button inline-flex items-center justify-center gap-2 bg-amber-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            Start with a sample
            <ArrowRight className="w-4 h-4" />
          </Link>
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
        <div className="flex flex-wrap items-start gap-3 sm:gap-4 mb-8 rounded-2xl border border-amber-200/80 bg-amber-50/50 px-4 py-3.5">
          <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
              <strong className="text-black">{SA_STOREFRONT_COPY.seller}</strong>
              {" — "}
              {SA_STOREFRONT_COPY.note}
            </p>
            <p className="text-[11px] text-[#737373]">{SA_STOREFRONT_COPY.sellerLegal}</p>
          </div>
          <a
            href={SA_FOODS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-950 underline underline-offset-2 shrink-0"
          >
            Store URL
          </a>
        </div>

        {/* Filters */}
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
        <div className="space-y-10 sm:space-y-12 pb-20 sm:pb-16">
          {grouped.map(({ range, products }) => (
            <CategorySection
              key={range}
              range={range}
              products={products}
              listIds={listIds}
              onToggleList={toggleList}
            />
          ))}
        </div>

        {totalShown === 0 && (
          <p className="text-center text-sm text-[#737373] py-12">No products in this range.</p>
        )}

        {/* Bottom CTAs */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Sticky order list bar — multi-SKU handoff to SA */}
      {hydrated && list.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-black">
                Order list · {list.length} product{list.length === 1 ? "" : "s"}
              </div>
              <p className="text-[11px] text-[#737373] truncate">
                {cartLines.map((l) => l.name).join(" · ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={clearList}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold border border-black/10 text-[#525252] hover:bg-[#fafafa]"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
              <Link
                href={quoteListUrl}
                onClick={() => track("foods_list_quote", { count: list.length })}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-black/15 bg-white text-black"
              >
                Request quote
              </Link>
              <a
                href={handoffUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("foods_list_sa_handoff", { count: list.length })}
                className="premium-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-black text-white"
              >
                Open list on SupplierAdvisor®
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
