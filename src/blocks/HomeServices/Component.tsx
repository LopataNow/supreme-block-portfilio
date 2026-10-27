'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'

export interface HomeServicesProps {
  heading?: string | null
  services?: { title: string }[] | null
}

export const HomeServices: React.FC<HomeServicesProps> = ({
  heading = 'Services',
  services = [
    { title: 'Headless CMS or Eshop' },
    { title: 'Frontend or Fullstack dev' },
    { title: 'Monitoring and optimization' },
    { title: 'Game dev' },
    { title: 'AI tools implementation' },
    { title: 'Custom App development' },
  ],
}) => {
  return (
    <section id="services" className="my-20">
      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="text-3xl font-extrabold text-foreground mb-8 text-center sm:text-left">
          {heading}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service, index) => (
          <ScrollReveal
            key={index}
            direction="up"
            delay={0.08 * index}
            className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xs flex items-center justify-center text-center font-semibold text-lg text-card-foreground shadow-xs hover:border-primary/50 transition-colors"
          >
            {service.title}
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export default HomeServices
