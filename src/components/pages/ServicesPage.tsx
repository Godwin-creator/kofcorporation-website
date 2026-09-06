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
  eyebrow: string;
  title: string;
  description: string;
  benefit: string;
  tags: string[];
  icon: LucideIcon;
  href: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: "web",
    eyebrow: "01 · Web",
    title: "Développement Web & Applications",
    description:
      "Des sites vitrines, plateformes web et applications métier conçus autour de vos objectifs.",
    benefit: "Une présence digitale professionnelle, performante et livrée clé en main.",
    tags: ["Laravel", "Vue.js", "Angular", "Spring Boot", "Firebase"],
    icon: Globe,
    href: "/services/developpement-web",
  },
  {
    id: "mobile",
    eyebrow: "02 · Mobile",
    title: "Applications Mobiles",
    description:
      "Des expériences Android et iOS fluides, pensées pour vos utilisateurs et votre croissance.",
    benefit: "Une application robuste et prête à évoluer sur Play Store et App Store.",
    tags: ["Flutter", "Firebase", "Ionic", "Kotlin", "Java"],
    icon: Smartphone,
    href: "/services/applications-mobiles",
  },
  {
    id: "management",
    eyebrow: "03 · Gestion",
    title: "Logiciels de Gestion",
    description:
      "Des outils métier sur mesure pour simplifier vos opérations et fiabiliser vos données.",
    benefit: "Un système adapté à vos processus, sans vous imposer une solution standard.",
    tags: ["ERP", "CRM", "RH", "Facturation", "Spring Boot"],
    icon: Monitor,
    href: "/services/logiciels-gestion",
  },
  {
    id: "training",
    eyebrow: "04 · Transmission",
    title: "Formations & Coaching Tech",
    description:
      "Des parcours concrets pour développer les compétences numériques de vos équipes et talents.",
    benefit: "Une montée en compétence progressive, en présentiel, en ligne ou en hybride.",
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
              De la première idée au produit en production, nous construisons
              des solutions digitales utiles, durables et adaptées à votre réalité.
            </p>
            <Link className="services-page__hero-link" href="#expertises">
              Explorer nos services
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
              <p className="services-page__eyebrow">Ce que nous faisons</p>
              <h2 id="expertises-title">
                Une équipe pour chaque étape de votre transformation digitale.
              </h2>
              <p>
                Notre expertise full-stack locale nous permet de vous accompagner
                avec une seule équipe, de la stratégie au déploiement.
              </p>
            </header>

            <motion.div
              className="services-page__grid"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {SERVICES.map(({ id, eyebrow, title, description, benefit, tags, icon: Icon, href }) => (
                <motion.article
                  className={`services-detail-card services-detail-card--${id}`}
                  key={id}
                  variants={cardVariants}
                >
                  <div className="services-detail-card__topline">
                    <span className="services-detail-card__icon" aria-hidden="true">
                      <Icon size={25} strokeWidth={1.7} />
                    </span>
                    <span className="services-detail-card__eyebrow">{eyebrow}</span>
                  </div>
                  <h3>{title}</h3>
                  <p className="services-detail-card__description">{description}</p>
                  <p className="services-detail-card__benefit">
                    <Check size={17} strokeWidth={2} aria-hidden="true" />
                    {benefit}
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
                    Découvrir l&apos;expertise
                    <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </motion.article>
              ))}
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
              <p className="services-page__eyebrow">Notre méthode</p>
              <h2 id="method-title">Un accompagnement simple, de l&apos;idée à l&apos;impact.</h2>
            </div>
            <ol className="services-page__steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Comprendre</h3>
                  <p>Nous clarifions vos objectifs, vos utilisateurs et vos priorités.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Construire</h3>
                  <p>Nous concevons, développons et testons une solution utile.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Faire évoluer</h3>
                  <p>Nous restons à vos côtés pour mesurer, améliorer et transmettre.</p>
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
