"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/**
 * SplashScreen — Écran de chargement initial de KofCorporation.
 *
 * - Apparaît au premier rendu, disparaît après 1200 ms.
 * - Utilise AnimatePresence de Framer Motion pour l'animation de sortie.
 * - SSR-safe : attend le montage client avant de s'afficher.
 */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setIsVisible(true), 0);
    const hideTimer = window.setTimeout(() => setIsVisible(false), 1200);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            backgroundColor: "#1A1E3A",
          }}
          aria-hidden="true"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.1 } }}
          >
            <Image
              src="/images/logo.svg"
              alt="KofCorporation"
              width={120}
              height={120}
              style={{ objectFit: "contain", height: "auto" }}
              priority
            />
          </motion.div>

          {/* Nom de la marque */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } }}
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              color: "#0CACE8",
              textTransform: "uppercase",
            }}
          >
            KOFCORPORATION
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
