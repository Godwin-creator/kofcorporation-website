"use client";

import { useTranslations } from "next-intl";

interface WatermarkProps {
  /** Key inside the "watermarks" translation namespace */
  id: string;
}

/**
 * Vertical watermark rendered in the upper-left of any section.
 * Uses the Story Script font via globals.css; no import needed.
 */
export default function Watermark({ id }: WatermarkProps) {
  const t = useTranslations("watermarks");
  return <span className="section-watermark" aria-hidden="true">{t(id)}</span>;
}
