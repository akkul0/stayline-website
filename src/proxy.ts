// Next 16 renamed the `middleware.ts` file convention to `proxy.ts` — same
// behavior, new name. next-intl's createMiddleware works unchanged here.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on every path EXCEPT Next internals, API routes, and anything with a file
  // extension (static assets, OG images, sitemap.xml, robots.txt).
  //
  // IMPORTANT: /privacy, /terms, /data-deletion DO match here. The proxy
  // rewrites them internally to the default-locale segment while keeping the URL
  // unprefixed. Do NOT exclude them from the matcher — that would 404 them.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
