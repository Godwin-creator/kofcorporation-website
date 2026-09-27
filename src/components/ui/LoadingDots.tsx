"use client";

import { motion } from "framer-motion";

const dotVariants = {
  pulse: {
    scale: [1, 1.5, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function LoadingDots() {
  return (
    <div
      className="loading-dots"
      role="status"
      aria-label="Chargement en cours..."
    >
      <motion.div className="dot" variants={dotVariants} animate="pulse" />
      <motion.div className="dot" variants={dotVariants} animate="pulse" />
      <motion.div className="dot" variants={dotVariants} animate="pulse" />
      <style>{`
        .loading-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          padding: 3rem 0;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--color-accent);
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
