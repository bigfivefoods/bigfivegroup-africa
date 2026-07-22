import { NextResponse } from "next/server";
import {
  type EnquiryPayload,
  ENQUIRY_INTERESTS,
} from "../../lib/contact";
import { deliverContactEnquiry } from "../../lib/contact-mail";

export const runtime = "nodejs";

const INTEREST_VALUES = new Set(ENQUIRY_INTERESTS.map((i) => i.value));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/**
 * Validates the enquiry and delivers it via Resend to the Group inbox
 * (Reply-To = visitor). Falls back to mailto if Resend is unavailable.
 */
export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true, mode: "resend", message: "Thanks." });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
  const message = String(body.message ?? "").trim().slice(0, 8000);
  const interest = String(body.interest ?? "").trim();
  const organisation = String(body.organisation ?? "").trim().slice(0, 160) || undefined;
  const phone = String(body.phone ?? "").trim().slice(0, 40) || undefined;

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!INTEREST_VALUES.has(interest as (typeof ENQUIRY_INTERESTS)[number]["value"])) {
    return NextResponse.json({ ok: false, error: "Please choose an interest area." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please add a short message (at least 10 characters)." },
      { status: 400 }
    );
  }

  const payload: EnquiryPayload = {
    name,
    email,
    organisation,
    phone,
    interest,
    message,
  };

  const result = await deliverContactEnquiry(payload);
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result);
}
