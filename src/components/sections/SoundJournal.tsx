'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MusicRelease } from '@/types'
import { urlFor } from '@/lib/sanity'

const FALLBACK_RELEASES = [
  {
    image: '/ep-out.jpg',
    title: 'Drums & Motion',
    type: 'EP · 2024',
    description:
      'An Afrofusion EP rooted in rhythm, emotion, and movement. Blending Amapiano, Afrobeat, and soulful textures — created to awaken the spirit.',
    href: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com',
  },
  {
    image: '/ep-out.jpg',
    title: 'Afro Nights',
    type: 'Single · 2024',
    description:
      'A late-night Afrobeats groove that captures the energy of Lagos after dark. Warm basslines, hypnotic percussion, and a melody that stays with you.',
    href: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com',
  },
  {
    image: '/ep-out.jpg',
    title: 'Heritage',
    type: 'Single · 2023',
    description:
      'A deeply personal track exploring identity and roots. Acoustic textures meet electronic production in a meditation on where we come from.',
    href: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com',
  },
]

interface Props {
  releases: MusicRelease[]
}

export default function SoundJournal({ releases }: Props) {
  const cards = releases.length > 0
    ? releases.map((r) => ({
        image: r.coverImage ? urlFor(r.coverImage).width(600).url() : '/ep-out.jpg',
        title: r.title,
        type: `${r.releaseType.toUpperCase()} · ${new Date(r.releaseDate).getFullYear()}`,
        description: r.description ?? '',
        href: r.links?.spotify ?? process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com',
      }))
    : FALLBACK_RELEASES

  return (
    <section className="py-24 md:py-32 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="site-container">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <span className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase shrink-0">Sound Journal</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[#888888] text-base leading-[1.8] max-w-2xl mb-16 md:mb-20"
        >
          Each release is a reflection of time, feeling, and intention. This is more than music.
          It is the unfolding journey of SpiceKtrl told through rhythm, texture, and sound.
        </motion.p>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e1e]">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#080808] flex flex-col group"
            >
              {/* Cover image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#080808]/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6 md:p-8 gap-4">
                <div>
                  <p className="text-[#c9a84c] text-[0.6rem] tracking-[0.45em] uppercase mb-2">
                    {card.type}
                  </p>
                  <h3 className="font-display text-[#f0ede8] text-xl md:text-2xl leading-tight tracking-tight">
                    {card.title}
                  </h3>
                </div>

                <p className="text-[#888888] text-sm leading-[1.75] flex-1">
                  {card.description}
                </p>

                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start mt-2 px-5 py-3 border border-[#1e1e1e] text-[#888888] text-[0.65rem] tracking-[0.35em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors duration-300"
                >
                  Listen
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
