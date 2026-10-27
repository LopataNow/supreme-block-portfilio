'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'

export interface HomeContactProps {
  heading?: string | null
  email?: string | null
}

export const HomeContact: React.FC<HomeContactProps> = ({
  heading = 'Contact',
  email = 'peter.kopac3@gmail.com',
}) => {
  return (
    <section className="my-24 text-center">
      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="text-3xl font-extrabold text-foreground mb-4">{heading}</h2>
      </ScrollReveal>

      {email && (
        <ScrollReveal direction="up" delay={0.2}>
          <a
            href={`mailto:${email}`}
            className="inline-block text-xl sm:text-2xl font-medium text-primary hover:underline transition-all"
          >
            {email}
          </a>
        </ScrollReveal>
      )}
    </section>
  )
}

export default HomeContact
