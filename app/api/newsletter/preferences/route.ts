import { NextResponse } from "next/server";
import { getPreferences, updatePreferences } from "../../../lib/newsletter";

export const runtime = "nodejs";

/** Load current topic preferences (requires signed or store prefs token). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";
  const token = url.searchParams.get("token") ?? "";

  const result = await getPreferences(email, token);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}

/** Update topic preferences. */
export async function POST(request: Request) {
  let body: { email?: string; token?: string; topics?: string[] };
  try {
    body = (await request.json()) as { email?: string; token?: string; topics?: string[] };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = await updatePreferences(
    String(body.email ?? ""),
    String(body.token ?? ""),
    Array.isArray(body.topics) ? body.topics : []
  );

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
