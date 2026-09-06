"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "./Testimonials.css";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "jhpiego",
    quote:
      "KofCorporation a su transformer un besoin complexe en une plateforme utile, accessible et adaptée aux réalités de notre public.",
    name: "Représentant Jhpiego",
    role: "Équipe projet JeunessePlus",
  },
  {
    id: "golden-group-technologies",
    quote:
      "Une équipe à l'écoute, réactive et engagée. La solution livrée nous aide à structurer nos activités et à mieux servir nos clients.",
    name: "Représentant Golden Group Technologies",
    role: "Direction des opérations",
  },
  {
    id: "aoa-togo",
    quote:
      "Nous avons apprécié la proximité de l'équipe et sa capacité à traduire notre vision en un site clair, moderne et facile à faire évoluer.",
    name: "Représentant AOA Togo",
    role: "Coordination de l'organisation",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 56 : -56,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -56 : 56,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  }),
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const autoplay = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => (currentIndex + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => window.clearInterval(autoplay);
  }, [isPaused]);

  function goToSlide(nextIndex: number) {
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  }

  function changeSlide(step: number) {
    setDirection(step > 0 ? 1 : -1);
    setActiveIndex((currentIndex) => (currentIndex + step + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <motion.section
      className="testimonials"
      aria-labelledby="testimonials-title"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonials__inner">
        <header className="testimonials__header">
          <p className="testimonials__eyebrow">Ils nous font confiance</p>
          <h2 id="testimonials-title" className="testimonials__title">
            Des collaborations qui comptent
          </h2>
        </header>

        <div className="testimonials__carousel" aria-live="polite">
          <button
            className="testimonials__control testimonials__control--previous"
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <div className="testimonials__viewport">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.article
                key={activeTestimonial.id}
                className="testimonial-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="testimonial-card__rating" aria-label="5 étoiles sur 5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={18} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="testimonial-card__quote">“{activeTestimonial.quote}”</blockquote>
                <footer className="testimonial-card__author">
                  <strong>{activeTestimonial.name}</strong>
                  <span>{activeTestimonial.role}</span>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            className="testimonials__control testimonials__control--next"
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <div className="testimonials__dots" aria-label="Sélectionner un témoignage">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              className={`testimonials__dot${index === activeIndex ? " testimonials__dot--active" : ""}`}
              key={testimonial.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Afficher le témoignage ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
