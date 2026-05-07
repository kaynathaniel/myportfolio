'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryImage } from '@/types'
import { urlFor } from '@/lib/sanity'

interface Props {
  images: GalleryImage[]
}

const categories = ['all', 'portrait', 'live', 'studio', 'editorial'] as const

export default function GalleryGrid({ images }: Props) {
  const [active, setActive] = useState<'all' | string>('all')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const filtered = active === 'all' ? images : images.filter(img => img.category === active)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
  }, [closeLightbox])

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`p-4 text-xs tracking-[0.3em] uppercase transition-colors border ${
              active === cat
                ? 'border-[#c9a84c] text-[#c9a84c]'
                : 'border-[#1e1e1e] text-[#444444] hover:border-[#888888] hover:text-[#888888]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="columns-2 md:columns-3 lg:columns-4 [column-gap:4px]">
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="relative break-inside-avoid overflow-hidden cursor-pointer group mb-1"
              onClick={() => setLightbox(img)}
            >
              <Image
                src={urlFor(img.image).width(600).url()}
                alt={img.alt}
                width={600}
                height={800}
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            tabIndex={0}
          >
            <button
              className="absolute top-6 right-6 p-4 border border-[#444444] text-[#888888] text-xs tracking-widest uppercase hover:border-[#f0ede8] hover:text-[#f0ede8] transition-colors"
              onClick={closeLightbox}
              aria-label="Close preview"
            >
              Close
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={urlFor(lightbox.image).width(1200).url()}
                alt={lightbox.alt}
                width={1200}
                height={1200}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              {lightbox.title && (
                <p className="mt-3 text-[#888888] text-xs tracking-widest uppercase text-center">{lightbox.title}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
