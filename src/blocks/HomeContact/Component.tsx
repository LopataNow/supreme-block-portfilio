'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ContactForm } from '@/components/ContactForm'
import { Github, Linkedin, GraduationCap, Mail } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export interface HomeContactProps {
  heading?: string | null
  email?: string | null
}

const socialProfiles = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/peterkopac/',
    icon: Linkedin,
    label: 'linkedin.com/in/peterkopac',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/LopataNow',
    icon: Github,
    label: 'github.com/LopataNow',
  },
  {
    name: 'Pluralsight',
    url: 'https://app.pluralsight.com/profile/peter-kopac',
    icon: GraduationCap,
    label: 'pluralsight.com/peter-kopac',
  },
]

export const HomeContact: React.FC<HomeContactProps> = ({
  heading = 'Contact',
  email = 'peter.kopac3@gmail.com',
}) => {
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale') || 'sk'

  return (
    <section id="contact" className="my-24 text-center">
      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          {heading}
        </h2>
      </ScrollReveal>

      {/* Direct email link */}
      {email && (
        <ScrollReveal direction="up" delay={0.15}>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-xl sm:text-2xl font-medium text-primary hover:underline transition-all"
          >
            <Mail className="w-5 h-5" />
            <span>{email}</span>
          </a>
        </ScrollReveal>
      )}

      {/* Social and Professional links */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          {socialProfiles.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-border/80 bg-card/60 hover:bg-muted/80 text-foreground transition-all duration-200 hover:border-primary/50 shadow-xs"
              >
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span>{social.name}</span>
              </a>
            )
          })}
        </div>
      </ScrollReveal>

      {/* Modern interactive contact form with honeypot */}
      <ScrollReveal direction="up" delay={0.25}>
        <ContactForm locale={locale} />
      </ScrollReveal>
    </section>
  )
}

export default HomeContact
