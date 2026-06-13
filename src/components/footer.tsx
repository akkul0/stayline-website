import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, LEGAL_LINKS, CONTACT_EMAIL } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-1">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-text-dim">
              {tf("tagline")}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-faint">
              {tf("product")}
            </h3>
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="text-sm text-text-body transition-colors hover:text-text-strong"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-faint">
              {tf("legal")}
            </h3>
            {LEGAL_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="text-sm text-text-body transition-colors hover:text-text-strong"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 text-xs text-text-dim sm:flex-row sm:items-center">
          <p>
            © {year} {tf("rights")}
          </p>
          <p>{tf("builtOn")}</p>
        </div>
      </Container>
    </footer>
  );
}
