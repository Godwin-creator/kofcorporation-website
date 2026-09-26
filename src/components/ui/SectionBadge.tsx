"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSectionContext } from "@/contexts/SectionContext";
import "./SectionBadge.css";

interface SectionBadgeProps {
  title: string;
  sectionId: string;
}

export default function SectionBadge({ title, sectionId }: SectionBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const { activeSection, setActiveSection } = useSectionContext();
  const isVisible = activeSection === sectionId;

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { threshold: 0.35, rootMargin: "-30% 0px -30% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId, setActiveSection]);

  return (
    <motion.div
      ref={badgeRef}
      className={`section-badge${isVisible ? " visible" : ""}`}
      data-section={sectionId}
      initial={{ x: -40, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : -40,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span className="section-badge__text">{title}</span>
    </motion.div>
  );
}
