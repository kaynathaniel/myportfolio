'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MusicRelease } from '@/types'
import { urlFor } from '@/lib/sanity'
import { formatYear } from '@/lib/utils'

interface Props {
  release: MusicRelease
}

export default function FeaturedRelease({ release }: Props) {
  const coverUrl = urlFor(release.coverImage).width(700).height(700).url()

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">Featured Release</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        {/* 2-col grid: image left, info right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full overflow-hidden"
          >
            <Image
              src={coverUrl}
              alt={release.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">
              {release.releaseType} · {formatYear(release.releaseDate)}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#f0ede8] leading-tight">
              {release.title}
            </h2>
            {release.description && (
              <p className="text-[#888888] text-sm leading-relaxed">{release.description}</p>
            )}

            <div className="h-px bg-[#1e1e1e] my-2" />

            <div className="flex flex-wrap gap-3">
              {release.links.spotify && (
                <a
                  href={release.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#f0ede8] transition-colors duration-300"
                >
                  Spotify
                </a>
              )}
              {release.links.appleMusic && (
                <a
                  href={release.links.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-[#1e1e1e] text-[#888888] text-xs tracking-[0.25em] uppercase hover:border-[#888888] hover:text-[#f0ede8] transition-colors duration-300"
                >
                  Apple Music
                </a>
              )}
              {release.links.soundcloud && (
                <a
                  href={release.links.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-[#1e1e1e] text-[#888888] text-xs tracking-[0.25em] uppercase hover:border-[#888888] hover:text-[#f0ede8] transition-colors duration-300"
                >
                  SoundCloud
                </a>
              )}
            </div>

            <Link
              href="/music"
              className="self-start text-[#444444] text-xs tracking-[0.3em] uppercase hover:text-[#c9a84c] transition-colors duration-200 mt-2"
            >
              View All Releases →
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
