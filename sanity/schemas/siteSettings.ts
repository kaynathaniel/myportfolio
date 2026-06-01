import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'artistName', title: 'Artist Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', validation: r => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: r => r.required().email() }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'spotifyUrl', title: 'Spotify URL', type: 'url' }),
    defineField({ name: 'boomplayUrl', title: 'Boomplay URL', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }),
  ],
})
