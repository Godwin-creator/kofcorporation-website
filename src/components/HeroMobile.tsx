import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
import Link from "next/link";
import type { CompanySettings } from "@/types/sanity";

const SLOGANS = {
  fr: { lineOne: "Votre vision", lineTwo: "notre code" },
  en: { lineOne: "Your vision", lineTwo: "our code" },
};

export default async function HeroMobile({
  settings,
}: {
  settings?: CompanySettings | null;
}) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("hero")]);
  const fallback = SLOGANS[locale as keyof typeof SLOGANS] ?? SLOGANS.fr;
  const cmsSlogan = settings?.heroSlogans?.[0];
  const cmsTitle = locale === "en" ? settings?.heroTitleEn : settings?.heroTitle;
  const lineOne = cmsSlogan
    ? locale === "en"
      ? cmsSlogan.lineOneEn
      : cmsSlogan.lineOneFr
    : cmsTitle || fallback.lineOne;
  const lineTwo = cmsSlogan
    ? locale === "en"
      ? cmsSlogan.lineTwoEn
      : cmsSlogan.lineTwoFr
    : cmsTitle
      ? ""
      : fallback.lineTwo;
  const description =
    (locale === "en" ? settings?.heroSubtitleEn : settings?.heroSubtitle) ??
    t("description");

  return (
    <section className="hero hero--mobile">
      <div className="hero__inner">
        <div className="hero__content hero__content--mobile">
          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--primary">{lineOne}</span>
            {lineTwo && (
              <span className="hero__title-line hero__title-line--secondary">
                {lineTwo}
              </span>
            )}
          </h1>
          <p className="hero__description">{description}</p>
          <div className="hero__actions">
            <Link href={`/${locale}/services`} className="hero__cta hero__cta--primary">
              {t("discoverServices")}
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href={`/${locale}/realisations`} className="hero__cta hero__cta--secondary">
              {t("discoverProjects")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
