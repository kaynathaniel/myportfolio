import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import AboutStatement from '@/components/sections/AboutStatement'
import EpShowcase from '@/components/sections/EpShowcase'
import SoundJournal from '@/components/sections/SoundJournal'
import GalleryPreview from '@/components/sections/GalleryPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { getRecentReleases, getFeaturedGalleryImages } from '@/lib/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.spicektrl.co.uk'

export const metadata: Metadata = {
  title: { absolute: 'SpiceKtrl: Music Producer, DJ & Songwriter' },
  description:
    'Official website of SpiceKtrl, UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid Afrobeats and Afro-electronic sound.',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'SpiceKtrl: Music Producer, DJ & Songwriter',
    description:
      'Official website of SpiceKtrl, UK-based Nigerian songwriter, DJ, and music producer. Genre-fluid Afrobeats and Afro-electronic sound.',
    url: siteUrl,
    images: [{ url: '/hero-photo.jpg', width: 1200, height: 630, alt: 'SpiceKtrl' }],
  },
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
      <Hero />
      <AboutStatement />
      <EpShowcase release={showcaseRelease} />
      <SoundJournal releases={journalReleases} />
      {galleryImages.length > 0 && <GalleryPreview images={galleryImages} />}
      <ContactCTA />
    </>
  )
}
