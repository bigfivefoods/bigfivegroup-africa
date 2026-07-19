import { NextResponse } from "next/server";
import {
  buildMailto,
  type EnquiryPayload,
  ENQUIRY_INTERESTS,
  CONTACT_EMAIL,
} from "../../lib/contact";

const INTEREST_VALUES = new Set(ENQUIRY_INTERESTS.map((i) => i.value));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true, mailto: null });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const organisation = String(body.organisation ?? "").trim() || undefined;
  const phone = String(body.phone ?? "").trim() || undefined;

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

  const mailto = buildMailto(payload);

  // Optional: forward to a Zapier / Make / Formspree-style webhook if configured
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          to: CONTACT_EMAIL,
          source: "bigfivegroup.africa/contact",
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Webhook failure should not block the user — mailto still works
    }
  }

  return NextResponse.json({
    ok: true,
    mailto,
    message: "Thanks — your enquiry is ready to send.",
  });
}
