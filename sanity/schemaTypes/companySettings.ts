import {defineField, defineType} from 'sanity'
import {iconOptions} from './shared/iconOptions'

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

      // ── Réseaux sociaux ──────────────────────────────
      defineField({
        name: 'socialLinks',
        title: 'Réseaux sociaux',
        type: 'object',
        description: 'Liens vers les profils de réseaux sociaux. Laissez vide pour masquer un réseau.',
        fields: [
          defineField({name: 'facebook', title: 'Facebook', type: 'url', description: 'URL de la page Facebook'}),
          defineField({name: 'twitter', title: 'X (Twitter)', type: 'url', description: 'URL du profil X / Twitter'}),
          defineField({name: 'instagram', title: 'Instagram', type: 'url', description: 'URL du profil Instagram'}),
          defineField({name: 'linkedin', title: 'LinkedIn', type: 'url', description: 'URL de la page LinkedIn'}),
          defineField({name: 'tiktok', title: 'TikTok', type: 'url', description: 'URL du profil TikTok'}),
        ],
      }),

      // ── Slogans Hero (typewriter) ────────────────────
      defineField({
        name: 'heroSlogans',
        title: 'Slogans du Hero (Typewriter)',
        type: 'array',
        description: 'Phrases alternées affichées dans l\'animation typewriter du Hero. Chaque slogan a deux lignes (ex: "Votre vision" / "notre code"). Si vide, les slogans par défaut sont utilisés.',
        of: [
          {
            type: 'object',
            name: 'slogan',
            title: 'Slogan',
            fields: [
              defineField({name: 'lineOneFr', title: 'Ligne 1 (FR)', type: 'string', validation: (Rule) => Rule.required()}),
              defineField({name: 'lineTwoFr', title: 'Ligne 2 (FR)', type: 'string', validation: (Rule) => Rule.required()}),
              defineField({name: 'lineOneEn', title: 'Ligne 1 (EN)', type: 'string', validation: (Rule) => Rule.required()}),
              defineField({name: 'lineTwoEn', title: 'Ligne 2 (EN)', type: 'string', validation: (Rule) => Rule.required()}),
            ],
            preview: {
              select: {title: 'lineOneFr', subtitle: 'lineTwoFr'},
              prepare({title, subtitle}: {title?: string; subtitle?: string}) {
                return {title: `${title ?? ''} — ${subtitle ?? ''}`}
              },
            },
          },
        ],
      }),

      // ── Google Maps ──────────────────────────────────
      defineField({
        name: 'mapsUrl',
        title: 'Lien Google Maps',
        type: 'url',
        description: 'Lien Google Maps cliquable (ex: https://maps.app.goo.gl/xxx). Utilisé dans le footer.',
      }),
      defineField({
        name: 'mapsEmbedUrl',
        title: 'URL iframe Google Maps (Embed)',
        type: 'url',
        description: 'URL d\'intégration Google Maps pour l\'iframe de la page Contact. Copier depuis Google Maps → Partager → Intégrer une carte → copier l\'URL du src.',
      }),
    ],
  }),
  {__experimental_actions: ['create', 'update', 'publish'] as const}
)
