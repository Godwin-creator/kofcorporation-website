"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type Slogan = { lineOne: string; lineTwo: string };

const CHAR_DELAYS = (index: number, total: number) => {
  const progress = index / total;
  if (progress < 0.15) return 120;
  if (progress < 0.85) return 60;
  return 110;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeToMotionPreference = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getMotionPreference = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerMotionPreference = () => false;

/**
 * Reprend l'animation du titre de la version bureau pour le hero mobile.
 * La logique est volontairement isolee ici plutot que partagee avec
 * HeroDesktop : celui-ci porte en plus le parallaxe et le slider, dont le
 * hero mobile n'a pas besoin.
 *
 * Le titre complet est expose via aria-label, de sorte qu'un lecteur
 * d'ecran annonce la phrase entiere et non les lettres au fil de leur
 * apparition. Lorsque l'utilisateur demande moins d'animations, le texte
 * s'affiche d'emblee en entier et aucune animation ne demarre.
 */
export default function HeroTypewriterMobile({ slogans }: { slogans: Slogan[] }) {
  const [index, setIndex] = useState(0);
  const [typedOne, setTypedOne] = useState("");
  const [typedTwo, setTypedTwo] = useState("");
  const [cursorLine, setCursorLine] = useState<1 | 2>(1);
  const [isHolding, setIsHolding] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

  const active = slogans[index] ?? slogans[0];

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const delay = (ms: number) =>
      new Promise((resolve) => window.setTimeout(resolve, ms));

    const run = async () => {
      setTypedOne("");
      setTypedTwo("");
      setCursorLine(1);
      setIsHolding(false);

      for (let i = 1; i <= active.lineOne.length; i += 1) {
        if (cancelled) return;
        setTypedOne(active.lineOne.slice(0, i));
        await delay(CHAR_DELAYS(i, active.lineOne.length));
      }

      if (cancelled) return;
      await delay(500);
      setCursorLine(2);

      for (let i = 1; i <= active.lineTwo.length; i += 1) {
        if (cancelled) return;
        setTypedTwo(active.lineTwo.slice(0, i));
        await delay(CHAR_DELAYS(i, active.lineTwo.length));
      }

      if (cancelled) return;
      setIsHolding(true);

      // Un seul slogan : le texte reste affiche, sans effacement inutile.
      if (slogans.length < 2) return;

      await delay(2400);
      if (cancelled) return;
      setIsHolding(false);

      const total = active.lineOne.length + active.lineTwo.length;
      for (let i = total; i > 0; i -= 1) {
        if (cancelled) return;
        if (i > active.lineOne.length) {
          setTypedTwo(active.lineTwo.slice(0, i - active.lineOne.length - 1));
        } else {
          setTypedTwo("");
          setTypedOne(active.lineOne.slice(0, i - 1));
          setCursorLine(1);
        }
        await delay(CHAR_DELAYS(total - i, total) / 3);
      }

      if (cancelled) return;
      await delay(260);
      setIndex((current) => (current + 1) % slogans.length);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [active, reducedMotion, slogans.length]);

  const shownOne = reducedMotion ? active.lineOne : typedOne;
  const shownTwo = reducedMotion ? active.lineTwo : typedTwo;

  return (
    <h1
      className="hero__title"
      aria-label={`${active.lineOne} ${active.lineTwo}`.trim()}
    >
      <span className="hero__title-line hero__title-line--primary">
        {shownOne}
        {!reducedMotion && cursorLine === 1 && (
          <span
            className={`hero__cursor${isHolding ? " hero__cursor--blink" : ""}`}
            aria-hidden="true"
          />
        )}
      </span>
      {active.lineTwo && (
        <span className="hero__title-line hero__title-line--secondary">
          {shownTwo}
          {!reducedMotion && cursorLine === 2 && (
            <span
              className={`hero__cursor${isHolding ? " hero__cursor--blink" : ""}`}
              aria-hidden="true"
            />
          )}
        </span>
      )}
    </h1>
  );
}
