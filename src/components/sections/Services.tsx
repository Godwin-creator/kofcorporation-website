"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Globe, GraduationCap, Monitor, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./Services.css";
import { Link } from "@/i18n/navigation";

interface Service {
  id: string;
  tags: string[];
  icon: LucideIcon;
  href: string;
  external?: boolean;
}

const SERVICES: Service[] = [
  {
    id: "web",
    tags: ["Laravel", "Vue.js", "Spring Boot", "Firebase"],
    icon: Globe,
    href: "/services/developpement-web",
  },
  {
    id: "mobile",
    tags: ["Flutter", "Firebase", "Ionic", "Kotlin"],
    icon: Smartphone,
    href: "/services/applications-mobiles",
  },
  {
    id: "management",
    tags: ["JavaFX", "Spring Boot", "MySQL", "Oracle"],
    icon: Monitor,
    href: "/services/logiciels-gestion",
  },
  {
    id: "training",
    tags: ["Academy", "Présentiel", "En ligne", "Hybride"],
    icon: GraduationCap,
    href: "https://academy.kofcorporation.com/",
    external: true,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={sectionRef}
      className="services" 
      aria-labelledby="services-title"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="services__inner">
        <header className="services__header">
          <p className="services__eyebrow">{t("eyebrow")}</p>
          <h2 id="services-title" className="services__title">
            {t("title")}
          </h2>
        </header>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map(({ id, tags, icon: Icon, href, external }) => {
            const title = t(`items.${id}.title`);
            const linkLabel = (
              <>
                {t("learnMore")} <span aria-hidden="true">→</span>
              </>
            );
            return (
            <motion.article className="service-card" key={id} variants={cardVariants}>
              <div className="service-card__icon" aria-hidden="true">
                <Icon size={25} strokeWidth={1.7} />
              </div>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__description">{t(`items.${id}.description`)}</p>
              <ul className="service-card__tags" aria-label={t("technologies", { title })}>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {external ? (
                <a
                  className="service-card__link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkLabel}
                </a>
              ) : (
                <Link className="service-card__link" href={href}>
                  {linkLabel}
                </Link>
              )}
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}