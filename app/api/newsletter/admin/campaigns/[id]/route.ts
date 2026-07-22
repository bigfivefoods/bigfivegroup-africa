import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../../lib/newsletter/auth";
import {
  deleteCampaign,
  getCampaign,
  updateCampaign,
} from "../../../../../lib/newsletter/campaigns";
import { previewCampaignHtml } from "../../../../../lib/newsletter/send-campaign";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, ctx: Ctx) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const { id } = await ctx.params;
  const campaign = await getCampaign(id);
  if (!campaign) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });

  const previewHtml = previewCampaignHtml(campaign);
  return NextResponse.json({ ok: true, campaign, previewHtml });
}

export async function PATCH(request: Request, ctx: Ctx) {
  let body: {
    secret?: string;
    subject?: string;
    preheader?: string;
    body?: string;
    grokBrief?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const { id } = await ctx.params;
  const existing = await getCampaign(id);
  if (!existing) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  if (existing.status === "sending") {
    return NextResponse.json({ ok: false, error: "Cannot edit while sending." }, { status: 409 });
  }

  const campaign = await updateCampaign(id, {
    subject: body.subject !== undefined ? String(body.subject).slice(0, 200) : undefined,
    preheader: body.preheader !== undefined ? String(body.preheader).slice(0, 200) : undefined,
    body: body.body !== undefined ? String(body.body).slice(0, 50_000) : undefined,
    grokBrief: body.grokBrief !== undefined ? String(body.grokBrief).slice(0, 4000) : undefined,
    // Re-open as draft if was sent and user edits
    status: existing.status === "sent" || existing.status === "failed" ? "draft" : existing.status,
  });

  return NextResponse.json({
    ok: true,
    campaign,
    previewHtml: campaign ? previewCampaignHtml(campaign) : undefined,
  });
}

export async function DELETE(request: Request, ctx: Ctx) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const { id } = await ctx.params;
  const ok = await deleteCampaign(id);
  if (!ok) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
