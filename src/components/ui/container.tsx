import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Centered max-width wrapper with responsive horizontal padding. */
export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <As className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </As>
  );
}
