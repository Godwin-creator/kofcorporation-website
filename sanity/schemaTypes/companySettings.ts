import {defineField, defineType} from 'sanity'

export const companySettings = Object.assign(defineType({
  name: 'companySettings',
  title: 'Paramètres de l’entreprise',
  type: 'document',
  fields: [
    defineField({name: 'companyName', title: 'Nom', type: 'string'}),
    defineField({name: 'phone', title: 'Téléphones', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Adresse', type: 'string'}),
    defineField({name: 'foundedYear', title: 'Année de création', type: 'number'}),
    defineField({name: 'heroTitle', title: 'Titre hero (FR)', type: 'string'}),
    defineField({name: 'heroTitleEn', title: 'Titre hero (EN)', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Sous-titre hero (FR)', type: 'text'}),
    defineField({name: 'heroSubtitleEn', title: 'Sous-titre hero (EN)', type: 'text'}),
  ],
}), {__experimental_actions: ['update', 'publish'] as const})