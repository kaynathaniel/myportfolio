import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://spicektrl.com'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book SpiceKtrl for DJ sets, live performances, studio sessions, or creative collaborations. Get in touch to discuss your project.',
  keywords: ['book SpiceKtrl', 'SpiceKtrl DJ booking', 'music producer for hire', 'SpiceKtrl contact'],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contact SpiceKtrl — Bookings & Collaborations',
    description: 'Available for DJ sets, live performances, studio sessions, and creative collaborations.',
    url: `${siteUrl}/contact`,
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
      ],
    },
    {
      '@type': 'ContactPage',
      name: 'Contact SpiceKtrl',
      url: `${siteUrl}/contact`,
      description: 'Book SpiceKtrl for DJ sets, live performances, studio sessions, or creative collaborations.',
    },
  ],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#080808] pt-28 md:pt-32 pb-24 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-container">

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
