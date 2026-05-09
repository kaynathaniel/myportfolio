import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) =>
    React.createElement('a', { href, ...props }, children),
}))

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag: string) => ({ children, initial, animate, exit, transition, whileInView, viewport, ...props }: any) =>
      React.createElement(tag, props, children),
  }),
  AnimatePresence: ({ children }: any) => children,
}))

vi.mock('react-icons/si', () => ({
  SiSpotify: () => React.createElement('svg', { 'aria-label': 'Spotify' }),
  SiApplemusic: () => React.createElement('svg', { 'aria-label': 'Apple Music' }),
  SiYoutube: () => React.createElement('svg', { 'aria-label': 'YouTube' }),
  SiSoundcloud: () => React.createElement('svg', { 'aria-label': 'SoundCloud' }),
}))

import Navbar from '@/components/global/Navbar'
import { usePathname } from 'next/navigation'

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/')
  })

  it('renders the logo', () => {
    render(<Navbar />)
    expect(screen.getByText('SpiceKtrl')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getAllByText('Bio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Photos').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Music').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('does not show Home link', () => {
    render(<Navbar />)
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('renders the hamburger button on mobile', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('toggles mobile menu on hamburger click', () => {
    render(<Navbar />)
    const hamburger = screen.getByRole('button', { name: /toggle menu/i })
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })

  it('highlights active link based on pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/bio')
    render(<Navbar />)
    const bioLinks = screen.getAllByText('Bio')
    const activeLink = bioLinks.find(el => el.className.includes('c9a84c'))
    expect(activeLink).toBeTruthy()
  })

  it('logo links to homepage', () => {
    render(<Navbar />)
    const logo = screen.getByText('SpiceKtrl').closest('a')
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders social icon links with aria-labels', () => {
    render(<Navbar />)
    expect(screen.getAllByRole('link', { name: 'Spotify' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Apple Music' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'YouTube' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'SoundCloud' }).length).toBeGreaterThan(0)
  })
})
