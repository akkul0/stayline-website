"use client";

import { useTranslations } from "next-intl";
import {
  Bot,
  Share2,
  Languages,
  LineChart,
  Clock,
  Users,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FeatureCard } from "@/components/sections/feature-card";
import { cn } from "@/lib/cn";

export const FEATURE_ICONS = {
  bot: Bot,
  route: Share2,
  globe: Languages,
  chart: LineChart,
  clock: Clock,
  users: Users,
  dashboard: LayoutDashboard,
  template: MessageSquareText,
  shield: ShieldCheck,
} as const;

export type FeatureIcon = keyof typeof FEATURE_ICONS;

export type FeatureItem = { key: string; icon: FeatureIcon };

/**
 * Translated feature grid. `items` carries only serializable data (string keys +
 * icon names) so it can be passed from a Server Component.
 */
const COLUMN_CLASS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function FeatureGrid({
  namespace,
  items,
  columns = 3,
}: {
  namespace: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
}) {
  const t = useTranslations(namespace);

  return (
    <Stagger className={cn("grid gap-5", COLUMN_CLASS[columns])}>
      {items.map(({ key, icon }) => {
        const Icon = FEATURE_ICONS[icon];
        return (
          <StaggerItem key={key} className="h-full">
            <FeatureCard
              icon={<Icon className="size-5" />}
              title={t(`${key}.title`)}
              body={t(`${key}.body`)}
            />
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
