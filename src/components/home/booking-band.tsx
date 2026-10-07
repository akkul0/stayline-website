import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Slot } from "@/components/home/story";

// Kapanış: gece resepsiyonu + randevu çağrısı
export async function BookingBand({ phone = false }: { phone?: boolean }) {
  const t = await getTranslations("home.booking");
  return (
    <section data-booking-band className="relative isolate overflow-hidden bg-[#061219] text-[#e6eef0]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/reception-1696.webp"
        srcSet="/images/reception-900.webp 900w, /images/reception-1696.webp 1696w"
        sizes="100vw"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#061219_5%,rgba(6,18,25,0.7)_55%,rgba(6,18,25,0.45)_100%)]" />
      <Container className={phone ? "grid items-center gap-10 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-28" : "py-28 sm:py-36"}>
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#c3d2d7]">{t("body")}</p>
          <Link href="/demo" className={`${buttonVariants({ size: "lg" })} mt-9`}>
            {t("cta")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        {phone ? <div className="flex justify-center"><Slot screen="booking" ry={-16} rz={2} spin={1} /></div> : null}
      </Container>
    </section>
  );
}
