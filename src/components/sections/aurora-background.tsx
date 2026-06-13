"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Soft, restrained "aurora" — a few blurred teal blobs behind the hero.
 * Drifts slowly; frozen entirely when the user prefers reduced motion.
 */
export function AuroraBackground({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute -left-[10%] -top-[20%] size-[42rem] rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--brand-400), transparent 60%)",
          animation: reduce ? undefined : "sl-aurora 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[5%] top-[10%] size-[34rem] rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--brand-600), transparent 60%)",
          animation: reduce
            ? undefined
            : "sl-aurora 20s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] size-[30rem] rounded-full opacity-30 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--brand-300), transparent 60%)",
          animation: reduce ? undefined : "sl-aurora 24s ease-in-out infinite",
        }}
      />
    </div>
  );
}
