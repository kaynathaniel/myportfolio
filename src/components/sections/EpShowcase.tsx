'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MusicRelease } from '@/types'
import { urlFor } from '@/lib/sanity'

const TYPE_LABEL: Record<string, string> = {
  ep: 'EP Out Now',
  album: 'Album Out Now',
  single: 'New Single',
  mix: 'New Mix',
}

interface Props {
  release: MusicRelease | null
}

export default function EpShowcase({ release }: Props) {
  const imageSrc = release?.coverImage
    ? urlFor(release.coverImage).width(900).url()
    : '/ep-out.jpg'

  const title = release?.title ?? 'Drums & Motion'
  const typeLabel = release ? (TYPE_LABEL[release.releaseType] ?? 'Out Now') : 'EP Out Now'
  const description = release?.description
    ?? 'Drums & Motion is an Afrofusion EP rooted in rhythm, emotion, and movement. Blending Amapiano, Afrobeat, and soulful textures, the project reflects growth, motion, and progression. It’s a body of work created to awaken the spirit and soundtrack both reflection and celebration.'
  const spotifyHref = release?.links?.spotify ?? process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com'

  return (
    <section className="py-24 md:py-32 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="site-container">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — cover */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full overflow-hidden group"
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:grayscale group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent transition-opacity duration-500" />
          </motion.div>

          {/* ── Right — text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#c9a84c] text-[0.65rem] tracking-[0.5em] uppercase">
              {typeLabel}
            </p>

            <h2
              className="font-display text-[#f0ede8] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {title}
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="w-16 h-px bg-[#c9a84c] origin-left"
            />

            <p className="text-[#888888] text-base leading-[1.8] max-w-lg">
              {description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={spotifyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block p-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#f0ede8] transition-colors duration-300"
              >
                Listen Now
              </a>
              <a
                href="/music"
                className="inline-block p-4 border border-[#1e1e1e] text-[#888888] text-xs tracking-[0.3em] uppercase hover:border-[#888888] hover:text-[#f0ede8] transition-colors duration-300"
              >
                All Releases
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
