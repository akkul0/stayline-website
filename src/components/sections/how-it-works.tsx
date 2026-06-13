"use client";

import { useTranslations } from "next-intl";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

type Step = { title: string; body: string };

export function HowItWorks() {
  const t = useTranslations("home.how");
  const steps = t.raw("steps") as Step[];

  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <StaggerItem key={i} className="relative">
          <div className="flex size-10 items-center justify-center rounded-full border border-accent-border bg-accent-soft font-mono text-sm font-semibold text-brand">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-4 text-base font-semibold text-text-strong">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-body">
            {step.body}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
