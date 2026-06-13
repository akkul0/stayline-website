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

## Deploy (Hostinger)

This is a Next.js **SSR** app: the next-intl middleware in [`src/proxy.ts`](src/proxy.ts)
rewrites the clean legal URLs (`/privacy`, `/terms`, `/data-deletion`), so it needs a
**persistent Node.js process** — NOT static hosting and NOT `output: 'export'`. Two supported
Hostinger paths:

**A. hPanel Managed Node.js (Business / Cloud plans — no VPS needed):**
- hPanel → your website → **Node.js** (or the **Next.js** app option). Deploy from a GitHub
  repo (or upload). Hostinger runs build + start and reverse-proxies it.
- Set build env `NEXT_PUBLIC_SITE_URL=https://stayline.net` **before the build** (it is inlined
  into the bundle at build time) and `NODE_ENV=production` (the CSP only drops dev-only
  `unsafe-eval`/`ws:` in production).
- Start command: `next start` — let the platform inject `$PORT`; do **not** hardcode `-p 3002`
  on managed hosting.
- Caps (Business): ~3 GB RAM, 2 vCPU, no root/SSH process control. Fine for this low-traffic site.

**B. VPS + Dokploy (one-click git-push deploy, auto Let's Encrypt SSL — fallback / full control):**
- Buy a KVM VPS (Frankfurt/Germany) and pick the **Dokploy** template at checkout.
- Dokploy dashboard → new Project → app → connect the repo. Nixpacks auto-detects Next.js.
- Build-time env: `NEXT_PUBLIC_SITE_URL=https://stayline.net`, `NODE_ENV=production`.
  Container port **3002** (matches `pnpm start`). Add `stayline.net` + toggle HTTPS.
- Every push to the chosen branch auto-rebuilds.

DNS: point `stayline.net` (A record) + `www` to the host IP; enable HTTPS only **after** DNS
resolves. Build needs ~2 GB RAM — add swap on a small VPS.

**Critical:** never serve `/privacy` `/terms` `/data-deletion` as static files or via an Nginx
`try_files` rule — they must reach Node so the middleware rewrite runs, or they 404.

## Deploy (Vercel — alternative)

- Framework auto-detected (Next.js). Build: `next build`. Env: `NEXT_PUBLIC_SITE_URL=https://stayline.net`.
- Do **not** set `NODE_OPTIONS` in Vercel — that's a local-only TLS workaround.
- Point `stayline.net` (apex) + redirect `www` → apex.
- Note: the privacy policy lists **Hostinger** as the hosting sub-processor — if you host
  elsewhere, update that disclosure in `src/messages/{tr,en}.json`.

## Before publishing

Legal placeholders in `src/messages/{tr,en}.json` are filled:
operator **İsmail Akkul (Red X Eight)**, hosting **Hostinger (Europe — Germany)**, jurisdiction **Antalya, Türkiye**. Keep the effective dates (`lastUpdated`) current when the legal text changes.
