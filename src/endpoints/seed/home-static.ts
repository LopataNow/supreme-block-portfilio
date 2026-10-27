import type { RequiredDataFromCollectionSlug } from 'payload'

export type SupportedLocale = 'sk' | 'en'

const staticDataByLocale: Record<SupportedLocale, RequiredDataFromCollectionSlug<'pages'>> = {
  sk: {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'none',
    },
    meta: {
      description: 'Peter Kopáč - Portfólio softvérového vývojára',
      title: 'Peter Kopáč',
    },
    title: 'Domov',
    layout: [
      {
        blockType: 'fixedHero',
        name: 'Peter Kopáč',
        title: 'Som Softvérový Vývojár',
        subtitle:
          'Vývoj vysoko optimalizovaných webových aplikácií, interaktívnej grafiky a moderných fullstack architektúr.',
      },
      {
        blockType: 'homeDescription',
        text: 'Som Front-End vývojár so špecializáciou na React a skúsenosťami s Angularom, .NET, Node.js a Unity 3D. Vynikám v analytickom a kreatívnom myslení, algoritmoch, dátových štruktúrach a návrhových vzoroch. Rýchlo sa prispôsobujem novým technológiám s dôrazom na čistý a optimalizovaný kód.',
      },
      {
        blockType: 'homeServices',
        heading: 'Služby',
        services: [
          { title: 'Headless CMS alebo Eshop' },
          { title: 'Frontend alebo Fullstack vývoj' },
          { title: 'Monitoring a optimalizácia' },
          { title: 'Vývoj hier (Game dev)' },
          { title: 'Implementácia AI nástrojov' },
          { title: 'Vývoj aplikácií na mieru' },
        ],
      },
      {
        blockType: 'homeSkills',
        heading: 'Zručnosti',
        sections: [
          {
            title: 'Programovacie jazyky:',
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
            title: 'Vývoj hier & 3D:',
            items: 'Unity 3D, Blender, Shaders, Game Design, Game AI',
          },
        ],
      },
      {
        blockType: 'homeContact',
        heading: 'Kontakt',
        email: 'peter.kopac3@gmail.com',
      },
    ],
  },
  en: {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'none',
    },
    meta: {
      description: 'Peter Kopáč - Software Developer Portfolio',
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
  },
}

export const getHomeStatic = (locale: SupportedLocale = 'sk'): RequiredDataFromCollectionSlug<'pages'> => {
  return staticDataByLocale[locale] || staticDataByLocale.sk
}

export const homeStatic = staticDataByLocale.sk
