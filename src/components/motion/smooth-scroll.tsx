"use client";

import { useEffect } from "react";
import Lenis from "@/lib/vendor/lenis/lenis.mjs";

// Yumuşak kaydırma (Lenis). Hareket azaltmayı seçenlerde açılmaz; dokunmatik
// kaydırma tarayıcıya bırakılır. Sayfa içi bağlantılar da yumuşak kayar.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -72 } });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
