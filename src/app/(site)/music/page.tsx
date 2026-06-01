import type { Metadata } from 'next'
import ReleaseCard from '@/components/music/ReleaseCard'
import { getAllReleases } from '@/lib/queries'
import { releasesGraph } from '@/lib/seo/release-schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.spicektrl.co.uk'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Discography of SpiceKtrl: EPs, singles, and mixes. Stream Afrobeats and Afro-electronic releases including Drums & Motion and Afroctrl on Spotify, Apple Music, and more.',
  keywords: ['SpiceKtrl music', 'Drums and Motion EP', 'Afrobeats EP', 'SpiceKtrl discography', 'Afrofusion releases'],
  alternates: { canonical: `${siteUrl}/music` },
  openGraph: {
    title: 'SpiceKtrl: Music & Releases',
    description: 'Stream SpiceKtrl\'s full discography of genre-fluid Afrobeats and Afro-electronic EPs, singles, and mixes.',
    url: `${siteUrl}/music`,
  },
}

const breadcrumb = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Music', item: `${siteUrl}/music` },
  ],
}

export default async function MusicPage() {
  const releases = await getAllReleases()
  const jsonLd = releasesGraph(releases, breadcrumb)

  const categories = [
    { label: 'Albums', items: releases.filter(r => r.releaseType === 'album') },
    { label: 'EPs', items: releases.filter(r => r.releaseType === 'ep') },
    { label: 'Singles', items: releases.filter(r => r.releaseType === 'single') },
    { label: 'Mixes', items: releases.filter(r => r.releaseType === 'mix') },
  ].filter(c => c.items.length > 0)

  return (
    <div className="min-h-screen bg-[#080808] pt-28 md:pt-32 pb-24 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-container">

        <div className="flex items-center gap-6 mb-10">
          <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">Discography</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#f0ede8] leading-tight mb-20">
          Music
          <br />
          <span className="italic text-[#888888]">&amp; Releases</span>
        </h1>

        {releases.length === 0 && (
          <p className="text-[#444444] text-sm tracking-widest uppercase">Releases coming soon.</p>
        )}

        {categories.map(({ label, items }, idx) => (
          <section
            key={label}
            aria-label={label}
            className={`pb-16 md:pb-20${idx < categories.length - 1 ? ' mb-16 md:mb-20 border-b border-[#1e1e1e]' : ''}`}
          >
            <div className="flex items-center gap-6 mb-10 md:mb-12">
              <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">{label}</span>
              <div className="flex-1 h-px bg-[#1e1e1e]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {items.map((release, i) => (
                <ReleaseCard key={release._id} release={release} index={i} />
              ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  )
}
