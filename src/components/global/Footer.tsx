import Link from 'next/link'
import { SiSpotify, SiApplemusic, SiYoutube, SiSoundcloud } from 'react-icons/si'

const socials = [
  { icon: SiSpotify, label: 'Spotify', href: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com' },
  { icon: SiApplemusic, label: 'Apple Music', href: 'https://music.apple.com' },
  { icon: SiYoutube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: SiSoundcloud, label: 'SoundCloud', href: 'https://soundcloud.com' },
]

const navLinks = [
  { href: '/bio', label: 'Bio' },
  { href: '/music', label: 'Music' },
  { href: '/photos', label: 'Photos' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#080808] border-t border-[#1e1e1e]">
      <div className="site-container py-12 md:py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12 md:mb-16">

          {/* Brand */}
          <div>
            <p className="font-display text-xl text-[#f0ede8] mb-2">SpiceKtrl</p>
            <p className="text-[#444444] text-xs tracking-[0.2em] uppercase mb-5">
              Music Producer · DJ · Songwriter
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#444444] hover:text-[#c9a84c] transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav>
            <p className="text-[#444444] text-[10px] tracking-[0.3em] uppercase mb-4">Navigation</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#888888] text-xs tracking-[0.15em] uppercase hover:text-[#f0ede8] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <p className="text-[#444444] text-[10px] tracking-[0.3em] uppercase mb-4">Bookings</p>
            <p className="text-[#888888] text-xs leading-relaxed mb-5">
              Available for DJ sets, live performances, studio sessions, and creative collaborations.
            </p>
            <Link
              href="/contact"
              className="inline-block text-xs tracking-[0.3em] uppercase text-[#c9a84c] hover:text-[#f0ede8] transition-colors duration-200"
            >
              Get In Touch →
            </Link>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-[#1e1e1e] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[#444444] text-[10px] tracking-[0.2em] uppercase">
            © {year} SpiceKtrl. All rights reserved.
          </p>
          <p className="text-[#444444] text-[10px] tracking-[0.2em] uppercase">
            Lagos · London · The World
          </p>
        </div>

      </div>
    </footer>
  )
}
