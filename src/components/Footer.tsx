import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import "./Footer.css";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__inner">
          
          {/* Brand & Intro */}
          <div className="footer__col footer__brand">
            <Link href="/" className="footer__logo" aria-label="Accueil KofCorporation">
              <Image
                src="/images/logo.svg"
                alt="KofCorporation Logo"
                width={32}
                height={32}
                className="footer__logo-img"
              />
              <span className="footer__logo-text">KofCorporation</span>
            </Link>
            <p className="footer__desc">
              Société informatique togolaise concevant des applications web, 
              mobiles et logiciels sur mesure avec des standards internationaux.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation - Services */}
          <div className="footer__col">
            <h3 className="footer__title">Expertises</h3>
            <ul className="footer__list">
              <li>
                <Link href="/services/developpement-web" className="footer__link">
                  Développement Web
                </Link>
              </li>
              <li>
                <Link href="/services/applications-mobiles" className="footer__link">
                  Applications Mobiles
                </Link>
              </li>
              <li>
                <Link href="/services/logiciels-gestion" className="footer__link">
                  Logiciels de Gestion
                </Link>
              </li>
              <li>
                <Link href="/services/formations" className="footer__link">
                  Formations (Academy)
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation - Entreprise */}
          <div className="footer__col">
            <h3 className="footer__title">Entreprise</h3>
            <ul className="footer__list">
              <li>
                <Link href="/qui-sommes-nous" className="footer__link">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="footer__link">
                  Nos réalisations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer__link">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="footer__link">
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__col footer__contact">
            <h3 className="footer__title">Nous contacter</h3>
            <ul className="footer__list footer__list--contact">
              <li>
                <MapPin size={18} className="footer__icon" />
                <span>Agoè Minamadou, à côté de ESA, Lomé, Togo</span>
              </li>
              <li>
                <Phone size={18} className="footer__icon" />
                <div className="footer__phones">
                  <a href="tel:+22870441636">+228 70 44 16 36</a>
                  <span>/</span>
                  <a href="tel:+22893554740">+228 93 55 47 40</a>
                </div>
              </li>
              <li>
                <Mail size={18} className="footer__icon" />
                <a href="mailto:contact@kofcorporation.com">
                  contact@kofcorporation.com
                </a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__inner footer__inner--bottom">
          <p className="footer__copy">
            © {currentYear} KofCorporation. Tous droits réservés.
          </p>
          <div className="footer__bottom-links">
             <Link href="/mentions-legales">CGU & Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
