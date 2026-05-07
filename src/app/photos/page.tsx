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
    <div className="min-h-screen bg-[#080808] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-8">Visual Diary</p>
        <h1 className="font-display text-5xl md:text-6xl text-[#f0ede8] leading-tight mb-16">
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
