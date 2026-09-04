# KofCorporation — Site Vitrine Officiel

Site web institutionnel de **KofCorporation**, entreprise informatique basée à Lomé, Togo. Refonte complète du site existant vers une stack moderne, performante et maintenable.

> Conçu et développé dans le cadre d'un stage d'insertion professionnelle — Août/Septembre 2026.

---

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | [Next.js 14+](https://nextjs.org/) — App Router |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icônes | [Lucide React](https://lucide.dev/) |
| CMS | [Sanity CMS](https://www.sanity.io/) |
| Formulaire | React Hook Form + reCAPTCHA v3 |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) — FR / EN |
| Déploiement | [Vercel](https://vercel.com/) |

---

## Fonctionnalités

-  Mode clair / sombre — persisté en `localStorage`, respecte `prefers-color-scheme`
-  Multilingue — Français (défaut) et Anglais
-  Splash screen léger — fade-in logo, max 1,2s
-  Carte Google Maps intégrée — page Contact
-  Page 404 personnalisée
-  Entièrement responsive — mobile first
-  Accessibilité WCAG AA — aria-labels, contrastes, sémantique HTML5
-  Formulaire de contact sécurisé — reCAPTCHA v3
-  Scrollbar et sélection de texte personnalisées

---

## Structure des pages

```
/                     → Accueil
/services             → Vue d'ensemble des services
/services/[slug]      → Page détaillée par service
/realisations         → Portfolio des projets (via Sanity)
/qui-sommes-nous      → L'équipe, l'histoire, les valeurs
/contact              → Formulaire + Google Maps
/mentions-legales     → CGU + Politique de confidentialité
```

---

## Design system

**Typographie**
- Titres : `Inter Tight` (700 hero / 600 sections)
- Corps & UI : `Geist` (400 corps / 500 labels)

**Palette**
| Token | Clair | Sombre |
|---|---|---|
| Primary | `#2F3974` | `#E8F0FE` |
| Accent | `#0CACE8` | `#0CACE8` |
| Background | `#F8F9FA` | `#1A1E3A` |
| Surface | `#FFFFFF` | `#2C417A` |

**Philosophie visuelle** — sections pleine largeur à angles droits, border-radius uniquement sur les éléments UI internes (cards, boutons, badges).

---

## Installation locale

```bash
# Cloner le repo
git clone https://github.com/Godwin-creator/kofcorporation-website.git
cd kofcorporation-website

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
# → Renseigner les clés Sanity, Google Maps, reCAPTCHA

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'environnement

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

---

## Scripts

```bash
npm run dev        # Développement local
npm run build      # Build production
npm run start      # Serveur production local
npm run lint       # ESLint
```

---

## Déploiement

Le site est déployé automatiquement sur **Vercel** à chaque push sur `main`.

Preview automatique sur chaque Pull Request.

---

## Auteur

**Komi Godwin EDOH BEDI**
Stagiaire Développement Web — KofCorporation, Lomé, Togo

[![GitHub](https://img.shields.io/badge/GitHub-Godwin--creator-181717?logo=github)](https://github.com/Godwin-creator)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-gwin--edohbedi-0077B5?logo=linkedin)](https://www.linkedin.com/in/gwin-edohbedi)

---

## Licence

MIT — voir [LICENSE](./LICENSE)
