import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand() {
  const t = useTranslations("home.cta");

  return (
    <Container className="py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-accent-border bg-accent-soft px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, var(--brand-400), transparent 60%)",
            }}
          />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-text-body">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              {t("button")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
