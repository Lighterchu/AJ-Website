import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
        name: 'slug',
          type: 'slug',
          title: 'Blog Slug',
          description: 'A unique identifier for the Blog, used in URLs. It should be URL-friendly and unique across all Blogs.',
          options: {
              source: 'title',
              maxLength: 96,
              slugify: input => input
                  .toLowerCase()
                  .replace(/\s+/g, '-') // Replace spaces with dashes
                  .replace(/[^\w-]+/g, '') // Remove non-word characters
                  .slice(0, 96), // Limit to 96 characters
              },  
      }),
    defineField({
      name: 'imageUrl',
      type: 'image',
      title: 'blog Image',
      description: 'An image representing the event, such as a banner or promotional graphic.',
      options: {
        hotspot: true
      }
    }), 
    defineField({
        name: 'blogDate',
        type: 'date',
        title: 'blog Date',
        description: 'The date when the blog was made',
    }),
    defineField({
        name: 'shortDescription',
        title: 'Short Description',
        type: 'text',
        description: 'A brief summary of the Blog, suitable for listings or previews.',
    }),  
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Add as muhch detail as you want about the blog post',
    }),           
  ],

})