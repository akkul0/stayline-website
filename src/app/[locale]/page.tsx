import { setRequestLocale, getTranslations } from "next-intl/server";
import { MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { StoryHero, StoryJourney, StoryLanguages, StoryMerge, StoryModules, RoomPhone } from "@/components/home/story";
import { GiantWord } from "@/components/home/giant-word";
import { BookingBand } from "@/components/home/booking-band";
import { PhoneDirector } from "@/components/phone/phone-director";
import { Preloader } from "@/components/motion/preloader";
import { FloatingCta } from "@/components/motion/floating-cta";

// Ana sayfa: tek telefon bütün sayfa boyunca bölümden bölüme döne döne iner.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Preloader />
      <PhoneDirector />
      <StoryHero />
      <StoryJourney />
      <StoryLanguages />
      <StoryMerge />
      <StoryModules />
      <RoomPhone />

      <section className="relative overflow-hidden border-t border-border-subtle bg-surface-0 pb-24 pt-20 sm:pt-28">
        {/* Telefon bu bölümde görünmez: finale giderken kartların üstünden geçmesin */}
        <div aria-hidden data-phone-slot data-mode="hidden" data-screen="booking" data-spin="0" className="absolute left-1/2 top-1/2 size-px" />
        <Container>
          <GiantWord word="StayLine" />
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-text-strong">{t("builtOn.title")}</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-text-body">{t("builtOn.subtitle")}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[20px] border border-border-subtle bg-border-subtle sm:grid-cols-2">
              {([
                ["whatsapp", MessageCircle],
                ["claude", Sparkles],
              ] as const).map(([key, Icon]) => (
                <div key={key} className="bg-surface-1 p-7">
                  <Icon className="size-5 text-brand" aria-hidden />
                  <h3 className="mt-5 text-[17px] font-semibold text-text-strong">{t(`builtOn.${key}.title`)}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-text-body">{t(`builtOn.${key}.body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <BookingBand phone />
      <FloatingCta />
    </>
  );
}
