import type { Block } from 'payload'

export const HomeDescriptionBlock: Block = {
  slug: 'homeDescription',
  labels: {
    singular: 'Home Description',
    plural: 'Home Descriptions',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      defaultValue:
        "I'm a Front-End Developer specializing in React, with experience in Angular, .NET, Node.js, and Unity 3D. I excel in analytical and creative thinking, algorithms, data structures, and design patterns. I ensure quick adaptation to new technologies and a focus on clean, optimized code.",
      label: 'Description Text',
    },
  ],
}
