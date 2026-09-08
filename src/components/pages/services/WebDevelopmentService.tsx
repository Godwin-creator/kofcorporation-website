"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, Globe, Layout, Code, Smartphone, Zap, Shield, Globe2 } from "lucide-react";
import CallToAction from "@/components/sections/CallToAction";
import "./WebDevelopmentService.css";
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

const technologies = [
  "Laravel",
  "Vue.js",
  "React",
  "Angular",
  "Spring Boot",
  "Next.js",
  "Tailwind CSS",
  "Firebase",
  "PostgreSQL",
  "MySQL",
];

export default function WebDevelopmentService() {
  const t = useTranslations("servicesDetail.web");
  return (
    <>
      <div className="web-development-service">
        <motion.section
          className="web-development-service__hero"
          aria-labelledby="web-dev-title"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="web-development-service__hero-inner">
            <div className="web-development-service__hero-content">
              <div className="web-development-service__hero-icon">
                <Globe size={48} strokeWidth={1.5} />
              </div>
              <p className="web-development-service__eyebrow">{t("hero.eyebrow")}</p>
              <h1 id="web-dev-title">
                {t("hero.title")}
              </h1>
              <p className="web-development-service__hero-description">
                {t("hero.description")}
              </p>
              <div className="web-development-service__hero-cta">
                <Link href="/contact#contact-form" className="web-development-service__cta web-development-service__cta--primary">
                  {t("hero.cta")}
                  <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </Link>
                <Link href="/services" className="web-development-service__cta web-development-service__cta--secondary">
                  {t("hero.back")}
                </Link>
              </div>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" as const }}
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

            <div className="web-development-service__technologies-grid">
              {technologies.map((tech) => (
                <div key={tech} className="web-development-technology-tag">
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                  {tech}
                </div>
              ))}
            </div>
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