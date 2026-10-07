"use client";

import type { ReactNode } from "react";
import { ChevronLeft, Video, Phone, Smile, Paperclip, Camera, Mic, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/* Gerçekçi bir mesajlaşma ekranının parçaları (StayLine'ın kendi tasarımı).
   Misafirin kendi telefonundan bakılır: misafir sağda, StayLine solda. */

export function StatusBar({ time = "21:47", light = false }: { time?: string; light?: boolean }) {
  return (
    <div className={cn("relative z-10 flex h-[46px] shrink-0 items-end justify-between px-7 pb-1.5 text-[13px] font-semibold", light ? "text-white" : "text-[#e9eef0]")}>
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5" aria-hidden>
        <span className="flex items-end gap-[2px]">{[4, 6, 8, 10].map((h) => <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />)}</span>
        <svg viewBox="0 0 16 12" className="h-[10px] w-[14px]" fill="currentColor"><path d="M8 11.5 5.6 8.9a3.4 3.4 0 0 1 4.8 0L8 11.5Zm-4-4.2L2.3 5.6a8 8 0 0 1 11.4 0L12 7.3a5.6 5.6 0 0 0-8 0Z" /></svg>
        <span className="flex h-[11px] w-[23px] items-center rounded-[3.5px] border border-current/60 p-[1.5px]"><span className="h-full w-[78%] rounded-[1.5px] bg-current" /></span>
      </span>
    </div>
  );
}

export function ChatHeader({ subtitle }: { subtitle: string }) {
  return (
    <div className="relative z-10 flex shrink-0 items-center gap-2 border-b border-white/[0.05] bg-[#101c22] px-2 pb-2 pt-1">
      <ChevronLeft className="size-6 text-[#5fd3c9]" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" className="size-[34px] rounded-full bg-[#05040c] object-cover" />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="flex items-center gap-1 text-[14.5px] font-semibold text-[#e9eef0]">
          StayLine
          <span className="flex size-[14px] items-center justify-center rounded-full bg-[#46bdb4]"><Check className="size-2.5 text-[#061219]" strokeWidth={3.5} aria-hidden /></span>
        </p>
        <p className="truncate text-[11.5px] text-[#8aa0a8]">{subtitle}</p>
      </div>
      <Video className="mr-3 size-[21px] text-[#5fd3c9]" aria-hidden />
      <Phone className="mr-1.5 size-[19px] text-[#5fd3c9]" aria-hidden />
    </div>
  );
}

// StayLine'ın kendi sohbet deseni: küçük anahtar, zil ve dalga motifleri
const PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%2346bdb4' stroke-opacity='0.07' stroke-width='1.4' stroke-linecap='round'%3E%3Ccircle cx='22' cy='22' r='6'/%3E%3Cpath d='M28 22h14m-4 0v5m-5-5v3'/%3E%3Cpath d='M78 30a10 10 0 0 1 20 0v4H78z'/%3E%3Cpath d='M76 34h24m-12-14v-3'/%3E%3Cpath d='M14 84q8-8 16 0t16 0'/%3E%3Cpath d='M70 92l6-10 6 10m-12 0h12'/%3E%3Ccircle cx='100' cy='88' r='3'/%3E%3C/g%3E%3C/svg%3E\")";

export function ChatBody({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col justify-end gap-[5px] overflow-hidden bg-[#0b1419] px-2.5 pb-2 pt-3" style={{ backgroundImage: PATTERN }}>
      {children}
    </div>
  );
}

export function DayChip({ children }: { children: ReactNode }) {
  return <p className="mx-auto mb-1.5 w-fit rounded-md bg-[#17252c] px-2.5 py-1 text-[11px] text-[#9fb2b9] shadow-sm">{children}</p>;
}

export function Bubble({ from, time, tail = true, read = true, children }: { from: "guest" | "hotel"; time: string; tail?: boolean; read?: boolean; children: ReactNode }) {
  const me = from === "guest";
  return (
    <div className={cn("flex", me ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative max-w-[82%] px-2.5 pb-[5px] pt-[6px] text-[13.5px] leading-[1.32] text-[#e9eef0] shadow-[0_1px_0.5px_rgba(0,0,0,0.25)]",
          me ? "bg-[#0e5650]" : "bg-[#1b2a31]",
          tail ? (me ? "rounded-[10px] rounded-tr-[3px]" : "rounded-[10px] rounded-tl-[3px]") : "rounded-[10px]",
        )}
      >
        {tail ? (
          <span aria-hidden className={cn("absolute top-0 size-2.5", me ? "-right-[7px] bg-[#0e5650] [clip-path:polygon(0_0,100%_0,0_100%)]" : "-left-[7px] bg-[#1b2a31] [clip-path:polygon(0_0,100%_0,100%_100%)]")} />
        ) : null}
        <span>{children}</span>
        <span className="float-right ml-2 mt-[5px] flex translate-y-[3px] items-center gap-[3px] text-[10.5px] text-[#93a9b0]">
          {time}
          {me ? (read ? <CheckCheck className="size-[15px] text-[#5fd3c9]" aria-hidden /> : <Check className="size-[14px]" aria-hidden />) : null}
        </span>
      </div>
    </div>
  );
}

export function Typing() {
  return (
    <div className="flex justify-start" aria-hidden>
      <div className="relative flex gap-1 rounded-[10px] rounded-tl-[3px] bg-[#1b2a31] px-3 py-3">
        <span aria-hidden className="absolute -left-[7px] top-0 size-2.5 bg-[#1b2a31] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        {[0, 1, 2].map((d) => <span key={d} className="size-[7px] animate-bounce rounded-full bg-[#8aa0a8]" style={{ animationDelay: `${d * 150}ms` }} />)}
      </div>
    </div>
  );
}

export function InputBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative z-10 flex shrink-0 items-center gap-1.5 bg-[#101c22] px-2 pb-7 pt-2" aria-hidden>
      <div className="flex h-[38px] flex-1 items-center gap-2 rounded-full bg-[#1b2a31] px-3 text-[#8aa0a8]">
        <Smile className="size-[19px]" />
        <span className="flex-1 text-[14px] text-[#6f858d]">{placeholder}</span>
        <Paperclip className="size-[18px] -rotate-45" />
        <Camera className="size-[19px]" />
      </div>
      <span className="flex size-[38px] items-center justify-center rounded-full bg-[#2ba59c] text-[#061219]"><Mic className="size-[19px]" /></span>
    </div>
  );
}

export function ChatApp({ subtitle, placeholder, children, time }: { subtitle: string; placeholder: string; children: ReactNode; time?: string }) {
  return (
    <div className="flex size-full flex-col bg-[#101c22]">
      <StatusBar time={time} />
      <ChatHeader subtitle={subtitle} />
      <ChatBody>{children}</ChatBody>
      <InputBar placeholder={placeholder} />
    </div>
  );
}
