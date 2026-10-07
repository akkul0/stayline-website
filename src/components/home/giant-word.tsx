"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

// Dev "StayLine": bölüm ekrandan geçerken soldan sağa dolar.
export function GiantWord({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setFill(p));
  return (
    <div ref={ref} aria-hidden className="relative select-none overflow-hidden font-display text-[clamp(5rem,21vw,22rem)] font-semibold leading-[0.8] tracking-[-0.06em]">
      <span className="text-outline">{word}</span>
      <span className="absolute inset-0 text-text-strong" style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}>{word}</span>
    </div>
  );
}
