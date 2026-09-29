import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('KofCorporation CMS')
    .items([
      // SINGLETON — toujours en premier
      S.listItem()
        .title('⚙️ Paramètres de l\'entreprise')
        .id('companySettings')
        .child(
          S.document()
            .schemaType('companySettings')
            .documentId('companySettings')
        ),

      S.divider(),

      // CONTENU DYNAMIQUE
      S.listItem()
        .title('📊 Chiffres clés')
        .schemaType('stat')
        .child(S.documentTypeList('stat').title('Chiffres clés')),

      S.listItem()
        .title('🚀 Projets réalisés')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projets')),

      S.listItem()
        .title('💬 Témoignages')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Témoignages')),

      S.listItem()
        .title('🤝 Partenaires')
        .schemaType('partner')
        .child(S.documentTypeList('partner').title('Partenaires')),

      S.listItem()
        .title('🛠️ Services')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),
    ])
