import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"] as const,
  // Turkish is the primary audience AND the locale whose URLs stay unprefixed.
  defaultLocale: "tr",
  // TR (default) → no prefix:  /privacy, /features
  // EN (secondary) → prefixed: /en/privacy, /en/features
  // This keeps stayline.net/privacy and /data-deletion stable for Meta WhatsApp review.
  localePrefix: "as-needed",
  // Public marketing site: don't auto-redirect by Accept-Language. The clean,
  // canonical URLs must render stable content for crawlers and Meta's reviewer.
  // Visitors switch language explicitly via the language switcher.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
