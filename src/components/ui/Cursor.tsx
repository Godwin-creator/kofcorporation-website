"use client";

import { useEffect, useState, useRef } from "react";
import "./Cursor.css";

/**
 * Blend Mode Custom Cursor
 * Based on react-animated-cursor blend mode pattern.
 * Adapted for KofCorporation — uses mix-blend-mode: difference
 * to invert colors over any background.
 */

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Elements that trigger the hover state
  const HOVER_SELECTORS = [
    "a",
    "button",
    "[role='button']",
    "input",
    "textarea",
    "select",
    "[data-cursor='interactive']",
    ".cursor-hover",
  ].join(", ");

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Defer visibility to avoid flash on SSR
    const timer = requestAnimationFrame(() => setIsVisible(true));

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTORS)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTORS)) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`cursor ${isHovering ? "is-hovering" : ""} ${isClicking ? "is-clicking" : ""}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="cursor__dot" />
      <div className="cursor__ring" />
    </div>
  );
}
