import {defineField, defineType} from 'sanity'
import {iconOptions} from './shared/iconOptions'

const richText = {
  type: 'array',
  of: [{type: 'block'}],
}

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du service (FR)',
      type: 'string',
      description: 'Nom du service en français. Exemple : "Développement Web & Applications"',
      validation: (Rule) => Rule.required().error('Le titre est obligatoire'),
    }),
    defineField({
      name: 'titleEn',
      title: 'Titre du service (EN)',
      type: 'string',
      description: 'Nom du service en anglais. Exemple : "Web & Application Development"',
      validation: (Rule) => Rule.required().error('Le titre anglais est obligatoire'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Identifiant URL — cliquez sur "Générer" après avoir saisi le titre',
      options: {source: 'title'},
      validation: (Rule) => Rule.required().error('Le slug est obligatoire'),
    }),
    defineField({
      name: 'summary',
      title: 'Résumé (FR)',
      type: 'text',
      rows: 3,
      description: 'Résumé en 1-2 phrases (max 200 caractères) affiché sur la carte service',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Le résumé est obligatoire (200 caractères max)'),
    }),
    defineField({
      name: 'summaryEn',
      title: 'Résumé (EN)',
      type: 'text',
      rows: 3,
      description: 'Version anglaise du résumé (max 200 caractères)',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Le résumé anglais est obligatoire (200 caractères max)'),
    }),
    defineField({
      name: 'description',
      title: 'Description complète (FR)',
      ...richText,
      description: 'Description détaillée avec titres et paragraphes — visible sur la page service dédiée',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description complète (EN)',
      ...richText,
      description: 'Version anglaise de la description complète',
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: "Icône représentant ce service — choisissez celle qui correspond le mieux",
      options: {
        list: [...iconOptions],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'stack',
      title: 'Stack technologique',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Technologies utilisées pour ce service. Appuyez sur Entrée entre chaque. Exemples : "React", "Flutter", "Node.js"',
    }),
    defineField({
      name: 'order',
      title: 'Position dans la grille',
      type: 'number',
      description: 'Position dans la grille des services (1 = premier en haut à gauche)',
      validation: (Rule) => Rule.required().min(1).error('La position est obligatoire (minimum 1)'),
    }),
    defineField({
      name: 'active',
      title: 'Visible sur le site',
      type: 'boolean',
      description: 'Décochez pour masquer ce service sur le site sans le supprimer définitivement',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'summary', media: 'icon'},
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: (subtitle ?? '').slice(0, 50),
      }
    },
  },
})
