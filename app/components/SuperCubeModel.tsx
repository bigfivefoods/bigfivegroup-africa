"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Face map matches super-cube.me:
 * Choices on top, Principles on the bottom, the other four around the sides.
 * Colours and skill lines are the published constructs.
 */
const FACES = [
  {
    place: "top",
    name: "Choices",
    color: "#B32026",
    turn: "rotateX(90deg)",
    skills: ["Decision-making intelligence", "Moral values", "Judgement", "Risk-taking"],
  },
  {
    place: "bottom",
    name: "Principles",
    color: "#5D1F5E",
    turn: "rotateX(-90deg)",
    skills: ["Ethical foundations", "Contextual awareness", "Situational judgement", "Governance"],
  },
  {
    place: "front",
    name: "Mental",
    color: "#ED8F20",
    turn: "",
    skills: [
      "Cognitive intelligence",
      "Strategic thinking",
      "Problem-solving",
      "Vision",
      "Knowledge application",
    ],
  },
  {
    place: "back",
    name: "Spiritual",
    color: "#26408C",
    turn: "rotateY(180deg)",
    skills: ["Purpose", "Meaning", "Faith", "Transcendence", "Spiritual intelligence"],
  },
  {
    place: "right",
    name: "Emotional",
    color: "#367638",
    turn: "rotateY(90deg)",
    skills: ["Emotional intelligence", "Empathy", "Social relationships", "Motivation", "Inspiration"],
  },
  {
    place: "left",
    name: "Physical",
    color: "#16979A",
    turn: "rotateY(-90deg)",
    skills: ["Physical health", "Energy management", "Fitness", "Nutrition", "Bodily resilience"],
  },
] as const;

const DEFAULT_ROT = { x: -22, y: 32, z: 0 };

type Rot = { x: number; y: number; z: number };

function metrics(compact: boolean) {
  if (compact) {
    return { scene: 220, face: 132, name: 13, skill: 8, pad: "7px 6px", gap: 3 };
  }
  return { scene: 260, face: 156, name: 15, skill: 8.5, pad: "10px 8px", gap: 6 };
}

/**
 * Sharp Super-Cube® — square faces, the same wording as super-cube.me.
 * Drag to turn. Shift-drag rolls. Auto-spin pauses while dragging.
 */
export default function SuperCubeModel({ compact = false }: { compact?: boolean }) {
  const m = metrics(compact);
  const half = m.face / 2;
  const cubeRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef<Rot>({ ...DEFAULT_ROT });
  const dragging = useRef(false);
  const lastPtr = useRef({ x: 0, y: 0 });
  const [autoOn, setAutoOn] = useState(true);
  const [draggingUi, setDraggingUi] = useState(false);
  const autoRef = useRef(true);
  autoRef.current = autoOn;

  const apply = () => {
    const r = rotRef.current;
    const el = cubeRef.current;
    if (!el) return;
    el.style.transform = `rotateX(${r.x}deg) rotateY(${r.y}deg) rotateZ(${r.z}deg)`;
  };

  useEffect(() => {
    apply();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      if (autoRef.current && !dragging.current) {
        rotRef.current.y += dt * 0.012;
        apply();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragging.current = true;
    setDraggingUi(true);
    lastPtr.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPtr.current.x;
    const dy = e.clientY - lastPtr.current.y;
    lastPtr.current = { x: e.clientX, y: e.clientY };
    if (e.shiftKey) {
      rotRef.current.z += dx * 0.45;
    } else {
      rotRef.current.y += dx * 0.45;
      rotRef.current.x -= dy * 0.45;
    }
    apply();
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setDraggingUi(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const nudge = (axis: keyof Rot, delta: number) => {
    rotRef.current[axis] += delta;
    apply();
  };

  const reset = () => {
    rotRef.current = { ...DEFAULT_ROT };
    apply();
  };

  const btn =
    "rounded-full border border-black/15 bg-white px-2.5 py-1.5 text-[0.7rem] font-semibold text-[#171717] hover:border-black/30";

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div
        className={`relative touch-none select-none ${draggingUi ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ width: m.scene, height: m.scene, perspective: "1100px" }}
        role="img"
        aria-label="Interactive Super-Cube. Choices on top, Principles on the bottom, Mental, Emotional, Physical and Spiritual on the sides. Drag to rotate."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={cubeRef}
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${DEFAULT_ROT.x}deg) rotateY(${DEFAULT_ROT.y}deg) rotateZ(${DEFAULT_ROT.z}deg)`,
          }}
        >
          {FACES.map((face) => (
            <div
              key={face.place}
              className="absolute box-border flex flex-col items-center justify-center text-center text-white"
              style={{
                width: m.face,
                height: m.face,
                left: "50%",
                top: "50%",
                marginLeft: -half,
                marginTop: -half,
                padding: m.pad,
                gap: m.gap,
                borderRadius: 0,
                overflow: "hidden",
                backgroundColor: face.color,
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                backfaceVisibility: "hidden",
                transform: `${face.turn} translateZ(${half}px)`.trim(),
              }}
            >
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: m.name,
                  letterSpacing: "-0.02em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }}
              >
                {face.name}
              </span>
              <ul className="m-0 flex w-full list-none flex-col p-0" style={{ gap: 1 }}>
                {face.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-medium leading-tight"
                    style={{ fontSize: m.skill, color: "rgba(255,255,255,0.92)" }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-[20rem] flex-col items-center gap-2">
        <p className="text-center text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#737373]">
          <span className="sm:hidden">Drag to rotate</span>
          <span className="hidden sm:inline">
            Drag to rotate · Shift+drag for spin · Choices top · Principles bottom
          </span>
        </p>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5">
          <button type="button" className={btn} onClick={() => nudge("y", -25)} aria-label="Rotate left">
            ↺ Y
          </button>
          <button type="button" className={btn} onClick={() => nudge("y", 25)} aria-label="Rotate right">
            ↻ Y
          </button>
          <button type="button" className={btn} onClick={() => nudge("x", -25)} aria-label="Tilt up">
            ↑ X
          </button>
          <button type="button" className={btn} onClick={() => nudge("x", 25)} aria-label="Tilt down">
            ↓ X
          </button>
          <button type="button" className={btn} onClick={() => nudge("z", 25)} aria-label="Roll">
            ⟳ Z
          </button>
          <button type="button" className={btn} onClick={reset}>
            Reset
          </button>
          <button
            type="button"
            className={
              autoOn
                ? "rounded-full border border-transparent bg-[#171717] px-2.5 py-1.5 text-[0.7rem] font-semibold text-white"
                : btn
            }
            aria-pressed={autoOn}
            onClick={() => setAutoOn((v) => !v)}
          >
            {autoOn ? "Auto on" : "Auto off"}
          </button>
        </div>
      </div>
    </div>
  );
}
