import {defineField, defineType} from 'sanity'

export const companySettings = Object.assign(defineType({
  name: 'companySettings',
  title: 'Paramètres de l’entreprise',
  type: 'document',
  fields: [
    defineField({name: 'companyName', title: 'Nom', type: 'string'}),
    defineField({name: 'phone', title: 'Téléphones', type: 'array', of: [{type: 'string'}], validation: (Rule) => Rule.min(1)}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email()}),
    defineField({name: 'address', title: 'Adresse', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'openingHours', title: 'Horaires (FR)', type: 'string'}),
    defineField({name: 'openingHoursEn', title: 'Horaires (EN)', type: 'string'}),
    defineField({name: 'foundedYear', title: 'Année de création', type: 'number'}),
    defineField({name: 'heroTitle', title: 'Titre hero (FR)', type: 'string'}),
    defineField({name: 'heroTitleEn', title: 'Titre hero (EN)', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Sous-titre hero (FR)', type: 'text'}),
    defineField({name: 'heroSubtitleEn', title: 'Sous-titre hero (EN)', type: 'text'}),
    defineField({name: 'presentationVideoUrl', title: 'Vidéo YouTube de présentation', type: 'url', description: 'Collez l’URL complète de la vidéo YouTube.'}),
    defineField({name: 'presentationVideoFile', title: 'Fichier vidéo de présentation', type: 'file', options: {accept: 'video/*'}, description: 'Utilisé uniquement si aucune URL YouTube n’est renseignée.'}),
    defineField({name: 'teamPhoto', title: 'Photo de l’équipe', type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
    ]}),
  ],
}), {__experimental_actions: ['update', 'publish'] as const})