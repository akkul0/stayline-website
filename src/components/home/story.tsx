"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/* Bölümler telefonu çizmez; yalnızca telefonun duracağı yeri işaretler
   (bkz. phone/phone-director.tsx). */
export function Slot({ screen, ry = 0, rx = 6, rz = 0, spin = 1, mode, className }: {
  screen: string; ry?: number; rx?: number; rz?: number; spin?: number; mode?: string; className?: string;
}) {
  return (
    <div
      aria-hidden
      data-phone-slot
      data-screen={screen}
      data-ry={ry}
      data-rx={rx}
      data-rz={rz}
      data-spin={spin}
      data-mode={mode}
      className={cn("h-[440px] w-[214px] shrink-0 lg:h-[600px] lg:w-[292px]", className)}
    />
  );
}

const H2 = "font-display text-[clamp(2.3rem,5.2vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]";

/* ── Hero ───────────────────────────────────────────────────── */
export function StoryHero() {
  const t = useTranslations("home.hero");
  return (
    <section className="relative isolate overflow-hidden bg-[#061219] text-[#e6eef0]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero-1696.webp" srcSet="/images/hero-900.webp 900w, /images/hero-1696.webp 1696w" sizes="100vw" alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_74%_52%,rgba(70,189,180,0.2),transparent_70%),linear-gradient(90deg,#061219_10%,rgba(6,18,25,0.82)_45%,rgba(6,18,25,0.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-[#061219]" />
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-10 pb-16 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-0">
        <div className="relative z-10 max-w-[680px]">
          <h1 className="font-display text-[clamp(3rem,7.4vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-balance">{t("title")}</h1>
          <p className="mt-7 max-w-[32rem] text-pretty text-[17px] leading-relaxed text-[#c3d2d7] sm:text-lg">{t("subtitle")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className={buttonVariants({ size: "lg" })}>{t("ctaPrimary")}<ArrowRight className="size-4" aria-hidden /></Link>
            <a href="#yolculuk" className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/25 bg-transparent text-[#e6eef0] hover:bg-white/10 hover:text-white`}>{t("ctaSecondary")}</a>
          </div>
          <p className="mt-7 text-[13px] text-[#8fa6ae]">{t("trust")}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Slot screen="hero" ry={-20} rx={8} rz={3} spin={0} />
        </div>
      </Container>
    </section>
  );
}

/* ── Mesajın yolculuğu: telefon zikzak çizerek iner ─────────── */
export function StoryJourney() {
  const t = useTranslations("home.journey");
  const ts = useTranslations("home.story");
  const steps = t.raw("steps") as { title: string; body: string }[];
  const words = t.raw("words") as string[];
  const tags = ts.raw("tags") as string[];
  return (
    <section id="yolculuk" aria-labelledby="yolculuk-title" className="relative scroll-mt-16 bg-[#061219] text-[#e6eef0]">
      <Container className="pt-24 text-center lg:pt-32">
        <h2 id="yolculuk-title" className={H2}>{t("title")}</h2>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#a7bac1]">{t("subtitle")}</p>
      </Container>
      {steps.map((s, i) => (
        <div key={s.title} className="relative flex min-h-[100svh] items-center overflow-hidden py-16">
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[24vw] font-semibold leading-none tracking-[-0.06em] text-outline [-webkit-text-stroke:1px_rgba(167,214,220,0.13)]">
            {words[i]}
          </span>
          <Container className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className={cn("max-w-md", i % 2 ? "lg:order-2 lg:justify-self-end" : "")}>
              <p className="font-mono text-[12px] tabular-nums text-[#5fd3c9]">{String(i + 1).padStart(2, "0")} / 04</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-semibold leading-[1] tracking-[-0.035em]">{s.title}</h3>
              <p className="mt-5 text-[16.5px] leading-relaxed text-[#a7bac1]">{s.body}</p>
              {i === 1 ? (
                <div className="mt-6 flex flex-wrap gap-2 text-[12.5px]">
                  {tags.map((tg, k) => (
                    <span key={tg} className={cn("rounded-full border px-3 py-1", k === 0 ? "border-[#46bdb4]/40 bg-[#46bdb4]/10 text-[#5fd3c9]" : k === 2 ? "border-[#e9a95c]/40 bg-[#e9a95c]/10 text-[#e9a95c]" : "border-white/15 text-[#cfdadd]")}>{tg}</span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className={cn("flex justify-center", i % 2 ? "lg:order-1" : "")}>
              <Slot screen={`j${i + 1}`} ry={i % 2 ? 16 : -16} rz={i % 2 ? -3 : 3} spin={1} />
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}

/* ── Dört dil: telefon dörde bölünür ────────────────────────── */
export function StoryLanguages() {
  const t = useTranslations("home.story.languages");
  const labels = t.raw("labels") as { name: string; note: string }[];
  return (
    <section className="relative bg-[#061219] py-24 text-[#e6eef0] lg:py-32">
      <Container className="text-center">
        <h2 className={H2}>{t("title")}</h2>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#a7bac1]">{t("subtitle")}</p>
      </Container>
      <Container className="mt-14">
        <Slot mode="quad" screen="lang:tr" spin={0} rx={4} className="mx-auto h-[620px] w-full max-w-[420px] lg:h-[560px] lg:w-full lg:max-w-none" />
        <div className="mt-8 grid grid-cols-2 gap-y-4 text-center lg:grid-cols-4">
          {labels.map((l) => (
            <div key={l.name}>
              <p className="font-display text-[20px] font-semibold tracking-[-0.02em]">{l.name}</p>
              <p className="text-[13px] text-[#8aa0a8]">{l.note}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Birleşme: dördü üst üste binip teke düşer ──────────────── */
export function StoryMerge() {
  const t = useTranslations("home.story.merge");
  const points = t.raw("points") as string[];
  return (
    <section className="relative bg-[#061219] text-[#e6eef0]">
      <Container className="grid min-h-[100svh] items-center gap-12 py-16 lg:grid-cols-2">
        <div className="max-w-md">
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1] tracking-[-0.035em]">{t("title")}</h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-[#a7bac1]">{t("body")}</p>
          <ul className="mt-6 space-y-2.5">
            {points.map((p) => <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-[#cfdadd]"><Check className="mt-0.5 size-4 shrink-0 text-[#5fd3c9]" aria-hidden />{p}</li>)}
          </ul>
        </div>
        <div className="flex justify-center"><Slot mode="merge" screen="team" spin={0} ry={-14} /></div>
      </Container>
    </section>
  );
}

/* ── Modüller: her modülde telefon karşı tarafa dönerek geçer ─ */
interface Item { id: string; title: string; lead: string; body: string; points: string[] }
export function StoryModules() {
  const t = useTranslations("home.capabilities");
  const items = t.raw("items") as Item[];
  return (
    <section id="isler" aria-labelledby="isler-title" className="relative scroll-mt-16 bg-surface-0">
      <Container className="pt-24 sm:pt-32">
        <h2 id="isler-title" className={cn(H2, "max-w-3xl text-text-strong")}>{t("title")}</h2>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-text-body">{t("subtitle")}</p>
      </Container>
      {items.map((m, i) => (
        <div key={m.id} className="flex min-h-[92svh] items-center py-14">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div className={cn("max-w-lg", i % 2 ? "lg:order-2 lg:justify-self-end" : "")}>
              <p className="font-mono text-[12px] text-brand">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-text-strong">{m.title}</h3>
              <p className="mt-4 text-[18px] leading-snug text-text-strong/90">{m.lead}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-text-body">{m.body}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {m.points.map((p) => <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-text-body"><Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{p}</li>)}
              </ul>
            </div>
            <div className={cn("flex justify-center", i % 2 ? "lg:order-1" : "")}>
              <Slot screen={`module:${m.id}`} ry={i % 2 ? 14 : -14} rz={i % 2 ? -2 : 2} spin={i % 2 ? -1 : 1} />
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}

/* ── Odadaki telefon: kaydırdıkça kamera telefonun etrafında döner ─ */
const FRAMES = 48;
export function RoomPhone() {
  const t = useTranslations("home.story.room");
  const lines = t.raw("lines") as string[];
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", setP);

  const draw = (progress: number) => {
    const c = canvas.current;
    if (!c) return;
    const idx = Math.min(FRAMES - 1, Math.round(progress * (FRAMES - 1)));
    const img = frames.current[idx];
    if (!img?.complete || !img.naturalWidth) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    ctx.drawImage(img, (c.width - dw) / 2 + c.width * 0.08, (c.height - dh) / 2, dw, dh);
  };

  // Kareler bölüme yaklaşınca yüklenir
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || frames.current.length) return;
      frames.current = Array.from({ length: FRAMES }, (_, i) => {
        const img = new Image();
        img.decoding = "async";
        img.src = `/images/room/${String(i).padStart(2, "0")}.webp`;
        if (i === 0) img.onload = () => draw(scrollYProgress.get());
        return img;
      });
    }, { rootMargin: "1200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [scrollYProgress]);

  useEffect(() => { draw(p); }, [p]);

  const shown = Math.min(lines.length, Math.floor(p * (lines.length + 1.6)));
  return (
    <section ref={ref} aria-labelledby="oda-title" className="relative h-[280vh] bg-[#061219] text-[#e6eef0]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061219_8%,rgba(6,18,25,0.85)_38%,rgba(6,18,25,0.15)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#061219]" />
        {/* Cep telefonu bu bölümde sahneden çekilir */}
        <div aria-hidden data-phone-slot data-mode="hidden" data-screen="booking" data-spin="0" className="absolute left-1/2 top-1/2 size-px" />
        <Container className="relative flex h-full items-center">
          <div className="max-w-md">
            <h2 id="oda-title" className="font-display text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.035em]">{t("title")}</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-[#b5c6cc]">{t("body")}</p>
            <ul className="mt-7 space-y-2" aria-label={t("transcript")}>
              {lines.map((l, i) => (
                <li key={l} className={cn("rounded-xl border border-white/10 bg-[#061219]/70 px-3.5 py-2.5 text-[14px] backdrop-blur transition-all duration-500", i < shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0", i % 2 ? "ml-8 text-[#cfe7e4]" : "mr-8 text-[#e6eef0]")}>
                  {l}
                </li>
              ))}
            </ul>
            <p className={cn("mt-4 inline-flex rounded-full bg-[#e9a95c]/15 px-3 py-1.5 text-[13px] text-[#e9a95c] transition-opacity duration-500", shown >= lines.length ? "opacity-100" : "opacity-0")}>{t("done")}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
