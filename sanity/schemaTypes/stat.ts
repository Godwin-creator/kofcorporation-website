import {defineField, defineType} from 'sanity'
import {iconOptions} from './shared/iconOptions'

export const stat = defineType({
  name: 'stat',
  title: 'Chiffres clés',
  type: 'document',
  fields: [
    defineField({name: 'value', title: 'Valeur affichée', type: 'string', description: "La valeur telle qu'elle apparaît sur le site. Exemples : '5 ans', '20+', '98%', '200+'", validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Libellé (Français)', type: 'string', description: "Courte description sous la valeur. Exemple : 'Années d'expérience', 'Projets réalisés'", validation: (Rule) => Rule.required().max(40)}),
    defineField({name: 'labelEn', title: 'Libellé (Anglais)', type: 'string', description: "Traduction anglaise. Exemple : 'Years of experience'"}),
    defineField({name: 'icon', title: 'Icône', type: 'string', description: "Icône qui illustre ce chiffre", options: {list: iconOptions, layout: 'radio'}}),
    defineField({name: 'order', title: "Position d'affichage", type: 'number', description: "Ordre d'apparition de gauche à droite. Utilisez 1, 2, 3, 4.", validation: (Rule) => Rule.required().min(1)}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}, prepare({title, subtitle}) {return {title: `${title} - ${subtitle}`}}},
})
