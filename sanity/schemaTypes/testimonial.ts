import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial', title: '💬 Témoignages', type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nom complet', type: 'string', description: 'Prénom et nom de la personne', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Poste / Fonction (Français)', type: 'string'}),
    defineField({name: 'roleEn', title: 'Poste / Fonction (Anglais)', type: 'string'}),
    defineField({name: 'company', title: 'Entreprise ou Organisation', type: 'string'}),
    defineField({name: 'avatar', title: 'Photo de profil (optionnel)', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string'})]}),
    defineField({name: 'quote', title: 'Citation (Français)', type: 'text', description: 'Ce que la personne dit de KofCorporation. Soyez précis et authentique.', validation: (Rule) => Rule.required()}),
    defineField({name: 'quoteEn', title: 'Citation (Anglais)', type: 'text'}),
    defineField({name: 'rating', title: 'Note de satisfaction', type: 'number', validation: (Rule) => Rule.min(1).max(5)}),
    defineField({name: 'isVerified', title: 'Témoignage vérifié', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: "Ordre d'affichage", type: 'number'}),
  ],
  preview: {select: {title: 'name', company: 'company', rating: 'rating', media: 'avatar'}, prepare({title, company, rating, media}) {return {title, subtitle: `${company ?? ''} ${rating ? '★'.repeat(rating) : ''}`.trim(), media}}},
})
