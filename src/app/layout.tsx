import type {Metadata, Viewport} from 'next'
import InlineScript from '@/components/InlineScript'
import './globals.css'

export const metadata: Metadata = {
  title: "KofCorporation - Societe informatique d'edition de logiciels",
  description: 'KofCorporation concoit des applications web, mobiles et logiciels sur mesure pour les entreprises et startups au Togo.',
  icons: [
    {rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml'},
    {rel: 'icon', url: '/favicon.ico'},
    {rel: 'apple-touch-icon', url: '/apple-touch-icon.png'},
  ],
}

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#F8F9FA'},
    {media: '(prefers-color-scheme: dark)', color: '#1A1E3A'},
  ],
}

const themeInitScript = `
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
        <InlineScript html={themeInitScript} />
      </head>
      <body>{children}</body>
    </html>
  )
}