"use client"

import {useRef, useState, useEffect} from "react"
import {useTranslations} from "next-intl"
import {motion, useInView} from "framer-motion"
import {ArrowRight, Globe, Smartphone, Monitor} from "lucide-react"
import type {LucideIcon} from "lucide-react"
import {Link} from "@/i18n/navigation"
import "./Services.css"
import Watermark from "@/components/ui/Watermark"
import ScrollWordReveal from "@/components/ui/ScrollWordReveal"

// ─── Hardcoded service data — update `stack` array to reflect current techno ──
const STATIC_SERVICES: {
  id: string
  titleFr: string
  titleEn: string
  summaryFr: string
  summaryEn: string
  stack: string[]
  Icon: LucideIcon
  href: string
}[] = [
  {
    id: "developpement-web",
    titleFr: "Développement Web & Applications",
    titleEn: "Web & Application Development",
    summaryFr: "Des sites vitrines, plateformes web et applications métier conçus autour de vos objectifs.",
    summaryEn: "Showcase sites, web platforms and business applications built around your goals.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Vercel"],
    Icon: Globe,
    href: "/services/developpement-web",
  },
  {
    id: "applications-mobiles",
    titleFr: "Applications Mobiles",
    titleEn: "Mobile Applications",
    summaryFr: "Des expériences Android et iOS fluides, pensées pour vos utilisateurs et votre croissance.",
    summaryEn: "Smooth Android and iOS experiences, designed for your users and your growth.",
    stack: ["React Native", "Expo", "Flutter", "Firebase", "iOS", "Android"],
    Icon: Smartphone,
    href: "/services/applications-mobiles",
  },
  {
    id: "logiciels-gestion",
    titleFr: "Logiciels de Gestion",
    titleEn: "Business Management Software",
    summaryFr: "Des outils métier sur mesure pour simplifier vos opérations et fiabiliser vos données.",
    summaryEn: "Tailor-made business tools to streamline your operations and secure your data.",
    stack: ["Electron", "Python", "Django", "PostgreSQL", "SQLite", "Docker"],
    Icon: Monitor,
    href: "/services/logiciels-gestion",
  },
]

const sectionVariants = {hidden: {opacity: 0, y: 60}, visible: {opacity: 1, y: 0, transition: {duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number]}}}
const containerVariants = {hidden: {}, visible: {transition: {staggerChildren: 0.13, delayChildren: 0.25}}}
const cardVariants = {hidden: {opacity: 0, y: 50, scale: 0.95}, visible: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number]}}}

export default function ServicesClient({locale}: {locale: string}) {
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
          {STATIC_SERVICES.map(({id, titleFr, titleEn, summaryFr, summaryEn, stack, Icon, href}) => (
            <motion.article className="service-card" key={id} variants={cardVariants}>
              <div className="service-card__icon" aria-hidden="true"><Icon size={25} strokeWidth={1.7} /></div>
              <h3 className="service-card__title">{locale === "en" ? titleEn : titleFr}</h3>
              <p className="service-card__description">{locale === "en" ? summaryEn : summaryFr}</p>
              <ul className="service-card__tags" aria-label={t("technologies", {title: locale === "en" ? titleEn : titleFr})}>
                {stack.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <Link className="service-card__link" href={href}>
                {t("learnMore")} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
