// ./schema/duration/durationType.ts

import {defineField, defineType} from 'sanity'


export const aboutUs = defineType({
    name: "aboutUs",
    title: "About Us",
    type: "document",
    fields: [
        {
          name: "mission",
          title: "Mission",
          type: "array",
          of: [{ type: "block" }],
          description: "Mission statement, can include headings, paragraphs",
        },
        {
          name: "goals",
          title: "Goals",
          type: "array",
          of: [{ type: "block" }],
          description: "Goals list, each goal can be a heading or paragraph",
        },
        {
          name: "founderStory",
          title: "Founder Story",
          type: "array",
          of: [{ type: "block" }],
          description: "Story about the founder, AJ",
        },
        {
          name: "whyWeExist",
          title: "Why We Exist",
          type: "array",
          of: [{ type: "block" }],
          description: "Reasons why the organization exists",
        },
      ],
})