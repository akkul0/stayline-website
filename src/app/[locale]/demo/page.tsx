import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { BookingWidget } from "@/components/demo/booking-widget";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/demo", ns: "demo" });
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demo");
  const expect = t.raw("expect") as string[];
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-text-strong">{t("title")}</h1>
          <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-text-body">{t("subtitle")}</p>
          <ul className="mt-8 space-y-3">
            {expect.map((e) => (
              <li key={e} className="flex items-start gap-2.5 text-[14.5px] text-text-body">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {e}
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/reception-900.webp" alt="" loading="lazy" className="mt-10 hidden aspect-[16/10] w-full rounded-[20px] border border-border-subtle object-cover lg:block" />
        </div>
        <BookingWidget />
      </Container>
    </section>
  );
}
