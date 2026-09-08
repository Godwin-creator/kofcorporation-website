"use client";

import { useTranslations } from "next-intl";
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
import { Link } from "@/i18n/navigation";

const VALUES = [
  {
    titleKey: "about.values.expertise.title",
    descriptionKey: "about.values.expertise.description",
    icon: Code2,
  },
  {
    titleKey: "about.values.stack.title",
    descriptionKey: "about.values.stack.description",
    icon: Layers3,
  },
  {
    titleKey: "about.values.training.title",
    descriptionKey: "about.values.training.description",
    icon: GraduationCap,
  },
  {
    titleKey: "about.values.proximity.title",
    descriptionKey: "about.values.proximity.description",
    icon: Handshake,
  },
];

const STORY_STEPS = [
  {
    number: "01",
    titleKey: "about.story.listen.title",
    descriptionKey: "about.story.listen.description",
  },
  {
    number: "02",
    titleKey: "about.story.transform.title",
    descriptionKey: "about.story.transform.description",
  },
  {
    number: "03",
    titleKey: "about.story.grow.title",
    descriptionKey: "about.story.grow.description",
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
  const t = useTranslations("pages");
  const tAbout = useTranslations("about");
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
            <p className="about-page__eyebrow">{t("aboutEyebrow")}</p>
            <h1 id="about-title">
              <span className="about-page__hero-title-line">{t("aboutTitle")}</span>
              <br />
              <span className="about-page__hero-title-line about-page__hero-title-highlight">
                {t("aboutHighlight")}
              </span>
            </h1>
            <p>
              {tAbout("hero.description")}
            </p>
            <Link href="#notre-mission" className="about-page__hero-link">
              {tAbout("hero.cta")}
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
              <p className="about-page__eyebrow">{tAbout("mission.eyebrow")}</p>
              <h2 id="mission-title">
                {tAbout("mission.title")}
              </h2>
            </div>
            <div className="about-page__mission-copy">
              <p>
                {tAbout("mission.description1")}
              </p>
              <p>
                {tAbout("mission.description2")}
              </p>
            </div>
          </div>
        </motion.section>

        <section className="about-page__values" aria-labelledby="values-title">
          <div className="about-page__container">
            <header className="about-page__section-header">
              <div>
                <p className="about-page__eyebrow">{tAbout("values.eyebrow")}</p>
                <h2 id="values-title">{tAbout("values.title")}</h2>
              </div>
              <p>
                {tAbout("values.subtitle")}
              </p>
            </header>

            <div className="about-page__values-grid">
              {VALUES.map(({ titleKey, descriptionKey, icon: Icon }) => (
                <article className="about-value-card" key={titleKey}>
                  <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  <h3>{tAbout(titleKey)}</h3>
                  <p>{tAbout(descriptionKey)}</p>
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
              <p className="about-page__eyebrow">{tAbout("story.eyebrow")}</p>
              <h2 id="story-title">{tAbout("story.title")}</h2>
              <p className="about-page__story-intro">
                {tAbout("story.intro")}
              </p>
            </div>
            <ol className="about-page__story-list">
              {STORY_STEPS.map(({ number, titleKey, descriptionKey }) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{tAbout(titleKey)}</h3>
                    <p>{tAbout(descriptionKey)}</p>
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
              <p className="about-page__eyebrow">{tAbout("team.eyebrow")}</p>
              <h2 id="team-title">{tAbout("team.title")}</h2>
              <p>
                {tAbout("team.description")}
              </p>
              <div className="about-page__founder">
                <div>
                  <strong>{tAbout("team.founder.name")}</strong>
                  <span>{tAbout("team.founder.role")}</span>
                </div>
                <span className="about-page__location">
                  <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
                  {tAbout("team.founder.location")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Link href="/contact" className="about-page__contact">
        {tAbout("contact.cta")}
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </>
  );
}
