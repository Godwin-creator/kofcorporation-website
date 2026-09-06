"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import "./BackToTop.css";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
    >
      <ChevronUp aria-hidden="true" strokeWidth={2} />
    </button>
  );
}
