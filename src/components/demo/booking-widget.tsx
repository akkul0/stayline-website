"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarCheck, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { API_URL, CONTACT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/cn";

interface Slot { start: string; label: string }
interface Day { date: string; slots: Slot[] }
type Phase = "loading" | "ready" | "error" | "done";

const TZ = "Europe/Istanbul";

// Demo randevusu: gün → saat → bilgiler. Saatler StayLine API'sinden canlı gelir.
export function BookingWidget() {
  const t = useTranslations("demo");
  const locale = useLocale();
  const intl = locale === "en" ? "en-GB" : "tr-TR";
  const [phase, setPhase] = useState<Phase>("loading");
  const [days, setDays] = useState<Day[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ when: string; email: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/demo/slots`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { days: Day[] };
      setDays(data.days);
      setDay((d) => (d && data.days.some((x) => x.date === d) ? d : data.days[0]?.date ?? null));
      setPhase("ready");
    } catch {
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    // İlk yükleme: saatler sunucudan gelir
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const fmtDay = (date: string, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(intl, { timeZone: TZ, ...opts }).format(new Date(`${date}T12:00:00Z`));
  const fmtWhen = (iso: string) =>
    new Intl.DateTimeFormat(intl, { timeZone: TZ, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

  async function submit(form: HTMLFormElement) {
    if (!slot) return;
    const f = new FormData(form);
    const rooms = Number(f.get("rooms"));
    const body = {
      name: String(f.get("name") ?? ""),
      company: String(f.get("company") ?? ""),
      email: String(f.get("email") ?? ""),
      phone: String(f.get("phone") ?? ""),
      ...(rooms > 0 ? { rooms: Math.round(rooms) } : {}),
      ...(String(f.get("message") ?? "").trim() ? { message: String(f.get("message")) } : {}),
      slotStart: slot.start,
      locale: locale === "en" ? "en" : "tr",
      consent: f.get("consent") === "on",
      website: String(f.get("website") ?? ""),
    };
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/demo/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201) {
        setDone({ when: fmtWhen(slot.start), email: body.email });
        setPhase("done");
        return;
      }
      if (res.status === 409) {
        // Saat az önce doldu: listeyi tazele, seçimi kaldır
        setSlot(null);
        await load();
      }
      setError(
        res.status === 429
          ? t("rateLimited")
          : typeof data?.message === "string" && res.status < 500
            ? data.message
            : t("genericError", { email: CONTACT_EMAIL }),
      );
    } catch {
      setError(t("genericError", { email: CONTACT_EMAIL }));
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === "done" && done) {
    return (
      <div className="rounded-[22px] border border-accent-border bg-surface-1 p-8 text-center" role="status">
        <CalendarCheck className="mx-auto size-10 text-brand" aria-hidden />
        <h2 className="mt-4 font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-text-strong">{t("successTitle")}</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-text-body">{t("successBody", { when: done.when, email: done.email })}</p>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }), "mt-7")}
          onClick={() => { setDone(null); setSlot(null); setPhase("loading"); void load(); }}
        >
          {t("another")}
        </button>
      </div>
    );
  }

  const current = days.find((d) => d.date === day);

  return (
    <div className="min-w-0 rounded-[22px] border border-border-subtle bg-surface-1 p-5 sm:p-7">
      {phase === "loading" ? (
        <p className="flex items-center gap-2 py-10 text-[14px] text-text-dim"><Loader2 className="size-4 animate-spin" aria-hidden />{t("loading")}</p>
      ) : phase === "error" ? (
        <p role="alert" className="py-10 text-[14px] text-text-body">{t("loadError", { email: CONTACT_EMAIL })}</p>
      ) : days.length === 0 ? (
        <p className="py-10 text-[14px] text-text-body">{t("none", { email: CONTACT_EMAIL })}</p>
      ) : (
        <>
          <fieldset>
            <legend className="text-[13px] font-semibold text-text-strong">{t("dayLabel")}</legend>
            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2">
              {days.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  aria-pressed={d.date === day}
                  onClick={() => { setDay(d.date); setSlot(null); }}
                  className={cn(
                    "flex min-w-[64px] flex-col items-center rounded-xl border px-3 py-2.5 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    d.date === day ? "border-brand bg-accent-soft text-text-strong" : "border-border-subtle text-text-body hover:border-border-strong",
                  )}
                >
                  <span className="text-[11px] text-text-dim">{fmtDay(d.date, { weekday: "short" })}</span>
                  <span className="font-display text-[20px] font-semibold leading-tight">{fmtDay(d.date, { day: "numeric" })}</span>
                  <span className="text-[11px] text-text-dim">{fmtDay(d.date, { month: "short" })}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-[13px] font-semibold text-text-strong">{t("timeLabel")}</legend>
            <p className="mt-1 text-[12px] text-text-dim">{t("timezone")}</p>
            {current ? (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {current.slots.map((s) => (
                  <button
                    key={s.start}
                    type="button"
                    aria-pressed={slot?.start === s.start}
                    onClick={() => setSlot(s)}
                    className={cn(
                      "rounded-lg border py-2.5 text-[14px] font-medium tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      slot?.start === s.start ? "border-brand bg-brand text-on-accent" : "border-border-subtle text-text-body hover:border-border-strong",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[13px] text-text-dim">{t("pickDay")}</p>
            )}
          </fieldset>

          {slot ? (
            <form
              className="mt-8 border-t border-border-subtle pt-7"
              onSubmit={(e) => { e.preventDefault(); void submit(e.currentTarget); }}
            >
              <p className="text-[13px] text-text-dim">
                {t("selected")}: <span className="font-semibold text-text-strong">{fmtWhen(slot.start)}</span>
              </p>
              <fieldset className="mt-5 grid gap-4 sm:grid-cols-2">
                <legend className="sr-only">{t("infoLabel")}</legend>
                <Field name="name" label={t("name")} autoComplete="name" required minLength={2} />
                <Field name="company" label={t("company")} autoComplete="organization" required minLength={2} />
                <Field name="email" type="email" label={t("email")} autoComplete="email" required />
                <Field name="phone" type="tel" label={t("phone")} autoComplete="tel" required minLength={7} />
                <Field name="rooms" type="number" label={t("rooms")} min={1} inputMode="numeric" />
                <div className="sm:col-span-2">
                  <label htmlFor="d-message" className="mb-1.5 block text-[12.5px] text-text-body">{t("message")}</label>
                  <textarea id="d-message" name="message" rows={3} maxLength={1500} className="w-full rounded-lg border border-border-subtle bg-surface-2 px-3 py-2.5 text-[14px] text-text-strong focus-visible:outline-2 focus-visible:outline-brand" />
                </div>
                {/* Bot tuzağı: ekranda ve klavyede görünmez */}
                <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
              </fieldset>
              <label className="mt-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-text-body">
                <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[var(--brand)]" />
                <span>
                  {t("consentBefore")}{" "}
                  <Link href="/kvkk" className="text-brand underline underline-offset-2">{t("consentLink")}</Link>{" "}
                  {t("consentAfter")}
                </span>
              </label>
              {error ? <p role="alert" className="mt-4 rounded-lg bg-err/10 px-3 py-2.5 text-[13.5px] text-err">{error}</p> : null}
              <button type="submit" disabled={submitting} className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full sm:w-auto")}>
                {submitting ? <><Loader2 className="size-4 animate-spin" aria-hidden />{t("submitting")}</> : t("submit")}
              </button>
            </form>
          ) : null}
        </>
      )}
    </div>
  );
}

function Field({ name, label, ...rest }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={`d-${name}`} className="mb-1.5 block text-[12.5px] text-text-body">{label}</label>
      <input id={`d-${name}`} name={name} {...rest} className="h-11 w-full rounded-lg border border-border-subtle bg-surface-2 px-3 text-[14px] text-text-strong focus-visible:outline-2 focus-visible:outline-brand" />
    </div>
  );
}
