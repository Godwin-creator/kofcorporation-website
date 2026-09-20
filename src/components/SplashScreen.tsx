"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

function getThemeBackground(): string {
  if (typeof window === "undefined") return "#F8F9FA";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "#1A1E3A"
    : "#F8F9FA";
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [themeBackground, setThemeBackground] = useState("#F8F9FA");
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setThemeBackground(getThemeBackground());
    document.documentElement.classList.add("splash-active");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const runAnimation = async () => {
      if (!scope.current) return;

      if (prefersReducedMotion) {
        await animate(
          scope.current,
          { scale: 1.2, opacity: [1, 0] },
          { duration: 0.8, ease: "easeIn" }
        );

        setVisible(false);
        return;
      }

      await animate(
        scope.current,
        {
          scale: [1, 1.5, 2],
          opacity: [1, 0.5, 0],
        },
        { duration: 1.5, ease: "easeIn" }
      );

      setVisible(false);
    };

    void runAnimation();
  }, [animate, scope, visible]);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("splash-active");

      const timer = window.setTimeout(() => {
        const event = new Event("kof:splash-complete", { bubbles: true });
        window.dispatchEvent(event);
      }, 150);

      return () => window.clearTimeout(timer);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="splash"
          style={{ background: themeBackground }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          aria-hidden="true"
        >
          <motion.img
            ref={scope}
            src="/images/logo.svg"
            alt="KofCorporation"
            width={120}
            height={120}
            style={{
              display: "block",
              width: 120,
              height: 120,
              transformOrigin: "center center",
              willChange: "transform, opacity",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
