'use client'

import React from 'react'
import { Particles } from '@/components/Graphics/Particles'
import { ScrollReveal } from '@/components/ScrollReveal'

export interface FixedHeroProps {
  name?: string | null
  title?: string | null
  subtitle?: string | null
}

export const FixedHero: React.FC<FixedHeroProps> = ({
  name = 'Peter Kopáč',
  title = "I'm a Software Developer",
  subtitle = 'Crafting high-performance web applications, interactive graphics, and fullstack architectures.',
}) => {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full flex items-center justify-center pointer-events-auto overflow-hidden bg-background">
      <Particles className="w-full h-full flex items-center justify-center">
        <div className="container relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <ScrollReveal direction="down" delay={0.1}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#003c8f] dark:text-[#589cff] mb-2 tracking-tight">
              {name}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#000b30] dark:text-foreground my-3 tracking-tight leading-none">
              {title}
            </h2>
          </ScrollReveal>

          {subtitle && (
            <ScrollReveal direction="up" delay={0.3}>
              <h3 className="text-base sm:text-lg md:text-xl font-normal text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {subtitle}
              </h3>
            </ScrollReveal>
          )}
        </div>
      </Particles>
    </div>
  )
}

export default FixedHero
