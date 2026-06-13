import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. They auto-add/strip the `/en` prefix per
// `localePrefix: 'as-needed'`. ALWAYS import Link / usePathname / useRouter /
// redirect / getPathname from here — never from `next/link` or `next/navigation`
// in localized UI, or the prefix logic breaks.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
