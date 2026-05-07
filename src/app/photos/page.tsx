import type { Metadata } from 'next'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { getAllGalleryImages } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Photos',
  description: 'A curated visual diary — portraits, live moments, and editorial imagery.',
}

export default async function PhotosPage() {
  const images = await getAllGalleryImages()

  return (
    <div className="min-h-screen bg-[#080808] pt-12 md:pt-16 pb-24 md:pb-32">
      <div className="site-container">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-10">
          <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">Visual Diary</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#f0ede8] leading-tight mb-16">
          Photos
          <br />
          <span className="italic text-[#888888]">&amp; Visuals</span>
        </h1>

        {images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <p className="text-[#444444] text-sm tracking-widest uppercase">Gallery coming soon.</p>
        )}

      </div>
    </div>
  )
}
