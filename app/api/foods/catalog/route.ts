import { NextResponse } from "next/server";
import {
  FOODS_SHOP_PRODUCTS,
  productTerms,
  type FoodsShopProduct,
} from "../../../lib/foodsProducts";
import {
  SA_FOODS_COMPANY_SLUG,
  SA_FOODS_STORE_URL,
  SA_STOREFRONT_API_BASE,
  SA_STOREFRONT_COPY,
  type SaCatalogProduct,
  type SaCatalogResponse,
  type SaOrderChannel,
} from "../../../lib/saStorefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function localProduct(p: FoodsShopProduct): SaCatalogProduct {
  const t = productTerms(p);
  return {
    id: p.id,
    sku: p.sku,
    externalRef: p.id,
    name: p.name,
    shortName: p.shortName,
    range: p.range,
    pack: p.pack,
    badge: p.badge,
    src: p.src,
    blurb: p.blurb,
    quoteFirst: p.quoteFirst,
    channel: p.channel,
    moqLabel: t.moqLabel,
    leadTimeLabel: t.leadTimeLabel,
    sampleAvailable: t.sampleAvailable,
    inStock: null,
    priceOnRequest: true,
  };
}

/** Normalize heterogeneous SA product payloads */
function normalizeRemoteProduct(
  raw: Record<string, unknown>,
  localByKey: Map<string, SaCatalogProduct>
): SaCatalogProduct {
  const externalRef =
    (raw.externalRef as string) ||
    (raw.external_ref as string) ||
    ((raw.metadata as { externalRef?: string } | undefined)?.externalRef) ||
    "";
  const sku = (raw.sku as string) || (raw.id as string) || "";
  const id = externalRef || sku || (raw.id as string) || "unknown";
  const base =
    localByKey.get(id) ||
    localByKey.get(externalRef) ||
    localByKey.get(sku) ||
    undefined;

  const channelRaw = (raw.channel as string) || base?.channel || "retail";
  const channel = (
    ["retail", "wholesale", "institutional"].includes(channelRaw)
      ? channelRaw
      : "retail"
  ) as SaOrderChannel;

  const badges = raw.badges as string[] | undefined;
  const badge =
    (raw.badge as string) ||
    badges?.[0] ||
    base?.badge;

  const images = raw.images as string[] | undefined;
  const src =
    (raw.src as string) ||
    (raw.image as string) ||
    images?.[0] ||
    base?.src ||
    "/foods-hero.jpg";

  const name = (raw.name as string) || base?.name || id;
  const quoteFirst =
    typeof raw.quoteFirst === "boolean"
      ? raw.quoteFirst
      : typeof raw.quote_first === "boolean"
        ? (raw.quote_first as boolean)
        : channel === "institutional" || Boolean(base?.quoteFirst);

  return {
    id,
    sku: sku || base?.sku,
    externalRef: externalRef || id,
    name,
    shortName: (raw.shortName as string) || (raw.short_name as string) || base?.shortName || name,
    range: (raw.range as string) || base?.range || "porridge",
    pack: (raw.pack as string) || (raw.packSize as string) || base?.pack || "",
    badge,
    src,
    blurb:
      (raw.blurb as string) ||
      (raw.description as string) ||
      base?.blurb ||
      "",
    quoteFirst,
    channel,
    moqLabel: (raw.moqLabel as string) || base?.moqLabel,
    leadTimeLabel: (raw.leadTimeLabel as string) || base?.leadTimeLabel,
    sampleAvailable:
      typeof raw.sampleAvailable === "boolean"
        ? raw.sampleAvailable
        : base?.sampleAvailable,
    inStock:
      typeof raw.inStock === "boolean"
        ? raw.inStock
        : typeof raw.in_stock === "boolean"
          ? (raw.in_stock as boolean)
          : null,
    priceOnRequest:
      typeof raw.priceOnRequest === "boolean"
        ? raw.priceOnRequest
        : base?.priceOnRequest ?? true,
  };
}

/**
 * Foods catalogue for the sales portal.
 * Proxies live SA storefront API and merges with local images/copy by externalRef.
 */
export async function GET() {
  const localProducts = FOODS_SHOP_PRODUCTS.map(localProduct);
  const localByKey = new Map<string, SaCatalogProduct>();
  for (const p of localProducts) {
    localByKey.set(p.id, p);
    if (p.sku) localByKey.set(p.sku, p);
    if (p.externalRef) localByKey.set(p.externalRef, p);
  }

  const local: SaCatalogResponse = {
    source: "local",
    seller: SA_STOREFRONT_COPY.seller,
    storeUrl: SA_FOODS_STORE_URL,
    updatedAt: new Date().toISOString(),
    products: localProducts,
  };

  if (!SA_STOREFRONT_API_BASE) {
    return NextResponse.json(local, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }

  try {
    const res = await fetch(`${SA_STOREFRONT_API_BASE}/products`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`SA catalog ${res.status}`);
    const body = (await res.json()) as unknown;

    let remoteList: Record<string, unknown>[] = [];
    if (Array.isArray(body)) {
      remoteList = body as Record<string, unknown>[];
    } else if (body && typeof body === "object") {
      const o = body as Record<string, unknown>;
      if (Array.isArray(o.products)) remoteList = o.products as Record<string, unknown>[];
      else if (Array.isArray(o.items)) remoteList = o.items as Record<string, unknown>[];
      else if (Array.isArray(o.data)) remoteList = o.data as Record<string, unknown>[];
    }

    if (remoteList.length === 0) {
      return NextResponse.json(local, {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          "X-Catalog-Fallback": "local-empty-remote",
        },
      });
    }

    const products = remoteList.map((rp) => normalizeRemoteProduct(rp, localByKey));

    // Ensure local-only SKUs still appear if SA seed is partial
    const seen = new Set(products.map((p) => p.id));
    for (const lp of localProducts) {
      if (!seen.has(lp.id)) products.push(lp);
    }

    const payload: SaCatalogResponse = {
      source: "supplieradvisor",
      seller: SA_STOREFRONT_COPY.seller,
      storeUrl: SA_FOODS_STORE_URL,
      updatedAt: new Date().toISOString(),
      products,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-SA-Store-Slug": SA_FOODS_COMPANY_SLUG,
      },
    });
  } catch {
    return NextResponse.json(
      { ...local, source: "local" as const },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          "X-Catalog-Fallback": "local",
        },
      }
    );
  }
}
