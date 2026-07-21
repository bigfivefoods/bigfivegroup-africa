import { NextResponse } from "next/server";
import { unsubscribeNewsletter } from "../../../lib/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; token?: string };
  try {
    body = (await request.json()) as { email?: string; token?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = await unsubscribeNewsletter(String(body.email ?? ""), body.token);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";
  const token = url.searchParams.get("token") ?? undefined;
  const result = await unsubscribeNewsletter(email, token ?? undefined);

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(
        `/newsletter/unsubscribe?error=${encodeURIComponent(result.error)}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      `/newsletter/unsubscribe?ok=1&email=${encodeURIComponent(result.email)}`,
      request.url
    )
  );
}
