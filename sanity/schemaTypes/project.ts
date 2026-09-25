import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'category', title: 'Catégorie', type: 'string', options: {list: [
      {title: 'Web', value: 'web'}, {title: 'Mobile', value: 'mobile'},
      {title: 'Logiciel', value: 'logiciel'}, {title: 'Formation', value: 'formation'},
    ]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'client', title: 'Client', type: 'string'}),
    defineField({name: 'sector', title: 'Secteur', type: 'string'}),
    defineField({name: 'description', title: 'Description (FR)', type: 'text'}),
    defineField({name: 'descriptionEn', title: 'Description (EN)', type: 'text'}),
    defineField({name: 'shortDescription', title: 'Description courte (FR)', type: 'text', rows: 2, validation: (Rule) => Rule.max(150)}),
    defineField({name: 'shortDescriptionEn', title: 'Description courte (EN)', type: 'text', rows: 2, validation: (Rule) => Rule.max(150)}),
    defineField({name: 'technologies', title: 'Technologies', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
    ]}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'featured', title: 'Mis en avant', type: 'boolean', initialValue: false}),
    defineField({name: 'publishedAt', title: 'Date de publication', type: 'datetime'}),
    defineField({name: 'status', title: 'Statut', type: 'string', options: {list: [
      {title: 'Publié', value: 'published'}, {title: 'Brouillon', value: 'draft'}, {title: 'Archivé', value: 'archived'},
    ]}, initialValue: 'published'}),
    defineField({name: 'order', title: 'Ordre', type: 'number'}),
  ],
})