import {defineField, defineType} from 'sanity'

export const eventcommunityType = defineType({
  name: 'communityevent',
  title: 'Event community',
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
  ],

})