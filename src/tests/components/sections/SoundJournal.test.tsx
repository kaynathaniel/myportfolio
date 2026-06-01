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
  urlFor: () => ({ width: () => ({ url: () => '/sanity-card.jpg' }) }),
}))

import SoundJournal from '@/components/sections/SoundJournal'

const makeRelease = (overrides: Partial<MusicRelease> = {}): MusicRelease => ({
  _id: 'release-1',
  title: 'Test Track',
  slug: { current: 'test-track' },
  releaseType: 'single',
  coverImage: { _type: 'image', asset: { _ref: 'ref-1', _type: 'reference' } },
  releaseDate: '2024-05-01',
  description: 'A test track description.',
  featured: false,
  links: { spotify: 'https://open.spotify.com/test', appleMusic: '', boomplay: '', youtube: '' },
  ...overrides,
})

describe('SoundJournal', () => {
  it('renders the section heading', () => {
    render(<SoundJournal releases={[]} />)
    expect(screen.getByText('Sound Journal')).toBeInTheDocument()
  })

  it('renders the intro paragraph', () => {
    render(<SoundJournal releases={[]} />)
    expect(screen.getByText(/each release is a reflection/i)).toBeInTheDocument()
  })

  it('shows fallback cards when releases array is empty', () => {
    render(<SoundJournal releases={[]} />)
    expect(screen.getByText('Drums & Motion')).toBeInTheDocument()
    expect(screen.getByText('Afro Nights')).toBeInTheDocument()
    expect(screen.getByText('Heritage')).toBeInTheDocument()
  })

  it('renders Sanity releases when provided', () => {
    const releases = [
      makeRelease({ _id: '1', title: 'Night Pulse' }),
      makeRelease({ _id: '2', title: 'Lagos Dreams' }),
      makeRelease({ _id: '3', title: 'Roots EP', releaseType: 'ep' }),
    ]
    render(<SoundJournal releases={releases} />)
    expect(screen.getByText('Night Pulse')).toBeInTheDocument()
    expect(screen.getByText('Lagos Dreams')).toBeInTheDocument()
    expect(screen.getByText('Roots EP')).toBeInTheDocument()
  })

  it('does not show fallback cards when Sanity data is provided', () => {
    render(<SoundJournal releases={[makeRelease({ _id: '1', title: 'New Track' })]} />)
    expect(screen.queryByText('Afro Nights')).not.toBeInTheDocument()
    expect(screen.queryByText('Heritage')).not.toBeInTheDocument()
  })

  it('formats type label with year', () => {
    render(<SoundJournal releases={[makeRelease({ releaseDate: '2024-06-01', releaseType: 'single' })]} />)
    expect(screen.getByText('SINGLE · 2024')).toBeInTheDocument()
  })

  it('uses Sanity image URLs for cards', () => {
    render(<SoundJournal releases={[makeRelease()]} />)
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('src', '/sanity-card.jpg')
  })

  it('renders Listen links pointing to Spotify', () => {
    render(<SoundJournal releases={[makeRelease()]} />)
    const listenLinks = screen.getAllByRole('link', { name: /listen/i })
    expect(listenLinks[0]).toHaveAttribute('href', 'https://open.spotify.com/test')
  })

  it('renders correct number of cards', () => {
    const releases = [
      makeRelease({ _id: '1', title: 'Track One' }),
      makeRelease({ _id: '2', title: 'Track Two' }),
    ]
    render(<SoundJournal releases={releases} />)
    expect(screen.getAllByRole('article').length).toBe(2)
  })
})
