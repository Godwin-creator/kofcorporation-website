"use client"

import {useRef, useState, useEffect} from "react"
import {useTranslations} from "next-intl"
import {motion, useInView} from "framer-motion"
import {ArrowRight, Globe, Smartphone, Monitor, GraduationCap} from "lucide-react"
import type {LucideIcon} from "lucide-react"
import {Link} from "@/i18n/navigation"
import "./Services.css"
import Watermark from "@/components/ui/Watermark"
import ScrollWordReveal from "@/components/ui/ScrollWordReveal"

// ─── Hardcoded service data — the `stack` arrays are defaults; they get ──
// ─── overridden by Sanity data when available (via the `sanityStacks` prop). ──
export interface StaticService {
  id: string
  titleFr: string
  titleEn: string
  summaryFr: string
  summaryEn: string
  defaultStack: string[]
  Icon: LucideIcon
  href: string
}

const STATIC_SERVICES: StaticService[] = [
  {
    id: "developpement-web",
    titleFr: "Développement Web & Applications",
    titleEn: "Web & Application Development",
    summaryFr: "Des sites vitrines, plateformes web et applications métier conçus autour de vos objectifs.",
    summaryEn: "Showcase sites, web platforms and business applications built around your goals.",
    defaultStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Vercel"],
    Icon: Globe,
    href: "/services/developpement-web",
  },
  {
    id: "applications-mobiles",
    titleFr: "Applications Mobiles",
    titleEn: "Mobile Applications",
    summaryFr: "Des expériences Android et iOS fluides, pensées pour vos utilisateurs et votre croissance.",
    summaryEn: "Smooth Android and iOS experiences, designed for your users and your growth.",
    defaultStack: ["React Native", "Expo", "Flutter", "Firebase", "iOS", "Android"],
    Icon: Smartphone,
    href: "/services/applications-mobiles",
  },
  {
    id: "logiciels-gestion",
    titleFr: "Logiciels de Gestion",
    titleEn: "Business Management Software",
    summaryFr: "Des outils métier sur mesure pour simplifier vos opérations et fiabiliser vos données.",
    summaryEn: "Tailor-made business tools to streamline your operations and secure your data.",
    defaultStack: ["Electron", "Python", "Django", "PostgreSQL", "SQLite", "Docker"],
    Icon: Monitor,
    href: "/services/logiciels-gestion",
  },
  {
    id: "formation",
    titleFr: "Formation & Renforcement",
    titleEn: "Training & Capacity Building",
    summaryFr: "Des programmes de formation pratiques pour monter en compétences sur les technologies modernes.",
    summaryEn: "Hands-on training programs to upskill your team on modern technologies.",
    defaultStack: ["Academy", "Présentiel", "En ligne", "Hybride", "Certifications"],
    Icon: GraduationCap,
    href: "https://academy.kofcorporation.com/",
  },
]

const sectionVariants = {hidden: {opacity: 0, y: 60}, visible: {opacity: 1, y: 0, transition: {duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number]}}}
const containerVariants = {hidden: {}, visible: {transition: {staggerChildren: 0.13, delayChildren: 0.25}}}
const cardVariants = {hidden: {opacity: 0, y: 50, scale: 0.95}, visible: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number]}}}

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
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true); }, [])

  return (
    <motion.section ref={sectionRef} id="services" className="services" aria-labelledby="services-title" variants={sectionVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {loaded && <><Watermark id="services" /><ScrollWordReveal textKey="servicesStatement" /></>}
      <div className="services__inner">
        <header className="services__header"><h2 id="services-title" className="services__title">{t("title")}</h2></header>
        <motion.div className="services__grid" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {STATIC_SERVICES.map(({id, titleFr, titleEn, summaryFr, summaryEn, defaultStack, Icon, href}) => {
            // Use Sanity stack if available, otherwise use hardcoded default
            const stack = (sanityStacks?.[id]?.length ? sanityStacks[id] : defaultStack)
            const isExternal = href.startsWith("http")
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
