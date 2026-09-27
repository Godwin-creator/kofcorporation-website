import {defineField, defineType} from 'sanity'
import {iconOptions} from './shared/iconOptions'

export const stat = defineType({
  name: 'stat',
  title: 'Chiffre clé',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Valeur affichée',
      type: 'string',
      description: 'La valeur telle qu\'elle apparaît sur le site. Exemples : "5 ans", "20+", "98%", "200+"',
      validation: (Rule) => Rule.required().error('La valeur est obligatoire'),
    }),
    defineField({
      name: 'label',
      title: 'Libellé (Français)',
      type: 'string',
      description: 'Courte description sous la valeur. Exemple : "Années d\'expérience", "Projets réalisés"',
      validation: (Rule) =>
        Rule.required()
          .max(40)
          .error('Le libellé est obligatoire (40 caractères max)'),
    }),
    defineField({
      name: 'labelEn',
      title: 'Libellé (Anglais)',
      type: 'string',
      description: 'Traduction anglaise du libellé. Exemple : "Years of experience", "Projects completed"',
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Choisissez l\'icône qui représente le mieux ce chiffre',
      options: {
        list: iconOptions,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'order',
      title: 'Position d\'affichage',
      type: 'number',
      description: 'Ordre d\'apparition (1 = premier à gauche). Utilisez 1, 2, 3, 4.',
      validation: (Rule) => Rule.required().min(1).error('La position est obligatoire (minimum 1)'),
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
    prepare({title, subtitle}) {
      return {title: `${title} — ${subtitle}`, subtitle: ''}
    },
  },
})
