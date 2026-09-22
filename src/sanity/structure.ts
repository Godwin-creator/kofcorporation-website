import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Paramètres de l’entreprise')
        .id('companySettings')
        .child(S.document().schemaType('companySettings').documentId('companySettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'companySettings'),
    ])
