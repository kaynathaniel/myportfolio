import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book the artist or reach out for collaborations and creative projects.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#080808] pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <span className="text-[#444444] text-xs tracking-[0.4em] uppercase shrink-0">Get In Touch</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        {/* Asymmetric 2-col: info (2fr) | form (3fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

          {/* Info col */}
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-[#f0ede8] leading-tight mb-6">
              Let&apos;s Work
              <br />
              <span className="italic text-[#888888]">Together</span>
            </h1>
            <p className="text-[#888888] text-sm leading-relaxed mb-12">
              Available for DJ bookings, studio sessions, live performances, and creative collaborations.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[#444444] text-[10px] tracking-[0.4em] uppercase mb-2">Email</p>
                <a
                  href="mailto:booking@spicektrl.com"
                  className="text-[#888888] text-sm hover:text-[#c9a84c] transition-colors duration-200"
                >
                  booking@spicektrl.com
                </a>
              </div>

              <div>
                <p className="text-[#444444] text-[10px] tracking-[0.4em] uppercase mb-4">Socials</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Instagram', href: '#' },
                    { label: 'Spotify', href: '#' },
                    { label: 'SoundCloud', href: '#' },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#444444] text-xs tracking-[0.2em] uppercase hover:text-[#c9a84c] transition-colors duration-200 self-start"
                    >
                      {label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form col */}
          <div>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  )
}
