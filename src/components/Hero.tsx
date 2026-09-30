"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Hero.css";
import { Link } from "@/i18n/navigation";
import HeroImageSlider from "@/components/ui/HeroImageSlider";
import type { CompanySettings } from "@/types/sanity";

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

/** Easing cubic variable for a more human-like typing rhythm */
const CHAR_DELAYS = (index: number, total: number) => {
  // Slow start, speed up in the middle, slow at the end
  const progress = index / total;
  if (progress < 0.15) return 120;
  if (progress < 0.85) return 60;
  return 110;
};

export default function Hero({ settings }: { settings?: CompanySettings | null }) {
  const t = useTranslations("hero");
  const locale = useLocale();

  // Build slogan set: CMS heroSlogans > legacy heroTitle > hardcoded fallback
  const buildSloganSet = () => {
    // 1. New CMS heroSlogans array (preferred)
    if (settings?.heroSlogans?.length) {
      return settings.heroSlogans.map((s) => ({
        lineOne: locale === "en" ? s.lineOneEn : s.lineOneFr,
        lineTwo: locale === "en" ? s.lineTwoEn : s.lineTwoFr,
      }));
    }
    // 2. Legacy single heroTitle field
    const cmsTitle = locale === "en" ? settings?.heroTitleEn : settings?.heroTitle;
    if (cmsTitle) {
      return [{ lineOne: cmsTitle, lineTwo: "" }];
    }
    // 3. Hardcoded fallback
    return SLOGANS[locale as keyof typeof SLOGANS] ?? SLOGANS.fr;
  };
  const sloganSet = buildSloganSet();

  const description = (locale === "en" ? settings?.heroSubtitleEn : settings?.heroSubtitle) ?? t("description");

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

    const runTypewriter = async () => {
      const l1 = activeSlogan.lineOne;
      const l2 = activeSlogan.lineTwo;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

      setDisplayedL1("");
      setDisplayedL2("");
      setCursorLine(1);
      setIsHolding(false);
      setIsErasing(false);

      // Typing line 1
      for (let i = 1; i <= l1.length; i++) {
        if (isCancelled) return;
        setDisplayedL1(l1.slice(0, i));
        await delay(CHAR_DELAYS(i, l1.length));
      }

      if (isCancelled) return;
      await delay(650);
      setCursorLine(2);

      // Typing line 2
      for (let i = 1; i <= l2.length; i++) {
        if (isCancelled) return;
        setDisplayedL2(l2.slice(0, i));
        await delay(CHAR_DELAYS(i, l2.length));
      }

      if (isCancelled) return;
      setIsHolding(true);
      await delay(2200);
      setIsHolding(false);
      setIsErasing(true);

      // Erasing
      const totalChars = l1.length + l2.length;
      for (let i = totalChars; i > 0; i--) {
        if (isCancelled) return;
        
        if (i > l1.length) {
          setDisplayedL2(l2.slice(0, i - l1.length - 1));
        } else {
          setDisplayedL2("");
          setDisplayedL1(l1.slice(0, i - 1));
          setCursorLine(1);
        }
        await delay(CHAR_DELAYS(totalChars - i, totalChars) / 3);
      }

      if (isCancelled) return;
      await delay(280);
      setSloganIndex((cur) => (cur + 1) % sloganSet.length);
    };

    runTypewriter();

    return () => {
      isCancelled = true;
    };
  }, [sloganIndex, activeSlogan, sloganSet.length]);

  return (
    <section className="hero">
      <div className="hero__inner">
        <motion.div className="hero__content" style={{ y }}>
          <h1 className="hero__title" aria-live="polite" aria-label={`${activeSlogan.lineOne} ${activeSlogan.lineTwo}`}>
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
