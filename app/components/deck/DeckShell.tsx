"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  Share2,
} from "lucide-react";
import { track } from "../../lib/analytics";

export type PrintOrientation = "landscape" | "portrait";

export type DeckTheme = {
  /** Tailwind-ish accent for UI chrome */
  name: string;
  /** primary hex e.g. #f59e0b */
  accent: string;
  accentDark: string;
  /** gradient for progress / next button */
  gradientFrom: string;
  gradientTo: string;
  /** outer frame gradient start */
  frameFrom: string;
  frameTo: string;
  /** dark slide bg */
  darkBg: string;
  /** eyebrow text light on dark */
  eyebrowLight: string;
  /** eyebrow on light slides */
  eyebrow: string;
  /** border/ring for light chrome */
  softBorder: string;
  softBg: string;
  softText: string;
};

type PrintCtx = { active: boolean; orientation: PrintOrientation };
const PrintModeContext = createContext<PrintCtx>({
  active: false,
  orientation: "landscape",
});

export function useDeckPrintMode() {
  return useContext(PrintModeContext).active;
}

export function useDeckPrintOrientation() {
  return useContext(PrintModeContext).orientation;
}

export const DECK_THEMES = {
  amber: {
    name: "amber",
    accent: "#d97706",
    accentDark: "#92400e",
    gradientFrom: "#f59e0b",
    gradientTo: "#c2410c",
    frameFrom: "#fffbeb",
    frameTo: "#f3f4f6",
    darkBg: "#1c1006",
    eyebrowLight: "text-amber-300",
    eyebrow: "text-amber-800",
    softBorder: "border-amber-200",
    softBg: "bg-amber-50",
    softText: "text-amber-950",
  },
  emerald: {
    name: "emerald",
    accent: "#059669",
    accentDark: "#065f46",
    gradientFrom: "#10b981",
    gradientTo: "#0f766e",
    frameFrom: "#ecfdf5",
    frameTo: "#f3f4f6",
    darkBg: "#052e1c",
    eyebrowLight: "text-emerald-300",
    eyebrow: "text-emerald-800",
    softBorder: "border-emerald-200",
    softBg: "bg-emerald-50",
    softText: "text-emerald-950",
  },
  orange: {
    name: "orange",
    accent: "#ea580c",
    accentDark: "#9a3412",
    gradientFrom: "#f97316",
    gradientTo: "#c2410c",
    frameFrom: "#fff7ed",
    frameTo: "#f3f4f6",
    darkBg: "#1c0a05",
    eyebrowLight: "text-orange-300",
    eyebrow: "text-orange-800",
    softBorder: "border-orange-200",
    softBg: "bg-orange-50",
    softText: "text-orange-950",
  },
  blue: {
    name: "blue",
    accent: "#2563eb",
    accentDark: "#1e3a8a",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    frameFrom: "#eff6ff",
    frameTo: "#f3f4f6",
    darkBg: "#0a1628",
    eyebrowLight: "text-sky-300",
    eyebrow: "text-blue-800",
    softBorder: "border-blue-200",
    softBg: "bg-blue-50",
    softText: "text-blue-950",
  },
  cyan: {
    name: "cyan",
    accent: "#0891b2",
    accentDark: "#164e63",
    gradientFrom: "#06b6d4",
    gradientTo: "#0e7490",
    frameFrom: "#ecfeff",
    frameTo: "#f3f4f6",
    darkBg: "#042f2e",
    eyebrowLight: "text-cyan-300",
    eyebrow: "text-cyan-800",
    softBorder: "border-cyan-200",
    softBg: "bg-cyan-50",
    softText: "text-cyan-950",
  },
  violet: {
    name: "violet",
    accent: "#7c3aed",
    accentDark: "#5b21b6",
    gradientFrom: "#8b5cf6",
    gradientTo: "#6d28d9",
    frameFrom: "#f5f3ff",
    frameTo: "#f3f4f6",
    darkBg: "#0a0a0a",
    eyebrowLight: "text-violet-300",
    eyebrow: "text-violet-700",
    softBorder: "border-violet-200",
    softBg: "bg-violet-50",
    softText: "text-violet-950",
  },
  gold: {
    name: "gold",
    accent: "#ca8a04",
    accentDark: "#a16207",
    gradientFrom: "#eab308",
    gradientTo: "#ca8a04",
    frameFrom: "#fefce8",
    frameTo: "#f3f4f6",
    darkBg: "#1a1405",
    eyebrowLight: "text-amber-200",
    eyebrow: "text-amber-800",
    softBorder: "border-amber-200",
    softBg: "bg-amber-50",
    softText: "text-amber-950",
  },
  teal: {
    name: "teal",
    accent: "#0d9488",
    accentDark: "#0f766e",
    gradientFrom: "#14b8a6",
    gradientTo: "#0d9488",
    frameFrom: "#f0fdfa",
    frameTo: "#f3f4f6",
    darkBg: "#042f2e",
    eyebrowLight: "text-teal-200",
    eyebrow: "text-teal-800",
    softBorder: "border-teal-200",
    softBg: "bg-teal-50",
    softText: "text-teal-950",
  },
} as const satisfies Record<string, DeckTheme>;

const A4 = {
  landscape: { w: "297mm", h: "210mm" },
  portrait: { w: "210mm", h: "297mm" },
  margin: "6mm",
} as const;

function buildPrintStyles(printRootId: string, pageName: string) {
  return `
  #${printRootId} {
    position: fixed;
    left: 0;
    top: 0;
    transform: translate3d(-200vw, 0, 0);
    z-index: -1;
    pointer-events: none;
  }
  #${printRootId}[data-orientation="landscape"] { width: 297mm; }
  #${printRootId}[data-orientation="portrait"] { width: 210mm; }
  #${printRootId} .deck-print-page {
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 0 12px;
    background: #fff;
  }
  #${printRootId}[data-orientation="landscape"] .deck-print-page {
    width: 297mm; height: 210mm; padding: 6mm;
  }
  #${printRootId}[data-orientation="portrait"] .deck-print-page {
    width: 210mm; height: 297mm; padding: 6mm;
  }
  #${printRootId} .deck-print-page > * {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
  }
  #${printRootId},
  #${printRootId} * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: none !important;
  }
  #${printRootId} .premium-button::before { content: none !important; display: none !important; }
  #${printRootId} [class*="blur-"] { display: none !important; }

  @page ${pageName}-landscape { size: A4 landscape; margin: 0; }
  @page ${pageName}-portrait { size: A4 portrait; margin: 0; }

  @media print {
    @page { size: A4 landscape; margin: 0; }
    html, body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
    }
    body > *:not(#${printRootId}) { display: none !important; }
    #${printRootId} {
      display: block !important;
      position: static !important;
      transform: none !important;
      width: auto !important;
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    #${printRootId},
    #${printRootId} * {
      box-shadow: none !important;
      filter: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    #${printRootId} .deck-print-page {
      box-sizing: border-box !important;
      margin: 0 !important;
      overflow: hidden !important;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
    }
    #${printRootId}[data-orientation="landscape"] .deck-print-page {
      page: ${pageName}-landscape;
      width: ${A4.landscape.w} !important;
      height: ${A4.landscape.h} !important;
      padding: ${A4.margin} !important;
    }
    #${printRootId}[data-orientation="portrait"] .deck-print-page {
      page: ${pageName}-portrait;
      width: ${A4.portrait.w} !important;
      height: ${A4.portrait.h} !important;
      padding: ${A4.margin} !important;
    }
    #${printRootId} .deck-print-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    #${printRootId} a { text-decoration: none !important; color: inherit !important; }
  }
`;
}

function printPageCss(orientation: PrintOrientation) {
  const size = orientation === "portrait" ? "A4 portrait" : "A4 landscape";
  return `
    @media print {
      @page { size: ${size}; margin: 0; }
    }
  `;
}

/** Shared slide chrome — matches Foods / Impact deck beauty */
export function DeckSlideShell({
  children,
  dark = false,
  className = "",
  theme,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  theme: DeckTheme;
}) {
  const forPrint = useDeckPrintMode();
  const zeroPad = /\b!?p-0\b/.test(className);

  return (
    <div
      className={`relative h-full w-full overflow-x-hidden border box-border ${
        forPrint
          ? "overflow-hidden rounded-xl"
          : "overflow-y-auto rounded-2xl sm:rounded-3xl"
      } ${
        dark
          ? forPrint
            ? "text-white border-white/10"
            : "text-white border-white/10"
          : forPrint
            ? "bg-white border-[#e5e5e5] text-black"
            : "bg-white border-black/10 text-black"
      } ${className}`}
      style={dark ? { backgroundColor: theme.darkBg } : undefined}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
        }}
      />
      {!forPrint && !dark && (
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40"
          style={{ backgroundColor: theme.accent }}
        />
      )}
      <div
        className={`relative flex flex-col h-full min-h-0 box-border ${
          zeroPad ? "p-0" : forPrint ? "p-4 md:p-5" : "p-5 sm:p-8 md:p-10 lg:p-12"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function DeckEyebrow({
  children,
  light,
  theme,
}: {
  children: ReactNode;
  light?: boolean;
  theme: DeckTheme;
}) {
  const forPrint = useDeckPrintMode();
  return (
    <div
      className={`tracking-[2px] font-semibold ${
        forPrint ? "text-[9px] mb-1.5" : "text-[10px] sm:text-xs tracking-[3px] mb-3 sm:mb-4"
      } ${light ? theme.eyebrowLight : theme.eyebrow}`}
    >
      {children}
    </div>
  );
}

export function DeckTitle({ children }: { children: ReactNode }) {
  const forPrint = useDeckPrintMode();
  return (
    <h2
      className={`font-semibold tracking-tighter text-balance ${
        forPrint ? "text-xl mb-2" : "text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5"
      }`}
    >
      {children}
    </h2>
  );
}

export function DeckStatTile({
  value,
  label,
  dark,
  theme,
}: {
  value: string;
  label: string;
  dark?: boolean;
  theme: DeckTheme;
}) {
  const forPrint = useDeckPrintMode();
  return (
    <div
      className={`rounded-xl border min-w-0 ${forPrint ? "p-2.5" : "rounded-2xl p-4 sm:p-5"} ${
        dark
          ? forPrint
            ? "border-white/10 bg-white/[0.06]"
            : "border-white/10 bg-white/[0.06]"
          : forPrint
            ? "border-[#e5e5e5] bg-[#fafafa]"
            : "border-black/10 bg-[#fafafa]"
      }`}
    >
      <div
        className={`font-semibold tracking-tighter tabular-nums ${
          forPrint ? "text-xl" : "text-2xl sm:text-3xl md:text-4xl"
        }`}
        style={{ color: dark ? "#fde68a" : theme.accentDark }}
      >
        {value}
      </div>
      <div
        className={`mt-1 leading-snug ${forPrint ? "text-[10px]" : "text-xs sm:text-sm"} ${
          dark ? "text-white/60" : "text-[#525252]"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export function DeckTitleLayout({ children }: { children: ReactNode }) {
  const forPrint = useDeckPrintMode();
  return (
    <div
      className={`relative flex flex-col justify-between h-full min-h-0 box-border ${
        forPrint ? "p-4 md:p-5" : "min-h-[min(70dvh,36rem)] p-5 sm:p-8 md:p-10 lg:p-12"
      }`}
    >
      {children}
    </div>
  );
}

type DeckShellProps = {
  id: string;
  printRootId: string;
  total: number;
  theme: DeckTheme;
  eyebrow: string;
  title: string;
  description: string;
  sharePath: string;
  shareTitle: string;
  shareText: string;
  renderSlide: (index: number) => ReactNode;
};

export default function DeckShell({
  id,
  printRootId,
  total,
  theme,
  eyebrow,
  title,
  description,
  sharePath,
  shareTitle,
  shareText,
  renderSlide,
}: DeckShellProps) {
  const [index, setIndex] = useState(0);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  const [fullscreen, setFullscreen] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [preparingPdf, setPreparingPdf] = useState(false);
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>("landscape");

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)));
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (printMode) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, fullscreen, printMode]);

  // Prevent background scroll in fullscreen and restore focus when exiting
  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullscreen]);

  useEffect(() => {
    if (!printMode) return;
    let cancelled = false;
    const root = document.documentElement;
    root.setAttribute("data-deck-print", printOrientation);
    root.setAttribute("data-deck-print-active", "true");

    const finish = () => {
      if (cancelled) return;
      root.removeAttribute("data-deck-print");
      root.removeAttribute("data-deck-print-active");
      setPrintMode(false);
      setPreparingPdf(false);
    };

    const t = window.setTimeout(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          window.print();
        });
      });
    }, 550);

    window.addEventListener("afterprint", finish);
    const fallback = window.setTimeout(finish, 120_000);

    return () => {
      cancelled = true;
      root.removeAttribute("data-deck-print");
      root.removeAttribute("data-deck-print-active");
      window.clearTimeout(t);
      window.clearTimeout(fallback);
      window.removeEventListener("afterprint", finish);
    };
  }, [printMode, printOrientation]);

  const shareUrl = (() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}${sharePath}`
        : `https://bigfivegroup.africa${sharePath}`;
    try {
      const u = new URL(base, "https://bigfivegroup.africa");
      if (!u.searchParams.has("utm_source")) {
        u.searchParams.set("utm_source", "deck_share");
        u.searchParams.set("utm_medium", "share");
        u.searchParams.set(
          "utm_campaign",
          sharePath.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "deck"
        );
      }
      return u.toString();
    } catch {
      return base;
    }
  })();

  const onShare = async () => {
    track("deck_share", { path: sharePath });
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        setShareState("shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
      } catch {
        /* ignore */
      }
    }
    window.setTimeout(() => setShareState("idle"), 2500);
  };

  const onDownload = (orientation: PrintOrientation) => {
    track("deck_pdf", { path: sharePath, orientation });
    setPrintOrientation(orientation);
    setPreparingPdf(true);
    setPrintMode(true);
  };

  const pageName = printRootId.replace(/[^a-z0-9-]/gi, "");

  const printPortal =
    printMode && typeof document !== "undefined"
      ? createPortal(
          <PrintModeContext.Provider value={{ active: true, orientation: printOrientation }}>
            <div id={printRootId} aria-hidden="true" data-orientation={printOrientation}>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    buildPrintStyles(printRootId, pageName) + printPageCss(printOrientation),
                }}
              />
              {Array.from({ length: total }, (_, i) => (
                <div key={i} className="deck-print-page">
                  {renderSlide(i)}
                </div>
              ))}
            </div>
          </PrintModeContext.Provider>,
          document.body
        )
      : null;

  const deck = (
    <div
      className={`flex flex-col min-w-0 w-full max-w-full ${
        fullscreen
          ? "fixed inset-0 z-[100] p-2 sm:p-4 md:p-5"
          : "rounded-2xl sm:rounded-[1.75rem] border border-black/10 p-1.5 sm:p-3"
      }`}
      style={
        fullscreen
          ? { backgroundColor: theme.darkBg }
          : {
              background: `linear-gradient(to bottom, ${theme.frameFrom}, ${theme.frameTo})`,
              boxShadow: `0 25px 60px -15px ${theme.accent}33`,
            }
      }
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 px-1.5 sm:px-3 py-2 mb-1 sm:mb-2 min-w-0">
        <div className="text-xs sm:text-sm font-medium text-[#404040] truncate min-w-0">
          {title.split("—")[0].trim()}{" "}
          <span className="text-[#737373] font-normal">
            · {index + 1} / {total}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 min-h-9"
          >
            {shareState === "copied" ? (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Link copied</span>
              </>
            ) : shareState === "shared" ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Shared</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span className="sm:inline">Share</span>
              </>
            )}
          </button>
          <div
            className={`inline-flex items-center rounded-full border p-0.5 min-w-0 ${theme.softBorder} ${theme.softBg}`}
          >
            <button
              type="button"
              onClick={() => onDownload("landscape")}
              disabled={preparingPdf}
              className={`inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold hover:bg-white disabled:opacity-60 min-h-8 ${theme.softText}`}
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">
                {preparingPdf && printOrientation === "landscape" ? "Preparing…" : "A4 Landscape"}
              </span>
              <span className="md:hidden">A4 L</span>
            </button>
            <button
              type="button"
              onClick={() => onDownload("portrait")}
              disabled={preparingPdf}
              className={`inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold hover:bg-white disabled:opacity-60 min-h-8 ${theme.softText}`}
            >
              <span className="hidden md:inline">
                {preparingPdf && printOrientation === "portrait" ? "Preparing…" : "A4 Portrait"}
              </span>
              <span className="md:hidden">A4 P</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5 min-h-9"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{fullscreen ? "Exit" : "Full"}</span>
          </button>
        </div>
      </div>

      <div className="mx-1.5 sm:mx-3 mb-2 h-1 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((index + 1) / total) * 100}%`,
            background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
          }}
        />
      </div>

      <div
        className={`relative flex-1 min-h-0 min-w-0 overflow-hidden ${
          fullscreen
            ? "min-h-0"
            : "min-h-[min(70dvh,36rem)] sm:min-h-[min(74dvh,42rem)] md:min-h-[min(76dvh,46rem)]"
        }`}
        style={
          fullscreen
            ? { height: "calc(100dvh - 7.5rem - env(safe-area-inset-bottom, 0px))" }
            : undefined
        }
        role="region"
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${total}`}
      >
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {index + 1} of {total}
        </div>
        {renderSlide(index)}
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3 px-1 sm:px-2 pt-2 sm:pt-3 pb-1 min-w-0">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full border border-black/10 bg-white px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black disabled:opacity-30 hover:bg-black/5 min-h-10 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        <div className="flex flex-wrap justify-center gap-1 max-w-[50%] sm:max-w-none min-w-0">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 sm:w-5" : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
              style={i === index ? { backgroundColor: theme.accentDark } : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full text-white px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold disabled:opacity-30 min-h-10 shrink-0"
          style={{
            background: `linear-gradient(to right, ${theme.gradientFrom}, ${theme.gradientTo})`,
          }}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div id={id} className="scroll-mt-24 sm:scroll-mt-28 w-full min-w-0 max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center min-w-0">
        <div
          className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] mb-3 font-medium px-1"
          style={{ color: theme.accentDark }}
        >
          {eyebrow}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black mb-3 sm:mb-4 text-balance px-1">
          {title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-6 px-1">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={onShare}
            className="premium-button inline-flex items-center justify-center gap-2 text-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold w-full sm:w-auto"
            style={{ backgroundColor: theme.accentDark }}
          >
            <Share2 className="w-4 h-4 shrink-0" />
            {shareState === "copied"
              ? "Link copied"
              : shareState === "shared"
                ? "Shared"
                : "Share this deck"}
          </button>
          <button
            type="button"
            onClick={() => onDownload("landscape")}
            disabled={preparingPdf}
            className={`premium-button inline-flex items-center justify-center gap-2 border bg-white px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5 disabled:opacity-60 w-full sm:w-auto ${theme.softBorder} ${theme.softText}`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {preparingPdf && printOrientation === "landscape"
                ? "Preparing…"
                : "PDF · A4 Landscape"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onDownload("portrait")}
            disabled={preparingPdf}
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/10 bg-white text-black px-5 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/5 disabled:opacity-60 w-full sm:w-auto"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {preparingPdf && printOrientation === "portrait"
                ? "Preparing…"
                : "PDF · A4 Portrait"}
            </span>
          </button>
        </div>
      </div>
      <div className="px-0 sm:px-0 min-w-0 w-full max-w-6xl mx-auto sm:px-6 lg:px-8">
        {deck}
      </div>
      <p className="mt-4 text-center text-[11px] sm:text-xs text-[#737373] px-4 max-w-2xl mx-auto leading-relaxed">
        <span className="hidden sm:inline">Keyboard: ← → · </span>
        Share: <span className="font-medium text-black break-all">{sharePath}</span>
        {" · "}
        PDF: choose <strong className="text-black">Save as PDF</strong>
        {preparingPdf
          ? ` · ${printOrientation === "landscape" ? "Landscape" : "Portrait"}`
          : ""}
        .
      </p>
      {printPortal}
    </div>
  );
}
