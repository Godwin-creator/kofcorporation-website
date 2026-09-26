"use client"

import {useRef} from "react"
import {useTranslations} from "next-intl"
import {motion, useInView} from "framer-motion"
import {ArrowRight, Clock, Code2, FolderCheck, Globe, GraduationCap, Lightbulb, Monitor, Shield, Smartphone, Star, TrendingUp, Users} from "lucide-react"
import type {LucideIcon} from "lucide-react"
import {Link} from "@/i18n/navigation"
import EmptyState from "@/components/ui/EmptyState"
import "./Services.css"
import Watermark from "@/components/ui/Watermark";

export interface ServiceItem {
  id: string
  title: string
  summary: string
  stack: string[]
  icon: string
  href: string
  external?: boolean
}

const ICONS: Record<string, LucideIcon> = {Clock, FolderCheck, Star, GraduationCap, Globe, Smartphone, Monitor, Code2, Users, TrendingUp, Shield, Lightbulb}
const sectionVariants = {hidden: {opacity: 0, y: 40}, visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut" as const}}}
const containerVariants = {hidden: {}, visible: {transition: {staggerChildren: 0.1, delayChildren: 0.2}}}
const cardVariants = {hidden: {opacity: 0, y: 40}, visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: "easeOut" as const}}}

export default function ServicesClient({services}: {services: ServiceItem[]}) {
  const t = useTranslations("services")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {once: true, margin: "-100px"})

  return <motion.section ref={sectionRef} id="services" className="services" aria-labelledby="services-title" variants={sectionVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}><Watermark id="services" /><div className="services__inner">
      <header className="services__header"><h2 id="services-title" className="services__title">{t("title")}</h2></header>
      <motion.div className="services__grid" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {services.length ? services.map((service) => {
          const Icon = ICONS[service.icon] ?? Globe
          const linkLabel = <>{t("learnMore")} <ArrowRight size={16} aria-hidden="true" /></>
          return <motion.article className="service-card" key={service.id} variants={cardVariants}>
            <div className="service-card__icon" aria-hidden="true"><Icon size={25} strokeWidth={1.7} /></div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__description">{service.summary}</p>
            <ul className="service-card__tags" aria-label={t("technologies", {title: service.title})}>{service.stack.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            {service.external ? <a className="service-card__link" href={service.href} target="_blank" rel="noopener noreferrer">{linkLabel}</a> : <Link className="service-card__link" href={service.href}>{linkLabel}</Link>}
          </motion.article>
        }) : <EmptyState message={t("empty")} />}
      </motion.div>
    </div>
  </motion.section>
}
