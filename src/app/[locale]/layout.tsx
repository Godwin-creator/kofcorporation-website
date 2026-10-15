import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SplashScreen from "@/components/SplashScreen";
import AnimatedCursorLoader from "@/components/ui/AnimatedCursorLoader";
import { SectionProvider } from "@/contexts/SectionContext";
import { routing } from "@/i18n/routing";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kofcorporation.com';
const ogImageUrl = new URL('/og-image.jpeg', siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "KofCorporation - Société informatique d'édition de logiciels",
    description:
      "KofCorporation conçoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.",
    url: siteUrl,
    siteName: "KofCorporation",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "KofCorporation - Société informatique au Togo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KofCorporation - Société informatique d'édition de logiciels",
    description:
      "KofCorporation conçoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.",
    images: [ogImageUrl],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "KofCorporation",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.svg`,
      image: ogImageUrl,
      description:
        "Société informatique togolaise concevant des applications web, mobiles et logiciels sur mesure avec des standards internationaux.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Agoè Minamadou, à côté de ESA",
        addressLocality: "Lomé",
        addressCountry: "TG",
      },
      telephone: ["+22870441636", "+22893554740"],
      email: "contact@kofcorporation.com",
      sameAs: [
        "https://www.facebook.com/KofCorporation/",
        "https://twitter.com/CoporationKof",
        "https://www.instagram.com/kofcorporation.tg/",
        "https://www.linkedin.com/company/kofcorporation",
      ],
      areaServed: [
        { "@type": "Country", name: "Togo" },
        { "@type": "AdministrativeArea", name: "Afrique de l'Ouest" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "KofCorporation",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: ["fr-FR", "en-US"],
    },
  ],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <LocaleLayout params={params}>{children}</LocaleLayout>;
}

async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SectionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <div style={{paddingTop: 64, minHeight: "100dvh", display: "flex", flexDirection: "column"}}>
          <Header />
          <main style={{flex: 1}}>{children}</main>
          <Footer />
          <BackToTop />
        </div>
        <SplashScreen />
        <AnimatedCursorLoader />
        <SanityLive />
        <Analytics />
        <SpeedInsights />
      </SectionProvider>
    </NextIntlClientProvider>
  );
}
