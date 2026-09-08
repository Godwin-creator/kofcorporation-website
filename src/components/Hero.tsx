"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("headline")} <br />
            <span className="hero__title-highlight">{t("headlineHighlight")}</span>
          </motion.h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t("description")}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/services" className="hero__cta hero__cta--primary">
              {t("discoverServices")}
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href="/realisations" className="hero__cta hero__cta--secondary">
              {t("discoverProjects")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
