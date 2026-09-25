"use client"

import {useEffect, useRef} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {useLocale, useTranslations} from "next-intl"
import {ExternalLink, X} from "lucide-react"
import type {SanityProject} from "@/types/sanity"
import "./ProjectModal.css"

interface ProjectModalProps {
  project: SanityProject | null
  imageUrl?: string
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({project, imageUrl, isOpen, onClose}: ProjectModalProps) {
  const t = useTranslations("projectModal")
  const locale = useLocale()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    previousFocus.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "Tab") return
      const dialog = document.querySelector("[data-project-dialog]")
      const focusable = dialog?.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      previousFocus.current?.focus()
    }
  }, [isOpen, onClose])

  return <AnimatePresence>
    {isOpen && project && <motion.div className="project-modal__backdrop" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onMouseDown={(event) => {if (event.target === event.currentTarget) onClose()}}>
      <motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-project-dialog initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 24}} transition={{duration: 0.2}}>
        <button ref={closeButtonRef} className="project-modal__close" type="button" onClick={onClose} aria-label={t("close")}><X size={22} aria-hidden="true" /></button>
        {imageUrl && <div className="project-modal__image" style={{backgroundImage: `url(${imageUrl})`}} aria-label={project.image?.alt || project.title} />}
        <div className="project-modal__body">
          <p className="project-modal__category">{project.category}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <dl className="project-modal__meta"><div><dt>{t("client")}</dt><dd>{project.client}</dd></div><div><dt>{t("sector")}</dt><dd>{project.sector}</dd></div></dl>
          <p className="project-modal__description">{locale === "en" ? project.descriptionEn ?? project.description : project.description}</p>
          <ul className="project-modal__tags" aria-label={t("technologies")}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          {project.url && <a className="project-modal__link" href={project.url} target="_blank" rel="noopener noreferrer">{t("visit")} <ExternalLink size={17} aria-hidden="true" /></a>}
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>
}
