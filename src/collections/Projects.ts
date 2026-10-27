import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../access/authenticated'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'period', 'featured', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL slug (e.g. premiere-composer or geometric-filter)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on Homepage (show among 3-6 highlighted projects)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'period',
      type: 'text',
      label: 'Date / Period (e.g. 2019-2020, 2024, or 2020-now)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'client',
      type: 'text',
      localized: true,
      label: 'Client / Company (For)',
      admin: {
        description: 'e.g. Mister Horse, Swan / 4ka, or Personal project',
      },
    },
    {
      name: 'collaborators',
      type: 'text',
      label: 'Collaborators (With)',
      admin: {
        description: 'e.g. Zden from Satori, or other team members',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Short Summary',
      admin: {
        description: 'A 2-3 sentence overview displayed on homepage and project cards',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover / Thumbnail Image (Optional)',
      admin: {
        description: 'Optional thumbnail image; if empty, a modern technical card style is displayed',
      },
    },
    {
      name: 'techStack',
      type: 'array',
      label: 'Tags / Tech Stack',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      label: 'URLs & Actions',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Link Label (e.g. Live Website, misterhorse.com, GitHub, Article)',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL Destination',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Live Demo / Website', value: 'live' },
            { label: 'GitHub Repository', value: 'github' },
            { label: 'Published Article', value: 'article' },
            { label: 'Documentation', value: 'docs' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'live',
        },
      ],
    },
    {
      name: 'downloadFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Downloadable Asset (Optional build ZIP, PDF, or release)',
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Detailed Story & Architecture Description',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Gallery / Full-width Screenshots (Optional)',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          label: 'Optional Caption',
        },
      ],
    },
  ],
  timestamps: true,
}

export default Projects
