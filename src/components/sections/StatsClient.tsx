"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Clock, FolderCheck, GraduationCap, Star } from "lucide-react";
import "./Stats.css";
import EmptyState from "@/components/ui/EmptyState";
import Watermark from "@/components/ui/Watermark";
import LoadingDots from "@/components/ui/LoadingDots";

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  labelEn: string;
  icon: string;
}
const ICONS = { Clock, FolderCheck, GraduationCap, Star };

function AnimatedValue({ value, suffix }: Pick<StatItem, "value" | "suffix">) {
  const counter = useMotionValue(0);
  const displayedValue = useTransform(counter, (current) =>
    Math.round(current).toString(),
  );
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!isInView) return;
    const controls = animate(counter, value, { duration: 2, ease: "easeOut" });
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
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

export default function StatsClient({ stats }: { stats: StatItem[] }) {
  const t = useTranslations("stats");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-30% 0px -30% 0px" });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);
  return (
    <motion.section
      ref={sectionRef}
      id="stats"
      className="stats"
      aria-labelledby="stats-title"
      variants={sectionVariants}
      initial={stats.length ? "hidden" : "visible"}
      animate={isInView || !stats.length ? "visible" : "hidden"}
    >
      {!loaded ? <LoadingDots /> : <Watermark id="stats" />}
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
          {stats.length ? (
            stats.map((stat) => {
              const Icon = ICONS[stat.icon as keyof typeof ICONS] ?? Star;
              return (
                <motion.article
                  className="stats__item"
                  key={stat.id}
                  variants={itemVariants}
                >
                  <Icon
                    className="stats__icon"
                    size={24}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <AnimatedValue value={stat.value} suffix={stat.suffix} />
                  <p className="stats__label">
                    {locale === "en" ? stat.labelEn : stat.label}
                  </p>
                </motion.article>
              );
            })
          ) : (
            <EmptyState message={t("empty")} />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
