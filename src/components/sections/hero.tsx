"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Bot, BellRing, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/sections/aurora-background";

export function Hero() {
  const t = useTranslations("home.hero");
  const p = useTranslations("home.preview");

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground />
      <Container className="pb-16 pt-20 text-center sm:pt-28">
        <FadeIn>
          <Badge>{t("eyebrow")}</Badge>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-text-strong sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-text-body">
            {t("subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              {t("ctaPrimary")}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/features"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-sm text-text-dim">{t("trust")}</p>
        </FadeIn>

        {/* Product preview */}
        <Reveal delay={0.1} className="mt-16">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 shadow-lg">
            <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
              <span className="size-3 rounded-full bg-err/70" />
              <span className="size-3 rounded-full bg-warn/70" />
              <span className="size-3 rounded-full bg-ok/70" />
              <span className="ml-3 text-xs text-text-dim">
                app.stayline.net
              </span>
            </div>
            <div className="grid gap-px bg-border-subtle sm:grid-cols-2">
              {/* WhatsApp-style conversation */}
              <div className="bg-surface-1 p-5 text-left">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium text-text-dim">
                  <span className="size-2 rounded-full bg-ok" />
                  {p("online")}
                </div>
                <div className="space-y-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-3 px-4 py-2.5 text-sm text-text-strong">
                    {p("guestMsg")}
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-sm text-on-accent">
                    <span className="mb-1 flex items-center gap-1.5 text-xs opacity-90">
                      <Bot className="size-3.5" /> {p("aiLabel")}
                    </span>
                    {p("aiReply")}
                  </div>
                </div>
              </div>

              {/* Order Taker routing card */}
              <div className="flex flex-col justify-center gap-3 bg-surface-2 p-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-faint">
                  <BellRing className="size-4 text-brand" />
                  {p("orderTitle")}
                </div>
                <div className="rounded-xl border border-border-subtle bg-surface-1 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-text-strong">
                      {p("orderDept")}
                    </span>
                    <span className="rounded-full bg-warn/15 px-2 py-0.5 text-xs font-medium text-warn">
                      {p("orderUrgency")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-body">{p("orderMeta")}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-ok">
                    <Check className="size-3.5" /> {p("orderSent")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
