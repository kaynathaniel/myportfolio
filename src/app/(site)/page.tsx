import Hero from '@/components/sections/Hero'
import AboutStatement from '@/components/sections/AboutStatement'
import EpShowcase from '@/components/sections/EpShowcase'
import SoundJournal from '@/components/sections/SoundJournal'
import GalleryPreview from '@/components/sections/GalleryPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { getRecentReleases, getFeaturedGalleryImages } from '@/lib/queries'

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
