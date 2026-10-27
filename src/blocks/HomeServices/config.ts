import type { Block } from 'payload'

export const HomeServicesBlock: Block = {
  slug: 'homeServices',
  labels: {
    singular: 'Home Services',
    plural: 'Home Services',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Services',
      label: 'Section Heading',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Service Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
      defaultValue: [
        { title: 'Headless CMS or Eshop' },
        { title: 'Frontend or Fullstack dev' },
        { title: 'Monitoring and optimization' },
        { title: 'Game dev' },
        { title: 'AI tools implementation' },
        { title: 'Custom App development' },
      ],
    },
  ],
}
