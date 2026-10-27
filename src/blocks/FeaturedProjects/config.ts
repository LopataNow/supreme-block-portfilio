import type { Block } from 'payload'

export const FeaturedProjectsBlock: Block = {
  slug: 'featuredProjects',
  labels: {
    singular: 'Featured Projects Section',
    plural: 'Featured Projects Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      localized: true,
      defaultValue: 'Selected Work',
      label: 'Badge Text',
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Featured Projects',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
      defaultValue: 'A selection of software development, interactive graphics, and fullstack applications.',
      label: 'Subheading',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      label: 'Max Projects to Display',
    },
  ],
}
