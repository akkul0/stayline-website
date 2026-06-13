"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname(); // locale-stripped path, e.g. "/privacy"
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const active = (params.locale as string) ?? routing.defaultLocale;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border-subtle p-0.5 text-xs font-medium",
        className,
      )}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === active;
        return (
          <button
            key={loc}
            type="button"
            disabled={isPending}
            aria-current={isActive ? "true" : undefined}
            onClick={() =>
              startTransition(() => {
                // Same path, switch locale — `as-needed` re-applies the right prefix.
                router.replace(pathname, { locale: loc });
              })
            }
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors",
              isActive
                ? "bg-surface-3 text-text-strong"
                : "text-text-dim hover:text-text-strong",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
