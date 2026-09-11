"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");
  
  // Parallax on scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);

  // Typewriter setup
  const headlineChars = t("headline").split("");
  const highlightChars = t("headlineHighlight").split("");
  const totalChars = headlineChars.length + highlightChars.length;
  const charDelay = 0.04;
  
  // Timings
  const surtitreDelay = 0;
  const headlineDelay = 0.3;
  const sousTitreDelay = headlineDelay + totalChars * charDelay + 0.3; // wait until typewriter is done
  const ctaDelay = sousTitreDelay + 0.15;

  const typewriterContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: headlineDelay,
        staggerChildren: charDelay,
      },
    },
  };

  const highlightContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: headlineDelay + headlineChars.length * charDelay,
        staggerChildren: charDelay,
      },
    },
  };

  const typewriterChar = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className="hero">
      <div className="hero__inner">
        <motion.div className="hero__content" style={{ y }}>
          <motion.span
            className="hero__tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: surtitreDelay }}
            style={{ display: "inline-block", marginBottom: "1rem", color: "var(--color-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.875rem" }}
          >
            {t.has("eyebrow") ? t("eyebrow") : "Development Studio"}
          </motion.span>

          <h1 className="hero__title">
            <motion.span
              variants={typewriterContainer}
              initial="hidden"
              animate="visible"
            >
              {headlineChars.map((char, index) => (
                <motion.span key={`h1-${index}`} variants={typewriterChar}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.span
              className="hero__title-highlight"
              variants={highlightContainer}
              initial="hidden"
              animate="visible"
            >
              {highlightChars.map((char, index) => (
                <motion.span key={`h2-${index}`} variants={typewriterChar}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
            
            <motion.span
              className="hero__cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0, 1, 0, 0] }}
              transition={{
                delay: headlineDelay + totalChars * charDelay,
                duration: 1,
                times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
              }}
              style={{ display: "inline-block", marginLeft: "4px", color: "var(--color-text)" }}
            >
              |
            </motion.span>
          </h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: sousTitreDelay }}
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
            <Link href="/realisations" className="hero__cta hero__cta--secondary">
              {t("discoverProjects")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
