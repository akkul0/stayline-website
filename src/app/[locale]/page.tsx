import { setRequestLocale, getTranslations } from "next-intl/server";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  FeatureGrid,
  type FeatureItem,
} from "@/components/sections/feature-grid";
import { CtaBand } from "@/components/sections/cta-band";

const PILLARS: FeatureItem[] = [
  { key: "aiReplies", icon: "bot" },
  { key: "routing", icon: "route" },
  { key: "multilingual", icon: "globe" },
  { key: "analytics", icon: "chart" },
];

const OVERVIEW: FeatureItem[] = [
  { key: "aiReplies", icon: "bot" },
  { key: "routing", icon: "route" },
  { key: "multilingual", icon: "globe" },
  { key: "shifts", icon: "clock" },
  { key: "guests", icon: "users" },
  { key: "reports", icon: "dashboard" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero />

      {/* Pillars */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t("pillars.eyebrow")}
            title={t("pillars.title")}
            subtitle={t("pillars.subtitle")}
          />
          <div className="mt-14">
            <FeatureGrid namespace="home.pillars" items={PILLARS} columns={4} />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-border-subtle bg-surface-2/40 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t("how.eyebrow")}
            title={t("how.title")}
            subtitle={t("how.subtitle")}
          />
          <div className="mt-14">
            <HowItWorks />
          </div>
        </Container>
      </section>

      {/* Features overview */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t("featuresOverview.eyebrow")}
            title={t("featuresOverview.title")}
            subtitle={t("featuresOverview.subtitle")}
          />
          <div className="mt-14">
            <FeatureGrid namespace="features.items" items={OVERVIEW} columns={3} />
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/features"
              className={buttonVariants({ variant: "outline" })}
            >
              {t("featuresOverview.cta")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Built on */}
      <section className="border-y border-border-subtle bg-surface-2/40 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t("builtOn.eyebrow")}
            title={t("builtOn.title")}
            subtitle={t("builtOn.subtitle")}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border-subtle bg-surface-1 p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-brand">
                  <MessageCircle className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-strong">
                  {t("builtOn.whatsapp.title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {t("builtOn.whatsapp.body")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-border-subtle bg-surface-1 p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-brand">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-strong">
                  {t("builtOn.claude.title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {t("builtOn.claude.body")}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
