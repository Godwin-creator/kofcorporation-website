import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { routing } from "@/i18n/routing";

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
