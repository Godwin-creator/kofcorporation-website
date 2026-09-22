import {defineField, defineType} from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Chiffre clé',
  type: 'document',
  fields: [
    defineField({name: 'value', title: 'Valeur', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Libellé (FR)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'labelEn', title: 'Libellé (EN)', type: 'string'}),
    defineField({name: 'icon', title: 'Icône Lucide', type: 'string'}),
    defineField({name: 'order', title: 'Ordre', type: 'number', validation: (Rule) => Rule.required()}),
  ],
})