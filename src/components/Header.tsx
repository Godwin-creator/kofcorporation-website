"use client";

import "./Header.css";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Globe,
  CalendarCheck,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Contact", href: "/contact" },
];

const LANGUAGES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const { toggleTheme, isDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<LangCode>("fr");
  const [scrolled, setScrolled] = useState(false);

  /* --- Scroll detection for sticky glass effect ------------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- Close mobile menu on resize to desktop -------------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* --- Lock body scroll when mobile menu is open ----------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* --- Close language dropdown on outside click ------------------- */
  const closeLangDropdown = useCallback(() => setLangOpen(false), []);
  useEffect(() => {
    if (!langOpen) return;
    const handler = () => closeLangDropdown();
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen, closeLangDropdown]);

  /* --- Handlers -------------------------------------------------- */
  const handleLangChange = (code: LangCode) => {
    setCurrentLang(code);
    setLangOpen(false);
    // TODO: intégrer next-intl pour changer la locale
  };

  return (
    <>
      <header
        className={`header ${scrolled ? "header--scrolled" : ""}`}
        role="banner"
      >
        <div className="header__inner">
          {/* ---- Logo ---- */}
          <Link href="/" className="header__logo" aria-label="Accueil KofCorporation">
            <Image
              src="/images/logo.svg"
              alt="KofCorporation"
              width={40}
              height={40}
              style={{ objectFit: "contain", height: "auto" }}
              priority
            />
            <span className="header__logo-text">KofCorporation</span>
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <nav className="header__nav" aria-label="Navigation principale">
            <ul className="header__nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="header__nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Actions (theme, lang, CTA) ---- */}
          <div className="header__actions">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="header__icon-btn"
              aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              title={isDark ? "Mode clair" : "Mode sombre"}
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
            </button>

            {/* Language selector */}
            <div className="header__lang-wrapper">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((prev) => !prev);
                }}
                className="header__icon-btn header__lang-btn"
                aria-label="Changer de langue"
                aria-expanded={langOpen}
              >
                <Globe size={18} strokeWidth={1.75} />
                <span className="header__lang-current">{currentLang.toUpperCase()}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`header__lang-chevron ${langOpen ? "header__lang-chevron--open" : ""}`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="header__lang-dropdown"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang.code)}
                        className={`header__lang-option ${
                          currentLang === lang.code ? "header__lang-option--active" : ""
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA — Desktop */}
            <Link href="/contact#contact-form" className="header__cta">
              <CalendarCheck size={16} strokeWidth={2} />
              Prendre RDV
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="header__hamburger"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    <X size={22} strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    <Menu size={22} strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile Overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              aria-label="Navigation mobile"
            >
              <ul className="mobile-nav__list">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      className="mobile-nav__link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <Link
                href="/contact#contact-form"
                className="mobile-nav__cta"
                onClick={() => setMobileOpen(false)}
              >
                <CalendarCheck size={18} strokeWidth={2} />
                Prendre RDV
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
