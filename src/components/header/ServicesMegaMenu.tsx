"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Smartphone, Monitor, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export const SERVICES_MENU_ITEMS = [
  { id: "web", icon: Code2, titleKey: "servicesSub.web.title", href: "/services/developpement-web" },
  { id: "mobile", icon: Smartphone, titleKey: "servicesSub.mobile.title", href: "/services/applications-mobiles" },
  { id: "management", icon: Monitor, titleKey: "servicesSub.management.title", href: "/services/logiciels-gestion" },
  { id: "training", icon: GraduationCap, titleKey: "servicesSub.training.title", href: "https://academy.kofcorporation.com/" },
] as const;

interface ServicesMegaMenuProps {
  isOpen: boolean;
}

export default function ServicesMegaMenu({ isOpen }: ServicesMegaMenuProps) {
  const navT = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="header__mega-menu"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="header__mega-menu-grid">
            {SERVICES_MENU_ITEMS.map((svc) => {
              const Icon = svc.icon;
              return (
                <a
                  key={svc.id}
                  href={svc.href}
                  target={svc.id === "training" ? "_blank" : undefined}
                  rel={svc.id === "training" ? "noopener noreferrer" : undefined}
                  className="header__mega-card"
                >
                  <div className="header__mega-card-icon">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="header__mega-card-title">{navT(svc.titleKey)}</p>
                  </div>
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="header__mega-card-arrow"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
