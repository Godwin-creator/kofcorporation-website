"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, X, Volume2, VolumeX, Maximize2 } from "lucide-react";
import "./VideoPresentation.css";

interface VideoPresentationProps {
  /** ID YouTube — si fourni, affiche la miniature + bouton Play → modal embed */
  youtubeId?: string;
  /** Chemin vidéo locale — lecture inline muted en boucle (défaut) */
  videoSrc?: string;
}

export default function VideoPresentation({
  youtubeId,
  videoSrc = "/videos/presentation.mp4",
}: VideoPresentationProps) {
  const t = useTranslations("videoPresentation");

  // Modal state (expand / YouTube)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local video mute state
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Section scroll animation
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // ── Keyboard handler ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // ── Sync mute state with video element ───────────────────────────────────
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  // ── Framer Motion variants ────────────────────────────────────────────────
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.15 },
    },
  };

  // ── YouTube thumbnail ─────────────────────────────────────────────────────
  const youtubeThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null;

  return (
    <section ref={sectionRef} className="video-presentation" id="about">
      <div className="video-presentation__inner">

        {/* ── Colonne gauche : texte ──────────────────────────────────────── */}
        <motion.div
          className="video-presentation__content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <span className="video-presentation__eyebrow">{t("eyebrow")}</span>
          <h2 className="video-presentation__title">{t("title")}</h2>
          <p className="video-presentation__description">{t("description")}</p>

          <div className="video-presentation__ceo-block">
            <div className="video-presentation__separator" />
            <p className="video-presentation__ceo-text">
              {t("ceoName")} —{" "}
              <span className="video-presentation__ceo-role">
                {t("ceoRole")}
              </span>
            </p>
          </div>
        </motion.div>

        {/* ── Colonne droite : lecteur ────────────────────────────────────── */}
        <motion.div
          className="video-presentation__media-wrapper"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={videoVariants}
        >
          <div className="video-presentation__player-card">

            {/* ── CAS 1 : Vidéo locale — autoplay muted loop ── */}
            {!youtubeId && (
              <>
                {/* Élément vidéo inline */}
                <video
                  ref={videoRef}
                  className="video-presentation__inline-video"
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onClick={toggleMute}
                  aria-label={t("playAria")}
                />

                {/* Bouton mute / unmute — coin bas-gauche */}
                <button
                  type="button"
                  className="video-presentation__mute-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? t("unmute") : t("mute")}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                {/* Bouton agrandir — coin bas-droit */}
                <button
                  type="button"
                  className="video-presentation__expand-btn"
                  onClick={() => setIsModalOpen(true)}
                  aria-label={t("expand")}
                >
                  <Maximize2 size={18} />
                </button>
              </>
            )}

            {/* ── CAS 2 : YouTube — miniature + bouton Play custom ── */}
            {youtubeId && (
              <div
                className="video-presentation__yt-thumb"
                style={{ backgroundImage: `url(${youtubeThumbnail})` }}
              >
                <button
                  type="button"
                  className="video-presentation__play-btn"
                  onClick={() => setIsModalOpen(true)}
                  aria-label={t("playAria")}
                >
                  <Play className="fill-current ml-1" size={32} />
                </button>
              </div>
            )}

          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MODALE VIDÉO (agrandissement local OU embed YouTube)
         ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="video-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="video-modal__container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                type="button"
                className="video-modal__close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label={t("closeAria")}
              >
                <X size={28} />
              </button>

              <div className="video-modal__video-frame">
                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={t("title")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
