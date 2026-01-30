import { defineType, defineField } from 'sanity'

export const videoSchema = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short title for the video (optional)',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload your video (MP4/WebM recommended)',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      description: 'Thumbnail/poster for the video',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'Optional, e.g., "16/9"',
      initialValue: '16/9',
    }),
    defineField({
      name: 'link',
      title: 'Optional Link',
      type: 'url',
      description: 'Optional URL to open when video is clicked',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description for the video',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'poster',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Untitled Video',
        media,
      }
    },
  },
})
