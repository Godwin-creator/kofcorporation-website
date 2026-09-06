import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import InlineScript from "@/components/InlineScript";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "KofCorporation — Société informatique d'édition de logiciels",
  description:
    "KofCorporation conçoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1E3A" },
  ],
};

/** Script inline exécuté avant le rendu pour éviter le flash de thème. */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content',
        theme === 'dark' ? '#1A1E3A' : '#F8F9FA'
      );
    }
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning={true} className={cn("font-sans", geist.variable)}>
      <head>
        {/* Injection du thème avant le premier paint — évite le flash */}
        <InlineScript html={themeInitScript} />
      </head>
      <body className="font-sans min-h-full flex flex-col" style={{ paddingTop: 64 }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
            <BackToTop />
      </body>
    </html>
  );
}
