"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Hero.css";
import { Link } from "@/i18n/navigation";
import HeroImageSlider from "@/components/ui/HeroImageSlider";

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

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const sloganSet = SLOGANS[locale as keyof typeof SLOGANS] ?? SLOGANS.fr;

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);

  const [sloganIndex, setSloganIndex] = useState(0);
  const [typedLineOne, setTypedLineOne] = useState("");
  const [typedLineTwo, setTypedLineTwo] = useState("");
  const [typedProgress, setTypedProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const activeSlogan = sloganSet[sloganIndex];
    const totalTypingMs = 6500;
    const totalChars = activeSlogan.lineOne.length + activeSlogan.lineTwo.length;
    const stepMs = totalTypingMs / totalChars;
    let rafId = 0;
    let holdTimeout: number | undefined;
    const start = performance.now();

    const updateTyping = (now: number) => {
      const elapsed = now - start;
      const typedCount = Math.min(totalChars, Math.floor(elapsed / stepMs));
      setTypedProgress(typedCount);

      const nextLineOne = activeSlogan.lineOne.slice(
        0,
        Math.min(typedCount, activeSlogan.lineOne.length),
      );
      const nextLineTwo =
        typedCount > activeSlogan.lineOne.length
          ? activeSlogan.lineTwo.slice(
              0,
              typedCount - activeSlogan.lineOne.length,
            )
          : "";

      setTypedLineOne(nextLineOne);
      setTypedLineTwo(nextLineTwo);

      if (typedCount < totalChars) {
        rafId = requestAnimationFrame(updateTyping);
        return;
      }

      const flashPattern = [true, false, true, false, true, false];
      flashPattern.forEach((isOn, index) => {
        window.setTimeout(() => setCursorVisible(isOn), index * 180);
      });

      window.setTimeout(() => setCursorVisible(false), flashPattern.length * 180 + 80);

      holdTimeout = window.setTimeout(() => {
        setSloganIndex((current) => (current + 1) % sloganSet.length);
      }, 8000);
    };

    rafId = requestAnimationFrame((now) => {
      setTypedProgress(0);
      setTypedLineOne("");
      setTypedLineTwo("");
      setCursorVisible(true);
      updateTyping(now);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (holdTimeout) {
        window.clearTimeout(holdTimeout);
      }
    };
  }, [sloganIndex, sloganSet]);

  const headlineDelay = 0.3;
  const sousTitreDelay = 1.2;
  const ctaDelay = 1.45;
  const activeSlogan = sloganSet[sloganIndex];
  const showCursorOnFirstLine = typedProgress <= activeSlogan.lineOne.length && cursorVisible;
  const showCursorOnSecondLine = typedProgress > activeSlogan.lineOne.length && cursorVisible;

  return (
    <section className="hero">
      <div className="hero__inner">
        <motion.div className="hero__content" style={{ y }}>
          {/* <motion.span
            className="hero__tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: surtitreDelay }}
          >
            {t("eyebrow")}
          </motion.span> */}

          <h1 className="hero__title" aria-live="polite">
            <motion.span
              className="hero__title-line hero__title-line--primary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: headlineDelay }}
            >
              {typedLineOne}
              {showCursorOnFirstLine && (
                <span className="hero__cursor">|</span>
              )}
            </motion.span>

            <motion.span
              className="hero__title-line hero__title-line--secondary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: headlineDelay + 0.2 }}
            >
              {typedLineTwo}
              {showCursorOnSecondLine && <span className="hero__cursor">|</span>}
            </motion.span>
          </h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: sousTitreDelay }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ctaDelay }}
          >
            <Link href="/services" className="hero__cta hero__cta--primary">
              {t("discoverServices")}
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link
              href="/realisations"
              className="hero__cta hero__cta--secondary"
            >
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

