import type { Block } from 'payload'

export const HomeContactBlock: Block = {
  slug: 'homeContact',
  labels: {
    singular: 'Home Contact',
    plural: 'Home Contacts',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Contact',
      label: 'Heading',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'peter.kopac3@gmail.com',
      label: 'Contact Email',
    },
  ],
}
