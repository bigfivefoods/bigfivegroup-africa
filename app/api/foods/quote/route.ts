import { NextResponse } from "next/server";
import {
  SA_FOODS_COMPANY_SLUG,
  saFoodsQuotesApiUrl,
  type SaQuotePayload,
} from "../../../lib/saStorefront";

export const dynamic = "force-dynamic";

/**
 * Proxy institutional / NSNP quote requests to SupplierAdvisor storefront quotes API.
 * Falls back with 502 + guidance if SA is unreachable (client can use contact form).
 */
export async function POST(req: Request) {
  let body: SaQuotePayload;
  try {
    body = (await req.json()) as SaQuotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const name = body.name?.trim();
  if (!email || !name) {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 }
    );
  }

  const payload = {
    name,
    email,
    organisation: body.organisation?.trim() || undefined,
    phone: body.phone?.trim() || undefined,
    message: body.message?.trim() || undefined,
    product: body.productId || body.sku || undefined,
    productId: body.productId || undefined,
    sku: body.sku || undefined,
    productName: body.productName || undefined,
    channel: body.channel || "institutional",
    source: body.source || "bigfivegroup.africa",
    ref: body.ref || "foods-sales-portal",
    companySlug: SA_FOODS_COMPANY_SLUG,
  };

  const url = saFoodsQuotesApiUrl();

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "SupplierAdvisor quote request failed",
          status: res.status,
          detail: data,
          fallback: "/contact?interest=foods&intent=order",
        },
        { status: res.status >= 400 && res.status < 600 ? res.status : 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      via: "supplieradvisor",
      companySlug: SA_FOODS_COMPANY_SLUG,
      data,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Could not reach SupplierAdvisor quotes API",
        message: e instanceof Error ? e.message : "unknown",
        fallback: "/contact?interest=foods&intent=order",
      },
      { status: 502 }
    );
  }
}
