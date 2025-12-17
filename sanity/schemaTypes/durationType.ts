// ./schema/duration/durationType.ts

import {defineField, defineType} from 'sanity'

export const durationType = defineType({
  name: 'duration',
  title: 'Set Times',
  description: 'Select the start and end times for the DJ set.',
  type: 'object',
  fields: [
    defineField({
      name: 'start',
      type: 'timeValue',
    }),
    defineField({
      name: 'end',
      type: 'timeValue',
    }),
  ],
  // make the fields render next to each other
  options: {columns: 2},
})