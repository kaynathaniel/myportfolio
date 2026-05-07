'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808]">

      {/* ── Layout grid ─────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:grid lg:grid-cols-[1fr_1fr]">

        {/* ── RIGHT — Photo (renders first in DOM for mobile bg effect) */}
        <div className="relative order-1 lg:order-2 h-[60vw] min-h-[360px] lg:h-auto lg:min-h-screen">

          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-photo.jpg"
              alt="SpiceKtrl"
              fill
              priority
              className="object-cover object-top grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Left gradient — seamless blend into text column on desktop */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent z-10 hidden lg:block" />

          {/* Bottom gradient — text readability on mobile */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent z-10 lg:hidden" />

          {/* Top vignette */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080808]/80 to-transparent z-10" />

          {/* Corner accent — top right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute top-10 right-10 z-20 hidden lg:flex flex-col items-end gap-1.5"
          >
            <div className="w-10 h-px bg-[#c9a84c]/60" />
            <div className="w-5 h-px bg-[#c9a84c]/40" />
          </motion.div>

        </div>

        {/* ── LEFT — Text content */}
        <div className="relative order-2 lg:order-1 flex flex-col justify-center
                        px-6 md:px-12 lg:px-16
                        pb-16 lg:pb-0
                        -mt-20 lg:mt-0
                        z-20">

          {/* ── Top group: role + name + divider */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-6"
            >
              Music Producer · DJ · Songwriter
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display leading-none tracking-tight text-[#f0ede8]"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
            >
              SpiceKtrl
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
              className="w-20 h-px bg-[#c9a84c] mt-8 origin-left"
            />
          </div>

          {/* ── Bottom group: bio + CTA */}
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.88 }}
              className="flex flex-col gap-4 mb-10"
            >
              <p className="text-[#888888] text-base leading-[1.75] max-w-sm">
                Nigerian-born music producer, DJ, and songwriter based in the UK.
              </p>
              <p className="text-[#888888] text-base leading-[1.75] max-w-sm">
                Fusing Afrobeats with Afro-electronic music to tell stories that move the soul.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
            >
              <a
                href={process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block p-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#f0ede8] transition-colors duration-300"
              >
                Explore the Sound
              </a>
            </motion.div>
          </div>

        </div>

      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-[#444444] text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#444444] to-transparent"
        />
      </motion.div>

      {/* ── Grain overlay ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

    </section>
  )
}
