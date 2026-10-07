import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Info } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Capabilities } from "@/components/home/capabilities";
import { BookingBand } from "@/components/home/booking-band";


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

  return (
    <>
      <section className="pt-16 sm:pt-24">
        <Container>
          <h1 className="max-w-3xl font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-text-strong">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-text-body">{t("hero.subtitle")}</p>
        </Container>
      </section>
      <Capabilities showHeading={false} />
      <Container className="pb-20">
        <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-2 p-4 text-sm text-text-dim">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>{t("note")}</p>
        </div>
      </Container>
      <BookingBand />
    </>
  );
}
