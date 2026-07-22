import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../lib/newsletter/auth";
import { listCampaigns } from "../../../../lib/newsletter/campaigns";
import { listSubscribers, storeBackendLabel } from "../../../../lib/newsletter/store";
import { resendConfigured } from "../../../../lib/newsletter/email";
import { xaiConfigured } from "../../../../lib/newsletter/xai";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = verifyNewsletterAdmin(extractAdminSecret(request));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const all = await listSubscribers();
  const active = all.filter((s) => s.status === "active");
  const pending = all.filter((s) => s.status === "pending");
  const unsubscribed = all.filter((s) => s.status === "unsubscribed");
  const campaigns = await listCampaigns();

  return NextResponse.json({
    ok: true,
    backend: storeBackendLabel(),
    resend: resendConfigured(),
    grok: xaiConfigured(),
    counts: {
      total: all.length,
      active: active.length,
      pending: pending.length,
      unsubscribed: unsubscribed.length,
      campaigns: campaigns.length,
      drafts: campaigns.filter((c) => c.status === "draft").length,
      sent: campaigns.filter((c) => c.status === "sent").length,
    },
  });
}
