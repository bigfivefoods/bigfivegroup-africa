import { NextResponse } from "next/server";
import {
  buildMailto,
  type EnquiryPayload,
  ENQUIRY_INTERESTS,
  CONTACT_EMAIL,
  interestLabel,
} from "../../lib/contact";

const INTEREST_VALUES = new Set(ENQUIRY_INTERESTS.map((i) => i.value));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatBody(payload: EnquiryPayload) {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.organisation ? `Organisation: ${payload.organisation}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Interest: ${interestLabel(payload.interest)}`,
    "",
    "Message:",
    payload.message,
    "",
    "— bigfivegroup.africa/contact",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendViaResend(payload: EnquiryPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.CONTACT_FROM_EMAIL || "Big Five Group <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `Big Five enquiry — ${interestLabel(payload.interest)} — ${payload.name}`,
        text: formatBody(payload),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
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
    return NextResponse.json({ ok: true, mailto: null, emailed: true });
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
  let emailed = await sendViaResend(payload);

  // Optional: forward to a Zapier / Make / Formspree-style webhook if configured
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const wh = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          to: CONTACT_EMAIL,
          source: "bigfivegroup.africa/contact",
          receivedAt: new Date().toISOString(),
        }),
      });
      if (wh.ok) emailed = true;
    } catch {
      // Webhook failure should not block the user
    }
  }

  return NextResponse.json({
    ok: true,
    mailto: emailed ? null : mailto,
    emailed,
    message: emailed
      ? "Thanks — your enquiry has been sent."
      : "Thanks — your enquiry is ready to send via email.",
  });
}
