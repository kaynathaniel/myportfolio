'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MusicRelease } from '@/types'
import { urlFor } from '@/lib/sanity'
import { formatYear } from '@/lib/utils'

interface Props {
  release: MusicRelease
  index?: number
}

const platformLabels: Record<string, string> = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  soundcloud: 'SoundCloud',
  youtube: 'YouTube',
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
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <p className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-1">
        {release.releaseType} · {formatYear(release.releaseDate)}
      </p>
      <h3 className="font-display text-xl text-[#f0ede8] mb-3">{release.title}</h3>
      <div className="flex flex-wrap gap-2">
        {streamingEntries.map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] uppercase text-[#444444] hover:text-[#c9a84c] transition-colors border-b border-transparent hover:border-[#c9a84c] pb-px"
          >
            {platformLabels[platform] ?? platform}
          </a>
        ))}
      </div>
    </motion.article>
  )
}
