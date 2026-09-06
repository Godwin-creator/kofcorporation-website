"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Threads from "./Threads";
import "./Hero.css";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__threads" aria-hidden="true">
            <Threads
              color={[0.32, 0.15, 1]}
              amplitude={2}
              distance={0.7}
              enableMouseInteraction={false}
            />
          </div>

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
            <Link href="/contact" className="hero__cta hero__cta--primary">
              {t("bookMeeting")}
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href="/realisations" className="hero__cta hero__cta--secondary">
              {t("discoverProjects")}
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="hero__image">
            <Image
              src="/images/hero-team.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 767px) 0px, (max-width: 1023px) 100vw, 45vw"
              className="hero__image-content"
              priority
            />
            <div className="hero__image-overlay" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
