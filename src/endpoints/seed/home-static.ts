import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'none',
  },
  meta: {
    description: "Peter Kopáč - Software Developer Portfolio",
    title: 'Peter Kopáč',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'fixedHero',
      name: 'Peter Kopáč',
      title: "I'm a Software Developer",
      subtitle:
        'Crafting high-performance web applications, interactive graphics, and fullstack architectures.',
    },
    {
      blockType: 'homeDescription',
      text: "I'm a Front-End Developer specializing in React, with experience in Angular, .NET, Node.js, and Unity 3D. I excel in analytical and creative thinking, algorithms, data structures, and design patterns. I ensure quick adaptation to new technologies and a focus on clean, optimized code.",
    },
    {
      blockType: 'homeServices',
      heading: 'Services',
      services: [
        { title: 'Headless CMS or Eshop' },
        { title: 'Frontend or Fullstack dev' },
        { title: 'Monitoring and optimization' },
        { title: 'Game dev' },
        { title: 'AI tools implementation' },
        { title: 'Custom App development' },
      ],
    },
    {
      blockType: 'homeSkills',
      heading: 'Skills',
      sections: [
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
    {
      blockType: 'homeContact',
      heading: 'Contact',
      email: 'peter.kopac3@gmail.com',
    },
  ],
}
