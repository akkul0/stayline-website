"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

// Ekranın altında kaybolmayan randevu düğmesi: hero'dan sonra belirir,
// randevu bandına ve alt bilgiye gelince çekilir.
export function FloatingCta() {
  const t = useTranslations("nav");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const band = document.querySelector("[data-booking-band]");
      const nearEnd = band ? band.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-5 z-40 flex justify-center transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <Link
        href="/demo"
        tabIndex={show ? 0 : -1}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#061219]/80 py-2 pl-5 pr-2 text-[14px] font-medium text-[#e6eef0] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:bg-[#0a1922]/90"
      >
        {t("cta")}
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-400 text-[#061219]">
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </Link>
    </div>
  );
}
