export const legalInformation = {
  registeredName: undefined as string | undefined,
  denomination: "KofCorporation",
  legalForm: "SARL U (Société Unipersonnelle à Responsabilité Limitée)",
  rccm: undefined as string | undefined,
  nif: undefined as string | undefined,
  address: {
    district: "Agoè Minamadou",
    landmark: "ESA",
    locality: "Lomé",
    country: "Togo",
  },
  publicationDirector: "Omar Farouk KOUGBADA",
  contactEmail: "contact@kofcorporation.com",
  phoneNumbers: ["+228 70 44 16 36", "+228 93 55 47 40"],
  hosts: {
    website: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
      website: "https://vercel.com",
    },
    smtp: undefined as string | undefined,
  },
} as const;
