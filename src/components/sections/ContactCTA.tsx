'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-12 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-8">Work Together</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#f0ede8] leading-tight mb-6">
            Let&apos;s Create
            <br />
            <span className="italic text-[#888888]">Something</span>
          </h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-10">
            Available for bookings, collaborations, and creative projects.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.3em] uppercase hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
