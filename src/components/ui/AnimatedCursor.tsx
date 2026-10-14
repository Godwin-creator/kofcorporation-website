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

  // Dirty flag: skip RAF work when cursor is stationary
  const isDirty = useRef(false);
  const rafId = useRef<number>(0);
  const shown = useRef(false);

  const [visible, setVisible] = useState(false);

  function syncDOM() {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const cl = isClicking.current;
    const hx = isHovering.current;

    // Position + scale applied together via transform — no CSS transition on transform
    // (CSS transitions only apply to width/height/opacity/color, not transform, to avoid conflict with JS)
    const dotScale = cl ? 0.6 : 1;
    const ringScale = hx ? 1.2 : cl ? 0.85 : 1;

    dot.style.transform = `translate3d(${x.current}px, ${y.current}px, 0) translate(-50%, -50%) scale(${dotScale})`;
    ring.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0) translate(-50%, -50%) scale(${ringScale})`;
  }

  useEffect(() => {
    // Guard 1: touch devices → skip entirely
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Guard 2: reduced motion → skip animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        isDirty.current = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;
      isDirty.current = true;
      if (!shown.current) {
        shown.current = true;
        setVisible(true);
      }
      syncHoverState(e.target as HTMLElement);
    };

    const onMouseDown = () => {
      isClicking.current = true;
      isDirty.current = true;
      containerRef.current?.classList.add("acursor--clicking");
      syncDOM();
    };

    const onMouseUp = () => {
      isClicking.current = false;
      isDirty.current = true;
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

    // Animation loop with lerp + dirty-flag optimisation
    // Pour gérer la vitesse de suivi du curseur (la réactivité et la fluidité avec
    // laquelle le cercle/anneau suit le point exact de votre souris): doit etre compris
    // entre 0 et 1. Plus il est petit, plus le curseur est lent, plus il est grand, plus le curseur est rapide
    const LERP_FACTOR = 0.3;
    const CONVERGENCE_THRESHOLD = 0.05; // px — mark clean when ring converged

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafId.current = requestAnimationFrame(animate);

      // Skip DOM work when nothing has changed
      if (!isDirty.current) return;

      ringX.current = lerp(ringX.current, x.current, LERP_FACTOR);
      ringY.current = lerp(ringY.current, y.current, LERP_FACTOR);

      syncDOM();

      // Mark clean when ring has fully converged to dot position
      const dx = Math.abs(x.current - ringX.current);
      const dy = Math.abs(y.current - ringY.current);
      if (dx < CONVERGENCE_THRESHOLD && dy < CONVERGENCE_THRESHOLD) {
        isDirty.current = false;
      }
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

  if (!visible) return null;

  return (
    <div ref={containerRef} className="acursor">
      <div ref={dotRef} className="acursor__dot" />
      <div ref={ringRef} className="acursor__ring" />
    </div>
  );
}
