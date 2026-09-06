"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero__badge"
          >
            <span className="hero__badge-pulse" />
            Agence Tech basée à Lomé, Togo
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Votre vision, <br />
            <span className="hero__title-highlight">notre code.</span>
          </motion.h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            KofCorporation conçoit des applications web, mobiles et des
            logiciels sur mesure pour accélérer la croissance de votre
            entreprise.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/contact" className="hero__cta hero__cta--primary">
              Prendre RDV
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
            <Link href="/realisations" className="hero__cta hero__cta--secondary">
              Découvrir nos réalisations
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="hero__code-window">
            <div className="hero__code-header">
              <span className="hero__code-dot" style={{ backgroundColor: "#FF5F56" }} />
              <span className="hero__code-dot" style={{ backgroundColor: "#FFBD2E" }} />
              <span className="hero__code-dot" style={{ backgroundColor: "#27C93F" }} />
            </div>
            <div className="hero__code-body">
              <pre>
                <code>
                  <span className="code-keyword">const</span> <span className="code-variable">solution</span> = <span className="code-keyword">new</span> <span className="code-class">KofCorporation</span>();{"\n"}
                  {"\n"}
                  <span className="code-keyword">await</span> solution.<span className="code-function">build</span>({"{\n"}
                  {"  "}type: <span className="code-string">&quot;Web &amp; Mobile&quot;</span>,{"\n"}
                  {"  "}quality: <span className="code-number">100</span>,{"\n"}
                  {"  "}fastDelivery: <span className="code-boolean">true</span>{"\n"}
                  {"}"});{"\n"}
                  {"\n"}
                  <span className="code-comment">{"// L'innovation commence ici."}</span>
                </code>
              </pre>
              <div className="hero__code-icon">
                <Code2 size={48} strokeWidth={1} />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </motion.div>
      </div>
    </section>
  );
}
