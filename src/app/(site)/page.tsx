import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import AboutStatement from '@/components/sections/AboutStatement'
import EpShowcase from '@/components/sections/EpShowcase'
import SoundJournal from '@/components/sections/SoundJournal'
import GalleryPreview from '@/components/sections/GalleryPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { getRecentReleases, getFeaturedGalleryImages } from '@/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://spicektrl.com'

export const metadata: Metadata = {
  title: 'SpiceKtrl — Music Producer, DJ & Songwriter',
  description:
    'Official website of SpiceKtrl — UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid Afrobeats and Afro-electronic sound.',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'SpiceKtrl — Music Producer, DJ & Songwriter',
    description:
      'Official website of SpiceKtrl — UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid Afrobeats and Afro-electronic sound.',
    url: siteUrl,
    images: [{ url: '/hero-photo.jpg', width: 1200, height: 630, alt: 'SpiceKtrl' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'SpiceKtrl',
      description: 'Official website of SpiceKtrl — music producer, DJ, and songwriter.',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/music?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'MusicGroup',
      '@id': `${siteUrl}/#artist`,
      name: 'SpiceKtrl',
      url: siteUrl,
      description:
        'UK-based Nigerian songwriter, DJ, and music producer known for genre-fluid sound blending Afrobeats with Afro-electronic elements.',
      genre: ['Afrobeats', 'Afro-electronic', 'Amapiano', 'Afrofusion'],
      foundingLocation: { '@type': 'Place', name: 'Lagos, Nigeria' },
      location: { '@type': 'Place', name: 'United Kingdom' },
      image: `${siteUrl}/hero-photo.jpg`,
      sameAs: [
        process.env.NEXT_PUBLIC_SPOTIFY_URL,
        process.env.NEXT_PUBLIC_APPLE_MUSIC_URL,
        process.env.NEXT_PUBLIC_YOUTUBE_URL,
        process.env.NEXT_PUBLIC_SOUNDCLOUD_URL,
      ].filter(Boolean),
    },
  ],
}

export default async function HomePage() {
  const [recentReleases, galleryImages] = await Promise.all([
    getRecentReleases(4),
    getFeaturedGalleryImages(),
  ])

  const showcaseRelease = recentReleases[0] ?? null
  const journalReleases = recentReleases.slice(1, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AboutStatement />
      <EpShowcase release={showcaseRelease} />
      <SoundJournal releases={journalReleases} />
      {galleryImages.length > 0 && <GalleryPreview images={galleryImages} />}
      <ContactCTA />
    </>
  )
}
