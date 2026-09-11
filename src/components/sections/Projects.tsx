"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Heart, HeartPulse, Home } from "lucide-react";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  sector: string;
  description: string;
  tags: string[];
  url: string;
  icon: typeof Heart;
}

const PROJECTS: Project[] = [
  {
    id: "aoa-togo",
    title: "AOA Togo",
    sector: "ONG",
    description: "Site vitrine pour une ONG, avec CMS headless et déploiement continu.",
    tags: ["React 19", "Tailwind", "Sanity CMS", "Vercel"],
    url: "https://aoa-togo.org",
    icon: Heart,
  },
  {
    id: "jeunesse-plus",
    title: "JeunessePlus",
    sector: "Santé",
    description: "Plateforme dédiée à l'éducation sexuelle et reproductive, avec quiz, forum et ligne verte.",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://jeunesse-plus.com",
    icon: HeartPulse,
  },
  {
    id: "elycha",
    title: "Elycha",
    sector: "Immobilier / Auto",
    description: "Application d'annonces immobilières et automobiles avec favoris et notifications en temps réel.",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://elycha.com",
    icon: Home,
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

export default function Projects() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={sectionRef}
      className="projects" 
      aria-labelledby="projects-title"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="projects__inner">
        <header className="projects__header">
          <div className="projects__heading">
            <p className="projects__eyebrow">{t("eyebrow")}</p>
            <h2 id="projects-title" className="projects__title">
              {t("title")}
            </h2>
          </div>
          <a className="projects__all-link" href="/realisations">
            {t("viewAll")} <span aria-hidden="true">→</span>
          </a>
        </header>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROJECTS.map(({ id, title, sector, description, tags, url, icon: Icon }) => (
            <motion.article className="project-card" key={id} variants={cardVariants}>
              <div className={`project-card__visual project-card__visual--${id}`} aria-label={t("preview", { title })}>
                <span className="project-card__visual-mark" aria-hidden="true">
                  <Icon size={56} strokeWidth={1.4} />
                </span>
                <span className="project-card__visual-name">{title}</span>
              </div>

              <div className="project-card__body">
                <span className="project-card__sector">{sector}</span>
                <div className="project-card__title-row">
                  <h3 className="project-card__title">{title}</h3>
                  <a
                    className="project-card__external-link"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t("visit", { title })}
                  >
                    <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </div>
                <p className="project-card__description">{description}</p>
                <ul className="project-card__tags" aria-label={t("technologies", { title })}>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}