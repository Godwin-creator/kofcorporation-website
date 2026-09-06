"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Lit le thème courant depuis le DOM (attribut data-theme appliqué par le
 * script inline du layout) ou depuis localStorage. Côté SSR on renvoie
 * toujours 'light' pour garantir un affichage clair par défaut.
 */
function getInitialTheme(): Theme {
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
 * @returns `theme`        — valeur courante : 'light' | 'dark'
 * @returns `toggleTheme`  — bascule le thème et persiste en localStorage
 * @returns `isDark`       — raccourci booléen
 */
export function useTheme(): {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
} {
  // Initialisation SSR-safe : valeur stable avant l'hydratation
  const [theme, setTheme] = useState<Theme>("light");

  // Synchronisation après montage avec ce que le script inline a déjà appliqué
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(getInitialTheme());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Propagation des changements vers le DOM et localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#1A1E3A" : "#F8F9FA");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        newTheme === "dark" ? "#1A1E3A" : "#F8F9FA"
      );
    }
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}
