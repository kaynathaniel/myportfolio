'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { GalleryImage } from '@/types'
import { urlFor } from '@/lib/sanity'

interface Props {
  images: GalleryImage[]
}

export default function GalleryPreview({ images }: Props) {
  return (
    <section className="py-24 md:py-32 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="site-container">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">Gallery</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
          <Link
            href="/photos"
            className="text-[#444444] text-xs tracking-[0.3em] uppercase hover:text-[#c9a84c] transition-colors shrink-0"
          >
            View All →
          </Link>
        </div>

        {/* Bento grid — explicit row heights for row-span to work */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-1">
          {images.slice(0, 8).map((img, i) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative overflow-hidden group cursor-pointer${i === 0 ? ' col-span-2 row-span-2' : ''}`}
            >
              <Image
                src={urlFor(img.image).width(800).height(800).url()}
                alt={img.alt}
                fill
                className="object-cover group-hover:grayscale group-hover:scale-105 transition-all duration-700"
                sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
