import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight text-text-strong sm:text-4xl",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-text-body">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
