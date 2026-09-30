"use client";

import "./Header.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  ChevronDown,
  CalendarCheck,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Link, usePathname } from "@/i18n/navigation";
import SpecularButton from "./ui/SpecularButton";
import ServicesMegaMenu from "./header/ServicesMegaMenu";
import LanguageSwitcher from "./header/LanguageSwitcher";
import ThemeToggle from "./header/ThemeToggle";
import MobileMenu, { type NavItem } from "./header/MobileMenu";

/* ------------------------------------------------------------------ */
/*  Navigation Items                                                   */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/qui-sommes-nous" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/realisations" },
  { key: "contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const { isDark } = useTheme();
  const t = useTranslations("header");
  const navT = useTranslations("nav");
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesHoverRef = useRef<HTMLLIElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const specularColors = {
    textColor: "var(--color-primary)",
    baseColor: isDark ? "var(--color-primary-light)" : "var(--color-surface)",
  };

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

  /* --- Close services mega menu when cursor leaves ------------- */
  useEffect(() => {
    const el = servicesHoverRef.current;
    if (!el) return;
    const leave = () => setServicesOpen(false);
    el.addEventListener("mouseenter", () => setServicesOpen(true));
    el.addEventListener("mouseleave", leave);
    return () => el.removeEventListener("mouseleave", leave);
  }, []);

  return (
    <>
      <header
        className={`header ${scrolled ? "header--scrolled" : ""}`}
        role="banner"
      >
        <div className="header__inner">
          {/* ---- Logo ---- */}
          <Link href="/" className="header__logo" aria-label={t("homeAria")}>
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
          <nav className="header__nav" aria-label={t("mainNavigation")}>
            <ul className="header__nav-list">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const isServices = item.key === "services";

                if (isServices) {
                  return (
                    <li
                      key={item.href}
                      ref={servicesHoverRef}
                      className="header__nav-item--mega"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <SpecularButton
                        href={item.href}
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
                        className={`header__specular-button ${isActive ? "header__nav-link--active" : ""}`}
                      >
                        {navT(item.key)}
                        <ChevronDown
                          size={13}
                          strokeWidth={2.2}
                          className={`header__chevron ${servicesOpen ? "header__chevron--open" : ""}`}
                        />
                      </SpecularButton>
                      <ServicesMegaMenu isOpen={servicesOpen} />
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <SpecularButton
                      href={item.href}
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
                      className={`header__specular-button ${isActive ? "header__nav-link--active" : ""}`}
                    >
                      {navT(item.key)}
                    </SpecularButton>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ---- Actions (theme, lang, CTA) ---- */}
          <div className="header__actions">
            {/* Theme toggle with ripple */}
            <ThemeToggle specularColors={specularColors} />

            {/* Language selector */}
            <LanguageSwitcher specularColors={specularColors} />

            {/* CTA - Desktop */}
            <Link href="/contact#contact-form" className="header__cta">
              <CalendarCheck size={16} strokeWidth={2} />
              {t("bookMeeting")}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="header__hamburger"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
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

      {/* ---- Mobile Overlay Menu ---- */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        navItems={NAV_ITEMS}
      />
    </>
  );
}
