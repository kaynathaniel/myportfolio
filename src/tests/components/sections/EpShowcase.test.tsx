import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MusicRelease } from '@/types'

vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => React.createElement('img', { src, alt }),
}))

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag: string) => ({ children, initial, animate, whileInView, viewport, transition, ...props }: any) =>
      React.createElement(tag, props, children),
  }),
}))

vi.mock('@/lib/sanity', () => ({
  urlFor: () => ({ width: () => ({ url: () => '/sanity-image.jpg' }) }),
}))

import EpShowcase from '@/components/sections/EpShowcase'

const mockRelease: MusicRelease = {
  _id: 'release-1',
  title: 'Test EP',
  slug: { current: 'test-ep' },
  releaseType: 'ep',
  coverImage: { _type: 'image', asset: { _ref: 'ref-1', _type: 'reference' } },
  releaseDate: '2024-01-15',
  description: 'A test EP description for the showcase.',
  featured: true,
  links: { spotify: 'https://open.spotify.com/test', appleMusic: '', boomplay: '', youtube: '' },
}

describe('EpShowcase', () => {
  it('renders with a Sanity release', () => {
    render(<EpShowcase release={mockRelease} />)
    expect(screen.getByText('Test EP')).toBeInTheDocument()
    expect(screen.getByText('EP Out Now')).toBeInTheDocument()
    expect(screen.getByText('A test EP description for the showcase.')).toBeInTheDocument()
  })

  it('uses Sanity image URL when release has coverImage', () => {
    render(<EpShowcase release={mockRelease} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/sanity-image.jpg')
  })

  it('falls back to hardcoded data when release is null', () => {
    render(<EpShowcase release={null} />)
    expect(screen.getByText('Drums & Motion')).toBeInTheDocument()
    expect(screen.getByText('EP Out Now')).toBeInTheDocument()
  })

  it('shows correct type label for different release types', () => {
    render(<EpShowcase release={{ ...mockRelease, releaseType: 'single' }} />)
    expect(screen.getByText('New Single')).toBeInTheDocument()
  })

  it('renders Listen Now and All Releases buttons', () => {
    render(<EpShowcase release={mockRelease} />)
    expect(screen.getByRole('link', { name: /listen now/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /all releases/i })).toHaveAttribute('href', '/music')
  })

  it('Listen Now links to Spotify when provided', () => {
    render(<EpShowcase release={mockRelease} />)
    expect(screen.getByRole('link', { name: /listen now/i })).toHaveAttribute('href', 'https://open.spotify.com/test')
  })

  it('Listen Now opens in new tab', () => {
    render(<EpShowcase release={mockRelease} />)
    expect(screen.getByRole('link', { name: /listen now/i })).toHaveAttribute('target', '_blank')
  })
})
