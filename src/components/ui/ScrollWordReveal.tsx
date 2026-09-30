"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import "./ScrollWordReveal.css";

interface ScrollWordRevealProps {
  /** Key inside the "scrollReveal" translation namespace */
  textKey: string;
  /** Optional CSS class */
  className?: string;
}

/**
 * Cinematic scroll-triggered word reveal.
 * Each word animates in with blur + opacity + translateY when
 * the section reaches the center of the viewport.
 */
export default function ScrollWordReveal({ textKey, className = "" }: ScrollWordRevealProps) {
  const t = useTranslations("scrollReveal");
  const text = t(textKey);
  const words = text.split(" ");

  // Triggers only when section is roughly centered on screen
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-40% 0px -40% 0px",
  });

  return (
    <p ref={ref} className={`scroll-reveal ${className}`} aria-label={text}>
      {words.map((word, index) => {
        // Accent the first word of each "sentence" (after a comma) and the last word
        const isAccent =
          index === 0 ||
          index === words.length - 1 ||
          words[index - 1]?.endsWith(",");

        return (
          <motion.span
            key={index}
            className={`scroll-reveal__word${isAccent ? " scroll-reveal__word--accent" : ""}`}
            aria-hidden="true"
            initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                : { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.9 }
            }
            transition={{
              duration: 0.9,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        );
      })}
    </p>
  );
}
