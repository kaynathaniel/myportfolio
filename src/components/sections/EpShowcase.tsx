'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function EpShowcase() {
  return (
    <section className="py-24 md:py-32 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="site-container">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — EP cover */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full overflow-hidden"
          >
            <Image
              src="/ep-out.jpg"
              alt="Drums & Motion: The Awakening EP"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
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
              EP Out Now
            </p>

            <h2
              className="font-display text-[#f0ede8] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Drums &amp; Motion:<br />
              <span className="italic text-[#888888]">The Awakening</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="w-16 h-px bg-[#c9a84c] origin-left"
            />

            <p className="text-[#888888] text-base leading-[1.8] max-w-lg">
              Drums &amp; Motion: The Awakening is an Afrofusion EP rooted in rhythm, emotion, and
              movement. Blending Amapiano, Afrobeat, and soulful textures, the project reflects
              growth, motion, and progression. It&apos;s a body of work created to awaken the
              spirit and soundtrack both reflection and celebration.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com'}
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
