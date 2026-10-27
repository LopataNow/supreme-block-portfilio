'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'

export interface HomeDescriptionProps {
  text?: string | null
}

export const HomeDescription: React.FC<HomeDescriptionProps> = ({
  text = "I'm a Front-End Developer specializing in React, with experience in Angular, .NET, Node.js, and Unity 3D. I excel in analytical and creative thinking, algorithms, data structures, and design patterns. I ensure quick adaptation to new technologies and a focus on clean, optimized code.",
}) => {
  return (
    <section id="about" className="my-16 max-w-4xl mx-auto px-4 text-center">
      <ScrollReveal direction="up" delay={0.1}>
        <p className="text-lg md:text-xl font-normal text-muted-foreground leading-relaxed">
          {text}
        </p>
      </ScrollReveal>
    </section>
  )
}

export default HomeDescription
