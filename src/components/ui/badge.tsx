import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small pill used for eyebrows / section labels. */
export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1 text-xs font-medium text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}
