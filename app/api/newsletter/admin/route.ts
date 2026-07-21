import { NextResponse } from "next/server";
import { exportSubscribersForAdmin } from "../../../lib/newsletter";

export const runtime = "nodejs";

/**
 * Admin export of newsletter register.
 * Auth: Authorization: Bearer <NEWSLETTER_ADMIN_SECRET>
 *    or ?secret= (prefer header)
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const auth = request.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const secret = bearer || url.searchParams.get("secret") || "";

  const result = await exportSubscribersForAdmin(secret);
  if (!result.ok) {
    const status = result.error === "Unauthorized." ? 401 : 503;
    return NextResponse.json(result, { status });
  }

  const format = url.searchParams.get("format") || "json";
  if (format === "csv") {
    const rows = [
      ["id", "email", "name", "organisation", "status", "topics", "source", "consentAt", "confirmedAt", "unsubscribedAt", "createdAt", "updatedAt"],
      ...result.subscribers.map((s) => [
        s.id,
        s.email,
        s.name ?? "",
        s.organisation ?? "",
        s.status,
        s.topics.join("|"),
        s.source,
        s.consentAt,
        s.confirmedAt ?? "",
        s.unsubscribedAt ?? "",
        s.createdAt,
        s.updatedAt,
      ]),
    ];
    const csv = rows
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({
    ok: true,
    backend: result.backend,
    count: result.subscribers.length,
    subscribers: result.subscribers,
  });
}
