import {defineField, defineType} from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Chiffre clé',
  type: 'document',
  fields: [
    defineField({name: 'value', title: 'Valeur', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Libellé (FR)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'labelEn', title: 'Libellé (EN)', type: 'string'}),
    defineField({name: 'icon', title: 'Icône', type: 'string', options: {list: [
      {title: 'Horloge', value: 'Clock'}, {title: 'Dossier validé', value: 'FolderCheck'},
      {title: 'Étoile', value: 'Star'}, {title: 'Diplôme', value: 'GraduationCap'},
      {title: 'Globe', value: 'Globe'}, {title: 'Smartphone', value: 'Smartphone'},
      {title: 'Moniteur', value: 'Monitor'}, {title: 'Code', value: 'Code2'},
      {title: 'Utilisateurs', value: 'Users'}, {title: 'Graphique', value: 'TrendingUp'},
      {title: 'Bouclier', value: 'Shield'}, {title: 'Ampoule', value: 'Lightbulb'},
    ], layout: 'radio'}}),
    defineField({name: 'order', title: 'Ordre', type: 'number', validation: (Rule) => Rule.required()}),
  ],
})