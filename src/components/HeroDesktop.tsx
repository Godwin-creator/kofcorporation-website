"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Hero.css";
import { Link } from "@/i18n/navigation";
import type { CompanySettings } from "@/types/sanity";

const HeroImageSlider = dynamic(() => import("@/components/ui/HeroImageSlider"), {
  ssr: false,
  loading: () => <div className="hero__image-placeholder" aria-hidden="true" />,
});

const SLOGANS = {
  fr: [
    { lineOne: "Votre vision", lineTwo: "notre code" },
    { lineOne: "Votre idée", lineTwo: "notre impact" },
  ],
  en: [
    { lineOne: "Your vision", lineTwo: "our code" },
    { lineOne: "Your idea", lineTwo: "our impact" },
  ],
};

const CHAR_DELAYS = (index: number, total: number) => {
  const progress = index / total;
  if (progress < 0.15) return 120;
  if (progress < 0.85) return 60;
  return 110;
};

export default function HeroDesktop({ settings }: { settings?: CompanySettings | null }) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const sloganSet = settings?.heroSlogans?.length
    ? settings.heroSlogans.map((slogan) => ({
        lineOne: locale === "en" ? slogan.lineOneEn : slogan.lineOneFr,
        lineTwo: locale === "en" ? slogan.lineTwoEn : slogan.lineTwoFr,
      }))
    : (() => {
        const cmsTitle = locale === "en" ? settings?.heroTitleEn : settings?.heroTitle;
        if (cmsTitle) return [{ lineOne: cmsTitle, lineTwo: "" }];
        return SLOGANS[locale as keyof typeof SLOGANS] ?? SLOGANS.fr;
      })();
  const description =
    (locale === "en" ? settings?.heroSubtitleEn : settings?.heroSubtitle) ??
    t("description");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);
  const [sloganIndex, setSloganIndex] = useState(0);
  const [displayedL1, setDisplayedL1] = useState("");
  const [displayedL2, setDisplayedL2] = useState("");
  const [cursorLine, setCursorLine] = useState<1 | 2>(1);
  const [isHolding, setIsHolding] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const activeSlogan = sloganSet[sloganIndex];

  useEffect(() => {
    let isCancelled = false;
    const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    const runTypewriter = async () => {
      const { lineOne, lineTwo } = activeSlogan;
      setDisplayedL1("");
      setDisplayedL2("");
      setCursorLine(1);
      setIsHolding(false);
      setIsErasing(false);

      for (let index = 1; index <= lineOne.length; index += 1) {
        if (isCancelled) return;
        setDisplayedL1(lineOne.slice(0, index));
        await delay(CHAR_DELAYS(index, lineOne.length));
      }

      if (isCancelled) return;
      await delay(650);
      setCursorLine(2);

      for (let index = 1; index <= lineTwo.length; index += 1) {
        if (isCancelled) return;
        setDisplayedL2(lineTwo.slice(0, index));
        await delay(CHAR_DELAYS(index, lineTwo.length));
      }

      if (isCancelled) return;
      setIsHolding(true);
      await delay(2200);
      setIsHolding(false);
      setIsErasing(true);

      const totalChars = lineOne.length + lineTwo.length;
      for (let index = totalChars; index > 0; index -= 1) {
        if (isCancelled) return;
        if (index > lineOne.length) {
          setDisplayedL2(lineTwo.slice(0, index - lineOne.length - 1));
        } else {
          setDisplayedL2("");
          setDisplayedL1(lineOne.slice(0, index - 1));
          setCursorLine(1);
        }
        await delay(CHAR_DELAYS(totalChars - index, totalChars) / 3);
      }

      if (isCancelled) return;
      await delay(280);
      setSloganIndex((current) => (current + 1) % sloganSet.length);
    };

    void runTypewriter();
    return () => {
      isCancelled = true;
    };
  }, [sloganIndex, activeSlogan, sloganSet.length]);

  return (
    <section className="hero">
      <div className="hero__inner">
        <motion.div className="hero__content" style={{ y }}>
          <h1
            className="hero__title"
            aria-live="polite"
            aria-label={`${activeSlogan.lineOne} ${activeSlogan.lineTwo}`}
          >
            <motion.span
              className="hero__title-line hero__title-line--primary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {displayedL1}
              {cursorLine === 1 && (
                <span
                  className={`hero__cursor${isHolding ? " hero__cursor--blink" : ""}${isErasing ? " hero__cursor--erase" : ""}`}
                  aria-hidden="true"
                />
              )}
            </motion.span>
            <motion.span
              className="hero__title-line hero__title-line--secondary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {displayedL2}
              {cursorLine === 2 && (
                <span
                  className={`hero__cursor${isHolding ? " hero__cursor--blink" : ""}${isErasing ? " hero__cursor--erase" : ""}`}
                  aria-hidden="true"
                />
              )}
            </motion.span>
          </h1>
          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {description}
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.45 }}
          >
            <Link href="/services" className="hero__cta hero__cta--primary">
              {t("discoverServices")}
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href="/realisations" className="hero__cta hero__cta--secondary">
              {t("discoverProjects")}
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HeroImageSlider />
        </motion.div>
      </div>
    </section>
  );
}
