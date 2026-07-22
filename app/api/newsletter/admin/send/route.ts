import { NextResponse } from "next/server";
import { extractAdminSecret, verifyNewsletterAdmin } from "../../../../lib/newsletter/auth";
import { sendCampaign } from "../../../../lib/newsletter/send-campaign";

export const runtime = "nodejs";
/** Allow longer broadcast on Vercel Pro; Hobby caps lower. */
export const maxDuration = 300;

/**
 * Send campaign to all active subscribers, or testEmail only.
 */
export async function POST(request: Request) {
  let body: {
    secret?: string;
    campaignId?: string;
    testEmail?: string;
    confirmBroadcast?: boolean;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const auth = verifyNewsletterAdmin(extractAdminSecret(request, body.secret));
  if (!auth.ok) return NextResponse.json(auth, { status: auth.status });

  const campaignId = String(body.campaignId ?? "").trim();
  if (!campaignId) {
    return NextResponse.json({ ok: false, error: "campaignId required." }, { status: 400 });
  }

  const testEmail = body.testEmail?.trim();
  if (!testEmail && !body.confirmBroadcast) {
    return NextResponse.json(
      {
        ok: false,
        error: "Set confirmBroadcast: true to email all active subscribers, or provide testEmail.",
      },
      { status: 400 }
    );
  }

  const result = await sendCampaign(campaignId, {
    testEmail: testEmail || undefined,
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
