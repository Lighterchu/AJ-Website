import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'posts',
  title: 'Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
        name: 'slug',
          type: 'slug',
          title: 'Post Slug',
          description: 'A unique identifier for the Post, used in URLs. It should be URL-friendly and unique across all Posts.',
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
      name: 'image',
      type: 'image',
      title: 'Post Image',
      description: 'An image representing the event, such as a banner or promotional graphic.',
      options: {
        hotspot: true
      }
    }), 
    defineField({
        name: 'PostDate',
        type: 'date',
        title: 'Post Date',
        description: 'The date when the Post was made',
    }),
    defineField({
        name: 'shortDescription',
        title: 'Short Description',
        type: 'text',
        description: 'A brief summary of the Post, suitable for listings or previews.',
    }),  
    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Add as much detail as you want about the Post post',
    }),    
    defineField({
      name: 'authorId',
      title: 'Author ID',
      type: 'text',
      description: 'User ID',
  }), 
  defineField({
    name: 'approved',
    type: 'boolean',
    title: 'Approved',
    description: 'This field indicates whether the event has been approved by an admin.',
  })      
  ],

})