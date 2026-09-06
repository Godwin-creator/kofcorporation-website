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
  title: string;
  sector: string;
  client: string;
  description: string;
  features: string;
  tags: string[];
  url: string;
  icon: LucideIcon;
}

const PROJECTS: Project[] = [
  {
    id: "aoa-togo",
    title: "AOA Togo",
    sector: "ONG",
    client: "ONG AOA",
    description:
      "Une présence digitale claire pour mieux présenter les actions et l'impact de l'organisation.",
    features: "Site vitrine, CMS headless et déploiement continu.",
    tags: ["React 19", "Tailwind", "Sanity CMS", "Vercel"],
    url: "https://aoa-togo.org",
    icon: Heart,
  },
  {
    id: "jeunesse-plus",
    title: "JeunessePlus",
    sector: "Santé",
    client: "Jhpiego",
    description:
      "Une plateforme accessible pour informer et accompagner les jeunes sur leur santé sexuelle et reproductive.",
    features: "Quiz, forum, contenus éducatifs et ligne verte.",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://jeunesse-plus.com",
    icon: HeartPulse,
  },
  {
    id: "elycha",
    title: "Elycha",
    sector: "Immobilier / Auto",
    client: "Elycha",
    description:
      "Une expérience de recherche fluide pour trouver, sauvegarder et suivre des annonces.",
    features: "Annonces, favoris et notifications en temps réel.",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://elycha.com",
    icon: Home,
  },
  {
    id: "golden-group",
    title: "Golden Group Technologies",
    sector: "Services tech",
    client: "Golden Group Technologies SARL",
    description:
      "Des outils numériques pour structurer l'activité et soutenir le développement commercial.",
    features: "Centre d'appel, étude de marché et formation commerciale.",
    tags: ["React", "Spring Boot", "PostgreSQL"],
    url: "https://goldengrouptechnologies.com",
    icon: Building2,
  },
  {
    id: "muslim-togo",
    title: "Muslim Togo",
    sector: "Communautaire",
    client: "KofCorporation",
    description:
      "Une application mobile pensée pour accompagner les pratiques quotidiennes de sa communauté.",
    features: "Coran audio, horaires de prière, Qibla et calendrier islamique.",
    tags: ["Flutter", "Firebase", "Mobile"],
    url: "https://muslimtogo.kofcorporation.com",
    icon: Smartphone,
  },
  {
    id: "groupe-cat",
    title: "Groupe CAT",
    sector: "Juridique",
    client: "Groupe CAT",
    description:
      "Un site institutionnel qui rend les expertises juridiques plus lisibles et accessibles.",
    features: "Services juridiques, audits et formations.",
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
              Nous concevons des expériences digitales qui répondent à des
              besoins réels et créent un impact durable pour leurs utilisateurs.
            </p>
            <Link href="#projets" className="realisations-page__hero-link">
              Voir les projets
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
                <p className="realisations-page__eyebrow">Portfolio</p>
                <h2 id="projects-page-title">
                  Des projets pensés pour durer.
                </h2>
              </div>
              <p>
                Chaque projet commence par l&apos;écoute et se construit avec
                une attention particulière portée à l&apos;usage, à la clarté et
                à la qualité technique.
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
                ({ id, title, sector, client, description, features, tags, url, icon: Icon }) => (
                  <motion.article
                    className={`realisation-card realisation-card--${id}`}
                    key={id}
                    variants={cardVariants}
                  >
                    <div className="realisation-card__visual">
                      <span className="realisation-card__icon" aria-hidden="true">
                        <Icon size={48} strokeWidth={1.35} />
                      </span>
                      <span className="realisation-card__sector">{sector}</span>
                    </div>
                    <div className="realisation-card__body">
                      <div className="realisation-card__meta">
                        <span>Client</span>
                        <strong>{client}</strong>
                      </div>
                      <div className="realisation-card__title-row">
                        <h3>{title}</h3>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visiter le site de ${title}`}
                        >
                          <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                        </a>
                      </div>
                      <p className="realisation-card__description">{description}</p>
                      <p className="realisation-card__features">
                        <MessagesSquare size={16} strokeWidth={1.8} aria-hidden="true" />
                        {features}
                      </p>
                      <ul aria-label={`Technologies utilisées pour ${title}`}>
                        {tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ),
              )}
            </motion.div>
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
