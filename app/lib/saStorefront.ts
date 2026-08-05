/**
 * SupplierAdvisor® storefront bridge for Big Five Foods.
 *
 * Architecture:
 * - bigfivegroup.africa/foods = branded storefront & discovery
 * - supplieradvisor.com = system of record (catalog, quotes, orders)
 *
 * Live SA routes (Phase 2):
 *   GET  /store/big-five-foods
 *   GET  /store/{slug}/products/{sku|externalRef}
 *   GET  /api/storefront/{slug}/products
 *   GET  /api/storefront/{slug}/products/{key}
 *   POST /api/storefront/{slug}/quotes
 *
 * Deep-link params: source, ref, product, sku, name, channel
 *
 * Env (optional overrides):
 *   NEXT_PUBLIC_SA_FOODS_STORE_URL
 *   NEXT_PUBLIC_SA_FOODS_COMPANY_SLUG
 *   NEXT_PUBLIC_SA_FOODS_COMPANY_URL
 *   NEXT_PUBLIC_SA_STOREFRONT_API_BASE  (default: live SA storefront API)
 */

import { SA_LOGIN, SA_ONBOARDING, SA_URL } from "./saCopy";

const SA_ORIGIN = "https://www.supplieradvisor.com";

/** Canonical company slug on SupplierAdvisor */
export const SA_FOODS_COMPANY_SLUG =
  process.env.NEXT_PUBLIC_SA_FOODS_COMPANY_SLUG?.trim() || "big-five-foods";

/** Public HTML storefront */
export const SA_FOODS_STORE_URL = (
  process.env.NEXT_PUBLIC_SA_FOODS_STORE_URL?.trim() ||
  `${SA_ORIGIN}/store/${SA_FOODS_COMPANY_SLUG}`
).replace(/\/$/, "");

/** Company profile fallback */
export const SA_FOODS_COMPANY_URL =
  process.env.NEXT_PUBLIC_SA_FOODS_COMPANY_URL?.trim() ||
  `${SA_ORIGIN}/companies/${SA_FOODS_COMPANY_SLUG}`;

/**
 * Headless storefront API base on SupplierAdvisor.
 * Default: production SA storefront for Big Five Foods.
 * Set to empty string "" via env only if you must force local-only catalog.
 */
export const SA_STOREFRONT_API_BASE = (() => {
  const raw = process.env.NEXT_PUBLIC_SA_STOREFRONT_API_BASE;
  if (raw === "") return "";
  if (raw?.trim()) return raw.trim().replace(/\/$/, "");
  return `${SA_ORIGIN}/api/storefront/${SA_FOODS_COMPANY_SLUG}`;
})();

export type SaOrderChannel = "retail" | "institutional" | "wholesale";

export type SaOrderContext = {
  productId?: string;
  sku?: string;
  channel?: SaOrderChannel;
  productName?: string;
};

export type SaCartLine = {
  productId: string;
  sku?: string;
  name: string;
  channel?: SaOrderChannel;
  qty?: number;
};

export type SaBuyerPath = "institution" | "trade" | "new";

function attributionParams(ctx: SaOrderContext = {}): URLSearchParams {
  const params = new URLSearchParams();
  params.set("source", "bigfivegroup.africa");
  params.set("ref", "foods-sales-portal");
  if (ctx.productId) params.set("product", ctx.productId);
  if (ctx.sku) params.set("sku", ctx.sku);
  if (ctx.channel) params.set("channel", ctx.channel);
  if (ctx.productName) params.set("name", ctx.productName);
  return params;
}

/**
 * Order / product deep link on SA store.
 * Key is sku || externalRef (marketing product id).
 */
export function saFoodsOrderUrl(ctx: SaOrderContext = {}): string {
  const params = attributionParams(ctx);
  const qs = params.toString();
  const key = ctx.sku || ctx.productId;
  if (key) {
    return `${SA_FOODS_STORE_URL}/products/${encodeURIComponent(key)}?${qs}`;
  }
  return `${SA_FOODS_STORE_URL}?${qs}`;
}

/**
 * Multi-SKU handoff — lands on store with product ids.
 * SA expands `products` / `product` list when cart route is available;
 * otherwise store home with attribution for ops.
 */
export function saFoodsCartHandoffUrl(lines: SaCartLine[]): string {
  const params = attributionParams();
  params.set("intent", "cart");
  if (lines.length === 0) {
    return `${SA_FOODS_STORE_URL}?${params.toString()}`;
  }
  params.set("products", lines.map((l) => l.productId).join(","));
  // Prefer first product page when single SKU; multi → store with list
  if (lines.length === 1) {
    return saFoodsOrderUrl({
      productId: lines[0].productId,
      sku: lines[0].sku,
      channel: lines[0].channel,
      productName: lines[0].name,
    });
  }
  return `${SA_FOODS_STORE_URL}?${params.toString()}`;
}

export function saFoodsOnboardUrl(ctx: SaOrderContext = {}): string {
  const u = new URL(SA_ONBOARDING);
  // SA_ONBOARDING already has type=business — ensure required params
  u.searchParams.set("type", "business");
  u.searchParams.set("partner", SA_FOODS_COMPANY_SLUG);
  u.searchParams.set("intent", "order");
  u.searchParams.set("source", "bigfivegroup.africa");
  u.searchParams.set("ref", "foods-sales-portal");
  if (ctx.productId) u.searchParams.set("product", ctx.productId);
  if (ctx.sku) u.searchParams.set("sku", ctx.sku);
  if (ctx.channel) u.searchParams.set("channel", ctx.channel);
  if (ctx.productName) u.searchParams.set("name", ctx.productName);
  return u.toString();
}

/** Login with next= back to store (or product). */
export function saFoodsLoginUrl(ctx: SaOrderContext = {}): string {
  const next = saFoodsOrderUrl(ctx);
  try {
    const u = new URL(SA_LOGIN);
    u.searchParams.set("next", next);
    return u.toString();
  } catch {
    return `${SA_LOGIN}?next=${encodeURIComponent(next)}`;
  }
}

/** Local site quote/sample (Resend contact) — always available */
export function saFoodsQuoteEnquiryUrl(ctx: SaOrderContext = {}): string {
  const params = new URLSearchParams();
  params.set("interest", "foods");
  params.set("intent", "order");
  if (ctx.productId) params.set("product", ctx.productId);
  if (ctx.productName) params.set("productName", ctx.productName);
  if (ctx.channel) params.set("channel", ctx.channel);
  return `/contact?${params.toString()}`;
}

export function saFoodsSampleEnquiryUrl(ctx: SaOrderContext = {}): string {
  const params = new URLSearchParams();
  params.set("interest", "foods");
  params.set("intent", "sample");
  if (ctx.productId) params.set("product", ctx.productId);
  if (ctx.productName) params.set("productName", ctx.productName);
  if (ctx.channel) params.set("channel", ctx.channel);
  return `/contact?${params.toString()}`;
}

/**
 * Institutional quote on SA (POST /api/storefront/{slug}/quotes).
 * Prefer UI that posts via our proxy `/api/foods/quote` for CORS safety.
 */
export function saFoodsQuotesApiUrl(): string {
  if (!SA_STOREFRONT_API_BASE) {
    return `${SA_ORIGIN}/api/storefront/${SA_FOODS_COMPANY_SLUG}/quotes`;
  }
  return `${SA_STOREFRONT_API_BASE}/quotes`;
}

/** Buyer-path destinations */
export function saFoodsBuyerPathUrl(path: SaBuyerPath): string {
  switch (path) {
    case "institution":
      // Quote-first: SA store institutional channel + site quote form option
      return saFoodsOrderUrl({ channel: "institutional" });
    case "trade":
      return saFoodsOrderUrl({ channel: "wholesale" });
    case "new":
      return saFoodsOnboardUrl();
  }
}

export function foodsCatalogApiPath(): string {
  return "/api/foods/catalog";
}

export function foodsQuoteApiPath(): string {
  return "/api/foods/quote";
}

export type SaCatalogProduct = {
  id: string;
  sku?: string;
  name: string;
  shortName: string;
  range: string;
  pack: string;
  badge?: string;
  src: string;
  blurb: string;
  quoteFirst?: boolean;
  channel: SaOrderChannel;
  moqLabel?: string;
  leadTimeLabel?: string;
  sampleAvailable?: boolean;
  inStock?: boolean | null;
  priceOnRequest?: boolean;
  externalRef?: string;
};

export type SaCatalogResponse = {
  source: "local" | "supplieradvisor";
  seller: string;
  storeUrl: string;
  updatedAt: string;
  products: SaCatalogProduct[];
};

export type SaQuotePayload = {
  name: string;
  email: string;
  organisation?: string;
  phone?: string;
  message?: string;
  productId?: string;
  sku?: string;
  productName?: string;
  channel?: SaOrderChannel;
  source?: string;
  ref?: string;
};

export const SA_STOREFRONT_COPY = {
  brand: "Big Five Foods",
  seller: "Big Five Foods on SupplierAdvisor®",
  sellerLegal:
    "Seller of record: Big Five Foods (via SupplierAdvisor® verified company workspace). Quotes appear under Customers → Quotes on SA.",
  eyebrow: "SALES PORTAL · ORDER ON SUPPLIERADVISOR®",
  title: "Order fortified nutrition online",
  subtitle:
    "Browse and shortlist here. Complete trade on SupplierAdvisor® — public store, quotes, and fulfilment live on the verified network.",
  howTitle: "How ordering works",
  steps: [
    {
      n: "01",
      t: "Choose products",
      d: "Add ranges to your list — porridges, soya, one-pots, soups or NSNP institutional packs.",
    },
    {
      n: "02",
      t: "Sample or shortlist",
      d: "Request a sample, or open products on the live Big Five Foods store on SupplierAdvisor®.",
    },
    {
      n: "03",
      t: "Trade with proof",
      d: "Quotes, POs, invoices and fulfilment run on SA — NSNP stays quote-first.",
    },
  ],
  note:
    "SupplierAdvisor® is the system of record. This site is the branded storefront. Institutional / NSNP supply uses quote-first (no false instant checkout).",
  platformUrl: SA_URL,
  deliveryNote: "Primary fulfilment from South Africa · national and export corridors by arrangement",
  storePath: `/store/${SA_FOODS_COMPANY_SLUG}`,
} as const;

export const FOODS_BUYER_PATHS = [
  {
    id: "institution" as const,
    title: "School · government · programme",
    desc: "NSNP and institutional supply — open the store on institutional channel, then request a quote on SA.",
    cta: "Open institutional store",
  },
  {
    id: "trade" as const,
    title: "Retailer · caterer · wholesale",
    desc: "Trade account path — order ranges via the Big Five Foods store on SA.",
    cta: "Order on SupplierAdvisor®",
  },
  {
    id: "new" as const,
    title: "New to SupplierAdvisor®",
    desc: "Create a free business workspace, verify, then land on the Big Five Foods store.",
    cta: "Register free on SA",
  },
] as const;

/** Published commercial terms — keep in sync with ops / SA price lists */
export const FOODS_COMMERCIAL_TERMS = {
  responseSla: "We aim to respond to samples and quotes within 1 business day",
  samplePolicy:
    "Sample packs available on request for qualified buyers — then order full cartons on SupplierAdvisor®",
  moqDefault: "From 1 carton (retail/wholesale) · institutional MOQ on quote",
  leadTimeDefault: "Typically 5–10 business days after confirmation on SA (programme schedules may differ)",
  delivery: "Primary fulfilment from South Africa · national delivery and export corridors by arrangement",
  sellerOfRecord: "Big Five Foods — verified company on SupplierAdvisor®",
  systemOfRecord:
    "Orders, quotes, stock and invoices live on SupplierAdvisor® — not a separate website cart",
  nsnpNote:
    "NSNP / institutional SKUs are quote-first — no false instant checkout for programme supply",
  paymentNote: "B2B terms and invoicing via SupplierAdvisor® trade relationship (where agreed)",
} as const;

/** Certifications shown beside the sales portal */
export const FOODS_TRUST_CERTS = [
  { name: "ISO 9001", logo: "/foods/iso9001.png", desc: "Quality management" },
  { name: "FSSC 22000", logo: "/foods/fssc22000.png", desc: "Food safety" },
  { name: "Sedex", logo: "/foods/sedex.png", desc: "Ethical supply chain" },
  { name: "SANHA Halaal", logo: "/foods/halaal-sanha.png", desc: "Halaal" },
  { name: "Kosher", logo: "/foods/kosher.png", desc: "Kosher" },
  { name: "SupplierAdvisor®", logo: "/foods/supplieradvisor-logo.png", desc: "Verified trade" },
] as const;
