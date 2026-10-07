"use client";

import { useEffect, useState } from "react";

// İlk ziyarette kısa yükleme ekranı (oturum başına bir kez). Yüzde sayacı,
// yazı tipleri ve ilk görsel hazır olunca 100'e tamamlanır; en fazla 1,6 sn.
export function Preloader() {
  const [state, setState] = useState<"hidden" | "show" | "leaving">("hidden");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("sl-intro") === "1"; } catch { /* gizli mod */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try { sessionStorage.setItem("sl-intro", "1"); } catch { /* yok say */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("show");
    const start = performance.now();
    let ready = false;
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(() => { ready = true; });
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      const target = ready ? 100 : Math.min(88, (t / 1100) * 88);
      setPct((p) => Math.min(100, Math.max(p, Math.round(p + (target - p) * 0.18))));
      if ((ready && t > 650) || t > 1600) {
        setPct(100);
        setTimeout(() => setState("leaving"), 160);
        setTimeout(() => setState("hidden"), 900);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (state === "hidden") return null;
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#061219] transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${state === "leaving" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"}`}
    >
      <p className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.04em] text-[#e6eef0]">
        Stay<span className="text-brand-400">Line</span>
      </p>
      <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
        <div className="h-full bg-brand-400 transition-[width] duration-150" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 font-mono text-[12px] tabular-nums text-[#7f959d]">{String(pct).padStart(3, "0")}</p>
    </div>
  );
}
