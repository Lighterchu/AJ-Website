import { defineType, defineField } from 'sanity'
import { MultiImageSelector } from '../components/Sanity/MultiImageSelector'

export const djType = defineType({
  name: 'dj',
  title: 'DJs',
  type: 'document',
  fields: [
    defineField({
      name: "name",
      title: "DJ Name",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      }
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
            name: 'djsImages',
            title: 'Djs Images',
            type: 'array',
            of: [
              {
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
            ],
            components: {
              // Custom input component can be specified here if needed
              input: MultiImageSelector,
            },
          }),
    defineField({
      name: "soundcloud",
      type: "url",
    }),
    defineField({
      name: "instagram",
      type: "url",
    }),
    defineField({
      name: "facebook",
      type: "url",
    }),
    defineField({
      name: "tiktok",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    defineField({
        name: 'duration',
        type: 'duration',
    })
  ]
})
