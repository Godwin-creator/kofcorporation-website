"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Clock, FolderCheck, GraduationCap, Star } from "lucide-react";
import "./Stats.css";

interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: typeof Clock;
}

const STATS: Omit<Stat, "label" | "suffix">[] = [
  {
    id: "experience",
    value: 5,
    icon: Clock,
  },
  {
    id: "projects",
    value: 20,
    icon: FolderCheck,
  },
  {
    id: "satisfaction",
    value: 98,
    icon: Star,
  },
  {
    id: "training",
    value: 200,
    icon: GraduationCap,
  },
];

function AnimatedValue({ value, suffix }: Pick<Stat, "value" | "suffix">) {
  const counter = useMotionValue(0);
  const displayedValue = useTransform(counter, (current) => Math.round(current).toString());
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(counter, value, {
      duration: 2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [counter, isInView, value]);

  return (
    <span ref={counterRef} className="stats__value">
      <motion.span aria-hidden="true">{displayedValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Stats() {
  const t = useTranslations("stats");
  const labels = ["experience", "projects", "satisfaction", "training"] as const;
  const suffixes = [t("years"), "+", "%", "+"];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={sectionRef}
      className="stats" 
      aria-labelledby="stats-title"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="stats__inner">
        <h2 id="stats-title" className="stats__title">
          {t("title")}
        </h2>

        <motion.div 
          className="stats__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map(({ id, value, icon: Icon }, index) => (
            <motion.article className="stats__item" key={id} variants={itemVariants}>
              <Icon className="stats__icon" size={24} strokeWidth={1.6} aria-hidden="true" />
              <AnimatedValue value={value} suffix={suffixes[index]} />
              <p className="stats__label">{t(labels[index])}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}