import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner', title: '🤝 Partenaires', type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nom du partenaire', type: 'string', description: "Nom officiel de l'organisation", validation: (Rule) => Rule.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image', description: 'Logo en PNG ou SVG, fond transparent recommandé', fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string', validation: (Rule) => Rule.required()})], validation: (Rule) => Rule.required()}),
    defineField({name: 'url', title: 'Site web officiel (optionnel)', type: 'url'}),
    defineField({name: 'order', title: "Ordre d'affichage", type: 'number', description: 'Position dans le bandeau (1 = premier)'}),
  ],
  preview: {select: {title: 'name', media: 'logo'}, prepare({title, media}) {return {title, media}}},
})
