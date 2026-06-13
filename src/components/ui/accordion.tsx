"use client";

import { Accordion as RA } from "radix-ui";
import { ChevronDown } from "lucide-react";

export type QA = { q: string; a: string };

export function Accordion({ items }: { items: QA[] }) {
  return (
    <RA.Root
      type="single"
      collapsible
      className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-surface-1"
    >
      {items.map((item, i) => (
        <RA.Item key={i} value={`item-${i}`} className="px-5 sm:px-6">
          <RA.Header className="flex">
            <RA.Trigger className="group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-medium text-text-strong outline-none transition-colors hover:text-brand focus-visible:text-brand">
              {item.q}
              <ChevronDown className="size-5 shrink-0 text-text-dim transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </RA.Trigger>
          </RA.Header>
          <RA.Content className="overflow-hidden data-[state=closed]:animate-[sl-acc-up_180ms_ease] data-[state=open]:animate-[sl-acc-down_220ms_ease]">
            <p className="pb-5 pr-6 text-sm leading-relaxed text-text-body">
              {item.a}
            </p>
          </RA.Content>
        </RA.Item>
      ))}
    </RA.Root>
  );
}
