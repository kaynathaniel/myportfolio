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
  const coverUrl = urlFor(release.coverImage).width(600).height(600).url()

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#444444] text-xs tracking-[0.4em] uppercase mb-16"
        >
          Featured Release
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square overflow-hidden"
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">
              {release.releaseType} · {formatYear(release.releaseDate)}
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-[#f0ede8] leading-tight">
              {release.title}
            </h2>
            {release.description && (
              <p className="text-[#888888] text-sm leading-relaxed max-w-sm">{release.description}</p>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              {release.links.spotify && (
                <a href={release.links.spotify} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.25em] uppercase hover:bg-[#f0ede8] transition-colors duration-300">
                  Spotify
                </a>
              )}
              {release.links.appleMusic && (
                <a href={release.links.appleMusic} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-[#1e1e1e] text-[#888888] text-xs tracking-[0.25em] uppercase hover:border-[#888888] hover:text-[#f0ede8] transition-colors duration-300">
                  Apple Music
                </a>
              )}
              {release.links.soundcloud && (
                <a href={release.links.soundcloud} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-[#1e1e1e] text-[#888888] text-xs tracking-[0.25em] uppercase hover:border-[#888888] hover:text-[#f0ede8] transition-colors duration-300">
                  SoundCloud
                </a>
              )}
            </div>
            <Link href="/music" className="text-[#444444] text-xs tracking-[0.3em] uppercase hover:text-[#c9a84c] transition-colors pt-2 self-start">
              View All Releases →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
