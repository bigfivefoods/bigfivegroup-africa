import { NextResponse } from "next/server";
import { getFoodsNetwork } from "../../../lib/saFoodsNetwork";

/**
 * Public website API: Big Five Foods network for Direct (containers + food impact).
 * Backed by SupplierAdvisor® when env credentials are set; otherwise published snapshot.
 */
export async function GET() {
  const data = await getFoodsNetwork();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
