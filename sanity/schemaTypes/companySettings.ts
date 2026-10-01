import {defineField, defineType} from 'sanity'

export const companySettings = Object.assign(defineType({
  name: 'companySettings',
  title: "Paramètres de l'entreprise",
  type: 'document',
  fields: [
    defineField({name: 'presentationVideoUrl', title: 'URL vidéo YouTube de présentation', type: 'url', description: "Collez l'URL complète YouTube. Exemple : https://www.youtube.com/watch?v=XXXXX, prioritaire sur le fichier MP4"}),
    defineField({name: 'presentationVideoFile', title: 'Fichier vidéo MP4 (si pas d’URL YouTube)', type: 'file', options: {accept: 'video/*'}, description: "Utilisé uniquement si aucune URL YouTube n'est renseignée. Format MP4 recommandé."}),
    defineField({name: 'teamPhoto', title: "Photo de l'équipe", type: 'image', options: {hotspot: true}, description: "Utilisée sur la page À propos (section équipe) ET comme fallback sur l'accueil si aucune vidéo n'est configurée", fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string'})]}),
    defineField({name: 'stackWeb', title: 'Stack Développement Web', type: 'array', of: [{type: 'string'}], description: 'Technologies web utilisées. Exemples : React, Next.js, Laravel, WordPress'}),
    defineField({name: 'stackMobile', title: 'Stack Développement Mobile', type: 'array', of: [{type: 'string'}], description: 'Technologies mobiles. Exemples : Flutter, React Native, Android, iOS'}),
    defineField({name: 'stackLogiciel', title: 'Stack Logiciels de gestion', type: 'array', of: [{type: 'string'}], description: 'Technologies logicielles. Exemples : Python, Java, PostgreSQL, Electron'}),
    defineField({name: 'stackFormation', title: 'Stack / Domaines de formation', type: 'array', of: [{type: 'string'}], description: 'Technologies et domaines enseignés. Exemples : HTML/CSS, React, Flutter, Python, Figma'}),
  ],
  preview: {prepare({presentationVideoUrl}: {presentationVideoUrl?: string}) {return {title: "Paramètres de l'entreprise", subtitle: presentationVideoUrl ? 'Vidéo YouTube configurée' : 'Aucune vidéo YouTube configurée'}}},
}), {__experimental_actions: ['create', 'update', 'publish'] as const})
