import { sanityClient } from './sanity'
import { SiteSettings, MusicRelease, GalleryImage } from '@/types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!sanityClient) return null
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getFeaturedReleases(): Promise<MusicRelease[]> {
  if (!sanityClient) return []
  return sanityClient.fetch(
    `*[_type == "musicRelease" && featured == true] | order(releaseDate desc)[0...4] {
      _id, title, slug, releaseType, coverImage, releaseDate, description, featured, links
    }`
  )
}

export async function getRecentReleases(limit: number = 4): Promise<MusicRelease[]> {
  if (!sanityClient) return []
  return sanityClient.fetch(
    `*[_type == "musicRelease"] | order(releaseDate desc)[0...${limit}] {
      _id, title, slug, releaseType, coverImage, releaseDate, description, featured, links
    }`
  )
}

export async function getAllReleases(): Promise<MusicRelease[]> {
  if (!sanityClient) return []
  return sanityClient.fetch(
    `*[_type == "musicRelease"] | order(releaseDate desc) {
      _id, title, slug, releaseType, coverImage, releaseDate, description, featured, links
    }`
  )
}

export async function getFeaturedGalleryImages(): Promise<GalleryImage[]> {
  if (!sanityClient) return []
  return sanityClient.fetch(
    `*[_type == "galleryImage" && featured == true] | order(_createdAt desc)[0...8] {
      _id, title, image, alt, category, featured
    }`
  )
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  if (!sanityClient) return []
  return sanityClient.fetch(
    `*[_type == "galleryImage"] | order(_createdAt desc) {
      _id, title, image, alt, category, featured
    }`
  )
}

export async function getBioImage(): Promise<Pick<GalleryImage, 'image' | 'alt'> | null> {
  if (!sanityClient) return null
  return sanityClient.fetch(
    `*[_type == "galleryImage" && title == "bio image"][0] { image, alt }`
  )
}
