"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, MessageSquare, Check } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const fieldClass =
  "w-full rounded-xl border border-border-strong bg-surface-1 px-3.5 py-2.5 text-sm text-text-strong outline-none transition-colors placeholder:text-text-faint focus:border-brand focus:ring-2 focus:ring-brand/30";

export function ContactSection() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const hotel = String(data.get("hotel") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = t("form.mailSubject", { hotel: hotel || name });
    const body = [
      `${t("form.name")}: ${name}`,
      `${t("form.hotel")}: ${hotel}`,
      `${t("form.email")}: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Info column */}
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-brand">
            <Mail className="size-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-text-strong">
            {t("emailHeading")}
          </h3>
          <p className="mt-2 text-sm text-text-body">{t("emailBody")}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block font-medium text-brand hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-brand">
            <MessageSquare className="size-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-text-strong">
            {t("demoHeading")}
          </h3>
          <p className="mt-2 text-sm text-text-body">{t("demoBody")}</p>
        </div>
      </div>

      {/* Form column */}
      <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 shadow-sm sm:p-8">
        {sent ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-ok/15 text-ok">
              <Check className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-strong">
              {t("form.successTitle")}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-text-body">
              {t("form.successBody")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-text-strong">
                  {t("form.name")}
                </span>
                <input name="name" required className={fieldClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-text-strong">
                  {t("form.hotel")}
                </span>
                <input name="hotel" className={fieldClass} />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-strong">
                {t("form.email")}
              </span>
              <input
                name="email"
                type="email"
                required
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-strong">
                {t("form.message")}
              </span>
              <textarea
                name="message"
                rows={5}
                className={cn(fieldClass, "resize-none")}
              />
            </label>
            <Button type="submit" className="mt-1 w-full">
              {t("form.submit")}
            </Button>
            <p className="text-center text-xs text-text-dim">{t("form.note")}</p>
          </form>
        )}
      </div>
    </div>
  );
}
