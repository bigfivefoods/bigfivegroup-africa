/** Shared date formatting for Updates / Stories. */

export function formatStoryDate(iso?: string, style: "short" | "long" = "short"): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: style === "long" ? "long" : "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}
