import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Rôle (FR)', type: 'string'}),
    defineField({name: 'roleEn', title: 'Rôle (EN)', type: 'string'}),
    defineField({name: 'company', title: 'Entreprise', type: 'string'}),
    defineField({name: 'avatar', title: 'Photo', type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
    ]}),
    defineField({name: 'quote', title: 'Citation (FR)', type: 'text', validation: (Rule) => Rule.required()}),
    defineField({name: 'quoteEn', title: 'Citation (EN)', type: 'text'}),
    defineField({name: 'rating', title: 'Note', type: 'number', validation: (Rule) => Rule.min(1).max(5)}),
    defineField({name: 'isVerified', title: 'Témoignage vérifié', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: 'Ordre', type: 'number'}),
  ],
})