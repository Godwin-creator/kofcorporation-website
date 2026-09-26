"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Heart, HeartPulse, Home } from "lucide-react";
import "./Projects.css";
import { Link } from "@/i18n/navigation";
import ProjectModal from "@/components/ui/ProjectModal";
import EmptyState from "@/components/ui/EmptyState";
import type { SanityProject } from "@/types/sanity";
import Watermark from "@/components/ui/Watermark";

export interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  description: string;
  tags: string[];
  url: string;
  category: string;
  imageUrl?: string;
  project: SanityProject;
}
const ICONS = {
  web: Heart,
  mobile: HeartPulse,
  logiciel: Home,
  formation: Heart,
};
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ProjectsClient({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Watermark id="projects" />
      <div className="projects__inner">
        <header className="projects__header">
          <div className="projects__heading">
            <h2 id="projects-title" className="projects__title">
              {t("title")}
            </h2>
          </div>
          <Link className="projects__all-link" href="/realisations">
            {t("viewAll")} <span aria-hidden="true">→</span>
          </Link>
        </header>
        {projects.length ? (
          <motion.div
            className="projects__grid"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project) => {
              const Icon =
                ICONS[project.category as keyof typeof ICONS] ?? Heart;
              return (
                <motion.article
                  className="project-card"
                  key={project.id}
                  variants={cardVariants}
                >
                  <div
                    className={`project-card__visual project-card__visual--${project.id}`}
                    aria-label={t("preview", { title: project.title })}
                    style={
                      project.imageUrl
                        ? {
                            backgroundImage: `url(${project.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    <span
                      className="project-card__visual-mark"
                      aria-hidden="true"
                    >
                      <Icon size={56} strokeWidth={1.4} />
                    </span>
                    <span className="project-card__visual-name">
                      {project.title}
                    </span>
                  </div>
                  <div className="project-card__body">
                    <span className="project-card__sector">
                      {project.sector}
                    </span>
                    <div className="project-card__title-row">
                      <h3 className="project-card__title">{project.title}</h3>
                      {project.url !== "#" && (
                        <a
                          className="project-card__external-link"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t("visit", { title: project.title })}
                        >
                          <ExternalLink
                            size={18}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                    <p className="project-card__description">
                      {project.description}
                    </p>
                    <ul
                      className="project-card__tags"
                      aria-label={t("technologies", { title: project.title })}
                    >
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="project-card__details"
                      onClick={() => setSelectedProject(project)}
                    >
                      {t("details")}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <EmptyState message={t("empty")} />
        )}
        <ProjectModal
          project={
            selectedProject
              ? {
                  ...selectedProject.project,
                  description:
                    locale === "en"
                      ? (selectedProject.project.descriptionEn ??
                        selectedProject.project.description)
                      : selectedProject.project.description,
                }
              : null
          }
          imageUrl={selectedProject?.imageUrl}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </motion.section>
  );
}
