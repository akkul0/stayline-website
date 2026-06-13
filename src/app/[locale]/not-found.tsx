import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <p className="font-mono text-sm font-semibold text-brand">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-text-body">{t("body")}</p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className={buttonVariants()}>
            {t("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
