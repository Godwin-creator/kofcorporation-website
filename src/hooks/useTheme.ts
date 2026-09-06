"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Lit le thème courant depuis le DOM (attribut data-theme appliqué par le
 * script inline du layout) ou depuis localStorage. Côté SSR on renvoie
 * toujours 'dark' pour correspondre à notre valeur par défaut premium.
 */
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  // Priorité 1 : attribut déjà positionné par le script anti-flash
  const domTheme = document.documentElement.getAttribute("data-theme");
  if (domTheme === "light" || domTheme === "dark") return domTheme;

  // Priorité 2 : valeur persistée en localStorage
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  // Priorité 3 : préférence système
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
  const [theme, setTheme] = useState<Theme>("dark");

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
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}
