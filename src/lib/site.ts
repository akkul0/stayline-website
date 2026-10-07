/** Brand + contact constants. Single source of truth for non-translatable bits. */
export const SITE_NAME = "StayLine";
export const CONTACT_EMAIL = "info@stayline.net";

/** StayLine API (demo randevuları). Vercel'de NEXT_PUBLIC_STAYLINE_API_URL ile değiştirilebilir. */
export const API_URL = (
  process.env.NEXT_PUBLIC_STAYLINE_API_URL ?? "https://guestflow-production.up.railway.app/api/v1"
).replace(/\/+$/, "");

/** Primary navigation (labels come from the `nav` message namespace). */
export const NAV_LINKS = [
  { key: "features", href: "/features" },
  { key: "demo", href: "/demo" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

/** Legal links rendered in the footer (labels from the `nav` namespace). */
export const LEGAL_LINKS = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "kvkk", href: "/kvkk" },
  { key: "cookies", href: "/cookies" },
  { key: "dataDeletion", href: "/data-deletion" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
export type LegalLink = (typeof LEGAL_LINKS)[number];
