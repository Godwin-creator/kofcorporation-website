"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ExternalLink,
  Heart,
  HeartPulse,
  Home,
  Landmark,
  MessagesSquare,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CallToAction from "@/components/sections/CallToAction";
import "./RealisationsPage.css";
import { Link } from "@/i18n/navigation";

interface Project {
  id: string;
  titleKey: string;
  sectorKey: string;
  clientKey: string;
  descriptionKey: string;
  featuresKey: string;
  tags: string[];
  url: string;
  icon: LucideIcon;
}

const PROJECTS: Project[] = [
  {
    id: "aoa-togo",
    titleKey: "aoaTogo.title",
    sectorKey: "aoaTogo.sector",
    clientKey: "aoaTogo.client",
    descriptionKey: "aoaTogo.description",
    featuresKey: "aoaTogo.features",
    tags: ["React 19", "Tailwind", "Sanity CMS", "Vercel"],
    url: "https://aoa-togo.org",
    icon: Heart,
  },
  {
    id: "jeunesse-plus",
    titleKey: "jeunessePlus.title",
    sectorKey: "jeunessePlus.sector",
    clientKey: "jeunessePlus.client",
    descriptionKey: "jeunessePlus.description",
    featuresKey: "jeunessePlus.features",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://jeunesse-plus.com",
    icon: HeartPulse,
  },
  {
    id: "elycha",
    titleKey: "elycha.title",
    sectorKey: "elycha.sector",
    clientKey: "elycha.client",
    descriptionKey: "elycha.description",
    featuresKey: "elycha.features",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://elycha.com",
    icon: Home,
  },
  {
    id: "golden-group",
    titleKey: "goldenGroup.title",
    sectorKey: "goldenGroup.sector",
    clientKey: "goldenGroup.client",
    descriptionKey: "goldenGroup.description",
    featuresKey: "goldenGroup.features",
    tags: ["React", "Spring Boot", "PostgreSQL"],
    url: "https://goldengrouptechnologies.com",
    icon: Building2,
  },
  {
    id: "muslim-togo",
    titleKey: "muslimTogo.title",
    sectorKey: "muslimTogo.sector",
    clientKey: "muslimTogo.client",
    descriptionKey: "muslimTogo.description",
    featuresKey: "muslimTogo.features",
    tags: ["Flutter", "Firebase", "Mobile"],
    url: "https://muslimtogo.kofcorporation.com",
    icon: Smartphone,
  },
  {
    id: "groupe-cat",
    titleKey: "groupeCat.title",
    sectorKey: "groupeCat.sector",
    clientKey: "groupeCat.client",
    descriptionKey: "groupeCat.description",
    featuresKey: "groupeCat.features",
    tags: ["WordPress", "PHP", "MySQL"],
    url: "https://group-cat.com",
    icon: Landmark,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function RealisationsPage() {
  const t = useTranslations("pages");
  const tProjects = useTranslations("projectsPage");
  return (
    <>
      <div className="realisations-page">
        <motion.section
          className="realisations-page__hero"
          aria-labelledby="realisations-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="realisations-page__hero-inner">
            <p className="realisations-page__eyebrow">{t("projectsEyebrow")}</p>
            <h1 id="realisations-title">
              <span className="realisations-page__hero-title-line">{t("projectsTitle")}</span>
              <br />
              <span className="realisations-page__hero-title-line realisations-page__hero-title-highlight">
                {t("projectsHighlight")}
              </span>
            </h1>
            <p>
              {tProjects("hero.description")}
            </p>
            <Link href="#projets" className="realisations-page__hero-link">
              {tProjects("hero.cta")}
              <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </motion.section>

        <section
          id="projets"
          className="realisations-page__projects"
          aria-labelledby="projects-page-title"
        >
          <div className="realisations-page__container">
            <header className="realisations-page__section-header">
              <div>
                <p className="realisations-page__eyebrow">{tProjects("portfolio.eyebrow")}</p>
                <h2 id="projects-page-title">
                  {tProjects("portfolio.title")}
                </h2>
              </div>
              <p>
                {tProjects("portfolio.description")}
              </p>
            </header>

            <motion.div
              className="realisations-page__grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {PROJECTS.map(
                ({ id, titleKey, sectorKey, clientKey, descriptionKey, featuresKey, tags, url, icon: Icon }) => {
                  const title = tProjects(titleKey);
                  return (
                    <motion.article
                      className={`realisation-card realisation-card--${id}`}
                      key={id}
                      variants={cardVariants}
                    >
                      <div className="realisation-card__visual">
                        <span className="realisation-card__icon" aria-hidden="true">
                          <Icon size={48} strokeWidth={1.35} />
                        </span>
                        <span className="realisation-card__sector">{tProjects(sectorKey)}</span>
                      </div>
                      <div className="realisation-card__body">
                        <div className="realisation-card__meta">
                          <span>{tProjects("card.client")}</span>
                          <strong>{tProjects(clientKey)}</strong>
                        </div>
                        <div className="realisation-card__title-row">
                          <h3>{title}</h3>
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${tProjects("card.visit")} ${title}`}
                          >
                            <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                          </a>
                        </div>
                        <p className="realisation-card__description">{tProjects(descriptionKey)}</p>
                        <p className="realisation-card__features">
                          <MessagesSquare size={16} strokeWidth={1.8} aria-hidden="true" />
                          {tProjects(featuresKey)}
                        </p>
                        <ul aria-label={`${tProjects("card.technologies")} ${title}`}>
                          {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </motion.div>
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
