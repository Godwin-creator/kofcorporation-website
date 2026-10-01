"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";

interface WatermarkProps {
  /** Key inside the "watermarks" translation namespace */
  id: string;
}

/**
 * Vertical watermark rendered on the left edge of any section.
 * Uses the Story Script font via globals.css; no import needed.
 */
export default function Watermark({ id }: WatermarkProps) {
  const t = useTranslations("watermarks");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <span
      ref={ref}
      className="section-watermark"
      aria-hidden="true"
      style={{
        opacity: isInView ? undefined : 0,
        transform: isInView ? "translateY(-50%)" : "translateY(-50%) translateX(-8px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      {t(id)}
    </span>
  );
}
