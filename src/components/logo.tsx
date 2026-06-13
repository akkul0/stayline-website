import { cn } from "@/lib/cn";

/**
 * PLACEHOLDER brand mark — a rounded teal tile with a chat-bubble glyph (a nod to
 * WhatsApp messaging). Inline SVG so it needs no network request and adapts to the
 * theme via CSS variables.
 *
 * ── SWAP POINT ──────────────────────────────────────────────────────────────
 * When the real logo is ready, replace ONLY the body of this component (or point
 * it at `/logo/stayline-mark.svg`). Every Navbar / Footer / etc. usage updates at
 * once because they all render <Logo/>.
 */
function PlaceholderMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      role="img"
      aria-label="StayLine"
    >
      <defs>
        <linearGradient id="sl-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-300)" />
          <stop offset="1" stopColor="var(--brand-600)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#sl-mark)" />
      <path
        d="M10 13.4a6 6 0 1 1 2.7 5l-2.9.8.8-2.8a6 6 0 0 1-.6-3Z"
        fill="var(--on-accent)"
        opacity="0.95"
      />
    </svg>
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
      <PlaceholderMark className={markClassName} />
      {withWordmark && (
        <span className="text-lg tracking-tight text-text-strong">
          Stay<span className="text-brand">Line</span>
        </span>
      )}
    </span>
  );
}
