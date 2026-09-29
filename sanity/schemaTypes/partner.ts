import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du partenaire',
      type: 'string',
      description: 'Nom officiel de l\'organisation partenaire. Exemple : "Google for Startups"',
      validation: (Rule) => Rule.required().error('Le nom du partenaire est obligatoire'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo de l\'organisation en PNG ou SVG, de préférence sur fond transparent. Taille recommandée : 200×60px',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
      ],
      validation: (Rule) => Rule.required().error('Le logo est obligatoire'),
    }),
    defineField({
      name: 'url',
      title: 'Site web',
      type: 'url',
      description: 'URL du site web officiel du partenaire (optionnel)',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'apparition',
      type: 'number',
      description: 'Ordre d\'apparition dans le bandeau défilant (1 = premier).',
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
    prepare({title, media}) {
      return {title, media}
    },
  },
})
