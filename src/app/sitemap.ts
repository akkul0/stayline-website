import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

const ROUTES = [
  "/",
  "/features",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/kvkk",
  "/cookies",
  "/data-deletion",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: SITE_URL + getPathname({ href, locale }),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            SITE_URL + getPathname({ href, locale: l }),
          ]),
        ),
      },
    })),
  );
}
