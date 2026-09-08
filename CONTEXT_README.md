# KofCorporation — Context projet

> Dernière mise à jour : 8 septembre 2026
> État réel : site vitrine fonctionnel, pages métiers validées, direction visuelle stabilisée, thème par défaut en mode clair.

## Composants réalisés

- [x] Page /services — page métier complète avec hero dédié, grille des services, section méthode et CTA finale.
- [x] Page /qui-sommes-nous — contenu institutionnel, valeurs et présentation de l'agence.
- [x] Page /realisations — portfolio structuré avec mises en avant des projets.
- [x] Page /contact — formulaire, coordonnées, intégration Google Maps et cadrage visuel cohérent.
- [x] Direction visuelle stabilisée — animation `Threads` appliquée uniquement dans le Hero ; le reste du site reste sobre et sans fond animé.
- [x] Thème par défaut validé en `light` avec support du mode sombre conservé comme variante.
- [x] Stabilisation des composants visuels et corrections de lint sur `Hero.tsx` et `useTheme.ts`.
- [x] Implémentation du design system global : palette, typographie, cards, boutons, CTA, sections et hiérarchie visuelle.
- [x] Header, Footer, Splash Screen et landing page d'accueil harmonisés dans le même système.

## Points réalisés / validés récemment

- Intégration de la carte Google Maps sur la page Contact.
- Correction des erreurs lint sur le composant Hero et sur la logique de thème.
- Validation de l'exception d'animation : `Threads` uniquement dans le Hero.
- Suppression des effets de fond animés globaux pour préserver la lisibilité et la premiumité.
- Ajustement de la charte visuelle vers une direction plus sobre, plus claire et plus professionnelle.
- Pages détaillées /services/[slug] (4 pages)
- Traductions EN complètes sur toutes les pages
- Page 404 personnalisée
- Setup Sanity CMS
- i18n next-intl (FR/EN)
- Site en production : kofcorporation-website.vercel.app

## Composants à faire : PHASE 5 - Finalisation & mise en production

>Priorité 1 - Formulaire contact (backend réel)
  - Route Handler Next.js : POST /api/contact
  - Intégration Resend (envoi email)
  - Variables d'env : RESEND_API_KEY
  - Email de destination : contact@kofcorporation.com
  - Email de confirmation automatique à l'expéditeur
  - reCAPTCHA v3 : NEXT_PUBLIC_RECAPTCHA_SITE_KEY 
    + RECAPTCHA_SECRET_KEY
  - Validation côté serveur des champs

>Priorité 2 - Sanity CMS
  - Setup projet Sanity
  - Schémas : chiffres clés, projets, témoignages
  - Brancher Stats, Projects, Testimonials sur Sanity
  - Studio Sanity accessible au chef pour les mises à jour

>Priorité 3 - SEO & performance
  - Meta tags dynamiques par page (generateMetadata)
  - sitemap.xml dynamique
  - robots.txt
  - og:image par page
  - Audit Lighthouse avant livraison finale

>Priorité 4 - Technique
  - Migration middleware → proxy (Next.js 16)
  - Remplacer <img> Partners par next/image
  - Photos réelles équipe (à récupérer lors 
    de la présentation du 18 sept)
  - Screenshots réels des projets portfolio


## État global du projet

Le site KofCorporation est aujourd'hui bien avancé côté structure, contenu et UX. Les pages métier principales sont en place et cohérentes avec la direction visuelle finale. Les éléments restant à faire concernent surtout l'architecture CMS, l'internationalisation et la sécurisation du formulaire de contact.
