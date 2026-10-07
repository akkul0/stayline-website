"use client";

import { useEffect, useRef, useState } from "react";
import { motion, motionValue, type MotionValue } from "framer-motion";
import { Phone3D } from "@/components/phone/phone-3d";
import { PhoneScreen } from "@/components/phone/screens";

/*
 * TEK TELEFONUN YÖNETMENİ
 *
 * Sayfadaki her bölümde telefonun duracağı görünmez bir yer var:
 *   <div data-phone-slot data-screen="j1" data-ry="18" data-spin="1" />
 * Telefon ekranın üstünde sabit durur; ekranın ortası iki yer arasından
 * geçerken telefon birinden ötekine uçar ve `spin` kadar tam tur döner.
 * Ekran, telefon arkasını döndüğü anda (yolun yarısı) değişir.
 *
 * data-mode:
 *   quad   → arkasından üç kopya çıkar, dört dil yan yana (telefonda 2×2)
 *   merge  → kopyalar üst üste binerek ana telefona geri katılır
 *   hidden → telefon sağdan ekran dışına çekilir (odadaki telefon bölümü)
 */

const PW = 300;
const PH = 618;
const LANGS = ["lang:tr", "lang:en", "lang:de", "lang:ru"];

interface Slot { cx: number; cy: number; w: number; h: number; screen: string; ry: number; rx: number; rz: number; spin: number; mode: string }
interface PhoneMV { x: MotionValue<number>; y: MotionValue<number>; s: MotionValue<number>; o: MotionValue<number>; rx: MotionValue<number>; ry: MotionValue<number>; rz: MotionValue<number> }

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

function readSlots(): Slot[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-phone-slot]")).map((el) => {
    const r = el.getBoundingClientRect();
    const d = el.dataset;
    return {
      cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width, h: r.height,
      screen: d.screen || "hero", ry: Number(d.ry || 0), rx: Number(d.rx || 0), rz: Number(d.rz || 0),
      spin: Number(d.spin ?? 1), mode: d.mode || "single",
    };
  });
}

// Dörtlü düzende telefon ölçeği ve konumları (masaüstünde yan yana, telefonda 2×2)
function quadLayout(q: Slot) {
  const grid = q.w < 720;
  const s = grid ? Math.min((q.h / 2 - 10) / PH, (q.w / 2 - 10) / PW) : Math.min(q.h / PH, (q.w / 4 - 20) / PW);
  const fan = [0, 1, 2, 3].map((k) =>
    grid
      ? { dx: (k % 2 - 0.5) * (q.w / 2), dy: (Math.floor(k / 2) - 0.5) * (q.h / 2) }
      : { dx: (k - 1.5) * (q.w / 4), dy: 0 },
  );
  return { s, fan };
}

export function PhoneDirector() {
  // Hareket değerleri bir kez oluşturulur (çizimler arasında aynı kalır)
  const [phones] = useState<PhoneMV[]>(() =>
    Array.from({ length: 4 }, () => ({
      x: motionValue(-1000), y: motionValue(-1000), s: motionValue(1), o: motionValue(0),
      rx: motionValue(0), ry: motionValue(0), rz: motionValue(0),
    })),
  );
  const [screen, setScreen] = useState("hero");
  const screenRef = useRef("hero");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const slots = readSlots();
      if (!slots.length) { phones.forEach((p) => p.o.set(0)); return; }
      const vw = window.innerWidth;
      const vc = window.innerHeight / 2;

      let i = -1;
      slots.forEach((s, k) => { if (s.cy <= vc) i = k; });
      if (i < 0) i = 0;
      const j = Math.min(i + 1, slots.length - 1);
      const t = j === i ? 0 : clamp((vc - slots[i].cy) / (slots[j].cy - slots[i].cy));
      const a = slots[i], b = slots[j], e = ease(t);

      const off = (s: Slot) => (s.mode === "hidden" ? { cx: vw + PW, cy: s.cy } : { cx: s.cx, cy: s.cy });
      const own = (s: Slot) => (s.mode === "quad" ? quadLayout(s).s : s.h / PH);
      const scaleOf = (s: Slot, other: Slot) => (s.mode === "hidden" ? (other.mode === "hidden" ? 1 : own(other)) : own(s));
      const pa = off(a), pb = off(b);
      const cx = lerp(pa.cx, pb.cx, e);
      const cy = lerp(pa.cy, pb.cy, e);
      const sc = lerp(scaleOf(a, b), scaleOf(b, a), e);
      const spin = reduce ? 0 : b.spin * 360 * e;
      const ry = lerp(a.ry, b.ry, e) + spin;
      const rx = lerp(a.rx, b.rx, e);
      const rz = lerp(a.rz, b.rz, e);
      const opacity = lerp(a.mode === "hidden" ? 0 : 1, b.mode === "hidden" ? 0 : 1, e);

      // Dörtlü: yaklaşırken açılır, uzaklaşırken üst üste binerek kapanır
      const q = clamp((a.mode === "quad" ? 1 - e : 0) + (b.mode === "quad" ? e : 0));
      const quad = a.mode === "quad" ? a : b.mode === "quad" ? b : null;
      const layout = quad ? quadLayout(quad) : null;
      const leaving = a.mode === "quad";

      phones.forEach((p, k) => {
        let x = cx, y = cy, o = k === 0 ? opacity : 0, rzk = rz, ryk = ry;
        if (layout && q > 0) {
          const stack = { dx: k * 12, dy: -k * 12 };
          const fan = layout.fan[k];
          x = cx + lerp(stack.dx, fan.dx, q);
          y = cy + lerp(stack.dy, fan.dy, q);
          rzk = rz + (k - 1.5) * 3 * (1 - q) * (leaving ? 1 : 0.4);
          ryk = ry + (k - 1.5) * 5 * q;
          if (k > 0) o = q < 0.08 ? q / 0.08 : 1;
        }
        p.x.set(x - PW / 2);
        p.y.set(y - PH / 2);
        p.s.set(sc);
        p.o.set(o);
        p.rx.set(rx);
        p.ry.set(ryk);
        p.rz.set(rzk);
      });

      const next = layout && q > 0.5 ? LANGS[0] : e < 0.5 ? a.screen : b.screen;
      if (next !== screenRef.current) { screenRef.current = next; setScreen(next); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phones]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {[3, 2, 1, 0].map((k) => (
        <motion.div
          key={k}
          className="absolute left-0 top-0 will-change-transform"
          style={{ x: phones[k].x, y: phones[k].y, scale: phones[k].s, opacity: phones[k].o, width: PW, height: PH }}
        >
          <Phone3D rotateX={phones[k].rx} rotateY={phones[k].ry} rotateZ={phones[k].rz}>
            <PhoneScreen id={k === 0 ? screen : LANGS[k]} />
          </Phone3D>
        </motion.div>
      ))}
    </div>
  );
}
