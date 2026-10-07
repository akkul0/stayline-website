"use client";

import type { ReactNode } from "react";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

type Angle = number | MotionValue<number>;

const W = 300; // tasarım genişliği (px); ölçek dışarıdan `scale` ile
const H = 618;
const R = 46; // köşe yarıçapı
const DEPTH = 14; // gövde kalınlığı (px)

/**
 * Kahraman telefon: CSS 3D ile gerçek kalınlıkta bir gövde (WebGL değil;
 * telefonlarda da akıcı). Kenar, ön ve arka yüz arasına dizilen ince
 * katmanlardan oluşur; döndüğünde metal kenar görünür. Ekrandaki parlama
 * dönüş açısına göre kayar.
 */
/* Kamera adası: arka yüzden 4px yükselir; telefon dönerken kenarı görünür.
   Arka yüz Y ekseninde 180° döndüğü için konum sağdan sola aynalanır. */
function Lens({ size }: { size: number }) {
  return (
    <span
      className="relative block rounded-full bg-[conic-gradient(from_210deg,#8d9ba1,#3d4a50,#c9d3d6,#4b585e,#8d9ba1)] p-[3px] shadow-[0_2px_5px_rgba(0,0,0,0.6)]"
      style={{ width: size, height: size }}
    >
      <span className="block size-full rounded-full bg-[#06090b] p-[5px] shadow-[inset_0_0_0_1.5px_#1c2529]">
        <span className="relative block size-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_50%,#0b1117_0%,#151d2c_35%,#1d2340_55%,#0a0e14_72%)] shadow-[inset_0_0_0_2px_rgba(80,95,140,0.35)]">
          <span className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle_at_40%_40%,#2a3f6a,#0c1220_70%)] shadow-[inset_0_0_0_1px_rgba(120,140,200,0.25)]" />
          <span className="absolute left-[24%] top-[20%] size-[22%] rounded-full bg-white/70 blur-[1.5px]" />
          <span className="absolute bottom-[24%] right-[26%] size-[10%] rounded-full bg-[#7fd9d2]/50 blur-[1px]" />
        </span>
      </span>
    </span>
  );
}

function CameraIsland() {
  const W_ISL = 74;
  const H_ISL = 176;
  const left = W - 24 - W_ISL; // aynalı: arkadan bakınca sol üstte
  return (
    <div aria-hidden className="absolute" style={{ left, top: 24, width: W_ISL, height: H_ISL, transform: `translateZ(${-DEPTH - 4.5}px) rotateY(180deg)`, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
      {/* adanın kenarı (yükseklik hissi) */}
      {[1, 2, 3].map((z) => (
        <div key={z} className="absolute inset-0 rounded-[30px] bg-[#1a262c]" style={{ transform: `translateZ(${-z}px)` }} />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-between rounded-[30px] bg-[linear-gradient(160deg,#3a4e57,#1f2c33_60%,#172126)] px-[8px] py-[9px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.18)]" style={{ backfaceVisibility: "hidden" }}>
        <Lens size={50} />
        <Lens size={50} />
        <Lens size={50} />
      </div>
      {/* flaş ve mikrofon (adanın yanında) */}
      <span className="absolute -right-[22px] top-[14px] size-[14px] rounded-full bg-[radial-gradient(circle,#fff6dc,#e8cf8e_55%,#8a7a52)] shadow-[0_0_0_2px_#2a383f]" style={{ backfaceVisibility: "hidden" }} />
      <span className="absolute -right-[17px] top-[40px] size-[4px] rounded-full bg-[#05080a]" style={{ backfaceVisibility: "hidden" }} />
    </div>
  );
}

export function Phone3D({
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  children,
  className,
}: {
  rotateX?: Angle;
  rotateY?: Angle;
  rotateZ?: Angle;
  children: ReactNode;
  className?: string;
}) {
  const fallback = useMotionValue(typeof rotateY === "number" ? rotateY : 0);
  const ry = typeof rotateY === "number" ? fallback : rotateY;
  const glareX = useTransform(ry, [-45, 45], ["-60%", "60%"]);
  const slices = Array.from({ length: DEPTH }, (_, i) => i + 1);

  return (
    <div className={cn("relative", className)} style={{ width: W, height: H, perspective: 1900 }}>
      <motion.div className="absolute inset-0" style={{ rotateX, rotateY, rotateZ, transformStyle: "preserve-3d" }}>
        {/* Kenar: ön ile arka arasında ince katmanlar */}
        {slices.map((i) => (
          <div
            key={i}
            aria-hidden
            className="absolute inset-0"
            style={{
              borderRadius: R,
              transform: `translateZ(${-i}px)`,
              background: i === 1 || i === DEPTH ? "#3b4d56" : "#22323a",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />
        ))}
        {/* Arka yüz: mat cam, ortada logo, gövdeden yükselen üçlü kamera adası */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden bg-[linear-gradient(155deg,#33464f_0%,#1c2a31_42%,#121c21_100%)] shadow-[inset_0_0_0_1.5px_#4a5f69,inset_0_0_40px_rgba(255,255,255,0.03)]"
          style={{ borderRadius: R, transform: `translateZ(${-DEPTH - 0.5}px) rotateY(180deg)`, backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        >
          {/* mat cam dokusu ve yumuşak yansıma */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_80%_10%,rgba(255,255,255,0.07),transparent_60%)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" className="absolute left-1/2 top-1/2 h-[46px] w-auto -translate-x-1/2 -translate-y-1/2 opacity-75 [filter:saturate(0.85)_drop-shadow(0_1px_0_rgba(255,255,255,0.08))]" />
        </div>
        <CameraIsland />
        {/* Ön yüz: çerçeve + ekran */}
        <div
          className="absolute inset-0 bg-[#04080a] p-[10px] shadow-[inset_0_0_0_1.5px_#4a5f69,inset_0_0_0_5px_#0a1216,0_40px_80px_-30px_rgba(0,0,0,0.7)]"
          style={{ borderRadius: R, transform: "translateZ(0.5px)", backfaceVisibility: "hidden" }}
        >
          <div className="relative size-full overflow-hidden bg-[#0a1922]" style={{ borderRadius: R - 10 }}>
            {children}
            {/* Dinamik ada */}
            <div aria-hidden className="absolute left-1/2 top-[9px] z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
            {/* Parlama */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-y-10 -left-1/2 z-30 w-[200%] bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.09)_47%,rgba(255,255,255,0.02)_53%,transparent_60%)]"
              style={{ x: glareX }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
