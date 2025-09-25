import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
        type: 'slug',
        title: 'Event Slug',
        description: 'A unique identifier for the event, used in URLs. It should be URL-friendly and unique across all events.',
        options: {
            source: 'name',
            maxLength: 96,
            slugify: input => input
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with dashes
                .replace(/[^\w-]+/g, '') // Remove non-word characters
                .slice(0, 96), // Limit to 96 characters
            },  
    }),
    defineField({
      name: 'djs',
      title: 'Lineup',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'dj',
          title: 'DJ',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'soundcloud',
              title: 'SoundCloud',
              type: 'url',
            }),
            defineField({
              name: 'time',
              title: 'Set Time',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'Link',
      type: 'url', 
      title: 'Event Link',
        description: 'Place the link to the event here.',   
    }),
    defineField({
      name: 'date',
      type: 'datetime', 
      title: 'Event Date',
        description: 'The date and time when the event will take place.',   
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Event Description',
      description: 'A detailed description of the event, including activities, speakers, and any other relevant information.',
    }),
    defineField({
      name: 'short',
      type: 'string',
      title: 'Short Description',
        description: 'A brief summary of the event, suitable for listings or previews.',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Event Location',
      description: 'The physical or virtual location where the event will be held.',
    }),
    defineField({
      name: 'imageUrl',
      type: 'image',
      title: 'Event Image',
      description: 'An image representing the event, such as a banner or promotional graphic.',
      options: {
        hotspot: true
      }
    }),            
  ],

})