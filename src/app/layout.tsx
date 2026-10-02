import type {Metadata, Viewport} from 'next'
import { SerwistProvider } from '@serwist/turbopack/react'
import InlineScript from '@/components/InlineScript'
import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kofcorporation-website.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: '/site.webmanifest',
  title: "KofCorporation - Societe informatique d'edition de logiciels",
  description: 'KofCorporation concoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KofCorporation',
  },
  icons: {
    apple: [{url: '/apple-touch-icon.png', sizes: '180x180'}],
    icon: [
      {url: '/favicon-96.png', sizes: '96x96', type: 'image/png'},
      {url: '/favicon.svg', type: 'image/svg+xml'},
    ],
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#F8F9FA'},
    {media: '(prefers-color-scheme: dark)', color: '#1A1E3A'},
  ],
}

const themeInitScript = `
if (!window.location.pathname.startsWith('/studio')) {
  document.documentElement.style.visibility = 'hidden';
}
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.remove('splash-active');
    document.documentElement.setAttribute('data-theme', theme);
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.setAttribute('content', theme === 'dark' ? '#1A1E3A' : '#F8F9FA');
  } catch (e) {}
})();
`.trim()

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <InlineScript html={themeInitScript} />
      </head>
      <body suppressHydrationWarning>
        <SerwistProvider
          swUrl="/serwist/sw.js"
          disable={process.env.NODE_ENV === 'development'}
        >
          {children}
        </SerwistProvider>
      </body>
    </html>
  )
}