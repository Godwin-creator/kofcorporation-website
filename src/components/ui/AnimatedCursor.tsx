"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCursor() {
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

    const onMouseMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;
      if (!shown.current) {
        shown.current = true;
        setVisible(true);
      }
    };

    const onMouseDown = () => {
      isClicking.current = true;
      syncDOM();
    };
    const onMouseUp = () => {
      isClicking.current = false;
      syncDOM();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="hover"], .cursor-hover'
        )
      ) {
        isHovering.current = true;
        syncDOM();
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="hover"], .cursor-hover'
        )
      ) {
        isHovering.current = false;
        syncDOM();
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Animation loop with lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX.current = lerp(ringX.current, x.current, 0.15);
      ringY.current = lerp(ringY.current, y.current, 0.15);
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

  // Sync DOM elements directly — no React re-renders in the animation loop
  const syncDOM = () => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const hx = isHovering.current;
    const cl = isClicking.current;

    // Dot — instant snap to pointer, hidden on hover
    dot.style.transform = `translate3d(${x.current}px, ${y.current}px, 0) translate(-50%, -50%) scale(${cl ? 0.7 : 1})`;
    dot.style.width = hx ? "0px" : "8px";
    dot.style.height = hx ? "0px" : "8px";
    dot.style.opacity = hx ? "0" : "1";
    dot.style.transition =
      "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), width 0.15s ease, height 0.15s ease, opacity 0.15s ease";

    // Ring — smooth follow via lerped coords, scales on hover
    const ringScale = hx ? 1.8 : 1;
    ring.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0) translate(-50%, -50%) scale(${ringScale})`;
    ring.style.width = hx ? "58px" : "32px";
    ring.style.height = hx ? "58px" : "32px";
    ring.style.backgroundColor = hx ? "rgba(255, 255, 255, 0.1)" : "transparent";
    ring.style.borderColor = hx ? "rgba(255, 255, 255, 0.8)" : "#ffffff";
    ring.style.transition =
      "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s ease, border-color 0.25s ease";
  };

  if (!visible) return null;

  return (
    <div
      className="acursor"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    >
      <div
        ref={dotRef}
        className="acursor__dot"
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
        }}
      />
      <div
        ref={ringRef}
        className="acursor__ring"
        style={{
          position: "absolute",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid #ffffff",
        }}
      />
    </div>
  );
}
