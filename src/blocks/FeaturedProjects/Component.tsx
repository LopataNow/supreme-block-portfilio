'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project } from '@/payload-types'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export interface FeaturedProjectsProps {
  badge?: string | null
  heading?: string | null
  subheading?: string | null
  projects?: Partial<Project>[] | null
}

const defaultProjects: Partial<Project>[] = [
  {
    title: 'Particle Canvas Engine',
    slug: 'particle-canvas-engine',
    period: '2024 - 2026',
    client: 'Personal Open Source',
    summary:
      'High-performance procedural particle generator utilizing HTML5 Canvas, Perlin Noise, and Quadtree spatial partitioning with dynamic theme color adaptation.',
    techStack: [
      { name: 'TypeScript' },
      { name: 'HTML5 Canvas' },
      { name: 'Quadtree' },
      { name: 'Perlin Noise' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/LopataNow', type: 'github' },
      { label: 'Live Demo', url: '/', type: 'live' },
    ],
  },
  {
    title: 'Headless CMS & E-commerce System',
    slug: 'headless-cms-ecommerce',
    period: '2023 - 2025',
    client: 'Enterprise Solutions',
    summary:
      'Scalable fullstack web architecture built on Next.js App Router and Payload CMS with bilingual localization and PostgreSQL database storage.',
    techStack: [
      { name: 'React 19' },
      { name: 'Next.js' },
      { name: 'Payload CMS' },
      { name: 'PostgreSQL' },
      { name: 'Tailwind' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/LopataNow', type: 'github' },
    ],
  },
  {
    title: 'Unity 3D Game & Shaders Experiment',
    slug: 'unity-3d-shaders-experiment',
    period: '2022 - 2024',
    client: 'Creative Interactive',
    summary:
      'Interactive 3D gameplay mechanics, custom HLSL shader effects, procedural mesh deformations, and AI enemy behavior trees in Unity 3D engine.',
    techStack: [
      { name: 'C#' },
      { name: 'Unity 3D' },
      { name: 'HLSL Shaders' },
      { name: 'Game AI' },
      { name: 'Blender' },
    ],
    links: [
      { label: 'Documentation', url: 'https://github.com/LopataNow', type: 'docs' },
    ],
  },
]

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  badge = 'Selected Work',
  heading = 'Featured Projects',
  subheading = 'A selection of software development, interactive graphics, and fullstack applications.',
  projects = defaultProjects,
}) => {
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale') || 'sk'
  const isSk = locale === 'sk'

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects

  return (
    <section id="projects" className="my-24">
      <div className="max-w-2xl mb-12">
        {badge && (
          <ScrollReveal direction="down" delay={0.1}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{isSk ? 'Vybrané projekty' : badge}</span>
            </span>
          </ScrollReveal>
        )}

        <ScrollReveal direction="up" delay={0.15}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            {isSk ? 'Projekty & Portfólio' : heading}
          </h2>
        </ScrollReveal>

        {subheading && (
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {isSk
                ? 'Ukážka softvérového vývoja, interaktívnej grafiky a moderných fullstack aplikácií.'
                : subheading}
            </p>
          </ScrollReveal>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project, idx) => (
          <ScrollReveal key={idx} direction="up" delay={0.1 * idx}>
            <ProjectCard project={project} locale={locale} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up" delay={0.3} className="mt-12 text-center">
        <Link
          href={`/projects${locale === 'en' ? '?locale=en' : ''}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/80 bg-card/60 hover:bg-muted text-foreground font-semibold text-sm transition-all shadow-xs hover:border-primary/50"
        >
          <span>{isSk ? 'Zobraziť všetky projekty' : 'View All Projects'}</span>
          <ArrowRight className="w-4 h-4 text-primary" />
        </Link>
      </ScrollReveal>
    </section>
  )
}

export default FeaturedProjects
