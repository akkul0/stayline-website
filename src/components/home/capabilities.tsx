"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Waveform } from "@/components/home/waveform";
import { cn } from "@/lib/cn";

interface Item { id: string; title: string; lead: string; body: string; points: string[] }

// Modül fotoğrafları (Higgsfield ile üretildi, /public/images)
const PHOTOS: Record<string, { src: string; srcSet: string }> = {
  whatsapp: { src: "/images/guest-600.webp", srcSet: "/images/guest-600.webp 600w, /images/guest-900.webp 900w" },
  routing: { src: "/images/housekeeping-600.webp", srcSet: "/images/housekeeping-600.webp 600w, /images/housekeeping-900.webp 900w" },
  voice: { src: "/images/call-600.webp", srcSet: "/images/call-600.webp 600w, /images/call-900.webp 900w" },
  reports: { src: "/images/manager-600.webp", srcSet: "/images/manager-600.webp 600w, /images/manager-900.webp 900w" },
};

// StayLine'ın yaptığı her şey: solda kaydırdıkça ilerleyen içindekiler,
// sağda her modülün ayrıntılı anlatımı.
export function Capabilities({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations("home.capabilities");
  const items = t.raw("items") as Item[];
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("modul-", ""));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(`modul-${it.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <section id="isler" aria-labelledby={showHeading ? "cap-title" : undefined} className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        {showHeading ? (
          <div className="max-w-2xl">
            <h2 id="cap-title" className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold leading-[1] tracking-[-0.035em] text-text-strong">
              {t("title")}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-text-body">{t("subtitle")}</p>
          </div>
        ) : null}

        <div className={cn("grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20", showHeading && "mt-16")}>
          <nav aria-label={t("nav")} className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-border-subtle">
              {items.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#modul-${it.id}`}
                    aria-current={active === it.id ? "true" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-[13.5px] leading-snug transition-colors",
                      active === it.id ? "border-brand text-text-strong" : "border-transparent text-text-dim hover:text-text-body",
                    )}
                  >
                    {it.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="divide-y divide-border-subtle">
            {items.map((it, idx) => {
              const photo = PHOTOS[it.id];
              return (
                <article key={it.id} id={`modul-${it.id}`} className="scroll-mt-28 py-14 first:pt-0 last:pb-0">
                  <div className={cn("grid items-start gap-10", photo || it.id === "voice" ? "xl:grid-cols-[1fr_320px]" : "")}>
                    <div className={cn(photo && idx % 2 === 1 ? "xl:order-2" : "")}>
                      <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-text-strong">
                        {it.title}
                      </h3>
                      <p className="mt-4 max-w-[38rem] text-[18px] leading-relaxed text-text-strong/90">{it.lead}</p>
                      <p className="mt-3 max-w-[38rem] text-[15.5px] leading-relaxed text-text-body">{it.body}</p>
                      <ul className="mt-6 grid max-w-[38rem] gap-x-6 gap-y-2.5 sm:grid-cols-2">
                        {it.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-text-body">
                            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {photo ? (
                      <figure className={cn("relative overflow-hidden rounded-[20px] border border-border-subtle", idx % 2 === 1 ? "xl:order-1" : "")}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width: 1280px) 320px, 100vw" alt="" loading="lazy" className="aspect-[3/4] w-full object-cover max-xl:aspect-[16/10]" />
                        {it.id === "voice" ? (
                          <div className="absolute inset-x-3 bottom-3 rounded-xl bg-[#061219]/75 p-3 backdrop-blur-md">
                            <Waveform className="h-12 w-full text-brand-300" />
                          </div>
                        ) : null}
                      </figure>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
