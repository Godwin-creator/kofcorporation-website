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

export default function Stats() {
  const t = useTranslations("stats");
  const labels = ["experience", "projects", "satisfaction", "training"] as const;
  const suffixes = [t("years"), "+", "%", "+"];
  return (
    <section className="stats" aria-labelledby="stats-title">
      <div className="stats__inner">
        <h2 id="stats-title" className="stats__title">
          {t("title")}
        </h2>

        <div className="stats__grid">
          {STATS.map(({ id, value, icon: Icon }, index) => (
            <article className="stats__item" key={id}>
              <Icon className="stats__icon" size={24} strokeWidth={1.6} aria-hidden="true" />
              <AnimatedValue value={value} suffix={suffixes[index]} />
              <p className="stats__label">{t(labels[index])}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}