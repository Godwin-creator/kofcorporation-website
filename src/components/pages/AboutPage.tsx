"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Handshake,
  Layers3,
  MapPin,
  Users,
} from "lucide-react";
import "./AboutPage.css";

const VALUES = [
  {
    title: "Expertise full-stack locale",
    description: "Web, mobile et logiciel réunis dans une même équipe.",
    icon: Code2,
  },
  {
    title: "Stack moderne & éprouvée",
    description: "Des technologies choisies pour leur fiabilité et leur capacité à évoluer.",
    icon: Layers3,
  },
  {
    title: "Formation & transmission",
    description: "Nous livrons des solutions et transmettons les compétences pour les faire vivre.",
    icon: GraduationCap,
  },
  {
    title: "Proximité & réactivité",
    description: "Une équipe basée à Lomé, disponible et engagée à chaque étape.",
    icon: Handshake,
  },
];

const STORY_STEPS = [
  {
    number: "01",
    title: "Écouter avant de construire",
    description:
      "Nous commençons par comprendre votre activité, vos utilisateurs et les contraintes qui comptent vraiment.",
  },
  {
    number: "02",
    title: "Transformer une idée en produit",
    description:
      "Nous concevons une expérience claire et développons une solution robuste, adaptée à vos priorités.",
  },
  {
    number: "03",
    title: "Grandir avec vous",
    description:
      "Notre accompagnement continue après la mise en ligne pour faire évoluer le produit et les équipes.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="about-page">
        <motion.section
          className="about-page__hero"
          aria-labelledby="about-title"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="about-page__hero-inner">
            <p className="about-page__eyebrow">Qui sommes-nous ?</p>
            <h1 id="about-title">Une équipe locale. Des standards internationaux.</h1>
            <p>
              KofCorporation est une société informatique togolaise qui conçoit
              des applications web, mobiles et des logiciels sur mesure pour
              faire avancer les organisations.
            </p>
            <Link href="#notre-mission" className="about-page__hero-link">
              Découvrir notre histoire
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </motion.section>

        <motion.section
          id="notre-mission"
          className="about-page__mission"
          aria-labelledby="mission-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="about-page__container about-page__mission-grid">
            <div>
              <p className="about-page__eyebrow">Notre mission</p>
              <h2 id="mission-title">
                Rendre la technologie utile, accessible et durable.
              </h2>
            </div>
            <div className="about-page__mission-copy">
              <p>
                Nous croyons qu&apos;une bonne solution digitale commence par
                une compréhension précise du terrain. Notre rôle est de rendre
                la complexité simple à utiliser, pour les équipes comme pour
                leurs publics.
              </p>
              <p>
                Depuis Lomé, nous accompagnons PME, startups, ONG et institutions
                avec une approche de bout en bout : conseil, design, développement,
                déploiement et transmission.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="about-page__values" aria-labelledby="values-title">
          <div className="about-page__container">
            <header className="about-page__section-header">
              <div>
                <p className="about-page__eyebrow">Ce qui nous guide</p>
                <h2 id="values-title">Une manière de travailler construite sur quatre forces.</h2>
              </div>
              <p>
                La proximité n&apos;est pas un compromis sur l&apos;exigence :
                c&apos;est ce qui nous permet de mieux comprendre et mieux livrer.
              </p>
            </header>

            <div className="about-page__values-grid">
              {VALUES.map(({ title, description, icon: Icon }) => (
                <article className="about-value-card" key={title}>
                  <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          className="about-page__story"
          aria-labelledby="story-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="about-page__container about-page__story-grid">
            <div>
              <p className="about-page__eyebrow">Notre façon d&apos;avancer</p>
              <h2 id="story-title">Du premier échange à l&apos;impact.</h2>
              <p className="about-page__story-intro">
                Une méthode claire pour garder le cap, prendre les bonnes décisions
                et construire avec confiance.
              </p>
            </div>
            <ol className="about-page__story-list">
              {STORY_STEPS.map(({ number, title, description }) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        <section className="about-page__team" aria-labelledby="team-title">
          <div className="about-page__container about-page__team-grid">
            <div className="about-page__team-mark" aria-hidden="true">
              <Users size={64} strokeWidth={1.1} />
            </div>
            <div>
              <p className="about-page__eyebrow">L&apos;équipe</p>
              <h2 id="team-title">Des profils qui aiment résoudre les vrais problèmes.</h2>
              <p>
                Notre équipe réunit des développeurs, designers et formateurs
                engagés à construire des produits utiles depuis Lomé.
              </p>
              <div className="about-page__founder">
                <div>
                  <strong>Omar Farouk KOUGBADA</strong>
                  <span>Fondateur &amp; CEO</span>
                </div>
                <span className="about-page__location">
                  <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
                  Lomé, Togo
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Link href="/contact" className="about-page__contact">
        Parlons de votre projet
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </>
  );
}
