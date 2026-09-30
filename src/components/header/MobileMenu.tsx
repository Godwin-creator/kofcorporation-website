"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES_MENU_ITEMS } from "./ServicesMegaMenu";

export interface NavItem {
  key: "home" | "services" | "projects" | "about" | "contact";
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navItems: NavItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
  navItems,
}: MobileMenuProps) {
  const t = useTranslations("header");
  const navT = useTranslations("nav");
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
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
            aria-label={t("mobileNavigation")}
          >
            <ul className="mobile-nav__list">
              {navItems.map((item, i) => {
                const isServices = item.key === "services";
                if (isServices) {
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.25 }}
                      className="mobile-nav__item--has-children"
                    >
                      <Link
                        href={item.href}
                        className={`mobile-nav__link${
                          pathname === item.href ? " mobile-nav__link--active" : ""
                        }`}
                        onClick={onClose}
                      >
                        {navT(item.key)}
                      </Link>
                      <button
                        type="button"
                        className="mobile-nav__chevron-btn"
                        aria-label={
                          mobileServicesOpen
                            ? t("collapseServices")
                            : t("expandServices")
                        }
                        aria-expanded={mobileServicesOpen}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileServicesOpen((prev) => !prev);
                        }}
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={2}
                          className={`mobile-nav__chevron ${
                            mobileServicesOpen ? "mobile-nav__chevron--open" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.ul
                            className="mobile-nav__sub-list"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {SERVICES_MENU_ITEMS.map((svc, j) => (
                              <motion.li
                                key={svc.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * j, duration: 0.2 }}
                              >
                                <Link
                                  href={svc.href}
                                  target={
                                    svc.id === "training" ? "_blank" : undefined
                                  }
                                  rel={
                                    svc.id === "training"
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  className="mobile-nav__sub-link"
                                  onClick={onClose}
                                >
                                  {navT(svc.titleKey)}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                }
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      className={`mobile-nav__link${
                        pathname === item.href ? " mobile-nav__link--active" : ""
                      }`}
                      onClick={onClose}
                    >
                      {navT(item.key)}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Mobile CTA */}
            <Link
              href="/contact#contact-form"
              className="mobile-nav__cta"
              onClick={onClose}
            >
              <CalendarCheck size={18} strokeWidth={2} />
              {t("bookMeeting")}
            </Link>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
