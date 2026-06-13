import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { LegalContent } from "@/components/sections/legal-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/privacy", ns: "privacy" });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <LegalContent namespace="legal.privacy" />
      </Container>
    </section>
  );
}
