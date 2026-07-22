import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../lib/newsletter/auth";
import { createCampaign, updateCampaign } from "../../../../lib/newsletter/campaigns";
import { draftNewsletterWithGrok } from "../../../../lib/newsletter/xai";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Draft (or rewrite) a newsletter with Grok.
 * body: { brief, tone?, campaignId?, applyToNew?: boolean }
 */
export async function POST(request: Request) {
  let body: {
    secret?: string;
    brief?: string;
    tone?: string;
    topics?: string[];
    campaignId?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const draft = await draftNewsletterWithGrok({
    brief: String(body.brief ?? ""),
    tone: body.tone,
    topics: body.topics,
  });

  if (!draft.ok) {
    return NextResponse.json(draft, { status: 400 });
  }

  let campaignId = body.campaignId?.trim();
  if (campaignId) {
    const updated = await updateCampaign(campaignId, {
      subject: draft.subject,
      preheader: draft.preheader,
      body: draft.body,
      grokBrief: String(body.brief ?? "").slice(0, 4000),
      grokModel: draft.model,
      status: "draft",
    });
    return NextResponse.json({
      ok: true,
      draft: {
        subject: draft.subject,
        preheader: draft.preheader,
        body: draft.body,
        model: draft.model,
      },
      campaign: updated,
    });
  }

  const campaign = await createCampaign({
    subject: draft.subject,
    preheader: draft.preheader,
    body: draft.body,
    grokBrief: String(body.brief ?? "").slice(0, 4000),
  });
  await updateCampaign(campaign.id, { grokModel: draft.model });

  return NextResponse.json({
    ok: true,
    draft: {
      subject: draft.subject,
      preheader: draft.preheader,
      body: draft.body,
      model: draft.model,
    },
    campaign: { ...campaign, grokModel: draft.model },
  });
}
