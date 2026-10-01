"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#151A20" : "#E0F2FE");
  }
}

export function getThemeBackground(theme: Theme): string {
  return theme === "dark" ? "#151A20" : "#E0F2FE";
}

/**
 * Lit le thème courant depuis le DOM (attribut data-theme appliqué par le
 * script inline du layout) ou depuis localStorage. Côté SSR on renvoie
 * toujours 'light' pour garantir un affichage clair par défaut.
 */
export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  // Priorité 1 : attribut déjà positionné par le script anti-flash
  const domTheme = document.documentElement.getAttribute("data-theme");
  if (domTheme === "light" || domTheme === "dark") return domTheme;

  // Priorité 2 : valeur persistée en localStorage
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Hook de gestion du thème clair / sombre pour KofCorporation.
 *
 * @returns `theme`        - valeur courante : 'light' | 'dark'
 * @returns `toggleTheme`  - bascule le thème et persiste en localStorage
 * @returns `isDark`       - raccourci booléen
 */
export function useTheme(): {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
} {
  // Initialisation SSR-safe : valeur stable avant l'hydratation
  const [theme, setTheme] = useState<Theme>("light");

  // Lire la préférence appliquée par le script inline sans l'écraser par l'état SSR.
  useEffect(() => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    const frame = window.requestAnimationFrame(() => setTheme(initialTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}
