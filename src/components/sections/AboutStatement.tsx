'use client'

import { motion } from 'framer-motion'

export default function AboutStatement() {
  return (
    <section className="py-32 md:py-40 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="site-container">

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-16 lg:gap-24 items-start">

          {/* ── Left — lead quote */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#c9a84c] text-[0.65rem] tracking-[0.5em] uppercase mb-10"
            >
              The Artist
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-[#f0ede8] leading-[1.15] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)' }}
            >
              SpiceKtrl isn&apos;t just producing tracks. He&apos;s composing feelings and timelines.
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="w-16 h-px bg-[#c9a84c] mt-10 origin-left"
            />
          </div>

          {/* ── Right — body copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:pt-[4.5rem] border-l border-[#1e1e1e] pl-8 lg:pl-12"
          >
            <p className="text-[#888888] text-base md:text-lg leading-[1.85]">
              Born in Nigeria and now based in the UK, his music blends Afrobeats with textured
              electronic layers, capturing the tension and harmony between heritage and evolution.
              Each beat is intentional. Each melody is rooted in experience. His sound is less about
              trends and more about truth, offering listeners a journey through rhythm, culture,
              and soul.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
