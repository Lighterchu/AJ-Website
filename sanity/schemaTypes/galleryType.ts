import {defineField, defineType} from 'sanity'
import { media } from 'sanity-plugin-media'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
        type: 'slug',
        title: 'Gallery Slug',
        description: 'A unique identifier for the Gallery, used in URLs. It should be URL-friendly and unique across all events.',
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
        name: 'short',
        type: 'text',
        title: 'Gallery Description',
        description: 'Short description of the gallery, suitable for listings or previews.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'front cover image',
    }),
    defineField({
        name: 'images',
        title: 'Gallery Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
        
      }),      
  ],

})