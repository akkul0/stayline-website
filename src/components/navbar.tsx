"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="StayLine"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.filter(({ key }) => key !== "demo").map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  isActive
                    ? "text-text-strong"
                    : "text-text-body hover:text-text-strong",
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href="/demo" className={buttonVariants({ size: "sm" })}>
            {t("cta")}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-body hover:bg-surface-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-border-subtle bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-body hover:bg-surface-2 hover:text-text-strong"
              >
                {t(key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between">
              <LocaleSwitcher />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={buttonVariants({ size: "sm" })}
              >
                {t("cta")}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
