"use client"

import {useMemo, useState} from "react"
import {useTranslations} from "next-intl"
import {motion} from "framer-motion"
import {ArrowUpRight, Building2, ExternalLink, Heart, HeartPulse, Home, Landmark, MessagesSquare, Smartphone} from "lucide-react"
import type {LucideIcon} from "lucide-react"
import {Link} from "@/i18n/navigation"
import type {SanityProject, ProjectCategory} from "@/types/sanity"
import ProjectModal from "@/components/ui/ProjectModal"
import EmptyState from "@/components/ui/EmptyState"
import "./RealisationsPage.css"
import Watermark from "@/components/ui/Watermark";

export interface RealisationItem {
  project: SanityProject
  imageUrl?: string
  title: string
  sector: string
  client: string
  description: string
  features: string
  tags: string[]
  icon: string
}

const ICONS: Record<string, LucideIcon> = {Heart, HeartPulse, Home, Building2, Smartphone, Landmark}
const CATEGORIES: Array<ProjectCategory | "all"> = ["all", "web", "mobile", "logiciel", "formation"]
const containerVariants = {hidden: {}, visible: {transition: {staggerChildren: 0.08}}}
const cardVariants = {hidden: {opacity: 0, y: 24}, visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: "easeOut" as const}}}

export default function RealisationsClient({projects}: {projects: RealisationItem[]}) {
  const t = useTranslations("pages")
  const tProjects = useTranslations("projectsPage")
  const [category, setCategory] = useState<ProjectCategory | "all">("all")
  const [visibleCount, setVisibleCount] = useState(6)
  const [selectedProject, setSelectedProject] = useState<RealisationItem | null>(null)
  const filteredProjects = useMemo(() => projects.filter((project) => category === "all" || project.project.category === category), [category, projects])
  const visibleProjects = filteredProjects.slice(0, visibleCount)

  return <>
    <div className="realisations-page">
      <Watermark id="realisations_page" />
      <motion.section className="realisations-page__hero" aria-labelledby="realisations-title" initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, ease: "easeOut"}}>
        <div className="realisations-page__hero-inner"><p className="realisations-page__eyebrow">{t("projectsEyebrow")}</p><h1 id="realisations-title"><span className="realisations-page__hero-title-line">{t("projectsTitle")}</span><br /><span className="realisations-page__hero-title-line realisations-page__hero-title-highlight">{t("projectsHighlight")}</span></h1><p>{tProjects("hero.description")}</p><Link href="#projets" className="realisations-page__hero-link">{tProjects("hero.cta")}<ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></Link></div>
      </motion.section>
      <section id="projets" className="realisations-page__projects" aria-labelledby="projects-page-title">
        <div className="realisations-page__container"><header className="realisations-page__section-header"><div><p className="realisations-page__eyebrow">{tProjects("portfolio.eyebrow")}</p><h2 id="projects-page-title">{tProjects("portfolio.title")}</h2></div><p>{tProjects("portfolio.description")}</p></header>
          <div className="realisations-page__filters" role="group" aria-label={tProjects("filters.label")}>{CATEGORIES.map((value) => <button key={value} type="button" className={category === value ? "is-active" : ""} onClick={() => {setCategory(value); setVisibleCount(6)}}>{tProjects(`filters.${value}`)}</button>)}</div>
          {visibleProjects.length ? <motion.div className="realisations-page__grid" variants={containerVariants} initial="hidden" animate="visible">{visibleProjects.map((project) => {const Icon = ICONS[project.icon] ?? Heart; return <motion.article className={`realisation-card realisation-card--${project.project._id}`} key={project.project._id} variants={cardVariants}><div className="realisation-card__visual" style={project.imageUrl ? {backgroundImage: `url(${project.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center"} : undefined}><span className="realisation-card__icon" aria-hidden="true"><Icon size={48} strokeWidth={1.35} /></span><span className="realisation-card__sector">{project.sector}</span></div><div className="realisation-card__body"><div className="realisation-card__meta"><span>{tProjects("card.client")}</span><strong>{project.client}</strong></div><div className="realisation-card__title-row"><h3>{project.title}</h3>{project.project.url && <a href={project.project.url} target="_blank" rel="noreferrer" aria-label={`${tProjects("card.visit")}${project.title}`}><ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" /></a>}</div><p className="realisation-card__description">{project.description}</p>{project.features && <p className="realisation-card__features"><MessagesSquare size={16} strokeWidth={1.8} aria-hidden="true" />{project.features}</p>}<ul aria-label={`${tProjects("card.technologies")}${project.title}`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><button type="button" className="realisation-card__details" onClick={() => setSelectedProject(project)}>{tProjects("details")}</button></div></motion.article>})}</motion.div> : <EmptyState message={projects.length ? tProjects("emptyFilter") : tProjects("empty")} />}
          {visibleCount < filteredProjects.length && <button type="button" className="realisations-page__load-more" onClick={() => setVisibleCount((count) => count + 3)}>{tProjects("loadMore")}</button>}
        </div>
      </section>
    </div>
    <ProjectModal project={selectedProject?.project ?? null} imageUrl={selectedProject?.imageUrl} isOpen={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} />
  </>
}
