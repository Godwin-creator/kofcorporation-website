"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, Smartphone, Layout, Code, Zap, Shield, Users, AppWindow } from "lucide-react";
import CallToAction from "@/components/sections/CallToAction";
import "./MobileApplicationsService.css";
import { Link } from "@/i18n/navigation";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const features = [
  {
    icon: Smartphone,
    key: "features.native.title",
    descriptionKey: "features.native.description",
  },
  {
    icon: Layout,
    key: "features.ux.title",
    descriptionKey: "features.ux.description",
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
    icon: Users,
    key: "features.collaborative.title",
    descriptionKey: "features.collaborative.description",
  },
  {
    icon: AppWindow,
    key: "features.offline.title",
    descriptionKey: "features.offline.description",
  },
];

const technologies = [
  "Flutter",
  "React Native",
  "Kotlin",
  "Swift",
  "Firebase",
  "Dart",
  "Java",
  "Objective-C",
  "SQLite",
  "REST API",
];

export default function MobileApplicationsService() {
  const t = useTranslations("servicesDetail.mobile");
  return (
    <>
      <div className="mobile-applications-service">
        <motion.section
          className="mobile-applications-service__hero"
          aria-labelledby="mobile-app-title"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="mobile-applications-service__hero-inner">
            <div className="mobile-applications-service__hero-content">
              <div className="mobile-applications-service__hero-icon">
                <Smartphone size={48} strokeWidth={1.5} />
              </div>
              <p className="mobile-applications-service__eyebrow">{t("hero.eyebrow")}</p>
              <h1 id="mobile-app-title">
                {t("hero.title")}
              </h1>
              <p className="mobile-applications-service__hero-description">
                {t("hero.description")}
              </p>
              <div className="mobile-applications-service__hero-cta">
                <Link href="/contact#contact-form" className="mobile-applications-service__cta mobile-applications-service__cta--primary">
                  {t("hero.cta")}
                  <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </Link>
                <Link href="/services" className="mobile-applications-service__cta mobile-applications-service__cta--secondary">
                  {t("hero.back")}
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mobile-applications-service__overview" aria-labelledby="overview-title">
          <div className="mobile-applications-service__container">
            <div className="mobile-applications-service__overview-content">
              <h2 id="overview-title">{t("overview.title")}</h2>
              <p>{t("overview.description")}</p>
            </div>
          </div>
        </section>

        <section className="mobile-applications-service__features" aria-labelledby="features-title">
          <div className="mobile-applications-service__container">
            <header className="mobile-applications-service__section-header">
              <h2 id="features-title">{t("features.title")}</h2>
              <p>{t("features.subtitle")}</p>
            </header>

            <div className="mobile-applications-service__features-grid">
              {features.map(({ icon: Icon, key, descriptionKey }) => (
                <motion.div
                  className="mobile-applications-feature-card"
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" as const }}
                >
                  <div className="mobile-applications-feature-card__icon">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>
                  <h3>{t(key)}</h3>
                  <p>{t(descriptionKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mobile-applications-service__technologies" aria-labelledby="technologies-title">
          <div className="mobile-applications-service__container">
            <header className="mobile-applications-service__section-header">
              <h2 id="technologies-title">{t("technologies.title")}</h2>
              <p>{t("technologies.description")}</p>
            </header>

            <div className="mobile-applications-service__technologies-grid">
              {technologies.map((tech) => (
                <div key={tech} className="mobile-applications-technology-tag">
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mobile-applications-service__process" aria-labelledby="process-title">
          <div className="mobile-applications-service__container">
            <header className="mobile-applications-service__section-header">
              <h2 id="process-title">{t("process.title")}</h2>
              <p>{t("process.subtitle")}</p>
            </header>

            <div className="mobile-applications-service__process-steps">
              <div className="mobile-applications-process-step">
                <div className="mobile-applications-process-step__number">01</div>
                <div className="mobile-applications-process-step__content">
                  <h3>{t("process.step1.title")}</h3>
                  <p>{t("process.step1.description")}</p>
                </div>
              </div>
              <div className="mobile-applications-process-step">
                <div className="mobile-applications-process-step__number">02</div>
                <div className="mobile-applications-process-step__content">
                  <h3>{t("process.step2.title")}</h3>
                  <p>{t("process.step2.description")}</p>
                </div>
              </div>
              <div className="mobile-applications-process-step">
                <div className="mobile-applications-process-step__number">03</div>
                <div className="mobile-applications-process-step__content">
                  <h3>{t("process.step3.title")}</h3>
                  <p>{t("process.step3.description")}</p>
                </div>
              </div>
              <div className="mobile-applications-process-step">
                <div className="mobile-applications-process-step__number">04</div>
                <div className="mobile-applications-process-step__content">
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