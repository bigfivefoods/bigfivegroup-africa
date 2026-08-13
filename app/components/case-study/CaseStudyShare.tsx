"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Copy, Mail, MessageCircle, Share2, X } from "lucide-react";
import { track } from "../../lib/analytics";
import {
  CASE_STUDY_SHARE,
  caseStudyAbsoluteUrl,
  type CaseStudyShareId,
} from "./caseStudyShareMeta";

type ShareState = "idle" | "copied" | "shared" | "error";

function openShareWindow(url: string) {
  const w = 600;
  const h = 560;
  const left = typeof window !== "undefined" ? Math.max(0, (window.screen.width - w) / 2) : 0;
  const top = typeof window !== "undefined" ? Math.max(0, (window.screen.height - h) / 2) : 0;
  window.open(
    url,
    "_blank",
    `noopener,noreferrer,width=${w},height=${h},left=${left},top=${top}`
  );
}

export default function CaseStudyShare({
  shareId,
  className,
  /** Compact icon-style control for tight toolbars */
  compact = false,
}: {
  shareId: CaseStudyShareId;
  className?: string;
  compact?: boolean;
}) {
  const meta = CASE_STUDY_SHARE[shareId];
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ShareState>("idle");
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const url = caseStudyAbsoluteUrl(meta.path);
  const shareText = `${meta.text}\n\n${url}`;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const flash = useCallback((next: ShareState) => {
    setState(next);
    window.setTimeout(() => setState("idle"), 2200);
  }, []);

  const trackShare = useCallback(
    (channel: string) => {
      track("case_study_share", { id: shareId, channel, path: meta.path });
    },
    [meta.path, shareId]
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${meta.title}\n\n${shareText}`);
      trackShare("copy");
      flash("copied");
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        trackShare("copy");
        flash("copied");
      } catch {
        flash("error");
      }
    }
  }, [flash, meta.title, shareText, trackShare, url]);

  const nativeShare = useCallback(async () => {
    trackShare("native");
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: meta.title, text: meta.text, url });
        flash("shared");
        setOpen(false);
        return;
      }
      await copyLink();
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      await copyLink();
    }
  }, [copyLink, flash, meta.text, meta.title, trackShare, url]);

  const shareX = () => {
    trackShare("x");
    const q = new URLSearchParams({ text: `${meta.title}\n\n${meta.text}`, url });
    openShareWindow(`https://twitter.com/intent/tweet?${q.toString()}`);
    setOpen(false);
  };

  const shareLinkedIn = () => {
    trackShare("linkedin");
    const q = new URLSearchParams({ url });
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?${q.toString()}`);
    setOpen(false);
  };

  const shareFacebook = () => {
    trackShare("facebook");
    const q = new URLSearchParams({ u: url });
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?${q.toString()}`);
    setOpen(false);
  };

  const shareWhatsApp = () => {
    trackShare("whatsapp");
    const q = new URLSearchParams({ text: shareText });
    openShareWindow(`https://wa.me/?${q.toString()}`);
    setOpen(false);
  };

  const shareEmail = () => {
    trackShare("email");
    const q = new URLSearchParams({
      subject: meta.title,
      body: shareText,
    });
    window.location.href = `mailto:?${q.toString()}`;
    setOpen(false);
  };

  const buttonLabel =
    state === "copied"
      ? "Link copied"
      : state === "shared"
        ? "Shared"
        : state === "error"
          ? "Copy failed"
          : compact
            ? "Share"
            : "Share case study";

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  type Channel = {
    id: string;
    label: string;
    onClick: () => void | Promise<void>;
    icon: React.ReactNode;
  };

  const channels: Channel[] = [
    {
      id: "native",
      label: canNativeShare ? "Device share…" : "Copy via system",
      onClick: nativeShare,
      icon: <Share2 className="w-4 h-4 text-[#404040]" />,
    },
    {
      id: "x",
      label: "X / Twitter",
      onClick: shareX,
      icon: <X className="w-4 h-4 text-[#404040]" />,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      onClick: shareLinkedIn,
      icon: <LinkedInGlyph className="w-4 h-4 text-[#404040]" />,
    },
    {
      id: "facebook",
      label: "Facebook",
      onClick: shareFacebook,
      icon: <FacebookGlyph className="w-4 h-4 text-[#404040]" />,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      onClick: shareWhatsApp,
      icon: <MessageCircle className="w-4 h-4 text-[#404040]" />,
    },
    {
      id: "email",
      label: "Email",
      onClick: shareEmail,
      icon: <Mail className="w-4 h-4 text-[#404040]" />,
    },
    {
      id: "copy",
      label: "Copy link",
      onClick: copyLink,
      icon: <Copy className="w-4 h-4 text-[#404040]" />,
    },
  ];

  return (
    <div ref={rootRef} className={`relative print:hidden ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        title={`Share ${meta.label} on social media or copy the link`}
        className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto hover:bg-[#fafafa]"
      >
        {state === "copied" || state === "shared" ? (
          <Check className="w-4 h-4 shrink-0 text-emerald-700" />
        ) : (
          <Share2 className="w-4 h-4 shrink-0" />
        )}
        {buttonLabel}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={`Share ${meta.label}`}
          className="absolute z-40 bottom-full mb-2 left-0 sm:left-auto sm:right-0 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-black/10 bg-white p-2 shadow-xl"
        >
          <div className="px-2.5 py-2 border-b border-black/5 mb-1">
            <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#737373]">
              Share case study
            </div>
            <div className="text-xs font-semibold text-black mt-0.5 line-clamp-2">{meta.label}</div>
          </div>
          <ul className="flex flex-col gap-0.5">
            {channels.map((ch) => (
              <li key={ch.id}>
                <button
                  type="button"
                  onClick={() => void ch.onClick()}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-left text-sm text-[#171717] hover:bg-[#f5f5f5] transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#fafafa] border border-black/5 flex items-center justify-center shrink-0">
                    {ch.icon}
                  </span>
                  {ch.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="px-2.5 py-2 text-[10px] text-[#a3a3a3] leading-snug break-all">{url}</p>
        </div>
      )}
    </div>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "w-4 h-4"}
      aria-hidden
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "w-4 h-4"}
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}
