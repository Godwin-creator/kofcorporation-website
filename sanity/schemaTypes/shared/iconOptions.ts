export const iconOptions = [
  { title: '⏰ Horloge', value: 'Clock' },
  { title: '✅ Dossier validé', value: 'FolderCheck' },
  { title: '⭐ Étoile', value: 'Star' },
  { title: '🎓 Diplôme', value: 'GraduationCap' },
  { title: '🌐 Globe', value: 'Globe' },
  { title: '📱 Smartphone', value: 'Smartphone' },
  { title: '🖥️ Moniteur', value: 'Monitor' },
  { title: '💻 Code', value: 'Code2' },
  { title: '👥 Utilisateurs', value: 'Users' },
  { title: '📈 Graphique', value: 'TrendingUp' },
  { title: '🛡️ Bouclier', value: 'Shield' },
  { title: '💡 Ampoule', value: 'Lightbulb' },
] as const;

export type IconOption = (typeof iconOptions)[number]['value'];
