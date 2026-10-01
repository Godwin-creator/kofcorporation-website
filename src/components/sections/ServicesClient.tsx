"use client"

import {useRef} from "react"
import {useTranslations} from "next-intl"
import {motion, useInView} from "framer-motion"
import {ArrowRight, Code2, Smartphone, Monitor, GraduationCap} from "lucide-react"
import {Link} from "@/i18n/navigation"
import "./Services.css"
import Watermark from "@/components/ui/Watermark"
import ScrollWordReveal from "@/components/ui/ScrollWordReveal"
import {SERVICES} from "@/lib/services"

// ─── Hardcoded service data — the `stack` arrays are defaults; they get ──
// ─── overridden by Sanity data when available (via the `sanityStacks` prop). ──
const sectionVariants = {hidden: {opacity: 0, y: 60}, visible: {opacity: 1, y: 0, transition: {duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number]}}}
const containerVariants = {hidden: {}, visible: {transition: {staggerChildren: 0.13, delayChildren: 0.25}}}
const cardVariants = {hidden: {opacity: 0, y: 50, scale: 0.95}, visible: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number]}}}
const ICONS = {Monitor, Smartphone, Code2, GraduationCap}

/**
 * `sanityStacks` maps a service id (e.g. "developpement-web") or slug to its
 * editable stack array from Sanity. When a mapping exists, it overrides the
 * hardcoded `defaultStack`. This lets the team update technologies from the
 * CMS without touching the codebase.
 */
export default function ServicesClient({locale, sanityStacks}: {locale: string; sanityStacks?: Record<string, string[]>}) {
  const t = useTranslations("services")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {once: true, margin: "-30% 0px -30% 0px"})

  return (
    <motion.section ref={sectionRef} id="services" className="services" aria-labelledby="services-title" variants={sectionVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      <><Watermark id="services" /><ScrollWordReveal textKey="servicesStatement" /></>
      <div className="services__inner">
        <header className="services__header"><h2 id="services-title" className="services__title">{t("title")}</h2></header>
        <motion.div className="services__grid" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {SERVICES.map(({id, icon, titleFr, titleEn, summaryFr, summaryEn, slug}) => {
            const stack = sanityStacks?.[id] ?? []
            const Icon = ICONS[icon as keyof typeof ICONS] ?? Monitor
            const href = id === "formations" ? "/services" : `/services/${slug}`
            const isExternal = false
            return (
              <motion.article className="service-card" key={id} variants={cardVariants}>
                <div className="service-card__icon" aria-hidden="true"><Icon size={25} strokeWidth={1.7} /></div>
                <h3 className="service-card__title">{locale === "en" ? titleEn : titleFr}</h3>
                <p className="service-card__description">{locale === "en" ? summaryEn : summaryFr}</p>
                <ul className="service-card__tags" aria-label={t("technologies", {title: locale === "en" ? titleEn : titleFr})}>
                  {stack.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <Link
                  className="service-card__link"
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {t("learnMore")} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
