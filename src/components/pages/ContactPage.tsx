"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import "./ContactPage.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <motion.section
        className="contact-page__hero"
        aria-labelledby="contact-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="contact-page__hero-inner">
          <p className="contact-page__eyebrow">Nous contacter</p>
          <h1 id="contact-title">Parlons de ce que nous pouvons construire ensemble.</h1>
          <p>
            Un projet web, mobile, logiciel ou une idée à clarifier ? Décrivez-nous
            votre besoin, nous vous répondrons avec une première piste concrète.
          </p>
        </div>
      </motion.section>

      <section className="contact-page__content" aria-labelledby="contact-form-title">
        <div className="contact-page__container contact-page__grid">
          <motion.div
            className="contact-page__form-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="contact-page__eyebrow">Votre projet</p>
            <h2 id="contact-form-title">Dites-nous où vous voulez aller.</h2>
            {submitted ? (
              <div className="contact-page__success" role="status">
                <Send size={22} strokeWidth={1.8} aria-hidden="true" />
                <h3>Merci pour votre message.</h3>
                <p>
                  Votre demande est prête à être transmise à notre équipe. Nous
                  reviendrons vers vous rapidement.
                </p>
                <button type="button" onClick={() => setSubmitted(false)}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <label>
                    Nom complet
                    <input name="name" type="text" placeholder="Votre nom" required />
                  </label>
                  <label>
                    Email professionnel
                    <input name="email" type="email" placeholder="vous@entreprise.com" required />
                  </label>
                </div>
                <label>
                  Sujet
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>
                      Choisir un sujet
                    </option>
                    <option value="web">Projet web</option>
                    <option value="mobile">Application mobile</option>
                    <option value="software">Logiciel de gestion</option>
                    <option value="training">Formation ou coaching</option>
                    <option value="other">Autre demande</option>
                  </select>
                </label>
                <label>
                  Parlez-nous de votre projet
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Objectifs, contexte, délais…"
                    required
                  />
                </label>
                <button className="contact-form__submit" type="submit">
                  Envoyer le message
                  <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <p className="contact-form__note">
                  En envoyant ce formulaire, vous acceptez que KofCorporation
                  utilise ces informations pour vous répondre.
                </p>
              </form>
            )}
          </motion.div>

          <aside className="contact-page__aside" aria-label="Coordonnées KofCorporation">
            <div className="contact-page__details">
              <p className="contact-page__eyebrow">Nos coordonnées</p>
              <h2>Une équipe accessible, basée à Lomé.</h2>
              <ul>
                <li>
                  <MapPin size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>Agoè Minamadou, à côté de ESA, Lomé, Togo</span>
                </li>
                <li>
                  <Phone size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>
                    <a href="tel:+22870441636">+228 70 44 16 36</a>
                    <a href="tel:+22893554740">+228 93 55 47 40</a>
                  </span>
                </li>
                <li>
                  <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
                  <a href="mailto:contact@kofcorporation.com">
                    contact@kofcorporation.com
                  </a>
                </li>
                <li>
                  <Clock3 size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>Lun–Sam, 8h–18h</span>
                </li>
              </ul>
            </div>

            <div className="contact-page__map">
              <iframe
                title="Localisation de KofCorporation à Lomé"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d1.1903082352326708!3d6.222112510720469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021599db15d7109%3A0xd3dd99c055cdec10!2sKofCorporation!5e1!3m2!1sen!2stg!4v1788719337955!5m2!1sen!2stg"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
