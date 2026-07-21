import { NextResponse } from "next/server";
import { unsubscribeNewsletter } from "../../../lib/newsletter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // RFC 8058 one-click List-Unsubscribe-Post body: List-Unsubscribe=One-Click
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let token: string | undefined;

  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { email?: string; token?: string };
      email = String(body.email ?? "");
      token = body.token;
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await request.formData();
      email = String(form.get("email") ?? "");
      token = form.get("token") ? String(form.get("token")) : undefined;
      // One-click may only post List-Unsubscribe=One-Click — token/email from query if present
    } else {
      const text = await request.text();
      if (text.includes("List-Unsubscribe=One-Click") || text.includes("list-unsubscribe=one-click")) {
        const url = new URL(request.url);
        email = url.searchParams.get("email") ?? "";
        token = url.searchParams.get("token") ?? undefined;
      } else {
        try {
          const body = JSON.parse(text) as { email?: string; token?: string };
          email = String(body.email ?? "");
          token = body.token;
        } catch {
          return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
        }
      }
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Fallback: query params on POST (one-click)
  if (!email || !token) {
    const url = new URL(request.url);
    if (!email) email = url.searchParams.get("email") ?? "";
    if (!token) token = url.searchParams.get("token") ?? undefined;
  }

  const result = await unsubscribeNewsletter(email, token);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";
  const token = url.searchParams.get("token") ?? undefined;
  const result = await unsubscribeNewsletter(email, token ?? undefined);

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(
        `/newsletter/unsubscribe?error=${encodeURIComponent(result.error)}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      `/newsletter/unsubscribe?ok=1&email=${encodeURIComponent(result.email)}`,
      request.url
    )
  );
}
