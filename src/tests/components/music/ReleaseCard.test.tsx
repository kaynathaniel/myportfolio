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
  urlFor: () => ({
    width: () => ({ height: () => ({ url: () => '/release-cover.jpg' }) }),
  }),
}))

import ReleaseCard from '@/components/music/ReleaseCard'

const mockRelease: MusicRelease = {
  _id: 'release-1',
  title: 'Drums & Motion',
  slug: { current: 'drums-and-motion' },
  releaseType: 'ep',
  coverImage: { _type: 'image', asset: { _ref: 'ref-1', _type: 'reference' } },
  releaseDate: '2024-03-20',
  description: 'An Afrofusion EP.',
  featured: true,
  links: {
    spotify: 'https://open.spotify.com/album/123',
    appleMusic: 'https://music.apple.com/album/123',
    boomplay: '',
    youtube: '',
  },
}

describe('ReleaseCard', () => {
  it('renders the release title', () => {
    render(<ReleaseCard release={mockRelease} />)
    expect(screen.getByText('Drums & Motion')).toBeInTheDocument()
  })

  it('renders release type and year', () => {
    render(<ReleaseCard release={mockRelease} />)
    expect(screen.getByText('ep · 2024')).toBeInTheDocument()
  })

  it('renders cover image with correct alt text', () => {
    render(<ReleaseCard release={mockRelease} />)
    expect(screen.getByAltText('Drums & Motion')).toHaveAttribute('src', '/release-cover.jpg')
  })

  it('renders streaming links for non-empty URLs', () => {
    render(<ReleaseCard release={mockRelease} />)
    expect(screen.getByRole('link', { name: 'Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/album/123')
    expect(screen.getByRole('link', { name: 'Apple Music' })).toHaveAttribute('href', 'https://music.apple.com/album/123')
  })

  it('does not render links for empty URLs', () => {
    render(<ReleaseCard release={mockRelease} />)
    expect(screen.queryByRole('link', { name: 'Boomplay' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'YouTube' })).not.toBeInTheDocument()
  })

  it('streaming links open in new tab', () => {
    render(<ReleaseCard release={mockRelease} />)
    const spotifyLink = screen.getByRole('link', { name: 'Spotify' })
    expect(spotifyLink).toHaveAttribute('target', '_blank')
    expect(spotifyLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders with no streaming links gracefully', () => {
    const releaseNoLinks: MusicRelease = {
      ...mockRelease,
      links: { spotify: '', appleMusic: '', boomplay: '', youtube: '' },
    }
    render(<ReleaseCard release={releaseNoLinks} />)
    expect(screen.queryAllByRole('link').length).toBe(0)
  })

  it('renders album type correctly', () => {
    render(<ReleaseCard release={{ ...mockRelease, releaseType: 'album' }} />)
    expect(screen.getByText('album · 2024')).toBeInTheDocument()
  })
})
