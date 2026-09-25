import {defineField, defineType} from 'sanity'

const iconOptions = [
  {title: 'Horloge', value: 'Clock'},
  {title: 'Dossier validé', value: 'FolderCheck'},
  {title: 'Étoile', value: 'Star'},
  {title: 'Diplôme', value: 'GraduationCap'},
  {title: 'Globe', value: 'Globe'},
  {title: 'Smartphone', value: 'Smartphone'},
  {title: 'Moniteur', value: 'Monitor'},
  {title: 'Code', value: 'Code2'},
  {title: 'Utilisateurs', value: 'Users'},
  {title: 'Graphique', value: 'TrendingUp'},
  {title: 'Bouclier', value: 'Shield'},
  {title: 'Ampoule', value: 'Lightbulb'},
]

const richText = {
  type: 'array',
  of: [{type: 'block'}],
}

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Titre (FR)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'titleEn', title: 'Titre (EN)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Résumé (FR)', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(200)}),
    defineField({name: 'summaryEn', title: 'Résumé (EN)', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(200)}),
    defineField({name: 'description', title: 'Description riche (FR)', ...richText}),
    defineField({name: 'descriptionEn', title: 'Description riche (EN)', ...richText}),
    defineField({name: 'icon', title: 'Icône', type: 'string', options: {list: iconOptions, layout: 'radio'}}),
    defineField({name: 'stack', title: 'Technologies', type: 'array', of: [{type: 'string'}], validation: (Rule) => Rule.min(1)}),
    defineField({name: 'order', title: 'Ordre', type: 'number', validation: (Rule) => Rule.required()}),
    defineField({name: 'active', title: 'Actif', type: 'boolean', initialValue: true}),
  ],
})
