"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, Monitor, Layout, Database, Shield, Users, BarChart } from "lucide-react";
import CallToAction from "@/components/sections/CallToAction";
import "./BusinessSoftwareService.css";
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
    icon: Layout,
    key: "features.custom.title",
    descriptionKey: "features.custom.description",
  },
  {
    icon: Database,
    key: "features.integration.title",
    descriptionKey: "features.integration.description",
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
    icon: BarChart,
    key: "features.analytics.title",
    descriptionKey: "features.analytics.description",
  },
  {
    icon: Monitor,
    key: "features.automation.title",
    descriptionKey: "features.automation.description",
  },
];

const technologies = [
  "Spring Boot",
  "Laravel",
  "React",
  "Vue.js",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "REST API",
  "Docker",
  "AWS",
];

export default function BusinessSoftwareService() {
  const t = useTranslations("servicesDetail.management");
  return (
    <>
      <div className="business-software-service">
        <motion.section
          className="business-software-service__hero"
          aria-labelledby="business-software-title"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="business-software-service__hero-inner">
            <div className="business-software-service__hero-content">
              <div className="business-software-service__hero-icon">
                <Monitor size={48} strokeWidth={1.5} />
              </div>
              <p className="business-software-service__eyebrow">{t("hero.eyebrow")}</p>
              <h1 id="business-software-title">
                {t("hero.title")}
              </h1>
              <p className="business-software-service__hero-description">
                {t("hero.description")}
              </p>
              <div className="business-software-service__hero-cta">
                <Link href="/contact#contact-form" className="business-software-service__cta business-software-service__cta--primary">
                  {t("hero.cta")}
                  <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </Link>
                <Link href="/services" className="business-software-service__cta business-software-service__cta--secondary">
                  {t("hero.back")}
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="business-software-service__overview" aria-labelledby="overview-title">
          <div className="business-software-service__container">
            <div className="business-software-service__overview-content">
              <h2 id="overview-title">{t("overview.title")}</h2>
              <p>{t("overview.description")}</p>
            </div>
          </div>
        </section>

        <section className="business-software-service__features" aria-labelledby="features-title">
          <div className="business-software-service__container">
            <header className="business-software-service__section-header">
              <h2 id="features-title">{t("features.title")}</h2>
              <p>{t("features.subtitle")}</p>
            </header>

            <div className="business-software-service__features-grid">
              {features.map(({ icon: Icon, key, descriptionKey }) => (
                <motion.div
                  className="business-software-feature-card"
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" as const }}
                >
                  <div className="business-software-feature-card__icon">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>
                  <h3>{t(key)}</h3>
                  <p>{t(descriptionKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="business-software-service__technologies" aria-labelledby="technologies-title">
          <div className="business-software-service__container">
            <header className="business-software-service__section-header">
              <h2 id="technologies-title">{t("technologies.title")}</h2>
              <p>{t("technologies.description")}</p>
            </header>

            <div className="business-software-service__technologies-grid">
              {technologies.map((tech) => (
                <div key={tech} className="business-software-technology-tag">
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="business-software-service__process" aria-labelledby="process-title">
          <div className="business-software-service__container">
            <header className="business-software-service__section-header">
              <h2 id="process-title">{t("process.title")}</h2>
              <p>{t("process.subtitle")}</p>
            </header>

            <div className="business-software-service__process-steps">
              <div className="business-software-process-step">
                <div className="business-software-process-step__number">01</div>
                <div className="business-software-process-step__content">
                  <h3>{t("process.step1.title")}</h3>
                  <p>{t("process.step1.description")}</p>
                </div>
              </div>
              <div className="business-software-process-step">
                <div className="business-software-process-step__number">02</div>
                <div className="business-software-process-step__content">
                  <h3>{t("process.step2.title")}</h3>
                  <p>{t("process.step2.description")}</p>
                </div>
              </div>
              <div className="business-software-process-step">
                <div className="business-software-process-step__number">03</div>
                <div className="business-software-process-step__content">
                  <h3>{t("process.step3.title")}</h3>
                  <p>{t("process.step3.description")}</p>
                </div>
              </div>
              <div className="business-software-process-step">
                <div className="business-software-process-step__number">04</div>
                <div className="business-software-process-step__content">
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