import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Absolute site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL in prod. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stayline.net"
).replace(/\/$/, "");

/**
 * hreflang alternates for a route across all locales, plus x-default.
 * Respects `localePrefix: 'as-needed'` via getPathname — never emits `/tr/...`.
 */
export function buildAlternates(href: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = SITE_URL + getPathname({ href, locale });
  }
  languages["x-default"] =
    SITE_URL + getPathname({ href, locale: routing.defaultLocale });
  return languages;
}

/** Absolute canonical URL for a route in a given locale. */
export function canonicalUrl(href: string, locale: string): string {
  return SITE_URL + getPathname({ href, locale });
}

/**
 * Standard per-page metadata: title (+ template from layout), description,
 * canonical, hreflang alternates and Open Graph. `ns` is the key under `meta`.
 */
export async function buildPageMetadata({
  locale,
  href,
  ns,
}: {
  locale: string;
  href: string;
  ns: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${ns}` });
  const canonical = canonicalUrl(href, locale);
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: { canonical, languages: buildAlternates(href) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "StayLine",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [{ url: `/og/og-${locale}.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
