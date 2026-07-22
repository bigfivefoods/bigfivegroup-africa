import "server-only";

/** Extract admin secret from Authorization Bearer or body/query. */
export function extractAdminSecret(request: Request, bodySecret?: string): string {
  const auth = request.headers.get("authorization") || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7).trim();
  const url = new URL(request.url);
  const q = url.searchParams.get("secret");
  if (q) return q.trim();
  return (bodySecret ?? "").trim();
}

export function verifyNewsletterAdmin(secret: string): { ok: true } | { ok: false; error: string; status: number } {
  const expected = process.env.NEWSLETTER_ADMIN_SECRET?.trim();
  if (!expected || expected.length < 16) {
    return { ok: false, error: "Newsletter admin is not configured (NEWSLETTER_ADMIN_SECRET).", status: 503 };
  }
  if (!secret || secret !== expected) {
    return { ok: false, error: "Unauthorized.", status: 401 };
  }
  return { ok: true };
}
