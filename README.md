# StayLine — Marketing Website

Public marketing site for **StayLine** (hotel WhatsApp guest-management platform) at
[stayline.net](https://stayline.net). Separate from the product/admin app.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
  Framer Motion · next-intl (TR/EN) · next-themes (light/dark)
- **Pages:** `/`, `/features`, `/contact`, `/faq`, `/privacy`, `/terms`, `/data-deletion`
- **Languages:** Turkish (default, unprefixed URLs) + English (`/en/...`)

## Develop

> This machine needs `NODE_OPTIONS=--use-system-ca` for every node/pnpm/next command
> (corporate TLS). The project path contains a space — always quote it.

```powershell
cd "C:\Users\Baran Ayhan\.claude\StayLine Website"
$env:NODE_OPTIONS = "--use-system-ca"
pnpm install
pnpm dev        # http://localhost:3002
```

```powershell
$env:NODE_OPTIONS = "--use-system-ca"; pnpm build   # production build + type check
$env:NODE_OPTIONS = "--use-system-ca"; pnpm lint
```

## Clean legal URLs (Meta WhatsApp review)

Legal pages resolve at the apex with **no locale prefix** for the default (TR) locale:

- `stayline.net/privacy` · `stayline.net/terms` · `stayline.net/data-deletion`

English equivalents live at `stayline.net/en/privacy`, etc. Both are stable and crawlable.
This is driven by next-intl `localePrefix: 'as-needed'` in `src/i18n/routing.ts` and the
rewrite layer in `src/proxy.ts` (Next 16's renamed middleware convention) — do not exclude
these paths from the proxy matcher.

## Logo

The real logo is not ready yet. A single swappable placeholder lives in
[`src/components/logo.tsx`](src/components/logo.tsx). Replace `PlaceholderMark` there and the
whole site updates.

## Deploy (Railway)

This is a Next.js **SSR** app: the next-intl middleware in [`src/proxy.ts`](src/proxy.ts)
rewrites the clean legal URLs (`/privacy`, `/terms`, `/data-deletion`), so it needs a
**persistent Node.js process** — NOT static hosting and NOT `output: 'export'`. Railway runs
exactly that.

- Railway dashboard → **New Project** → *Deploy from GitHub repo* → pick this repo. Railpack
  auto-detects Next.js and pnpm (build `pnpm build`, start `pnpm start`).
- Set variables **before the first build**: `NEXT_PUBLIC_SITE_URL=https://stayline.net` (it is
  inlined into the bundle at build time, so changing it later requires a rebuild) and
  `NODE_ENV=production` (the CSP only drops dev-only `unsafe-eval`/`ws:` in production).
- Do **not** hardcode a port — `next start` binds Railway's injected `$PORT`. The local
  `-p 3002` only lives in the `dev` script.
- Settings → **Networking** → Custom Domain → add `stayline.net` and `www.stayline.net`;
  Railway issues Let's Encrypt certs automatically once DNS resolves.
- Every push to the chosen branch auto-rebuilds.

DNS: point `stayline.net` + `www` at the CNAME target Railway shows for each domain (use an
ALIAS/ANAME record at the apex if your DNS provider supports it). Build needs ~2 GB RAM — the
default Railway builder is fine.

**Critical:** never serve `/privacy` `/terms` `/data-deletion` as static files or via an Nginx
`try_files` rule — they must reach Node so the middleware rewrite runs, or they 404.

## Deploy (Vercel — alternative)

- Framework auto-detected (Next.js). Build: `next build`. Env: `NEXT_PUBLIC_SITE_URL=https://stayline.net`.
- Do **not** set `NODE_OPTIONS` in Vercel — that's a local-only TLS workaround.
- Point `stayline.net` (apex) + redirect `www` → apex.
- Note: the privacy policy lists **Railway** as the hosting sub-processor — if you host
  elsewhere, update that disclosure in `src/messages/{tr,en}.json`.

## Before publishing

Legal placeholders in `src/messages/{tr,en}.json` are filled:
operator **İsmail Akkul (Red X Eight)**, hosting **Railway (deploy in the EU region — `europe-west4`, Amsterdam)**, jurisdiction **Antalya, Türkiye**. Keep the effective dates (`lastUpdated`) current when the legal text changes.
