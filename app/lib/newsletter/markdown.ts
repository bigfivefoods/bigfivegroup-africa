/**
 * Minimal markdown → HTML for newsletter body (no external deps).
 * Supports: paragraphs, **bold**, *italic*, [text](url), - bullets, ## headings
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
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_m, label, href) => {
    return `<a href="${href}" style="color:#047857;text-decoration:underline;">${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

export function markdownToEmailHtml(md: string): string {
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
        `<h2 style="margin:20px 0 10px;font-size:18px;letter-spacing:-0.02em;color:#0a0a0a;">${inlineFormat(line.slice(3))}</h2>`
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push(
        `<h2 style="margin:20px 0 10px;font-size:18px;letter-spacing:-0.02em;color:#0a0a0a;">${inlineFormat(line.slice(2))}</h2>`
      );
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li style="margin:0 0 6px;">${inlineFormat(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
        i++;
      }
      blocks.push(
        `<ul style="margin:12px 0;padding-left:20px;font-size:15px;line-height:1.6;color:#404040;">${items.join("")}</ul>`
      );
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !/^\s*[-*]\s+/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#404040;">${inlineFormat(para.join(" "))}</p>`
    );
  }
  return blocks.join("\n") || `<p style="margin:0;font-size:15px;color:#404040;">${escapeHtml(md)}</p>`;
}

export function markdownToPlainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .trim();
}
