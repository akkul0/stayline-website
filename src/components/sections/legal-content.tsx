import { useTranslations } from "next-intl";

type Section = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

/**
 * Renders a legal document from a translation namespace exposing:
 *   { title, lastUpdated, intro: string[], sections: Section[] }
 */
export function LegalContent({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const intro = t.raw("intro") as string[];
  const sections = t.raw("sections") as Section[];

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-text-strong sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm text-text-dim">{t("lastUpdated")}</p>

      <div className="mt-8 space-y-4">
        {intro.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-text-body">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold text-text-strong">
              {section.heading}
            </h2>
            {section.body?.map((p, j) => (
              <p
                key={j}
                className="mt-3 text-[15px] leading-relaxed text-text-body"
              >
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="relative pl-5 text-[15px] leading-relaxed text-text-body before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-brand"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
