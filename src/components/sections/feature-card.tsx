"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function FeatureCard({
  icon,
  title,
  body,
  className,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "h-full rounded-2xl border border-border-subtle bg-surface-1 p-6 shadow-sm transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-brand">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-text-strong">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-body">{body}</p>
    </motion.div>
  );
}
