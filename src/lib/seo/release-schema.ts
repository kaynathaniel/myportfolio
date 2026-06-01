import { MusicRelease } from '@/types'
import { urlFor } from '@/lib/sanity'
import { ARTIST_ID } from './artist-schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://spicektrl.co.uk'

const RELEASE_TYPE_MAP: Record<MusicRelease['releaseType'], string> = {
  single: 'SingleRelease',
  ep: 'EPRelease',
  album: 'AlbumRelease',
  mix: 'AlbumRelease',
}

function releaseJsonLd(release: MusicRelease) {
  const sameAs = Object.values(release.links ?? {}).filter((u): u is string => Boolean(u))
  const primaryUrl = release.links?.spotify ?? sameAs[0]

  return {
    '@type': 'MusicAlbum',
    '@id': `${SITE_URL}/music#${release.slug.current}`,
    name: release.title,
    byArtist: { '@id': ARTIST_ID },
    albumProductionType: 'StudioAlbum',
    albumReleaseType: RELEASE_TYPE_MAP[release.releaseType],
    datePublished: release.releaseDate,
    image: urlFor(release.coverImage).width(600).url(),
    ...(release.description && { description: release.description }),
    ...(primaryUrl && { url: primaryUrl }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}

export function releasesGraph(releases: MusicRelease[], breadcrumbs?: object) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...(breadcrumbs ? [breadcrumbs] : []),
      ...releases.map(releaseJsonLd),
    ],
  }
}
