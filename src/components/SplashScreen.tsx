"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import {
  applyTheme,
  getInitialTheme,
  getThemeBackground,
} from "@/hooks/useTheme";

const SPLASH_SESSION_KEY = "kof_splash_shown";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [themeBackground] = useState(() =>
    getThemeBackground(getInitialTheme())
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Si le splash a déjà été joué dans cette session d'onglets -> ne pas bloquer
    try {
      if (sessionStorage.getItem(SPLASH_SESSION_KEY)) {
        document.documentElement.style.visibility = "";
        document.documentElement.classList.remove("splash-active");
        return;
      }
    } catch {
      // Ignorer si sessionStorage indisponible (ex: iframe ou mode privé restrictif)
    }

    const theme = getInitialTheme();
    applyTheme(theme);
    document.documentElement.classList.add("splash-active");
    const visibleFrame = window.requestAnimationFrame(() => setVisible(true));

    // Watchdog de sécurité : garantit que la page ne reste jamais bloquée
    const safetyTimer = window.setTimeout(() => {
      document.documentElement.style.visibility = "";
      document.documentElement.classList.remove("splash-active");
      setVisible(false);
    }, 1600);

    return () => {
      window.cancelAnimationFrame(visibleFrame);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Détection de connexion lente (2G ou mode économie de données)
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const isSlowConnection = Boolean(
      nav.connection?.saveData ||
        nav.connection?.effectiveType === "2g" ||
        nav.connection?.effectiveType === "slow-2g"
    );

    const finishSplash = () => {
      try {
        sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
      } catch {}
      document.documentElement.style.visibility = "";
      document.documentElement.classList.remove("splash-active");
      setVisible(false);
      window.dispatchEvent(
        new Event("kof:splash-complete", { bubbles: true })
      );
    };

    // Mode réduit ou connexion lente : transition ultra-rapide (ou quasi nulle)
    if (prefersReducedMotion || isSlowConnection) {
      const quickTimer = window.setTimeout(finishSplash, 180);
      return () => window.clearTimeout(quickTimer);
    }

    // Animation calibrée pour une perception de réactivité maximale
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const enterDuration = isMobile ? 0.22 : 0.28;
    const holdDuration = isMobile ? 120 : 180;
    const exitDuration = isMobile ? 0.2 : 0.26;

    const runAnimation = async () => {
      try {
        if (!scope.current) return;

        // Apparition douce avec légère échelle (0.92 -> 1)
        await animate(
          scope.current,
          { scale: [0.92, 1], opacity: [0, 1] },
          { duration: enterDuration, ease: [0.16, 1, 0.3, 1] }
        );

        // Court temps de pose
        await new Promise((resolve) => setTimeout(resolve, holdDuration));

        if (!scope.current) return;

        // Sortie fluide et élégante vers l'avant (1 -> 1.06) avec fondu
        await animate(
          scope.current,
          { scale: [1, 1.06], opacity: [1, 0] },
          { duration: exitDuration, ease: "easeOut" }
        );
      } catch {
        // En cas d'interruption, on finalise proprement
      } finally {
        finishSplash();
      }
    };

    void runAnimation();
  }, [animate, scope, visible]);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("splash-active");
      document.documentElement.style.visibility = "";
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
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.img
            ref={scope}
            src="/images/logo.svg"
            alt="KofCorporation"
            width={120}
            height={120}
            initial={{ opacity: 0, scale: 0.92 }}
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
