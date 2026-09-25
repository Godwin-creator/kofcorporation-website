"use client"

import {useRef} from 'react'
import {useTranslations} from 'next-intl'
import {motion, useInView} from 'framer-motion'
import Image from 'next/image'
import './Partners.css'
import EmptyState from '@/components/ui/EmptyState'

export interface PartnerItem {id: string; name: string; logo: string; url?: string}
const sectionVariants = {hidden: {opacity: 0, y: 40}, visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: 'easeOut' as const}}}

export default function PartnersClient({partners}: {partners: PartnerItem[]}) {
  const t = useTranslations('partners')
  const marqueeItems = [...partners, ...partners]; const sectionRef = useRef<HTMLElement>(null); const isInView = useInView(sectionRef, {once: true, margin: '-100px'})
  return <motion.section ref={sectionRef} className="partners" aria-label={t('ariaLabel')} variants={sectionVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}><div className="partners__inner"><h2 className="partners__title">{t('title')}</h2>{partners.length ? <div className="partners__marquee-wrapper"><div className="partners__marquee-track">{marqueeItems.map((partner, index) => <div key={`${partner.id}-${index}`} className="partner-logo-frame" aria-hidden={index >= partners.length}><Image className="partner-logo" src={partner.logo} alt={index < partners.length ? partner.name : ''} width={160} height={64}/></div>)}</div></div> : <EmptyState message={t('empty')} />}</div></motion.section>
}