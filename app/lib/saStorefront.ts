/**
 * SupplierAdvisor® storefront bridge for Big Five Foods.
 *
 * Architecture (long-term):
 * - bigfivegroup.africa/foods = branded storefront & discovery
 * - supplieradvisor.com = system of record (catalog, cart, orders, stock)
 *
 * Phase 1: deep links into SA (store / company / onboarding).
 * Phase 2+: public catalog + order APIs on SA; this module stays the single config surface.
 *
 * Override store URL without code change:
 *   NEXT_PUBLIC_SA_FOODS_STORE_URL=https://www.supplieradvisor.com/store/big-five-foods
 *   NEXT_PUBLIC_SA_FOODS_COMPANY_SLUG=big-five-foods
 */

import { SA_LOGIN, SA_ONBOARDING, SA_URL } from "./saCopy";

/** Canonical company slug on SupplierAdvisor (public store / network profile). */
export const SA_FOODS_COMPANY_SLUG =
  process.env.NEXT_PUBLIC_SA_FOODS_COMPANY_SLUG?.trim() || "big-five-foods";

/**
 * Public storefront base for Big Five Foods on SA.
 * Default path is conventional; set env when live store path differs.
 */
export const SA_FOODS_STORE_URL = (
  process.env.NEXT_PUBLIC_SA_FOODS_STORE_URL?.trim() ||
  `https://www.supplieradvisor.com/store/${SA_FOODS_COMPANY_SLUG}`
).replace(/\/$/, "");

/** Company profile / network page fallback */
export const SA_FOODS_COMPANY_URL =
  process.env.NEXT_PUBLIC_SA_FOODS_COMPANY_URL?.trim() ||
  `https://www.supplieradvisor.com/companies/${SA_FOODS_COMPANY_SLUG}`;

export type SaOrderChannel = "retail" | "institutional" | "wholesale";

export type SaOrderContext = {
  /** Stable product id from foodsProducts catalogue */
  productId?: string;
  /** SKU code if known on SA */
  sku?: string;
  channel?: SaOrderChannel;
  /** Human label for UTM / notes */
  productName?: string;
};

/**
 * Primary “Order on SupplierAdvisor®” URL for a product or the Foods store.
 * Prefer store product deep link; fall back to store home with intent query.
 */
export function saFoodsOrderUrl(ctx: SaOrderContext = {}): string {
  const params = new URLSearchParams();
  params.set("source", "bigfivegroup.africa");
  params.set("ref", "foods-sales-portal");
  if (ctx.productId) params.set("product", ctx.productId);
  if (ctx.sku) params.set("sku", ctx.sku);
  if (ctx.channel) params.set("channel", ctx.channel);
  if (ctx.productName) params.set("name", ctx.productName);

  const qs = params.toString();
  if (ctx.sku || ctx.productId) {
    const slug = encodeURIComponent(ctx.sku || ctx.productId || "");
    return `${SA_FOODS_STORE_URL}/products/${slug}?${qs}`;
  }
  return `${SA_FOODS_STORE_URL}?${qs}`;
}

/** New buyer: onboard on SA with Foods order intent preserved. */
export function saFoodsOnboardUrl(ctx: SaOrderContext = {}): string {
  const u = new URL(SA_ONBOARDING);
  u.searchParams.set("type", "business");
  u.searchParams.set("partner", SA_FOODS_COMPANY_SLUG);
  u.searchParams.set("intent", "order");
  u.searchParams.set("source", "bigfivegroup.africa");
  if (ctx.productId) u.searchParams.set("product", ctx.productId);
  if (ctx.sku) u.searchParams.set("sku", ctx.sku);
  if (ctx.channel) u.searchParams.set("channel", ctx.channel);
  return u.toString();
}

/** Existing SA user: login then continue to store. */
export function saFoodsLoginUrl(returnToStore = true): string {
  if (!returnToStore) return SA_LOGIN;
  const next = encodeURIComponent(saFoodsOrderUrl());
  try {
    const u = new URL(SA_LOGIN);
    u.searchParams.set("next", saFoodsOrderUrl());
    return u.toString();
  } catch {
    return `${SA_LOGIN}?next=${next}`;
  }
}

export function saFoodsQuoteEnquiryUrl(ctx: SaOrderContext = {}): string {
  const params = new URLSearchParams();
  params.set("interest", "foods");
  params.set("intent", "order");
  if (ctx.productId) params.set("product", ctx.productId);
  if (ctx.productName) params.set("productName", ctx.productName);
  if (ctx.channel) params.set("channel", ctx.channel);
  return `/contact?${params.toString()}`;
}

export const SA_STOREFRONT_COPY = {
  brand: "Big Five Foods",
  seller: "Big Five Foods on SupplierAdvisor®",
  eyebrow: "SALES PORTAL · ORDER ON SUPPLIERADVISOR®",
  title: "Order fortified nutrition online",
  subtitle:
    "Browse ranges here. Complete trade on SupplierAdvisor® — where Big Five Foods is a verified company, and orders, stock and proof live in one OS.",
  howTitle: "How ordering works",
  steps: [
    {
      n: "01",
      t: "Choose products",
      d: "Pick porridges, soya, one-pots, soups or NSNP institutional packs on this page.",
    },
    {
      n: "02",
      t: "Open SupplierAdvisor®",
      d: "Order via the Big Five Foods storefront — register or log in as a verified buyer.",
    },
    {
      n: "03",
      t: "Trade with proof",
      d: "Quotes, POs, invoices and fulfilment run on SA — not a separate website cart.",
    },
  ],
  note:
    "SupplierAdvisor® is the system of record. This site is the branded storefront. Institutional / NSNP supply may require a quote and programme approval rather than instant checkout.",
  platformUrl: SA_URL,
} as const;
