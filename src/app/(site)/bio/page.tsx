import type { Metadata } from 'next'
import Image from 'next/image'
import { getBioImage } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://spicektrl.co.uk'

export const metadata: Metadata = {
  title: 'Bio',
  description:
    'The story of SpiceKtrl — Nigerian-born music producer, DJ, and songwriter based in the UK. From Lagos to London, blending Afrobeats with Afro-electronic music.',
  alternates: { canonical: `${siteUrl}/bio` },
  openGraph: {
    title: 'SpiceKtrl — Biography',
    description:
      'The story of SpiceKtrl — Nigerian-born music producer, DJ, and songwriter based in the UK. From Lagos to London.',
    url: `${siteUrl}/bio`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Bio', item: `${siteUrl}/bio` },
  ],
}

export default async function BioPage() {
  const bioImage = await getBioImage()

  return (
    <div className="min-h-screen bg-[#080808] pt-28 md:pt-32 pb-24 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-container">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">Biography</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        {/* 2-col editorial layout on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left col — image + heading (sticky on desktop) */}
          <div className="lg:sticky lg:top-32">

            {bioImage && (
              <div className="relative aspect-[3/4] w-full overflow-hidden mb-10">
                <Image
                  src={urlFor(bioImage.image).width(600).url()}
                  alt={bioImage.alt ?? 'SpiceKtrl — Music Producer, DJ & Songwriter'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              </div>
            )}

            <h1 className="font-display text-5xl md:text-6xl text-[#f0ede8] leading-tight mb-12">
              The SpiceKtrl
              <br />
              <span className="italic text-[#888888]">Story</span>
            </h1>

          </div>

          {/* Right col — body text */}
          <div className="space-y-8 text-[#888888] text-sm leading-[2]">
            <p>
              Born in Lagos and now based in the UK, SpiceKtrl is a songwriter, DJ, and music producer whose work sits at the intersection of Afrobeats and Afro-electronic music — genre-fluid by nature, deeply human at its core. Rooted in the vibrant energy of Nigerian culture and the expansive sensibilities of global electronic sound, the music is one built on feeling: culture, emotion, and narrative woven into every frequency.
            </p>
            <p>
              The connection to rhythm came early — an intuitive pull towards melody that resisted explanation. What began as spontaneous beat-making and melodic improvisation evolved into something more deliberate: a purposeful artistic journey grounded in sonic storytelling. Each track is a fusion of emotion, memory, and movement, crafted to resonate on both dancefloors and in headphones around the world.
            </p>
            <div className="border-l border-[#c9a84c] pl-6 py-2 my-10">
              <p className="font-display text-xl md:text-2xl text-[#f0ede8] italic leading-relaxed">
                Raised in Nigeria, SpiceKtrl cultivated a systems-thinking mind — a deep fluency in logic, structure, and the architecture of ideas — through his academic training in Computer Science.
              </p>
            </div>
            <p>
              Relocating to the UK brought a Master&apos;s degree in Computing, and with it a sharpened discipline, a broadened perspective, and a deepened commitment to music as a tool for connection and cultural expression.
            </p>
            <p>
              His artistic identity is shaped by contrasts: tradition and innovation, introspection and rhythm, structure and freedom. His discography — EPs like Afroctrl and Drums &amp; Motion — reflects an ability to craft immersive sonic landscapes with clarity and intention. Whether producing in the studio or performing live as a DJ, the approach is cinematic: each set a carefully considered journey through texture, atmosphere, and feeling.
            </p>
            <p>
              Driven by a vision to build community through sound, SpiceKtrl continues to push creative boundaries while staying true to his roots. The work is not just personal expression — it is a cultural offering, a conversation that speaks to the evolving identity of African music in a global context.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
