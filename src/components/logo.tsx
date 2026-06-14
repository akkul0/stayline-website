import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Brand mark — the StayLine "S" monogram (blue→purple gradient on a dark tile).
 * Lives at `public/logo.png`. Rendered as a rounded app-icon tile so it reads
 * cleanly on both the light and dark navbar backgrounds.
 *
 * ── SWAP POINT ──────────────────────────────────────────────────────────────
 * To change the logo, replace `public/logo.png` (square) — every Navbar / Footer
 * usage updates at once because they all render <Logo/>.
 */
function BrandMark({ className, alt }: { className?: string; alt: string }) {
  return (
    <Image
      src="/logo.png"
      width={32}
      height={32}
      alt={alt}
      priority
      className={cn("size-8 shrink-0 rounded-lg", className)}
    />
  );
}

export function Logo({
  withWordmark = true,
  className,
  markClassName,
}: {
  withWordmark?: boolean;
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 font-semibold", className)}
    >
      <BrandMark className={markClassName} alt={withWordmark ? "" : "StayLine"} />
      {withWordmark && (
        <span className="text-lg tracking-tight text-text-strong">
          Stay<span className="text-brand">Line</span>
        </span>
      )}
    </span>
  );
}
