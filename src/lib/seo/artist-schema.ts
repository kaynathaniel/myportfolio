import { sameAsUrls } from './social'

// Shared entity graph for SpiceKtrl. Emit this on every page so Google
// treats Person + MusicGroup + WebSite as one consolidated entity rather
// than disconnected snippets per page. Per-page schema (BreadcrumbList,
// MusicAlbum, FAQPage, etc.) should reference these @ids via byArtist,
// about, or mainEntity.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.spicektrl.co.uk'

export const ARTIST_ID = `${SITE_URL}/#artist`
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function artistGraph() {
  const sameAs = sameAsUrls()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicGroup',
        '@id': ARTIST_ID,
        name: 'SpiceKtrl',
        alternateName: ['Spice Ktrl', 'Spicektrl'],
        url: SITE_URL,
        image: `${SITE_URL}/hero-photo.jpg`,
        description:
          'UK-based Nigerian songwriter, DJ, and music producer known for genre-fluid sound blending Afrobeats with Afro-electronic elements.',
        genre: ['Afrobeats', 'Afro-electronic', 'Amapiano', 'Afrofusion'],
        foundingLocation: { '@type': 'Place', name: 'Lagos, Nigeria' },
        location: { '@type': 'Place', name: 'United Kingdom' },
        member: { '@id': PERSON_ID },
        sameAs,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'SpiceKtrl',
        url: `${SITE_URL}/bio`,
        image: `${SITE_URL}/hero-photo.jpg`,
        jobTitle: 'Music Producer, DJ, Songwriter',
        nationality: { '@type': 'Country', name: 'Nigeria' },
        homeLocation: { '@type': 'Country', name: 'United Kingdom' },
        knowsAbout: ['Music Production', 'DJing', 'Songwriting', 'Afrobeats', 'Amapiano', 'Afro-electronic music'],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            educationalLevel: 'Bachelor',
            name: 'BSc Computer Science',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            educationalLevel: 'Master',
            name: 'MSc Computing',
          },
        ],
        worksFor: { '@id': ARTIST_ID },
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: 'SpiceKtrl',
        description: 'Official website of SpiceKtrl, music producer, DJ, and songwriter.',
        publisher: { '@id': PERSON_ID },
        about: { '@id': ARTIST_ID },
        inLanguage: 'en-GB',
      },
    ],
  }
}
