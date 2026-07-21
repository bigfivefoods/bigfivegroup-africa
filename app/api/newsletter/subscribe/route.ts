import { NextResponse } from "next/server";
import {
  subscribeNewsletter,
  type NewsletterSubscribeInput,
} from "../../../lib/newsletter";

export const runtime = "nodejs";

function clientIp(request: Request): string | null {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip");
}

/**
 * Newsletter subscribe — validates consent, persists subscriber, optional
 * double opt-in (Resend) or single opt-in with recorded consent.
 */
export async function POST(request: Request) {
  let body: NewsletterSubscribeInput;
  try {
    body = (await request.json()) as NewsletterSubscribeInput;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = await subscribeNewsletter(body, {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent"),
    requestUrl: request.url,
  });

  if (!result.ok) {
    const status = result.code === "rate_limited" ? 429 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
