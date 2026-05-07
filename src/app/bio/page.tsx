import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bio',
  description: 'The story and creative background behind the artist — from Lagos to London.',
}

export default function BioPage() {
  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-8">Biography</p>

        <h1 className="font-display text-5xl md:text-6xl text-[#f0ede8] leading-tight mb-16">
          The SpiceKtrl
          <br />
          <span className="italic text-[#888888]">Story</span>
        </h1>

        <div className="space-y-8 text-[#888888] text-sm leading-[2] max-w-2xl">
          <p>
            Born in Lagos and now based in London, the artist is a music producer, DJ, and songwriter whose work sits at the intersection of Afrobeats, electronic music, and contemporary soul. With deep roots in Nigerian culture and the kinetic energy of the UK music scene, the sound is one built on contrast — the warmth of memory and the edge of the present.
          </p>
          <p>
            The creative journey began in Lagos, shaped by the city&apos;s rhythmic chaos and vibrant cultural life. Moving to the UK opened new horizons — exposure to bass culture, grime, and the underground electronic scene — which fed directly into a distinctive, layered production style that refuses to be confined to any single genre.
          </p>

          <div className="border-l border-[#1e1e1e] pl-6 py-2">
            <p className="font-display text-2xl text-[#f0ede8] italic leading-relaxed">
              &ldquo;The music is always a conversation between where I&apos;m from and where I am.&rdquo;
            </p>
          </div>

          <p>
            As a DJ, the approach is cinematic — each set a carefully considered journey through texture, rhythm, and atmosphere. As a producer, the focus is on creating spaces that feel both intimate and expansive: music that rewards deep listening but moves the body just as instinctively.
          </p>
          <p>
            Available for studio sessions, live performances, DJ bookings, and creative collaborations.
          </p>
        </div>

        <div className="mt-20 pt-12 border-t border-[#1e1e1e]">
          <p className="text-[#444444] text-xs tracking-[0.4em] uppercase mb-8">Highlights</p>
          <ul className="space-y-4">
            {[
              'Released debut EP to critical acclaim',
              'Performed at major UK festivals',
              'Collaborations with leading UK and African artists',
              'Featured in international press',
            ].map(item => (
              <li key={item} className="flex items-start gap-4 text-[#888888] text-sm">
                <span className="text-[#c9a84c] mt-1">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
