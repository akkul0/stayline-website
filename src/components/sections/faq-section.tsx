import { useTranslations } from "next-intl";
import { Accordion, type QA } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

/** Renders an accordion from a translation namespace that exposes an `items` array. */
export function FaqSection({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as QA[];

  return (
    <Reveal className="mx-auto max-w-3xl">
      <Accordion items={items} />
    </Reveal>
  );
}
