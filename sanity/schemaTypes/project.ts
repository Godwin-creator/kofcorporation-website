import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      description: 'Nom officiel du projet tel qu\'il apparaît sur le site',
      validation: (Rule) => Rule.required().error('Le titre est obligatoire'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Identifiant URL généré automatiquement depuis le titre — cliquez sur "Générer" si nécessaire',
      options: {source: 'title'},
      validation: (Rule) => Rule.required().error('Le slug est obligatoire'),
    }),

    // ── Catégories (multi-select) ──────────────────────────────────────────
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Types de projet — un projet peut appartenir à plusieurs catégories (ex: Web + Mobile). Utilisé pour le filtrage sur la page Réalisations.',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Logiciel', value: 'logiciel'},
          {title: 'Formation', value: 'formation'},
        ],
      },
      validation: (Rule) => Rule.required().min(1).error('Au moins une catégorie est obligatoire'),
    }),

    // ── Ancien champ category (lecture seule, rétro-compatibilité) ─────────
    defineField({
      name: 'category',
      title: '⚠️ Catégorie (ancien — ne plus utiliser)',
      type: 'string',
      description: 'Ancien champ à catégorie unique. Utilisez "Catégories" ci-dessus à la place. Ce champ sera supprimé ultérieurement.',
      hidden: true,
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Nom de l\'entreprise ou de l\'organisation cliente',
    }),
    defineField({
      name: 'sector',
      title: 'Secteur d\'activité',
      type: 'string',
      description: 'Secteur d\'activité du client. Exemples : "Santé", "Immobilier", "ONG", "Finance"',
    }),
    defineField({
      name: 'description',
      title: 'Description complète (FR)',
      type: 'text',
      rows: 4,
      description: 'Description détaillée en français (visible dans la modale de détail). 2-4 paragraphes recommandés.',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description complète (EN)',
      type: 'text',
      rows: 4,
      description: 'Version anglaise de la description complète.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte (FR)',
      type: 'text',
      rows: 2,
      description: 'Résumé court (max 150 caractères) affiché sur la carte projet en page d\'accueil',
      validation: (Rule) => Rule.max(150).error('Maximum 150 caractères'),
    }),
    defineField({
      name: 'shortDescriptionEn',
      title: 'Description courte (EN)',
      type: 'text',
      rows: 2,
      description: 'Version anglaise du résumé court.',
      validation: (Rule) => Rule.max(150).error('Maximum 150 caractères'),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Liste des technologies utilisées. Appuyez sur Entrée entre chaque technologie. Exemples : "React", "Flutter", "Laravel"',
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      description: 'Capture d\'écran ou visuel représentatif du projet (format 16:9 recommandé). Cliquez sur le bouton "Hotspot" pour définir la zone importante.',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
      ],
    }),

    // ── Galerie d'images secondaires ───────────────────────────────────────
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
          ],
        },
      ],
      description: 'Images supplémentaires du projet (captures d\'écran, maquettes…). Affichées dans la modale de détail.',
    }),

    // ── Liens multiples (remplace l'ancien champ url) ─────────────────────
    defineField({
      name: 'links',
      title: 'Liens du projet',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectLink',
          title: 'Lien',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              description: 'Texte affiché pour ce lien. Exemples : "Voir le site", "Play Store", "App Store"',
              validation: (Rule) => Rule.required().error('Le libellé est obligatoire'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Adresse du lien. Exemple : https://play.google.com/store/apps/details?id=...',
              validation: (Rule) => Rule.required().error('L\'URL est obligatoire'),
            }),
            defineField({
              name: 'type',
              title: 'Type de lien',
              type: 'string',
              description: 'Catégorie du lien — détermine l\'icône affichée sur le site',
              options: {
                list: [
                  {title: '🌐 Site web', value: 'website'},
                  {title: '📱 Google Play Store', value: 'playstore'},
                  {title: '🍎 Apple App Store', value: 'appstore'},
                  {title: '💻 Code source (GitHub)', value: 'github'},
                  {title: '🎮 Démo en ligne', value: 'demo'},
                  {title: '📎 Autre', value: 'other'},
                ],
              },
              initialValue: 'website',
              validation: (Rule) => Rule.required().error('Le type de lien est obligatoire'),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        },
      ],
      description: 'Liens vers le projet : site web, Play Store, App Store, code source, démo… Ajoutez autant de liens que nécessaire.',
    }),

    // ── Ancien champ url (rétro-compatibilité) ────────────────────────────
    defineField({
      name: 'url',
      title: '⚠️ URL (ancien — ne plus utiliser)',
      type: 'url',
      description: 'Ancien champ URL unique. Utilisez "Liens du projet" ci-dessus à la place.',
      hidden: true,
    }),

    // ── Année et durée ────────────────────────────────────────────────────
    defineField({
      name: 'year',
      title: 'Année de réalisation',
      type: 'number',
      description: 'Année de réalisation ou livraison du projet. Exemple : 2024',
      validation: (Rule) => Rule.min(2000).max(2100),
    }),
    defineField({
      name: 'duration',
      title: 'Durée du projet (FR)',
      type: 'string',
      description: 'Durée approximative en français. Exemples : "3 mois", "6 semaines", "1 an"',
    }),
    defineField({
      name: 'durationEn',
      title: 'Durée du projet (EN)',
      type: 'string',
      description: 'Version anglaise de la durée. Exemples : "3 months", "6 weeks", "1 year"',
    }),

    defineField({
      name: 'featured',
      title: 'Mis en avant sur l\'accueil',
      type: 'boolean',
      description: 'Cochez pour afficher ce projet dans la section Réalisations de la page d\'accueil (max 3 projets)',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      description: 'Date de mise en ligne du projet — utilisée pour le tri chronologique',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      description: 'Publié = visible sur le site. Brouillon = non visible. Archivé = masqué définitivement.',
      options: {
        list: [
          {title: 'Publié', value: 'published'},
          {title: 'Brouillon', value: 'draft'},
          {title: 'Archivé', value: 'archived'},
        ],
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre d\'affichage parmi les projets mis en avant (1 = premier). Laissez vide pour un tri automatique.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
      categories: 'categories',
      category: 'category',
      featured: 'featured',
    },
    prepare({title, subtitle, media, categories, category, featured}) {
      // Rétro-compatibilité : utiliser categories[] ou l'ancien category
      const cats = categories?.length ? categories.join(', ') : category ?? ''
      const badges = [cats, featured ? '⭐ Accueil' : ''].filter(Boolean).join(' · ')
      return {
        title,
        subtitle: `${subtitle ?? ''} — ${badges}`.trim() || cats,
        media,
      }
    },
  },
})
