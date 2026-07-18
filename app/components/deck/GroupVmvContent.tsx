"use client";

import {
  Compass,
  Target,
  Shield,
  Users,
  Lightbulb,
  Sparkles,
  Heart,
  type LucideIcon,
} from "lucide-react";
import {
  DeckEyebrow,
  DeckSlideShell,
  useDeckPrintMode,
  type DeckTheme,
} from "./DeckShell";

/** Canonical Group north star — used on every pillar presentation */
export const GROUP_VMV = {
  vision: {
    title: "A prosperous Africa — for everyone on it",
    body: "Well-being is not a privilege. Families eat with dignity, leaders decide with integrity, and communities build economies they own.",
  },
  mission: {
    title: "Feed. Educate. Empower.",
    body: "Deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises — at scale and with proof.",
  },
  valuesIntro: {
    title: "What we refuse to compromise",
    body: "Humanity, innovation, integrity, excellence and purposeful impact shape how we hire, partner, trade and deliver — across every pillar.",
  },
  values: [
    { icon: Users, title: "Humanity", desc: "People first — Ubuntu in practice." },
    { icon: Lightbulb, title: "Innovation", desc: "Better systems for African progress." },
    { icon: Shield, title: "Integrity", desc: "Honesty, transparency, ethical commerce." },
    { icon: Sparkles, title: "Excellence", desc: "Professional standards, always." },
    { icon: Heart, title: "Impact", desc: "Outcomes communities can feel." },
  ] as { icon: LucideIcon; title: string; desc: string }[],
};

/**
 * Group Vision · Mission · Values slide for pillar decks (DeckShell theme).
 * Compact for A4 landscape/portrait so all five values remain visible.
 */
export function GroupVmvSlide({ theme }: { theme: DeckTheme }) {
  const forPrint = useDeckPrintMode();

  const pillars = [
    {
      t: "Vision",
      icon: Compass,
      color: "text-emerald-700",
      bar: "from-emerald-500 to-teal-600",
      title: GROUP_VMV.vision.title,
      d: forPrint
        ? "Well-being is not a privilege. Families eat with dignity, leaders decide with integrity, communities own their economies."
        : GROUP_VMV.vision.body,
    },
    {
      t: "Mission",
      icon: Target,
      color: "text-sky-700",
      bar: "from-sky-500 to-blue-600",
      title: GROUP_VMV.mission.title,
      d: forPrint
        ? "Deploy skills, capital, platforms and relationships so Africa can feed its people, educate its leaders, and empower its enterprises."
        : GROUP_VMV.mission.body,
    },
    {
      t: "Values",
      icon: Shield,
      color: "text-amber-700",
      bar: "from-amber-500 to-orange-600",
      title: GROUP_VMV.valuesIntro.title,
      d: forPrint
        ? "Humanity, innovation, integrity, excellence and impact — how we hire, partner, trade and deliver."
        : GROUP_VMV.valuesIntro.body,
    },
  ];

  return (
    <DeckSlideShell theme={theme}>
      <div className="flex flex-col h-full min-h-0">
        <div className="shrink-0">
          <DeckEyebrow theme={theme}>BIG FIVE GROUP · NORTH STAR</DeckEyebrow>
          <h2
            className={`font-semibold tracking-tighter ${
              forPrint ? "text-xl mb-2" : "text-2xl sm:text-3xl md:text-4xl mb-4"
            }`}
          >
            Vision · Mission · Values
          </h2>
          <p
            className={`text-[#525252] max-w-3xl ${
              forPrint ? "text-[10px] mb-2 leading-snug" : "text-sm mb-4 leading-relaxed"
            }`}
          >
            Every pillar answers to the same Group north star — including this one.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 min-h-0 shrink-0 ${
            forPrint ? "gap-1.5 mb-2" : "gap-3 mb-4"
          }`}
        >
          {pillars.map((x) => (
            <div
              key={x.t}
              className={`rounded-xl border border-black/10 bg-[#fafafa] min-w-0 relative overflow-hidden ${
                forPrint ? "p-2.5" : "p-4 sm:p-5 rounded-2xl"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${x.bar}`} />
              <div
                className={`inline-flex items-center gap-1.5 tracking-[2px] font-semibold mb-1 mt-0.5 ${x.color} ${
                  forPrint ? "text-[8px]" : "text-[10px] sm:text-xs"
                }`}
              >
                <x.icon className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
                {x.t.toUpperCase()}
              </div>
              <h3
                className={`font-semibold text-black tracking-tight mb-1 leading-snug ${
                  forPrint ? "text-[11px]" : "text-sm sm:text-base"
                }`}
              >
                {x.title}
              </h3>
              <p
                className={`text-[#404040] leading-snug ${
                  forPrint ? "text-[10px]" : "text-xs sm:text-sm"
                }`}
              >
                {x.d}
              </p>
            </div>
          ))}
        </div>

        <div className="shrink-0 flex flex-col min-h-0">
          <div
            className={`tracking-[2px] text-[#737373] font-semibold ${
              forPrint ? "text-[8px] mb-1" : "text-[10px] mb-2"
            }`}
          >
            OUR VALUES
          </div>
          <div
            className={`grid min-w-0 ${
              forPrint
                ? "grid-cols-5 gap-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3"
            }`}
          >
            {GROUP_VMV.values.map((v) => (
              <div
                key={v.title}
                className={`flex items-start min-w-0 rounded-lg border border-black/10 bg-white ${
                  forPrint ? "flex-col gap-1 p-1.5" : "flex-row sm:flex-col gap-2 p-3 sm:p-4 rounded-xl"
                }`}
              >
                <div
                  className={`rounded-md flex items-center justify-center shrink-0 ${
                    forPrint ? "w-6 h-6" : "w-9 h-9 rounded-xl"
                  }`}
                  style={{
                    backgroundColor: `${theme.accent}18`,
                    color: theme.accentDark,
                  }}
                >
                  <v.icon className={forPrint ? "w-3 h-3" : "w-4 h-4"} />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-semibold text-black ${
                      forPrint ? "text-[10px]" : "text-sm mb-0.5"
                    }`}
                  >
                    {v.title}
                  </div>
                  <div
                    className={`text-[#525252] leading-snug ${
                      forPrint ? "text-[9px]" : "text-xs"
                    }`}
                  >
                    {v.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSlideShell>
  );
}
