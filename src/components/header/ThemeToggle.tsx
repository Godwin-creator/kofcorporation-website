"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/hooks/useTheme";
import SpecularButton from "@/components/ui/SpecularButton";

interface ThemeToggleProps {
  specularColors: {
    textColor: string;
    baseColor: string;
  };
}

export default function ThemeToggle({ specularColors }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();
  const t = useTranslations("header");
  const themeToggleRef = useRef<HTMLDivElement | null>(null);
  const [themeSweep, setThemeSweep] = useState<{
    key: number;
    x: number;
    y: number;
    size: number;
    target: "light" | "dark";
    direction: "expand" | "contract";
  } | null>(null);

  const handleThemeToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    const direction = nextTheme === "dark" ? "expand" : "contract";
    const button = themeToggleRef.current;

    if (button) {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxDistance = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      setThemeSweep({
        key: Date.now(),
        x,
        y,
        size: Math.ceil(maxDistance * 2.6 + 120),
        target: nextTheme,
        direction,
      });
    }

    window.setTimeout(() => {
      toggleTheme();
    }, 180);

    window.setTimeout(() => setThemeSweep(null), 1000);
  };

  return (
    <>
      {themeSweep && (
        <div
          key={themeSweep.key}
          className={`header__theme-ripple header__theme-ripple--${themeSweep.direction}`}
          style={{
            ["--theme-ripple-x" as string]: `${themeSweep.x}px`,
            ["--theme-ripple-y" as string]: `${themeSweep.y}px`,
            ["--theme-ripple-size" as string]: `${themeSweep.size}px`,
            ["--theme-ripple-color" as string]:
              themeSweep.target === "dark" ? "#1A1E3A" : "#F8F9FA",
          }}
        />
      )}

      <div ref={themeToggleRef} className="header__theme-toggle-wrap">
        <SpecularButton
          onClick={handleThemeToggle}
          size="sm"
          radius={0}
          tint="#000000"
          tintOpacity={0}
          blur={0}
          lineColor="var(--color-accent)"
          {...specularColors}
          intensity={1}
          shineSize={44}
          shineFade={40}
          thickness={2.5}
          speed={1.2}
          followMouse
          proximity={250}
          className="header__specular-button header__icon-btn"
          aria-label={isDark ? t("lightMode") : t("darkMode")}
          title={isDark ? t("lightMode") : t("darkMode")}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <Sun size={18} strokeWidth={1.75} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <Moon size={18} strokeWidth={1.75} />
              </motion.span>
            )}
          </AnimatePresence>
        </SpecularButton>
      </div>
    </>
  );
}
