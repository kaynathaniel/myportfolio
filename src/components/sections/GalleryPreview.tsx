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
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#444444] text-xs tracking-[0.4em] uppercase"
          >
            Gallery
          </motion.p>
          <Link href="/photos" className="text-[#444444] text-xs tracking-[0.3em] uppercase hover:text-[#c9a84c] transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {images.slice(0, 8).map((img, i) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
            >
              <Image
                src={urlFor(img.image).width(600).height(600).url()}
                alt={img.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#080808]/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
