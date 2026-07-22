/**
 * Markdown → HTML for public story pages (semantic tags + Tailwind-friendly classes).
 */

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineFormat(line: string): string {
  let s = escapeHtml(line);
  s = s.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^\s)]+)\)/g,
    (_m, label, href) =>
      `<a href="${href}" class="font-semibold text-emerald-800 underline underline-offset-2 hover:text-black">${label}</a>`
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong class=\"font-semibold text-black\">$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

export function markdownToWebHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        `<h2 class="text-xl sm:text-2xl font-semibold tracking-tight text-black mt-8 mb-3">${inlineFormat(line.slice(3))}</h2>`
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push(
        `<h2 class="text-xl sm:text-2xl font-semibold tracking-tight text-black mt-8 mb-3">${inlineFormat(line.slice(2))}</h2>`
      );
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(
          `<li class="leading-relaxed">${inlineFormat(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`
        );
        i++;
      }
      blocks.push(
        `<ul class="list-disc pl-5 my-4 space-y-2 text-[#404040] text-sm sm:text-base">${items.join("")}</ul>`
      );
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !/^\s*[-*]\s+/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      `<p class="text-sm sm:text-base text-[#404040] leading-relaxed mb-4">${inlineFormat(para.join(" "))}</p>`
    );
  }
  return (
    blocks.join("\n") ||
    `<p class="text-sm text-[#525252]">${escapeHtml(md)}</p>`
  );
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "update";
}
