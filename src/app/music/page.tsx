import type { Metadata } from 'next'
import ReleaseCard from '@/components/music/ReleaseCard'
import { getAllReleases } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Releases, DJ mixes, and streaming links from the artist.',
}

export default async function MusicPage() {
  const releases = await getAllReleases()

  const singles = releases.filter(r => r.releaseType === 'single')
  const eps = releases.filter(r => r.releaseType === 'ep')
  const albums = releases.filter(r => r.releaseType === 'album')
  const mixes = releases.filter(r => r.releaseType === 'mix')

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-8">Discography</p>
        <h1 className="font-display text-5xl md:text-6xl text-[#f0ede8] leading-tight mb-20">
          Music
          <br />
          <span className="italic text-[#888888]">&amp; Releases</span>
        </h1>

        {releases.length === 0 && (
          <p className="text-[#444444] text-sm tracking-widest uppercase">Releases coming soon.</p>
        )}

        {[
          { label: 'Albums', items: albums },
          { label: 'EPs', items: eps },
          { label: 'Singles', items: singles },
          { label: 'Mixes', items: mixes },
        ].map(({ label, items }) =>
          items.length > 0 ? (
            <section key={label} className="mb-20">
              <p className="text-[#444444] text-xs tracking-[0.4em] uppercase mb-10">{label}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map((release, i) => (
                  <ReleaseCard key={release._id} release={release} index={i} />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </div>
  )
}
