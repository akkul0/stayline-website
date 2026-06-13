import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Bot,
  Share2,
  Languages,
  Clock,
  Users,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Check,
  Info,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";

const ITEMS = [
  { key: "aiReplies", Icon: Bot },
  { key: "routing", Icon: Share2 },
  { key: "multilingual", Icon: Languages },
  { key: "shifts", Icon: Clock },
  { key: "guests", Icon: Users },
  { key: "reports", Icon: LayoutDashboard },
  { key: "templates", Icon: MessageSquareText },
  { key: "security", Icon: ShieldCheck },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/features", ns: "features" });
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("features");
  const ti = await getTranslations("features.items");

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
          />

          <div className="mt-16 space-y-5">
            {ITEMS.map(({ key, Icon }) => {
              const bullets = ti.raw(`${key}.bullets`) as string[];
              return (
                <Reveal key={key}>
                  <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-brand">
                        <Icon className="size-6" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-text-strong">
                          {ti(`${key}.title`)}
                        </h2>
                        <p className="mt-2 leading-relaxed text-text-body">
                          {ti(`${key}.body`)}
                        </p>
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {bullets.map((b, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-text-body"
                            >
                              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8">
            <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-2 p-4 text-sm text-text-dim">
              <Info className="mt-0.5 size-4 shrink-0" />
              <p>{t("note")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
