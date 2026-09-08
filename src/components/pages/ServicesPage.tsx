"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  GraduationCap,
  Monitor,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CallToAction from "@/components/sections/CallToAction";
import "./ServicesPage.css";
import { Link } from "@/i18n/navigation";

interface ServiceDetail {
  id: string;
  eyebrowKey: string;
  titleKey: string;
  descriptionKey: string;
  benefitKey: string;
  tags: string[];
  icon: LucideIcon;
  href: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: "web",
    eyebrowKey: "web.eyebrow",
    titleKey: "web.title",
    descriptionKey: "web.description",
    benefitKey: "web.benefit",
    tags: ["Laravel", "Vue.js", "Angular", "Spring Boot", "Firebase"],
    icon: Globe,
    href: "/services/developpement-web",
  },
  {
    id: "mobile",
    eyebrowKey: "mobile.eyebrow",
    titleKey: "mobile.title",
    descriptionKey: "mobile.description",
    benefitKey: "mobile.benefit",
    tags: ["Flutter", "Firebase", "Ionic", "Kotlin", "Java"],
    icon: Smartphone,
    href: "/services/applications-mobiles",
  },
  {
    id: "management",
    eyebrowKey: "management.eyebrow",
    titleKey: "management.title",
    descriptionKey: "management.description",
    benefitKey: "management.benefit",
    tags: ["ERP", "CRM", "RH", "Facturation", "Spring Boot"],
    icon: Monitor,
    href: "/services/logiciels-gestion",
  },
  {
    id: "training",
    eyebrowKey: "training.eyebrow",
    titleKey: "training.title",
    descriptionKey: "training.description",
    benefitKey: "training.benefit",
    tags: ["Academy", "Présentiel", "En ligne", "Hybride"],
    icon: GraduationCap,
    href: "https://academy.kofcorporation.com/",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ServicesPage() {
  const t = useTranslations("pages");
  const tServices = useTranslations("servicesPage");
  return (
    <>
      <div className="services-page">
        <motion.section
          className="services-page__hero"
          aria-labelledby="services-page-title"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="services-page__hero-inner">
            <p className="services-page__eyebrow">{t("servicesEyebrow")}</p>
            <h1 id="services-page-title">
              <span className="services-page__hero-title-line">{t("servicesTitle")}</span>
              <br />
              <span className="services-page__hero-title-line services-page__hero-title-highlight">
                {t("servicesHighlight")}
              </span>
            </h1>
            <p className="services-page__hero-description">
              {tServices("hero.description")}
            </p>
            <Link className="services-page__hero-link" href="#expertises">
              {tServices("hero.cta")}
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </motion.section>

        <section
          id="expertises"
          className="services-page__expertises"
          aria-labelledby="expertises-title"
        >
          <div className="services-page__container">
            <header className="services-page__section-header">
              <p className="services-page__eyebrow">{tServices("expertises.eyebrow")}</p>
              <h2 id="expertises-title">
                {tServices("expertises.title")}
              </h2>
              <p>
                {tServices("expertises.description")}
              </p>
            </header>

            <motion.div
              className="services-page__grid"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {SERVICES.map(({ id, eyebrowKey, titleKey, descriptionKey, benefitKey, tags, icon: Icon, href }) => {
                const title = tServices(titleKey);
                return (
                  <motion.article
                    className={`services-detail-card services-detail-card--${id}`}
                    key={id}
                    variants={cardVariants}
                  >
                    <div className="services-detail-card__topline">
                      <span className="services-detail-card__icon" aria-hidden="true">
                        <Icon size={25} strokeWidth={1.7} />
                      </span>
                      <span className="services-detail-card__eyebrow">{tServices(eyebrowKey)}</span>
                    </div>
                    <h3>{title}</h3>
                    <p className="services-detail-card__description">{tServices(descriptionKey)}</p>
                    <p className="services-detail-card__benefit">
                      <Check size={17} strokeWidth={2} aria-hidden="true" />
                      {tServices(benefitKey)}
                    </p>
                    <ul aria-label={`Technologies et formats pour ${title}`}>
                      {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <Link
                      className="services-detail-card__link"
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {tServices("card.cta")}
                      <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <motion.section
          className="services-page__method"
          aria-labelledby="method-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="services-page__method-inner">
            <div>
              <p className="services-page__eyebrow">{tServices("method.eyebrow")}</p>
              <h2 id="method-title">{tServices("method.title")}</h2>
            </div>
            <ol className="services-page__steps">
              <li>
                <span>01</span>
                <div>
                  <h3>{tServices("method.step1.title")}</h3>
                  <p>{tServices("method.step1.description")}</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>{tServices("method.step2.title")}</h3>
                  <p>{tServices("method.step2.description")}</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>{tServices("method.step3.title")}</h3>
                  <p>{tServices("method.step3.description")}</p>
                </div>
              </li>
            </ol>
          </div>
        </motion.section>
      </div>
      <CallToAction />
    </>
  );
}
