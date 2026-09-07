"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronUp } from "lucide-react";
import "./BackToTop.css";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateScrollState = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
          : 0;

      setIsVisible(window.scrollY > 320);
      setScrollProgress(progress);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className={`back-to-top${isVisible ? " back-to-top--visible" : ""}`}
      style={{ "--scroll-progress": `${scrollProgress * 100}%` } as CSSProperties}
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
    >
      {/* <ChevronUp aria-hidden="true" strokeWidth={2} /> */}
      <span className="back-to-top__icon" aria-hidden="true">
        <ChevronUp size={20} strokeWidth={2.5} />
      </span>
    </button>
  );
}
