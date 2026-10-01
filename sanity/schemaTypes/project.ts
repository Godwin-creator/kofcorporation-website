import {defineField, defineType} from 'sanity'

const categoryOptions = [
  {title: '🌐 Web', value: 'web'}, {title: '📱 Mobile', value: 'mobile'},
  {title: '🖥️ Logiciel de gestion', value: 'logiciel'}, {title: '🎓 Formation', value: 'formation'},
]
const linkOptions = [
  {title: '🌐 Site web', value: 'web'}, {title: '🤖 Google Play Store', value: 'playstore'},
  {title: '🍎 Apple App Store', value: 'appstore'}, {title: '💻 GitHub', value: 'github'},
  {title: '🎬 Démonstration vidéo', value: 'demo'}, {title: '📄 Autre', value: 'other'},
]

export const project = defineType({
  name: 'project', title: '🚀 Projets réalisés', type: 'document',
  fields: [
    defineField({name: 'title', title: 'Titre du projet', type: 'string', description: "Nom officiel du projet tel qu'il apparaît sur le site", validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug (identifiant URL)', type: 'slug', options: {source: 'title'}, description: "Généré automatiquement — cliquez sur 'Générer' après avoir saisi le titre", validation: (Rule) => Rule.required()}),
    defineField({name: 'categories', title: 'Catégories du projet', type: 'array', of: [{type: 'string'}], description: 'Un projet peut appartenir à plusieurs catégories.', options: {list: categoryOptions, layout: 'grid'}, validation: (Rule) => Rule.required().min(1)}),
    defineField({name: 'client', title: 'Client', type: 'string', description: "Nom de l'entreprise ou de l'organisation cliente"}),
    defineField({name: 'sector', title: "Secteur d'activité", type: 'string'}),
    defineField({name: 'description', title: 'Description complète (Français)', type: 'text', description: 'Description détaillée visible dans la modale de détail du projet. 2 à 4 paragraphes recommandés.', validation: (Rule) => Rule.required()}),
    defineField({name: 'shortDescription', title: 'Description courte (Français)', type: 'text', validation: (Rule) => Rule.max(150)}),
    defineField({name: 'descriptionEn', title: 'Description complète (Anglais)', type: 'text'}),
    defineField({name: 'shortDescriptionEn', title: 'Description courte (Anglais)', type: 'text', validation: (Rule) => Rule.max(150)}),
    defineField({name: 'technologies', title: 'Technologies utilisées', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'image', title: 'Image principale', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string', validation: (Rule) => Rule.required()})], validation: (Rule) => Rule.required()}),
    defineField({name: 'gallery', title: "Galerie d'images", type: 'array', of: [{type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string'})]}]}),
    defineField({name: 'links', title: 'Liens du projet', type: 'array', of: [{type: 'object', name: 'projectLink', fields: [defineField({name: 'type', title: 'Type de lien', type: 'string', options: {list: linkOptions}, validation: (Rule) => Rule.required()}), defineField({name: 'url', title: 'URL du lien', type: 'url', validation: (Rule) => Rule.required()}), defineField({name: 'label', title: 'Libellé personnalisé (optionnel)', type: 'string'})], preview: {select: {type: 'type', url: 'url'}, prepare({type, url}) {return {title: `${type} — ${url}`}}}}]}),
    defineField({name: 'year', title: 'Année de réalisation', type: 'number', validation: (Rule) => Rule.min(2019).max(2030)}),
    defineField({name: 'featured', title: "Mis en avant sur la page d'accueil", type: 'boolean', initialValue: false}),
    defineField({name: 'publishedAt', title: 'Date de publication', type: 'datetime'}),
    defineField({name: 'order', title: "Ordre d'affichage", type: 'number'}),
  ],
  preview: {select: {title: 'title', client: 'client', categories: 'categories', media: 'image', featured: 'featured'}, prepare({title, client, categories, media, featured}) {return {title, subtitle: `${client ?? ''} — ${(categories ?? []).join(' · ')}${featured ? ' · ⭐ Accueil' : ''}`, media}}},
})
