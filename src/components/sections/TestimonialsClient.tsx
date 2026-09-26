"use client"

import {useEffect, useRef, useState} from 'react'
import {useTranslations} from 'next-intl'
import {AnimatePresence, motion, useInView} from 'framer-motion'
import {ChevronLeft, ChevronRight, Star} from 'lucide-react'
import './Testimonials.css'
import EmptyState from '@/components/ui/EmptyState'
import SectionBadge from '@/components/ui/SectionBadge'

export interface TestimonialItem {id: string; quote: string; name: string; role: string; rating: number}
const slideVariants = {enter: (direction: number) => ({opacity: 0, x: direction > 0 ? 56 : -56}), center: {opacity: 1, x: 0, transition: {duration: 0.45, ease: 'easeOut' as const}}, exit: (direction: number) => ({opacity: 0, x: direction > 0 ? -56 : 56, transition: {duration: 0.3, ease: 'easeIn' as const}})}
const sectionVariants = {hidden: {opacity: 0, y: 40}, visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: 'easeOut' as const}}}

export default function TestimonialsClient({testimonials}: {testimonials: TestimonialItem[]}) {
  const t = useTranslations('testimonials')
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {once: true, margin: '-100px'})
  const active = testimonials[activeIndex]

  useEffect(() => {
    if (isPaused || testimonials.length < 2) return
    const autoplay = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((index) => (index + 1) % testimonials.length)
    }, 5000)
    return () => window.clearInterval(autoplay)
  }, [isPaused, testimonials.length])

  function changeSlide(step: number) {
    setDirection(step > 0 ? 1 : -1)
    setActiveIndex((index) => (index + step + testimonials.length) % testimonials.length)
  }

  if (!testimonials.length) return (
    <motion.section ref={sectionRef} id="testimonials" className="testimonials" aria-labelledby="testimonials-title" variants={sectionVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
      <div className="testimonials__inner">
        <header className="testimonials__header">
          <h2 id="testimonials-title" className="testimonials__title">{t('title')}</h2>
        </header>
        <EmptyState message={t('empty')} />
      </div>
    </motion.section>
  )

  return (
    <motion.section
      ref={sectionRef}
      className="testimonials"
      aria-labelledby="testimonials-title"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SectionBadge title="Témoignages" sectionId="testimonials" />
      <div className="testimonials__inner">
        <header className="testimonials__header">
          <h2 id="testimonials-title" className="testimonials__title">{t('title')}</h2>
        </header>
        <div className="testimonials__carousel" aria-live="polite">
          <button
            className="testimonials__control testimonials__control--previous"
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label={t('previous')}
          >
            <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <div className="testimonials__viewport">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.article
                key={active.id}
                className="testimonial-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="testimonial-card__rating" aria-label={t('rating')}>
                  {Array.from({length: active.rating}, (_, index) => (
                    <Star key={index} size={18} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="testimonial-card__quote">{active.quote}</blockquote>
                <footer className="testimonial-card__author">
                  <strong>{active.name}</strong>
                  <span>{active.role}</span>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>
          <button
            className="testimonials__control testimonials__control--next"
            type="button"
            onClick={() => changeSlide(1)}
            aria-label={t('next')}
          >
            <ChevronRight size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
        <div className="testimonials__dots" aria-label={t('select')}>
          {testimonials.map((testimonial, index) => (
            <button
              className={`testimonials__dot${index === activeIndex ? ' testimonials__dot--active' : ''}`}
              key={testimonial.id}
              type="button"
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1)
                setActiveIndex(index)
              }}
              aria-label={t('show', {number: index + 1})}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
