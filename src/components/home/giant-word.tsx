"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

// Dev "StayLine": SVG olarak her ekranda kutuya tam oturur (harfler taşmaz);
// bölüm ekrandan geçerken soldan sağa dolar.
export function GiantWord({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setFill(p));
  const W = 1000;
  const common = {
    x: 0,
    y: 212,
    textLength: W,
    lengthAdjust: "spacing" as const,
    fontSize: 262,
    fontWeight: 600,
    style: { fontFamily: "var(--font-display)", letterSpacing: "-0.04em" },
  };
  return (
    <div ref={ref} aria-hidden className="select-none">
      <svg viewBox={`0 0 ${W} 270`} className="block h-auto w-full overflow-visible">
        <defs>
          <clipPath id="giant-fill">
            <rect x="0" y="0" width={W * fill} height="270" />
          </clipPath>
        </defs>
        <text {...common} fill="none" stroke="var(--border-strong)" strokeWidth="1.2">{word}</text>
        <text {...common} fill="var(--text-strong)" clipPath="url(#giant-fill)">{word}</text>
      </svg>
    </div>
  );
}
