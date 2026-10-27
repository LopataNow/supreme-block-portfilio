'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'

export interface HomeSkillsProps {
  heading?: string | null
  sections?: { title: string; items: string }[] | null
}

export const HomeSkills: React.FC<HomeSkillsProps> = ({
  heading = 'Skills',
  sections = [
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
}) => {
  return (
    <section id="skills" className="my-20">
      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center sm:text-left">
          {heading}
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-6">
        {sections?.map((section, index) => (
          <ScrollReveal
            key={index}
            direction="up"
            delay={0.1 * index}
            className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xs"
          >
            <h3 className="text-lg font-bold text-foreground mb-2">{section.title}</h3>
            <p className="text-muted-foreground font-medium text-base">{section.items}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export default HomeSkills
