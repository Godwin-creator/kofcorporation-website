"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  sector: string;
  description: string;
  tags: string[];
  url: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    id: "aoa-togo",
    title: "AOA Togo",
    sector: "ONG",
    description: "Site vitrine pour une ONG, avec CMS headless et déploiement continu.",
    tags: ["React 19", "Tailwind", "Sanity CMS", "Vercel"],
    url: "https://aoa-togo.org",
    accent: "A",
  },
  {
    id: "jeunesse-plus",
    title: "JeunessePlus",
    sector: "Santé",
    description: "Plateforme dédiée à l'éducation sexuelle et reproductive, avec quiz, forum et ligne verte.",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://jeunesse-plus.com",
    accent: "J",
  },
  {
    id: "elycha",
    title: "Elycha",
    sector: "Immobilier / Auto",
    description: "Application d'annonces immobilières et automobiles avec favoris et notifications en temps réel.",
    tags: ["Laravel", "Flutter", "Firebase", "MySQL"],
    url: "https://elycha.com",
    accent: "E",
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

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true, amount: 0.2 });

  return (
    <section className="projects" aria-labelledby="projects-title">
      <div className="projects__inner">
        <header className="projects__header">
          <div className="projects__heading">
            <p className="projects__eyebrow">Nos réalisations</p>
            <h2 id="projects-title" className="projects__title">
              Des projets qui transforment les idées en impact
            </h2>
          </div>
          <a className="projects__all-link" href="#">
            Voir tous les projets <span aria-hidden="true">→</span>
          </a>
        </header>

        <motion.div
          ref={projectsRef}
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PROJECTS.map(({ id, title, sector, description, tags, url, accent }) => (
            <motion.article className="project-card" key={id} variants={cardVariants}>
              <div className={`project-card__visual project-card__visual--${id}`} aria-label={`Aperçu de ${title}`}>
                <span className="project-card__visual-mark" aria-hidden="true">
                  {accent}
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
                    aria-label={`Visiter le site de ${title}`}
                  >
                    <ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </div>
                <p className="project-card__description">{description}</p>
                <ul className="project-card__tags" aria-label={`Technologies utilisées pour ${title}`}>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}