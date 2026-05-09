import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { GalleryImage } from '@/types'

vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => React.createElement('img', { src, alt }),
}))

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag: string) => ({ children, initial, animate, exit, transition, layout, ...props }: any) =>
      React.createElement(tag === 'div' ? 'div' : tag, props, children),
  }),
  AnimatePresence: ({ children }: any) => children,
}))

vi.mock('@/lib/sanity', () => ({
  urlFor: () => ({
    width: () => ({ url: () => '/gallery-image.jpg' }),
    height: () => ({ url: () => '/gallery-image.jpg' }),
  }),
}))

import GalleryGrid from '@/components/gallery/GalleryGrid'

const makeImage = (overrides: Partial<GalleryImage> = {}): GalleryImage => ({
  _id: 'img-1',
  title: 'Test Photo',
  image: { _type: 'image', asset: { _ref: 'ref-1', _type: 'reference' } },
  alt: 'A test photo',
  category: 'portrait',
  featured: false,
  ...overrides,
})

const images: GalleryImage[] = [
  makeImage({ _id: '1', category: 'portrait', alt: 'Portrait photo' }),
  makeImage({ _id: '2', category: 'live', alt: 'Live photo' }),
  makeImage({ _id: '3', category: 'studio', alt: 'Studio photo' }),
  makeImage({ _id: '4', category: 'editorial', alt: 'Editorial photo' }),
]

describe('GalleryGrid', () => {
  it('renders all images by default', () => {
    render(<GalleryGrid images={images} />)
    expect(screen.getAllByRole('img').length).toBe(4)
  })

  it('renders category filter buttons', () => {
    render(<GalleryGrid images={images} />)
    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'portrait' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'live' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'studio' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'editorial' })).toBeInTheDocument()
  })

  it('"all" filter is active by default', () => {
    render(<GalleryGrid images={images} />)
    const allBtn = screen.getByRole('button', { name: 'all' })
    expect(allBtn.className).toContain('c9a84c')
  })

  it('filters to portrait images when portrait button is clicked', () => {
    render(<GalleryGrid images={images} />)
    fireEvent.click(screen.getByRole('button', { name: 'portrait' }))
    expect(screen.getAllByRole('img').length).toBe(1)
    expect(screen.getByAltText('Portrait photo')).toBeInTheDocument()
  })

  it('filters to live images when live button is clicked', () => {
    render(<GalleryGrid images={images} />)
    fireEvent.click(screen.getByRole('button', { name: 'live' }))
    expect(screen.getAllByRole('img').length).toBe(1)
    expect(screen.getByAltText('Live photo')).toBeInTheDocument()
  })

  it('shows all images again after switching back to all', () => {
    render(<GalleryGrid images={images} />)
    fireEvent.click(screen.getByRole('button', { name: 'portrait' }))
    fireEvent.click(screen.getByRole('button', { name: 'all' }))
    expect(screen.getAllByRole('img').length).toBe(4)
  })

  it('opens lightbox when an image is clicked', () => {
    render(<GalleryGrid images={images} />)
    fireEvent.click(screen.getByAltText('Portrait photo'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes lightbox when close button is clicked', () => {
    render(<GalleryGrid images={images} />)
    fireEvent.click(screen.getByAltText('Portrait photo'))
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders empty state when no images match filter', () => {
    const portraitOnly = [makeImage({ _id: '1', category: 'portrait' })]
    render(<GalleryGrid images={portraitOnly} />)
    fireEvent.click(screen.getByRole('button', { name: 'live' }))
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders image alt text correctly', () => {
    render(<GalleryGrid images={images} />)
    expect(screen.getByAltText('Portrait photo')).toBeInTheDocument()
    expect(screen.getByAltText('Live photo')).toBeInTheDocument()
  })
})
