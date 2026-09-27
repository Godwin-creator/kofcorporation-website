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
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Type de projet — utilisé pour le filtrage sur la page Réalisations',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Logiciel', value: 'logiciel'},
          {title: 'Formation', value: 'formation'},
        ],
      },
      validation: (Rule) => Rule.required().error('La catégorie est obligatoire'),
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
    defineField({
      name: 'url',
      title: 'URL du projet',
      type: 'url',
      description: 'Lien vers le projet en ligne (si disponible et public). Exemple : https://example.com',
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
      category: 'category',
      featured: 'featured',
    },
    prepare({title, subtitle, media, category, featured}) {
      const badges = [category, featured ? '⭐ Accueil' : ''].filter(Boolean).join(' · ')
      return {
        title,
        subtitle: `${subtitle ?? ''} — ${badges}`.trim() || category,
        media,
      }
    },
  },
})
