import { useTranslations } from "next-intl";

type SubSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

type Section = {
  heading: string;
  body?: string[];
  bullets?: string[];
  /** Paragraphs rendered after the bullet list (e.g. a closing clause). */
  note?: string[];
  /** Nested, un-numbered sub-headings (e.g. cookie types). */
  subsections?: SubSection[];
};

function Paragraph({ text }: { text: string }) {
  return (
    <p className="mt-3 text-[15px] leading-relaxed text-text-body">{text}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((b, i) => (
        <li
          key={i}
          className="relative pl-5 text-[15px] leading-relaxed text-text-body before:absolute before:left-0 before:top-2.5 before:size-1.5 before:rounded-full before:bg-brand"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders a legal document from a translation namespace exposing:
 *   { title, lastUpdated, intro: string[], sections: Section[] }
 * Each Section renders, in order: body paragraphs, a bullet list, a trailing
 * note, and nested sub-headings.
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

      {intro.length > 0 && (
        <div className="mt-8 space-y-4">
          {intro.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-text-body">
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-10">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold text-text-strong">
              {section.heading}
            </h2>

            {section.body?.map((p, j) => <Paragraph key={j} text={p} />)}

            {section.bullets && <BulletList items={section.bullets} />}

            {section.note?.map((p, j) => <Paragraph key={j} text={p} />)}

            {section.subsections?.map((sub, j) => (
              <div key={j} className="mt-6">
                <h3 className="text-base font-semibold text-text-strong">
                  {sub.heading}
                </h3>
                {sub.body?.map((p, k) => <Paragraph key={k} text={p} />)}
                {sub.bullets && <BulletList items={sub.bullets} />}
              </div>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
