"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Partners.css";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const PARTNERS: Partner[] = [
  {
    id: "aiesec",
    name: "AIESEC",
    logo: "/images/partners/aiesec.png",
  },
  {
    id: "jhpiego",
    name: "Jhpiego",
    logo: "/images/partners/jhpiego.png",
  },
  {
    id: "undp",
    name: "UNDP",
    logo: "/images/partners/undp.png",
  },
  {
    id: "samanvoyage",
    name: "SamanVoyage",
    logo: "/images/partners/samanvoyage.png",
  },
  {
    id: "golden-group",
    name: "Golden Group Technologies",
    logo: "/images/partners/goldengroup.png",
  },
  {
    id: "giz",
    name: "GIZ",
    logo: "/images/partners/giz.png",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Partners() {
  const marqueeItems = [...PARTNERS, ...PARTNERS];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={sectionRef}
      className="partners" 
      aria-label="Nos partenaires et clients"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="partners__inner">
        <h2 className="partners__title">Ils nous font confiance</h2>

        <div className="partners__marquee-wrapper">
          <div className="partners__marquee-track">
            {marqueeItems.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="partner-logo-frame"
                aria-hidden={index >= PARTNERS.length}
              >
                <Image
                  className="partner-logo"
                  src={partner.logo}
                  alt={index < PARTNERS.length ? partner.name : ""}
                  width={160}
                  height={64}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
