import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../lib/newsletter/auth";
import {
  createCampaign,
  listCampaigns,
} from "../../../../lib/newsletter/campaigns";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const campaigns = await listCampaigns();
  return NextResponse.json({ ok: true, campaigns });
}

export async function POST(request: Request) {
  let body: {
    secret?: string;
    subject?: string;
    preheader?: string;
    body?: string;
    grokBrief?: string;
  } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    /* empty create */
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const campaign = await createCampaign({
    subject: body.subject,
    preheader: body.preheader,
    body: body.body,
    grokBrief: body.grokBrief,
  });

  return NextResponse.json({ ok: true, campaign });
}
