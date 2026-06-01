import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { artistGraph } from '@/lib/seo/artist-schema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.spicektrl.co.uk'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SpiceKtrl — Music Producer, DJ & Songwriter',
    template: '%s | SpiceKtrl',
  },
  description:
    'Official website of SpiceKtrl — UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid sound blending Afrobeats with Afro-electronic elements.',
  keywords: [
    'SpiceKtrl',
    'Afrobeats',
    'Afro-electronic',
    'music producer',
    'DJ',
    'songwriter',
    'Nigerian artist UK',
    'Amapiano',
    'Afrofusion',
    'UK music',
  ],
  authors: [{ name: 'SpiceKtrl', url: siteUrl }],
  creator: 'SpiceKtrl',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'SpiceKtrl',
    title: 'SpiceKtrl — Music Producer, DJ & Songwriter',
    description:
      'UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid sound blending Afrobeats with Afro-electronic elements.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpiceKtrl — Music Producer, DJ & Songwriter',
    description:
      'UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid Afrobeats and Afro-electronic sound.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(artistGraph()) }}
        />
        {children}
      </body>
    </html>
  )
}
