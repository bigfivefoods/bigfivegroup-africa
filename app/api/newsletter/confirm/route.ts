import { NextResponse } from "next/server";
import { confirmNewsletterSubscription } from "../../../lib/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; token?: string };
  try {
    body = (await request.json()) as { email?: string; token?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = await confirmNewsletterSubscription(
    String(body.email ?? ""),
    String(body.token ?? "")
  );

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}

/** GET support for email confirmation links */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";
  const token = url.searchParams.get("token") ?? "";
  const result = await confirmNewsletterSubscription(email, token);

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(
        `/newsletter/confirm?error=${encodeURIComponent(result.error)}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      `/newsletter/confirm?ok=1&email=${encodeURIComponent(result.email)}`,
      request.url
    )
  );
}
