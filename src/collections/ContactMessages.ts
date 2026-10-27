import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    group: 'Admin',
  },
  access: {
    // Anyone from the public web can submit a contact message
    create: () => true,
    // Only authenticated admin users can read, update, or delete messages
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Sender Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Sender Email',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'unread',
      options: [
        { label: 'Unread', value: 'unread' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
