import type { Block } from 'payload'

export const FixedHeroBlock: Block = {
  slug: 'fixedHero',
  labels: {
    singular: 'Fixed Hero (Canvas)',
    plural: 'Fixed Heroes (Canvas)',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      defaultValue: 'Peter Kopáč',
      label: 'Main Name (h1)',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: "I'm a Software Developer",
      label: 'Main Title (h2)',
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      defaultValue:
        'Crafting high-performance web applications, interactive graphics, and fullstack architectures.',
      label: 'Subtitle (h3)',
    },
  ],
}
