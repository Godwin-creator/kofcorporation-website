import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      description: 'Prénom et nom complet de la personne. Exemple : "Aminata Yao"',
      validation: (Rule) => Rule.required().error('Le nom est obligatoire'),
    }),
    defineField({
      name: 'role',
      title: 'Rôle / Poste (FR)',
      type: 'string',
      description: 'Poste occupé en français. Exemple : "Directeur de projet", "Chef de produit"',
    }),
    defineField({
      name: 'roleEn',
      title: 'Rôle / Poste (EN)',
      type: 'string',
      description: 'Version anglaise du poste. Exemple : "Project Manager", "Product Lead"',
    }),
    defineField({
      name: 'company',
      title: 'Entreprise / Organisation',
      type: 'string',
      description: 'Nom de l\'entreprise ou organisation de la personne',
    }),
    defineField({
      name: 'avatar',
      title: 'Photo de profil',
      type: 'image',
      description: 'Photo de profil (optionnel). Format carré recommandé (1:1)',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Citation (FR)',
      type: 'text',
      rows: 3,
      description: 'Citation en français - ce que la personne dit de KofCorporation. Soyez précis et concret.',
      validation: (Rule) => Rule.required().error('La citation est obligatoire'),
    }),
    defineField({
      name: 'quoteEn',
      title: 'Citation (EN)',
      type: 'text',
      rows: 3,
      description: 'Version anglaise de la citation.',
    }),
    defineField({
      name: 'rating',
      title: 'Note de satisfaction',
      type: 'number',
      description: 'Note de 1 à 5 étoiles (5 = excellent). Affichée sous forme d\'étoiles sur le site.',
      validation: (Rule) => Rule.min(1).max(5).error('La note doit être entre 1 et 5'),
    }),
    defineField({
      name: 'isVerified',
      title: 'Témoignage vérifié',
      type: 'boolean',
      description: 'Cochez si vous avez la confirmation écrite de ce témoignage (email, message, etc.)',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre d\'apparition dans le carrousel (1 = premier).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar',
      rating: 'rating',
    },
    prepare({title, subtitle, media, rating}) {
      const stars = rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : ''
      return {
        title,
        subtitle: `${subtitle ?? ''}  ${stars}`,
        media,
      }
    },
  },
})
