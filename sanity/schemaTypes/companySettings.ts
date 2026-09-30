import {defineField, defineType} from 'sanity'
import {iconOptions} from './shared/iconOptions'

const richText = {
  type: 'array',
  of: [{type: 'block'}],
}

export const companySettings = Object.assign(
  defineType({
    name: 'companySettings',
    title: "Paramètres de l'entreprise",
    type: 'document',
    fields: [
      defineField({
        name: 'companyName',
        title: "Nom de l'entreprise",
        type: 'string',
        description: 'Nom officiel affiché sur le site. Actuellement : "KofCorporation"',
      }),
      defineField({
        name: 'phone',
        title: 'Téléphones',
        type: 'array',
        of: [{type: 'string'}],
        description: 'Numéros de téléphone de contact. Cliquez sur "Ajouter" pour en saisir plusieurs. Format : "+228 70 44 16 36"',
        validation: (Rule) => Rule.min(1).error('Au moins un numéro de téléphone est requis'),
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
        description: 'Adresse email de contact principal affichée sur le site',
        validation: (Rule) => Rule.required().email().error('L\'email est obligatoire et doit être une adresse valide'),
      }),
      defineField({
        name: 'address',
        title: 'Adresse',
        type: 'string',
        description: 'Adresse complète affichée sur le site. Actuellement : "Agoè Minamadou, à côté de ESA, Lomé, Togo"',
        validation: (Rule) => Rule.required().error("L'adresse est obligatoire"),
      }),
      defineField({
        name: 'openingHours',
        title: 'Horaires (Français)',
        type: 'string',
        description: 'Horaires d\'ouverture en français. Exemple : "Lun–Sam, 8h–18h"',
      }),
      defineField({
        name: 'openingHoursEn',
        title: 'Horaires (Anglais)',
        type: 'string',
        description: 'Horaires d\'ouverture en anglais. Exemple : "Mon–Sat, 8am–6pm"',
      }),
      defineField({
        name: 'foundedYear',
        title: 'Année de création',
        type: 'number',
        description: "Année de fondation de l'entreprise. Exemple : 2019",
      }),
      defineField({
        name: 'heroTitle',
        title: 'Titre Hero (FR)',
        type: 'string',
        description: 'Titre principal affiché dans la section Hero de la page d\'accueil (FR). Exemple : "Votre vision, notre code."',
      }),
      defineField({
        name: 'heroTitleEn',
        title: 'Titre Hero (EN)',
        type: 'string',
        description: 'Version anglaise du titre Hero. Exemple : "Your vision, our code."',
      }),
      defineField({
        name: 'heroSubtitle',
        title: 'Sous-titre Hero (FR)',
        type: 'text',
        description: 'Sous-titre du Hero (FR) - 1 à 2 phrases maximum. Présentez brièvement l\'activité de l\'entreprise.',
      }),
      defineField({
        name: 'heroSubtitleEn',
        title: 'Sous-titre Hero (EN)',
        type: 'text',
        description: 'Version anglaise du sous-titre Hero.',
      }),
      defineField({
        name: 'presentationVideoUrl',
        title: 'URL Vidéo YouTube',
        type: 'url',
        description: 'URL complète de la vidéo YouTube de présentation. Exemple : https://www.youtube.com/watch?v=XXXXX',
      }),
      defineField({
        name: 'presentationVideoFile',
        title: 'Fichier Vidéo (MP4)',
        type: 'file',
        options: {accept: 'video/*'},
        description: 'Fichier vidéo MP4 utilisé uniquement si aucune URL YouTube n\'est renseignée.',
      }),
      defineField({
        name: 'teamPhoto',
        title: 'Photo de l\'équipe',
        type: 'image',
        options: {hotspot: true},
        description: 'Photo de l\'équipe ou du bureau - utilisée dans la section Vidéo si pas de vidéo disponible',
        fields: [
          defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
        ],
      }),
    ],
  }),
  {__experimental_actions: ['update', 'publish'] as const}
)
