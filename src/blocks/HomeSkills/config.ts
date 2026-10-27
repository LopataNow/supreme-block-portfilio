import type { Block } from 'payload'

export const HomeSkillsBlock: Block = {
  slug: 'homeSkills',
  labels: {
    singular: 'Home Skills',
    plural: 'Home Skills',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Skills',
      label: 'Section Heading',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Skill Sections',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'items',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Programming Language:',
          items: 'C#, JavaScript, TypeScript',
        },
        {
          title: 'Front-End:',
          items: 'React, Angular, Redux, RxJS, HTML, CSS/SCSS, Styled components',
        },
        {
          title: 'Back-End:',
          items: 'Node.js, ASP.NET Core, Entity Framework, PostgreSQL, MongoDB, Firebase',
        },
        {
          title: 'Game development:',
          items: 'Unity 3D, Blender, Shaders, Game Design, Game AI',
        },
      ],
    },
  ],
}
