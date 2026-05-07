import Hero from '@/components/sections/Hero'
import FeaturedRelease from '@/components/sections/FeaturedRelease'
import GalleryPreview from '@/components/sections/GalleryPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { getFeaturedReleases, getFeaturedGalleryImages } from '@/lib/queries'

export default async function HomePage() {
  const [releases, galleryImages] = await Promise.all([
    getFeaturedReleases(),
    getFeaturedGalleryImages(),
  ])

  const featuredRelease = releases[0] ?? null

  return (
    <>
      <Hero />
      {featuredRelease && <FeaturedRelease release={featuredRelease} />}
      {galleryImages.length > 0 && <GalleryPreview images={galleryImages} />}
      <ContactCTA />
    </>
  )
}
