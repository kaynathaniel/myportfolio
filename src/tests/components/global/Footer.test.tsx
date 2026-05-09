import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) =>
    React.createElement('a', { href, ...props }, children),
}))

vi.mock('react-icons/si', () => ({
  SiSpotify: () => React.createElement('svg', { 'aria-label': 'Spotify' }),
  SiApplemusic: () => React.createElement('svg', { 'aria-label': 'Apple Music' }),
  SiYoutube: () => React.createElement('svg', { 'aria-label': 'YouTube' }),
  SiSoundcloud: () => React.createElement('svg', { 'aria-label': 'SoundCloud' }),
}))

import Footer from '@/components/global/Footer'

describe('Footer', () => {
  it('renders brand name', () => {
    render(<Footer />)
    expect(screen.getByText('SpiceKtrl')).toBeInTheDocument()
  })

  it('renders artist role tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/Music Producer/i)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Bio' })).toHaveAttribute('href', '/bio')
    expect(screen.getByRole('link', { name: 'Music' })).toHaveAttribute('href', '/music')
    expect(screen.getByRole('link', { name: 'Photos' })).toHaveAttribute('href', '/photos')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })

  it('renders Get In Touch link pointing to /contact', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '/contact')
  })

  it('renders social icon links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Spotify' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Apple Music' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'YouTube' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'SoundCloud' })).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('social links open in new tab', () => {
    render(<Footer />)
    const spotifyLink = screen.getByRole('link', { name: 'Spotify' })
    expect(spotifyLink).toHaveAttribute('target', '_blank')
    expect(spotifyLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
