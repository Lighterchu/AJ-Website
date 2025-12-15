import {defineField, defineType} from 'sanity'

export const eventCrewType = defineType({
  name: 'event',
  title: 'Event crew',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'genre',
      type: 'string',
      title: 'Genre',
      description: 'The genre of the event, such as music style or theme.',
      options: {
        list: [
          { title: 'RnB/Hip', value: 'rnb' },
          { title: 'Hop House', value: 'house' },
          { title: 'Tech House', value: 'tech house' },
          { title: 'Trance Techno', value: 'trance tech' },
          { title: 'Hard dance/groove', value: 'hard dance - groove' },
          { title: 'Hard Techno', value: 'hard tech' },
          { title: 'DnB', value: 'dnb' },
          { title: 'Psy', value: 'psy' },
          { title: 'Hardstyle', value: 'hardstyle' },
          { title: 'Bass', value: 'bass' },
          { title: 'Minimal', value: 'minimal' }
        ],
      },
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
        {
          type: 'reference',
          to: [{ type: 'dj' }]
        }
      ],
    }),
    defineField({
      name: 'Link',
      type: 'url', 
      title: 'Event Link',
        description: 'Place the link to the event here.',   
    }),
    defineField({
      name: 'startDate',
      type: 'datetime', 
      title: 'Event Start Date',
        description: 'The date and time when the event will take place.',   
    }),
    defineField({
      name: 'endtDate',
      type: 'datetime', 
      title: 'Event Date',
        description: 'this is only if the event spans multiple days.',   
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