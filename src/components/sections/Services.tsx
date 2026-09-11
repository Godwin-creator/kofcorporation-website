"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Globe, GraduationCap, Monitor, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import "./Services.css";

interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}

const SERVICES: Service[] = [
  {
    id: "web",
    title: "Développement Web & Applications",
    description: "Sites vitrines, plateformes web et applications métier sur mesure.",
    tags: ["Laravel", "Vue.js", "Spring Boot", "Firebase"],
    icon: Globe,
  },
  {
    id: "mobile",
    title: "Applications Mobiles",
    description: "Applications Android/iOS natives et cross-platform, pensées pour durer.",
    tags: ["Flutter", "Firebase", "Ionic", "Kotlin"],
    icon: Smartphone,
  },
  {
    id: "management",
    title: "Logiciels de Gestion",
    description: "Logiciels métier sur mesure pour l'ERP, le CRM, les RH et la facturation.",
    tags: ["JavaFX", "Spring Boot", "MySQL", "Oracle"],
    icon: Monitor,
  },
  {
    id: "training",
    title: "Formations & Coaching Tech",
    description: "Formation en développement web, mobile et outils numériques pour chaque parcours.",
    tags: ["Academy", "Présentiel", "En ligne", "Hybride"],
    icon: GraduationCap,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Services() {
  const t = useTranslations("services");
  const servicesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(servicesRef, { once: true, amount: 0.2 });

  return (
    <section className="services" aria-labelledby="services-title">
      <div className="services__inner">
        <header className="services__header">
          <p className="services__eyebrow">{t("eyebrow")}</p>
          <h2 id="services-title" className="services__title">
            {t("title")}
          </h2>
        </header>

        <motion.div
          ref={servicesRef}
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map(({ id, tags, icon: Icon }) => {
            const title = t(`items.${id}.title`);
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
              <Link className="service-card__link" href="/services">
                {t("learnMore")} <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}