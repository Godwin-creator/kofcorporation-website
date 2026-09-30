"use client";

import { useEffect, useRef, useState } from "react";
import "./AnimatedCursor.css";

export default function AnimatedCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Current pointer position (updated every mousemove)
  const x = useRef(0);
  const y = useRef(0);
  // Smooth-following ring position (lerped each frame)
  const ringX = useRef(0);
  const ringY = useRef(0);

  const isHovering = useRef(false);
  const isClicking = useRef(false);

  const rafId = useRef<number>(0);
  const shown = useRef(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const syncHoverState = (target: HTMLElement | null) => {
      const isNative = !!target?.closest(
        '.hero-image-slider__frame--puzzle, [data-native-cursor], #sanity, [data-sanity]'
      );
      if (containerRef.current) {
        containerRef.current.classList.toggle("acursor--hidden", isNative);
      }

      const hovering =
        !isNative &&
        !!target?.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="hover"], .cursor-hover'
        );
      if (isHovering.current !== hovering) {
        isHovering.current = hovering;
        if (containerRef.current) {
          containerRef.current.classList.toggle("acursor--hover", hovering);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;
      if (!shown.current) {
        shown.current = true;
        setVisible(true);
      }
      syncHoverState(e.target as HTMLElement);
    };

    const onMouseDown = () => {
      isClicking.current = true;
      containerRef.current?.classList.add("acursor--clicking");
      syncDOM();
    };

    const onMouseUp = () => {
      isClicking.current = false;
      containerRef.current?.classList.remove("acursor--clicking");
      syncDOM();
    };

    const onOver = (e: MouseEvent) => {
      syncHoverState(e.target as HTMLElement);
    };

    const onOut = (e: MouseEvent) => {
      syncHoverState(e.relatedTarget as HTMLElement);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Animation loop with lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Pour gérer la vitesse de suivi du curseur (la réactivité et la fluidité avec 
    // laquelle le cercle/anneau suit le point exact de votre souris): doit etre compris 
    // entre 0 et 1. Plus il est petit, plus le curseur est lent, plus il est grand, plus le curseur est rapide
    const animate = () => {
      ringX.current = lerp(ringX.current, x.current, 0.3);
      ringY.current = lerp(ringY.current, y.current, 0.3);
      syncDOM();
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Sync high-frequency transforms directly via DOM — no React re-renders in RAF loop
  const syncDOM = () => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const cl = isClicking.current;
    const hx = isHovering.current;

    // Dot snapped to pointer
    dot.style.transform = `translate3d(${x.current}px, ${y.current}px, 0) translate(-50%, -50%) scale(${cl ? 0.6 : 1})`;

    // Ring smooth-following pointer
    const ringScale = hx ? 1.2 : cl ? 0.85 : 1;
    ring.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0) translate(-50%, -50%) scale(${ringScale})`;
  };

  if (!visible) return null;

  return (
    <div ref={containerRef} className="acursor">
      <div ref={dotRef} className="acursor__dot" />
      <div ref={ringRef} className="acursor__ring" />
    </div>
  );
}

