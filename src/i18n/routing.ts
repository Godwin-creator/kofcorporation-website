import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});
