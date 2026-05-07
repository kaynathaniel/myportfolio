export interface SiteSettings {
  artistName: string
  tagline: string
  email: string
  instagramUrl?: string
  spotifyUrl?: string
  soundcloudUrl?: string
  youtubeUrl?: string
}

export interface StreamingLinks {
  spotify?: string
  appleMusic?: string
  soundcloud?: string
  youtube?: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface MusicRelease {
  _id: string
  title: string
  slug: { current: string }
  releaseType: 'single' | 'ep' | 'album' | 'mix'
  coverImage: SanityImage
  releaseDate: string
  description?: string
  featured: boolean
  links: StreamingLinks
}

export interface GalleryImage {
  _id: string
  title?: string
  image: SanityImage
  alt: string
  category: 'portrait' | 'live' | 'studio' | 'editorial'
  featured: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
