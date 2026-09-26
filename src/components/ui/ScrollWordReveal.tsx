"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import "./ScrollWordReveal.css";

interface ScrollWordRevealProps {
  /** Key inside the "scrollReveal" translation namespace */
  textKey: string;
  /** Optional CSS class */
  className?: string;
}

/**
 * Scroll-triggered word reveal component.
 * Words light up one by one as the user scrolls through the viewport.
 */
export default function ScrollWordReveal({ textKey, className = "" }: ScrollWordRevealProps) {
  const t = useTranslations("scrollReveal");
  const text = t(textKey);
  const words = text.split(" ");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= words.length) {
        clearInterval(interval);
        return;
      }
      setVisibleCount(current);
    }, 100);
    return () => clearInterval(interval);
  }, [isInView, words.length]);

  return (
    <p ref={ref} className={`scroll-reveal ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`scroll-reveal__word${index < visibleCount ? " scroll-reveal__word--active" : ""}`}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
