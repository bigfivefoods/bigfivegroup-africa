"use client";

import { useEffect, useRef, useState } from "react";

const FACE_DEFS = [
  { name: "Choices", color: "#b91c1c", turn: "rotateY(0deg)" },
  { name: "Mental", color: "#c2410c", turn: "rotateY(90deg)" },
  { name: "Principles", color: "#7e22ce", turn: "rotateY(180deg)" },
  { name: "Emotional", color: "#15803d", turn: "rotateY(-90deg)" },
  { name: "Physical", color: "#1d4ed8", turn: "rotateX(90deg)" },
  { name: "Spiritual", color: "#1e3a8a", turn: "rotateX(-90deg)" },
] as const;

/**
 * Auto-turning Super-Cube®. Drag to look at a face. Respects reduced motion.
 * The six faces are the constructs published on super-cube.me.
 */
export default function SuperCubeModel({ compact = false }: { compact?: boolean }) {
  const size = compact ? 112 : 168;
  const half = size / 2;
  const stage = compact ? 168 : 248;
  const [rot, setRot] = useState({ x: -22, y: 32 });
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);
  const spinning = useRef(true);
  const rotRef = useRef(rot);
  rotRef.current = rot;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      if (spinning.current && !drag.current) {
        setRot((r) => ({ x: r.x, y: r.y + dt * 0.018 }));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <figure className="m-0">
      <div
        className="relative mx-auto touch-none select-none cursor-grab active:cursor-grabbing"
        style={{ width: stage, height: stage, perspective: "880px" }}
        onPointerDown={(e) => {
          spinning.current = false;
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            rx: rotRef.current.x,
            ry: rotRef.current.y,
          };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setRot({
            x: drag.current.rx - (e.clientY - drag.current.y) * 0.4,
            y: drag.current.ry + (e.clientX - drag.current.x) * 0.4,
          });
        }}
        onPointerUp={() => {
          drag.current = null;
          spinning.current = true;
        }}
        onPointerCancel={() => {
          drag.current = null;
          spinning.current = true;
        }}
        role="img"
        aria-label="Rotating Super-Cube. Six faces: Choices, Principles, Mental, Emotional, Physical and Spiritual. Drag to turn it."
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: size,
            height: size,
            marginLeft: -half,
            marginTop: -half,
            transformStyle: "preserve-3d",
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          }}
        >
          {FACE_DEFS.map((face) => (
            <div
              key={face.name}
              className="absolute inset-0 flex items-center justify-center rounded-2xl font-semibold tracking-wide text-white"
              style={{
                backgroundColor: face.color,
                transform: `${face.turn} translateZ(${half}px)`,
                backfaceVisibility: "hidden",
                fontSize: compact ? 11 : 14,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)",
              }}
            >
              {face.name}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mx-auto mt-2 max-w-[14rem] text-center text-[11px] font-semibold leading-snug text-[#737373]">
        {compact ? "Drag to turn" : "Drag to turn. You stand at the centre."}
      </figcaption>
    </figure>
  );
}
