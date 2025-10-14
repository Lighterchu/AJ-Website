import { defineType, defineField } from 'sanity'

export const testType = defineType({
  name: 'test',
  title: 'Test Data',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
