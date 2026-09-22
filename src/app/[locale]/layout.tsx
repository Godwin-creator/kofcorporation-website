import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  openGraph: {
    title: "KofCorporation — Société informatique d'édition de logiciels",
    description:
      "KofCorporation conçoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.",
    url: "https://kofcorporation.com",
    siteName: "KofCorporation",
    images: [
      {
        url: "https://kofcorporation.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "KofCorporation — Société informatique au Togo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KofCorporation — Société informatique d'édition de logiciels",
    description:
      "KofCorporation conçoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.",
    images: ["https://kofcorporation.com/og-image.png"],
  },
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
      <div style={{paddingTop: 64, minHeight: "100dvh", display: "flex", flexDirection: "column"}}>
        <Header />
        <main style={{flex: 1}}>{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </NextIntlClientProvider>
  );
}
