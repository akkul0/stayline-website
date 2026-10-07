"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Check, FileSpreadsheet, Languages, PhoneIncoming, ShieldCheck, Users } from "lucide-react";
import { ChatApp, Bubble, DayChip, Typing, StatusBar } from "@/components/phone/chat";
import { cn } from "@/lib/cn";

interface Msg { from: "guest" | "hotel"; text: string; time: string }
const pop = { initial: { opacity: 0, y: 10, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.28 } };

/** Telefonun ekranı: kimliğe göre doğru görünümü çizer. */
// Çıkış animasyonu yok: hızlı kaydırmada ekran art arda değişse bile her
// zaman en son ekran çizilir (telefon zaten arkasını dönmüşken değişir).
export function PhoneScreen({ id }: { id: string }) {
  return (
    <motion.div key={id} className="size-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {render(id)}
    </motion.div>
  );
}

function render(id: string) {
  if (id === "hero") return <HeroChat />;
  if (id === "j1" || id === "j2") return <JourneyChat replied={id === "j2"} />;
  if (id === "j3") return <LockScreen />;
  if (id === "j4") return <Dashboard />;
  if (id.startsWith("lang:")) return <LangChat lang={id.slice(5)} />;
  if (id === "team") return <TeamScreen />;
  if (id === "booking") return <BookingChat />;
  if (id.startsWith("module:")) return <ModuleScreen id={id.slice(7)} />;
  return <HeroChat />;
}

/* ── Hero: Türkçe, birkaç turlu canlı sohbet ─────────────────── */
function HeroChat() {
  const t = useTranslations("home.phone");
  const msgs = t.raw("hero") as Msg[];
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? msgs.length : 1);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const next = msgs[n];
    const id = setTimeout(() => {
      if (n >= msgs.length) { setN(1); return; }
      if (next.from === "hotel" && !typing) { setTyping(true); return; }
      setTyping(false);
      setN(n + 1);
    }, n >= msgs.length ? 3200 : next?.from === "hotel" && !typing ? 700 : 1500);
    return () => clearTimeout(id);
  }, [n, typing, reduce, msgs]);
  return (
    <ChatApp subtitle={typing ? t("typing") : t("online")} placeholder={t("placeholder")}>
      <DayChip>{t("today")}</DayChip>
      {msgs.slice(0, n).slice(-6).map((m, i, arr) => (
        <motion.div key={`${m.time}-${m.text}`} {...pop}>
          <Bubble from={m.from} time={m.time} tail={i === 0 || arr[i - 1].from !== m.from}>{m.text}</Bubble>
        </motion.div>
      ))}
      {typing ? <motion.div {...pop}><Typing /></motion.div> : null}
    </ChatApp>
  );
}

/* ── Yolculuk ─────────────────────────────────────────────────── */
function JourneyChat({ replied }: { replied: boolean }) {
  const t = useTranslations("home.phone");
  return (
    <ChatApp subtitle={t("online")} placeholder={t("placeholder")} time="21:52">
      <DayChip>{t("today")}</DayChip>
      <Bubble from="guest" time="21:52">{t("j.guest")}</Bubble>
      {replied ? <motion.div {...pop}><Bubble from="hotel" time="21:52">{t("j.reply")}</Bubble></motion.div> : null}
    </ChatApp>
  );
}

function LockScreen() {
  const t = useTranslations("home.phone.lock");
  return (
    <div className="flex size-full flex-col bg-[radial-gradient(120%_70%_at_50%_0%,#1f5a5c_0%,#0e2a31_45%,#071216_100%)]">
      <StatusBar light time="21:53" />
      <p className="mt-6 text-center text-[13px] font-medium text-white/70">{t("date")}</p>
      <p className="text-center font-display text-[78px] font-semibold leading-[0.95] tracking-[-0.05em] text-white/95">21:53</p>
      <div className="mt-auto space-y-2 px-3 pb-24">
        <motion.div {...pop} className="rounded-[18px] bg-white/[0.14] p-3 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[11.5px] text-white/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className="size-5 rounded-md bg-[#05040c]" />
            <span className="flex-1">StayLine</span><span>{t("now")}</span>
          </div>
          <p className="mt-1.5 text-[14px] font-semibold text-white">{t("title")}</p>
          <p className="text-[13px] leading-snug text-white/85">{t("body")}</p>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[12.5px] font-semibold">
            <span className="rounded-[10px] bg-[#e9a95c] py-1.5 text-center text-[#2a1806]">{t("take")}</span>
            <span className="rounded-[10px] bg-white/15 py-1.5 text-center text-white">{t("open")}</span>
          </div>
        </motion.div>
        <div className="rounded-[18px] bg-white/[0.08] px-3 py-2.5 text-[12px] text-white/60">{t("older")}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  const t = useTranslations("home.phone.dash");
  const stats = t.raw("stats") as [string, string][];
  const rows = t.raw("rows") as [string, string, string, number][];
  return (
    <div className="flex size-full flex-col bg-[#0a1922]">
      <StatusBar />
      <div className="flex items-center gap-2 px-4 pt-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="size-7 rounded-lg bg-[#05040c]" />
        <p className="text-[17px] font-semibold text-[#e9eef0]">{t("title")}</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 px-4">
        {stats.map(([k, v], i) => (
          <div key={k} className="rounded-xl bg-white/[0.05] px-2 py-2.5">
            <p className={cn("font-display text-[22px] font-semibold leading-none", i === 0 ? "text-[#e9a95c]" : i === 1 ? "text-[#5fd3c9]" : "text-[#3fb97a]")}>{v}</p>
            <p className="mt-1 text-[10.5px] text-[#8aa0a8]">{k}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-1.5 px-4">
        {rows.map(([room, item, state, s], i) => (
          <motion.li key={room + item} {...pop} transition={{ delay: i * 0.08 }} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-[12px]">
            <span><span className="block font-semibold text-[#e9eef0]">{room}</span><span className="text-[#8aa0a8]">{item}</span></span>
            <span className={cn("rounded-full px-2 py-0.5 text-[10.5px]", s === 2 ? "bg-[#3fb97a]/15 text-[#3fb97a]" : s === 1 ? "bg-[#e9a95c]/15 text-[#e9a95c]" : "bg-white/[0.07] text-[#a7bac1]")}>{state}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ── Dört dil ─────────────────────────────────────────────────── */
function LangChat({ lang }: { lang: string }) {
  const t = useTranslations("home.phone");
  const l = t.raw(`langs.${lang}`) as { guest: string; reply: string; online: string; placeholder: string; today: string };
  return (
    <ChatApp subtitle={l.online} placeholder={l.placeholder} time="22:05">
      <DayChip>{l.today}</DayChip>
      <Bubble from="guest" time="22:05">{l.guest}</Bubble>
      <Bubble from="hotel" time="22:05">{l.reply}</Bubble>
    </ChatApp>
  );
}

function TeamScreen() {
  const t = useTranslations("home.phone.team");
  const rows = t.raw("rows") as [string, string][];
  return (
    <div className="flex size-full flex-col bg-[#0a1922]">
      <StatusBar time="22:06" />
      <div className="px-4 pt-1">
        <p className="text-[17px] font-semibold text-[#e9eef0]">{t("title")}</p>
        <p className="text-[11.5px] text-[#8aa0a8]">{t("sub")}</p>
      </div>
      <ul className="mt-3 space-y-1.5 px-4">
        {rows.map(([code, text], i) => (
          <motion.li key={code} {...pop} transition={{ delay: i * 0.1 }} className="rounded-xl bg-white/[0.05] px-3 py-2.5">
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="flex items-center gap-1 rounded-full bg-[#46bdb4]/15 px-2 py-0.5 text-[#5fd3c9]"><Languages className="size-3" aria-hidden />{code} → TR</span>
              <span className="text-[#8aa0a8]">22:05</span>
            </div>
            <p className="mt-1.5 text-[13px] text-[#e9eef0]">{text}</p>
          </motion.li>
        ))}
      </ul>
      <p className="mx-4 mt-3 rounded-xl bg-[#e9a95c]/12 px-3 py-2 text-[11.5px] text-[#e9a95c]">{t("note")}</p>
    </div>
  );
}

function BookingChat() {
  const t = useTranslations("home.phone");
  const msgs = t.raw("booking") as Msg[];
  return (
    <ChatApp subtitle={t("online")} placeholder={t("placeholder")} time="10:30">
      <DayChip>{t("today")}</DayChip>
      {msgs.map((m, i) => <Bubble key={i} from={m.from} time={m.time} tail={i === 0 || msgs[i - 1].from !== m.from}>{m.text}</Bubble>)}
      <div className="ml-0 mr-auto w-[82%] overflow-hidden rounded-[10px] bg-[#1b2a31]">
        <div className="flex h-16 items-center justify-center bg-[linear-gradient(135deg,#0e5650,#132a33)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="size-9 rounded-lg" />
        </div>
        <div className="px-2.5 py-2">
          <p className="text-[12.5px] font-semibold text-[#e9eef0]">{t("bookingCard.title")}</p>
          <p className="text-[11px] text-[#8aa0a8]">stayline.net/demo</p>
        </div>
      </div>
    </ChatApp>
  );
}

/* ── Modül ekranları ──────────────────────────────────────────── */
function Title({ children }: { children: React.ReactNode }) {
  return <p className="px-4 pt-1 text-[18px] font-semibold text-[#e9eef0]">{children}</p>;
}

function ModuleScreen({ id }: { id: string }) {
  const t = useTranslations("home.screens");
  const tp = useTranslations("home.phone");
  if (id === "languages") {
    return (
      <ChatApp subtitle={tp("online")} placeholder={tp("placeholder")} time="22:10">
        <DayChip>{tp("today")}</DayChip>
        <Bubble from="guest" time="22:10">{t("languages.original")}</Bubble>
        <div className="mr-auto max-w-[82%] rounded-[10px] border border-[#46bdb4]/25 bg-[#46bdb4]/[0.08] px-2.5 py-1.5 text-[12px] text-[#cfe7e4]">
          <p className="mb-0.5 flex items-center gap-1 text-[10px] text-[#5fd3c9]"><Languages className="size-3" aria-hidden />{t("languages.label")}</p>
          {t("languages.translated")}
        </div>
        <Bubble from="hotel" time="22:10">{t("languages.reply")}</Bubble>
      </ChatApp>
    );
  }
  if (id === "ai") {
    return (
      <ChatApp subtitle={tp("online")} placeholder={tp("placeholder")} time="18:20">
        <DayChip>{tp("today")}</DayChip>
        <Bubble from="guest" time="18:19">{t("ai.q1")}</Bubble>
        <Bubble from="hotel" time="18:19">{t("ai.a1")}</Bubble>
        <Bubble from="guest" time="18:20">{t("ai.q")}</Bubble>
        <Bubble from="hotel" time="18:20">{t("ai.a")}</Bubble>
      </ChatApp>
    );
  }
  let body: React.ReactNode;
  switch (id) {
    case "whatsapp":
      body = (
        <>
          <Title>{t("whatsapp.title")}</Title>
          <div className="mx-4 mt-4 rounded-2xl bg-white/[0.05] p-4">
            <p className="flex items-center gap-1.5 text-[12px] text-[#3fb97a]"><span className="size-2 rounded-full bg-[#3fb97a]" />{t("whatsapp.connected")}</p>
            <div className="mt-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="size-11 rounded-full bg-[#05040c]" />
              <div><p className="text-[16px] font-semibold text-[#e9eef0]">StayLine</p><p className="font-mono text-[11.5px] text-[#a7bac1]">+90 242 000 00 00</p></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10.5px]">
              <span className="rounded-full bg-[#46bdb4]/15 px-2 py-0.5 text-[#5fd3c9]">{t("whatsapp.verified")}</span>
              <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[#a7bac1]">{t("whatsapp.quality")}</span>
            </div>
          </div>
          <div className="mx-4 mt-3 flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3 text-[12.5px] text-[#e9eef0]">
            {t("whatsapp.welcome")}<span className="flex h-5 w-9 justify-end rounded-full bg-[#2ba59c] p-0.5"><span className="block size-4 rounded-full bg-white" /></span>
          </div>
        </>
      );
      break;
    case "routing":
      body = (
        <>
          <Title>{t("routing.title")}</Title>
          <ul className="mt-3 space-y-2 px-4">
            {(t.raw("routing.items") as [string, string, string, string][]).map(([room, item, dept, state], i) => (
              <li key={room} className="rounded-xl bg-white/[0.05] px-3 py-2.5 text-[12px]">
                <div className="flex justify-between"><span className="font-semibold text-[#e9eef0]">{room} · {item}</span><span className={cn("text-[10.5px]", i === 0 ? "text-[#3fb97a]" : i === 1 ? "text-[#e9a95c]" : "text-[#a7bac1]")}>{state}</span></div>
                <span className="mt-1 inline-block rounded-full bg-[#46bdb4]/15 px-2 py-0.5 text-[10px] text-[#5fd3c9]">{dept}</span>
              </li>
            ))}
          </ul>
        </>
      );
      break;
    case "voice":
      body = (
        <>
          <Title>{t("voice.title")}</Title>
          <ul className="mt-3 space-y-2 px-4">
            {(t.raw("voice.calls") as [string, string, string][]).map(([room, dur, req], i) => (
              <li key={room + dur} className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-2.5 text-[12px]">
                <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", i === 0 ? "bg-[#46bdb4]/15 text-[#5fd3c9]" : "bg-white/[0.06] text-[#a7bac1]")}><PhoneIncoming className="size-4" aria-hidden /></span>
                <span className="min-w-0 flex-1"><span className="block font-semibold text-[#e9eef0]">{room} <span className="font-normal text-[#8aa0a8]">· {dur}</span></span><span className="text-[#a7bac1]">{req}</span></span>
              </li>
            ))}
          </ul>
        </>
      );
      break;
    case "guests":
      body = (
        <>
          <Title>{t("guests.title")}</Title>
          <div className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3">
            <FileSpreadsheet className="size-8 text-[#3fb97a]" aria-hidden />
            <div className="text-[12px]"><p className="font-semibold text-[#e9eef0]">{t("guests.file")}</p><p className="text-[#3fb97a]">{t("guests.ready")}</p><p className="text-[#e9a95c]">{t("guests.issues")}</p></div>
          </div>
          <ul className="mx-4 mt-3 divide-y divide-white/[0.06] rounded-2xl bg-white/[0.05] px-3 text-[12px]">
            {(t.raw("guests.rows") as [string, string, string][]).map(([nm, r, c]) => (
              <li key={nm} className="flex justify-between py-2.5"><span className="text-[#e9eef0]">{nm}</span><span className="text-[#8aa0a8]">{r} · {c}</span></li>
            ))}
          </ul>
        </>
      );
      break;
    case "reports":
      body = (
        <>
          <Title>{t("reports.title")}</Title>
          <p className="px-4 text-[11px] text-[#8aa0a8]">{t("reports.sub")}</p>
          <div className="mx-4 mt-4 space-y-3 rounded-2xl bg-white/[0.05] p-4">
            {(t.raw("reports.bars") as [string, number][]).map(([nm, v], i) => (
              <div key={nm} className="text-[11.5px]">
                <p className="text-[#a7bac1]">{nm}</p>
                <div className="mt-1 h-2 rounded-full bg-white/[0.06]"><motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className={cn("h-full rounded-full", i === 0 ? "bg-[#e9a95c]" : "bg-[#46bdb4]")} /></div>
              </div>
            ))}
            <p className="text-[10px] text-[#4a626c]">{t("reports.sample")}</p>
          </div>
        </>
      );
      break;
    default:
      body = (
        <>
          <Title>{t("platform.title")}</Title>
          <ul className="mx-4 mt-3 space-y-2">
            {(t.raw("platform.hotels") as string[]).map((h, i) => (
              <li key={h} className={cn("flex items-center justify-between rounded-xl px-3 py-2.5 text-[12.5px]", i === 0 ? "bg-[#46bdb4]/15 text-[#e9eef0]" : "bg-white/[0.05] text-[#a7bac1]")}>
                {h}{i === 0 ? <Check className="size-4 text-[#5fd3c9]" aria-hidden /> : null}
              </li>
            ))}
          </ul>
          <p className="mx-4 mt-4 flex items-center gap-1.5 text-[11px] text-[#8aa0a8]"><Users className="size-3.5" aria-hidden />{t("platform.rolesLabel")}</p>
          <div className="mx-4 mt-2 flex flex-wrap gap-1.5 text-[10.5px]">
            {(t.raw("platform.roles") as string[]).map((r) => <span key={r} className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[#a7bac1]">{r}</span>)}
          </div>
          <p className="mx-4 mt-4 flex items-center gap-1.5 text-[11px] text-[#3fb97a]"><ShieldCheck className="size-3.5" aria-hidden />{t("platform.secure")}</p>
        </>
      );
  }
  return (
    <div className="flex size-full flex-col bg-[#0a1922]">
      <StatusBar />
      {body}
    </div>
  );
}
