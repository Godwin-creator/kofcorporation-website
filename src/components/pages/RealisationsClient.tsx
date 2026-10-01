"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Globe2,
  GraduationCap,
  MessagesSquare,
  Monitor,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SanityProject, ProjectCategory } from "@/types/sanity";
import ProjectModal from "@/components/ui/ProjectModal";
import EmptyState from "@/components/ui/EmptyState";
import "./RealisationsPage.css";
import Watermark from "@/components/ui/Watermark";

export interface RealisationItem {
  project: SanityProject;
  imageUrl?: string;
  title: string;
  sector: string;
  client: string;
  description: string;
  features: string;
  tags: string[];
  icon: string;
  categories: ProjectCategory[];
  url: string;
}

const CATEGORY_ICONS: Record<ProjectCategory, LucideIcon> = {
  web: Globe2,
  mobile: Smartphone,
  logiciel: Monitor,
  formation: GraduationCap,
};
const CATEGORIES: Array<ProjectCategory | "all"> = [
  "all",
  "web",
  "mobile",
  "logiciel",
  "formation",
];
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function RealisationsClient({
  projects,
}: {
  projects: RealisationItem[];
}) {
  const t = useTranslations("pages");
  const tProjects = useTranslations("projectsPage");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] =
    useState<RealisationItem | null>(null);
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          category === "all" || project.categories.includes(category),
      ),
    [category, projects],
  );
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  return (
    <>
      <div className="realisations-page">
        <Watermark id="realisations_page" />
        <motion.section
          className="realisations-page__hero"
          aria-labelledby="realisations-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="realisations-page__hero-inner">
            {/* <p className="realisations-page__eyebrow">{t("projectsEyebrow")}</p> */}
            <h1 id="realisations-title">
              <span className="realisations-page__hero-title-line">
                {t("projectsTitle")}
              </span>
              <br />
              <span className="realisations-page__hero-title-line realisations-page__hero-title-highlight">
                {t("projectsHighlight")}
              </span>
            </h1>
            <br />
            <p>{tProjects("hero.description")}</p>
            {/* <Link href="#projets" className="realisations-page__hero-link">
              {tProjects("hero.cta")}
              <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </Link> */}
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
                <h2 id="projects-page-title" className="realisations-page__section-title">
                  {tProjects("portfolio.eyebrow")}
                </h2>
                <p className="realisations-page__section-subtitle">{tProjects("portfolio.title")}</p>
              </div>
              <p>{tProjects("portfolio.description")}</p>
            </header>
            <div
              className="realisations-page__filters"
              role="group"
              aria-label={tProjects("filters.label")}
            >
              {CATEGORIES.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={category === value ? "is-active" : ""}
                  onClick={() => {
                    setCategory(value);
                    setVisibleCount(6);
                  }}
                >
                  {tProjects(`filters.${value}`)}
                </button>
              ))}
            </div>
            {visibleProjects.length ? (
              <motion.div
                className="realisations-page__grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {visibleProjects.map((project) => {
                  return (
                    <motion.article
                      className={`realisation-card realisation-card--${project.project._id}`}
                      key={project.project._id}
                      variants={cardVariants}
                    >
                      <div
                        className="realisation-card__visual"
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
                        {project.categories.length > 0 && (
                          <span
                            className="realisation-card__icon"
                            role="img"
                            aria-label={project.categories
                              .map((projectCategory) =>
                                tProjects(`filters.${projectCategory}`),
                              )
                              .join(", ")}
                          >
                            {project.categories.map((projectCategory) => {
                              const CategoryIcon = CATEGORY_ICONS[projectCategory];
                              return (
                                <CategoryIcon
                                  key={projectCategory}
                                  size={18}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                />
                              );
                            })}
                          </span>
                        )}
                        <span className="realisation-card__sector">
                          {project.sector}
                        </span>
                      </div>
                      <div className="realisation-card__body">
                        <div className="realisation-card__meta">
                          <span>{tProjects("card.client")}</span>
                          <strong>{project.client}</strong>
                        </div>
                        <div className="realisation-card__title-row">
                          <h3>{project.title}</h3>
                          {project.url !== "#" && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${tProjects("card.visit")}${project.title}`}
                            >
                              <ExternalLink
                                size={18}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            </a>
                          )}
                        </div>
                        <p className="realisation-card__description">
                          {project.description}
                        </p>
                        {project.features && (
                          <p className="realisation-card__features">
                            <MessagesSquare
                              size={16}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                            {project.features}
                          </p>
                        )}
                        <ul
                          aria-label={`${tProjects("card.technologies")}${project.title}`}
                        >
                          {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="realisation-card__details"
                          onClick={() => setSelectedProject(project)}
                        >
                          {tProjects("details")}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <EmptyState
                message={
                  projects.length
                    ? tProjects("emptyFilter")
                    : tProjects("empty")
                }
              />
            )}
            {(visibleCount < filteredProjects.length || visibleCount > 6) && (
              <div className="realisations-page__actions">
                {visibleCount < filteredProjects.length && (
                  <button
                    type="button"
                    className="realisations-page__load-more"
                    onClick={() => setVisibleCount((count) => count + 6)}
                  >
                    {tProjects("loadMore")}
                  </button>
                )}
                {visibleCount > 6 && (
                  <button
                    type="button"
                    className="realisations-page__show-less"
                    onClick={() => {
                      setVisibleCount(6);
                      document
                        .getElementById("projets")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {tProjects("showLess")}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      <ProjectModal
        project={selectedProject?.project ?? null}
        imageUrl={selectedProject?.imageUrl}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
