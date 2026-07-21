import { NextResponse } from "next/server";
import {
  buildNewsletterMailto,
  isValidNewsletterEmail,
  type NewsletterSubscribePayload,
} from "../../../lib/newsletter";

/**
 * Validates newsletter opt-in and returns a mailto so the subscriber
 * confirms from their own email app (no third-party ESP required).
 */
export async function POST(request: Request) {
  let body: NewsletterSubscribePayload;
  try {
    body = (await request.json()) as NewsletterSubscribePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true, mailto: null });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim() || undefined;
  const organisation = String(body.organisation ?? "").trim() || undefined;
  const source = String(body.source ?? "website").trim() || "website";

  if (!isValidNewsletterEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (name && name.length > 120) {
    return NextResponse.json({ ok: false, error: "Name is too long." }, { status: 400 });
  }

  const payload: NewsletterSubscribePayload = {
    email,
    name,
    organisation,
    source,
  };

  return NextResponse.json({
    ok: true,
    mailto: buildNewsletterMailto(payload),
    message:
      "Open your email app to confirm your subscription — press send to complete opt-in.",
  });
}
