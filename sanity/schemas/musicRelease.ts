import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'musicRelease',
  title: 'Music Release',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: { list: ['single', 'ep', 'album', 'mix'] },
      validation: r => r.required(),
    }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'releaseDate', title: 'Release Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'links',
      title: 'Streaming Links',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'boomplay', title: 'Boomplay', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),
  ],
  orderings: [{ title: 'Release Date, New', name: 'releaseDateDesc', by: [{ field: 'releaseDate', direction: 'desc' }] }],
})
