import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image', fields: [
      defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
    ], validation: (Rule) => Rule.required()}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'order', title: 'Ordre', type: 'number'}),
  ],
})