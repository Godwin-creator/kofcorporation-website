"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, Layout, Code, Smartphone, Zap, Shield, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import CallToAction from "@/components/sections/CallToAction";
import "./WebDevelopmentService.css";
import "./ServiceHero.css";
import { Link } from "@/i18n/navigation";
import EmptyState from "@/components/ui/EmptyState";
import Watermark from "@/components/ui/Watermark";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const features = [
  {
    icon: Layout,
    key: "features.responsive.title",
    descriptionKey: "features.responsive.description",
  },
  {
    icon: Code,
    key: "features.custom.title",
    descriptionKey: "features.custom.description",
  },
  {
    icon: Zap,
    key: "features.performance.title",
    descriptionKey: "features.performance.description",
  },
  {
    icon: Shield,
    key: "features.security.title",
    descriptionKey: "features.security.description",
  },
  {
    icon: Globe2,
    key: "features.seo.title",
    descriptionKey: "features.seo.description",
  },
  {
    icon: Smartphone,
    key: "features.mobile.title",
    descriptionKey: "features.mobile.description",
  },
];

export default function WebDevelopmentService({technologies = []}: {technologies?: string[]}) {
  const t = useTranslations("servicesDetail.web");
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isReducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection;
    const isSlow = connection ? (connection.saveData || ["slow-2g", "2g", "3g"].includes(connection.effectiveType)) : false;
    
    if (!isMobile && !isReducedData && !isSlow) {
      setShouldLoadVideo(true);
    }
  }, []);

  return (
    <>
      <div className="web-development-service">
        <Watermark id="web_dev" />
        <motion.section
          className="service-hero web-development-service__hero"
          aria-labelledby="web-dev-title"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {/* Background video or fallback image */}
          {shouldLoadVideo ? (
            <video
              className="service-hero__video"
              src="/videos/devWeb-banner.mp4"
              poster="/images/services/devWeb-poster.webp"
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          ) : (
            <Image
              src="/images/services/devWeb-poster.webp"
              alt=""
              fill
              priority
              className="service-hero__video"
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          )}
          {/* Overlay */}
          <div className="service-hero__overlay" aria-hidden="true" />
          {/* Content */}
          <div className="service-hero__content">
            {/* <p className="service-hero__eyebrow">{t("hero.eyebrow")}</p> */}
            <h1 id="web-dev-title">{t("hero.title")}</h1>
            <p className="service-hero__description">{t("hero.description")}</p>
            <div className="service-hero__cta-row">
              <Link href="/contact#contact-form" className="service-hero__cta--primary">
                {t("hero.cta")}
                <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </Link>
              <Link href="/services" className="service-hero__cta--secondary">
                {t("hero.back")}
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="web-development-service__overview" aria-labelledby="overview-title">
          <div className="web-development-service__container">
            <div className="web-development-service__overview-content">
              <h2 id="overview-title">{t("overview.title")}</h2>
              <p>{t("overview.description")}</p>
            </div>
          </div>
        </section>

        <section className="web-development-service__features" aria-labelledby="features-title">
          <div className="web-development-service__container">
            <header className="web-development-service__section-header">
              <h2 id="features-title">{t("features.title")}</h2>
              <p>{t("features.subtitle")}</p>
            </header>

            <div className="web-development-service__features-grid">
              {features.map(({ icon: Icon, key, descriptionKey }) => (
                <motion.div
                  className="web-development-feature-card"
                  key={key}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                >
                  <div className="web-development-feature-card__icon">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>
                  <h3>{t(key)}</h3>
                  <p>{t(descriptionKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="web-development-service__technologies" aria-labelledby="technologies-title">
          <div className="web-development-service__container">
            <header className="web-development-service__section-header">
              <h2 id="technologies-title">{t("technologies.title")}</h2>
              <p>{t("technologies.description")}</p>
            </header>

            {technologies.length ? <div className="web-development-service__technologies-grid">
              {technologies.map((tech) => (
                <div key={tech} className="web-development-technology-tag">
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  {tech}
                </div>
              ))}
            </div> : <EmptyState message={t("technologies.empty")} />}
          </div>
        </section>

        <section className="web-development-service__process" aria-labelledby="process-title">
          <div className="web-development-service__container">
            <header className="web-development-service__section-header">
              <h2 id="process-title">{t("process.title")}</h2>
              <p>{t("process.subtitle")}</p>
            </header>

            <div className="web-development-service__process-steps">
              <div className="web-development-process-step">
                <div className="web-development-process-step__number">01</div>
                <div className="web-development-process-step__content">
                  <h3>{t("process.step1.title")}</h3>
                  <p>{t("process.step1.description")}</p>
                </div>
              </div>
              <div className="web-development-process-step">
                <div className="web-development-process-step__number">02</div>
                <div className="web-development-process-step__content">
                  <h3>{t("process.step2.title")}</h3>
                  <p>{t("process.step2.description")}</p>
                </div>
              </div>
              <div className="web-development-process-step">
                <div className="web-development-process-step__number">03</div>
                <div className="web-development-process-step__content">
                  <h3>{t("process.step3.title")}</h3>
                  <p>{t("process.step3.description")}</p>
                </div>
              </div>
              <div className="web-development-process-step">
                <div className="web-development-process-step__number">04</div>
                <div className="web-development-process-step__content">
                  <h3>{t("process.step4.title")}</h3>
                  <p>{t("process.step4.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}