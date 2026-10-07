"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Telefon asistanı için ses dalgası: konuşma ritminde yükselip alçalan çubuklar.
export function Waveform({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let visible = true;
    const color = getComputedStyle(canvas).color;
    const draw = (time: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      const bars = Math.floor(w / 7);
      const t = time / 1000;
      // Hece ritmi: birkaç sinüsün çarpımı + konuşma arası sessizlikler
      const speaking = 0.55 + 0.45 * Math.max(0, Math.sin(t * 0.9));
      for (let i = 0; i < bars; i++) {
        const x = i / bars;
        const env = Math.sin(Math.PI * x);
        const v = Math.abs(Math.sin(i * 0.55 + t * 5.2) * Math.sin(i * 0.17 - t * 2.3) + 0.25 * Math.sin(i * 1.3 + t * 9));
        const bh = Math.max(2, (reduce ? 0.35 : v * speaking) * env * h * 0.9);
        ctx.globalAlpha = 0.35 + 0.65 * env;
        ctx.beginPath();
        ctx.roundRect(i * 7, (h - bh) / 2, 3, bh, 1.5);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
