'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SiSpotify, SiApplemusic, SiYoutube } from 'react-icons/si'
import type { IconType } from 'react-icons'
import BoomplayIcon from '@/components/icons/BoomplayIcon'
import { MusicRelease } from '@/types'
import { urlFor } from '@/lib/sanity'
import { formatYear } from '@/lib/utils'

interface Props {
  release: MusicRelease
  index?: number
}

const platformMeta: Record<string, { label: string; Icon: IconType }> = {
  spotify:    { label: 'Spotify',      Icon: SiSpotify },
  appleMusic: { label: 'Apple Music',  Icon: SiApplemusic },
  boomplay:   { label: 'Boomplay',     Icon: BoomplayIcon as IconType },
  youtube:    { label: 'YouTube',      Icon: SiYoutube },
}

export default function ReleaseCard({ release, index = 0 }: Props) {
  const coverUrl = urlFor(release.coverImage).width(400).height(400).url()
  const streamingEntries = Object.entries(release.links).filter(([, v]) => Boolean(v)) as [string, string][]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden mb-4">
        <Image
          src={coverUrl}
          alt={release.title}
          fill
          className="object-cover group-hover:grayscale group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      </div>
      <p className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-1">
        {release.releaseType} · {formatYear(release.releaseDate)}
      </p>
      <h3 className="font-display text-xl text-[#f0ede8] mb-3">{release.title}</h3>
      <div className="flex flex-wrap gap-3">
        {streamingEntries.map(([platform, url]) => {
          const meta = platformMeta[platform]
          const Icon = meta?.Icon
          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#444444] hover:text-[#c9a84c] transition-colors duration-200 group/link"
            >
              {Icon && <Icon className="w-3 h-3 shrink-0" />}
              <span className="border-b border-transparent group-hover/link:border-[#c9a84c] pb-px transition-colors duration-200">
                {meta?.label ?? platform}
              </span>
            </a>
          )
        })}
      </div>
    </motion.article>
  )
}
