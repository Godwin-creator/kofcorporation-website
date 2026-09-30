# KofCorporation - Site Vitrine Officiel

Site web institutionnel de **KofCorporation**, entreprise informatique basée à Lomé, Togo. Refonte complète du site existant vers une stack moderne, performante et maintenable.

> Conçu et développé dans le cadre d'un stage d'insertion professionnelle - Août/Septembre 2026.

---

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| Styling | Design System sur-mesure (CSS Custom Properties & BEM/Moderne) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icônes | [Lucide React](https://lucide.dev/) |
| CMS | [Sanity CMS v5](https://www.sanity.io/) (Next-Sanity Live) |
| Formulaire | Validation Zod + Nodemailer (SMTP VPS) + reCAPTCHA v3 |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) - FR / EN |
| Déploiement | [Vercel](https://vercel.com/) |

---

## Fonctionnalités

-  **Mode clair / sombre** - persistant en `localStorage`, sans flash au chargement (`InlineScript` dans le `<head>`), respecte `prefers-color-scheme`.
-  **Multilingue (FR / EN)** - routing internationalisé avec `next-intl`.
-  **Hero interactif & cinématique** :
  - Machine d'état typewriter à deux lignes avec rythme de frappe humain, curseur dédié et effacement automatique.
  - Puzzle interactif desktop avec drag & drop, détection de grille et restauration intelligente du curseur natif (`grab` / `grabbing`).
  - Déclinaison mobile fluide en cross-fade d'images.
  - Arrière-plan optimisé avec superposition subtile adaptée au thème actif.
-  **Scroll reveal dynamique & bidirectionnel** - animation cinématique mot par mot qui s'anime et se rétracte en fonction du défilement haut/bas.
-  **Curseur animé personnalisé** - anneau interactif fluide (lerp) avec masque automatique sur les éléments nécessitant le curseur système.
-  **Pages services enrichies** - bannières vidéo dédiées en fond (`devWeb-banner.mp4`, `devMobile-banner.mp4`, `logicielGestion-banner.mp4`).
-  **Studio Sanity CMS intégré** - accessible à `/studio` pour piloter statistiques, projets phares, témoignages et réglages d'entreprise.
-  **Formulaire de contact sécurisé** - protection reCAPTCHA v3, validation côté serveur et double notification par email via SMTP dédié.
-  **Carte interactive Google Maps** - intégrée sur la page Contact.
-  **Accessibilité & performance** - sémantique HTML5, respect WCAG AA, balises Open Graph dynamiques et chargement optimisé via `next/image`.

---

## Structure des pages

```
/                     → Accueil (Hero interactif, Vidéo, Services, Stats, Réalisations, Témoignages)
/services             → Présentation générale des expertises
/services/[slug]      → Pages dédiées avec bandeau vidéo immersif
/realisations         → Portfolio complet avec filtres et modales (Sanity)
/qui-sommes-nous      → Histoire, valeurs et équipe
/contact              → Formulaire sécurisé + carte Google Maps
/mentions-legales     → CGU & politique de confidentialité
/studio               → Sanity Studio pour la gestion de contenus
```

---

## Design System

**Typographie**
- Titres : `Manrope` (700 à 800)
- Corps & UI : `Inter` (400 à 600)
- Accents : `Story Script`

**Palette de couleurs**
| Token | Rôle | Clair | Sombre |
|---|---|---|---|
| `--color-primary` | Couleur primaire | `#2F3974` | `#E8F0FE` |
| `--color-accent` | Accentuation & CTA | `#0CACE8` | `#0CACE8` |
| `--color-bg` | Fond de page | `#F8F9FA` | `#1A1E3A` |
| `--color-surface` | Cartes & panneaux | `#FFFFFF` | `#2C417A` |
| `--color-border` | Lignes & bordures | `#E2E8F0` | `#1E293B` |

**Philosophie visuelle** : Approche moderne, épurée et géométrique (« zero rounded » sur les grands blocs), contrastes soignés, animations non intrusives basées sur le défilement.

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

# Open Graph / URL publique du site
NEXT_PUBLIC_SITE_URL=https://kofcorporation.com
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
Stagiaire Développement Web - KofCorporation, Lomé, Togo

[![GitHub](https://img.shields.io/badge/GitHub-Godwin--creator-181717?logo=github)](https://github.com/Godwin-creator)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-gwin--edohbedi-0077B5?logo=linkedin)](https://www.linkedin.com/in/gwin-edohbedi)

---

## Licence

MIT - voir [LICENSE](./LICENSE)
