"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SectionBadge.css";

interface SectionBadgeProps {
  title: string;
  sectionId: string;
}

export default function SectionBadge({ title, sectionId }: SectionBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.15, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <motion.div
      ref={badgeRef}
      className={`section-badge${isVisible ? " visible" : ""}`}
      data-section={sectionId}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: isVisible ? 0 : "-100%",
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="section-badge__text">{title}</span>
    </motion.div>
  );
}
