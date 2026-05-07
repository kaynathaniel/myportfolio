import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book the artist or reach out for collaborations and creative projects.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <div>
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-8">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl text-[#f0ede8] leading-tight mb-10">
            Let&apos;s Work
            <br />
            <span className="italic text-[#888888]">Together</span>
          </h1>
          <p className="text-[#888888] text-sm leading-relaxed max-w-sm mb-12">
            Available for DJ bookings, studio sessions, live performances, and creative collaborations. Reach out using the form or via email.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-[#444444] text-xs tracking-[0.3em] uppercase mb-1">Email</p>
              <a href="mailto:booking@artist.com" className="text-[#888888] text-sm hover:text-[#c9a84c] transition-colors">
                booking@artist.com
              </a>
            </div>
            <div>
              <p className="text-[#444444] text-xs tracking-[0.3em] uppercase mb-3">Socials</p>
              <div className="flex gap-6">
                {[
                  { label: 'Instagram', href: '#' },
                  { label: 'Spotify', href: '#' },
                  { label: 'SoundCloud', href: '#' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-[#444444] text-xs tracking-[0.2em] uppercase hover:text-[#c9a84c] transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
