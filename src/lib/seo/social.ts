// Canonical, public social profile URLs for SpiceKtrl.
// These are public identifiers used by Google/AI engines to verify the
// official site of the artist via schema `sameAs`. Hardcoded here (rather
// than env vars) so the schema never silently emits an empty array if a
// production env var is unset. Add Instagram, TikTok, MusicBrainz, Wikidata,
// Bandcamp, Audiomack, Boomplay etc. here as profiles are created.

export const SOCIAL_URLS = {
  spotify: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? 'https://open.spotify.com/artist/44UplAGnsqSLFwegyjFA2u',
  appleMusic: process.env.NEXT_PUBLIC_APPLE_MUSIC_URL ?? 'https://music.apple.com/gb/artist/spicektrl/1849003488',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  soundcloud: process.env.NEXT_PUBLIC_SOUNDCLOUD_URL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL,
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
  musicbrainz: process.env.NEXT_PUBLIC_MUSICBRAINZ_URL,
  wikidata: process.env.NEXT_PUBLIC_WIKIDATA_URL,
} as const

export const sameAsUrls = (): string[] =>
  Object.values(SOCIAL_URLS).filter((u): u is string => Boolean(u))
