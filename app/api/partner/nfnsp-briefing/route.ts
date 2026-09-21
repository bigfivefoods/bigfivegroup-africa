import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PARTNER_COOKIE, verifyPartnerToken } from "../../../lib/partner-auth";
import { canAccessPartnerPageAsync } from "../../../lib/partners";
import { deliverContactEnquiry } from "../../../lib/contact-mail";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  const jar = await cookies();
  const session = await verifyPartnerToken(jar.get(PARTNER_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }
  if (!(await canAccessPartnerPageAsync(session.email, "department-of-agriculture"))) {
    return NextResponse.json({ ok: false, error: "This workspace is not available." }, { status: 403 });
  }

  let body: Record<string, string>;
  try {
    body = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const role = String(body.role ?? "").trim().slice(0, 120);
  const organisation = String(body.organisation ?? "").trim().slice(0, 160);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const sphere = String(body.sphere ?? "").trim().slice(0, 40);
  const province = String(body.province ?? "").trim().slice(0, 80);
  const message = String(body.message ?? "").trim().slice(0, 8000);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid official email." }, { status: 400 });
  }
  if (organisation.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your organisation." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please add a short message." }, { status: 400 });
  }

  const composed = [
    `Role: ${role || "—"}`,
    `Sphere: ${sphere || "—"}`,
    province ? `Province: ${province}` : null,
    `Portal sign-in: ${session.email}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await deliverContactEnquiry({
    name,
    email,
    organisation,
    phone: phone || undefined,
    interest: "government",
    message: composed,
  });
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
