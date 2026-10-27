import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { ProjectCard } from '@/components/ProjectCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ArrowLeft, Sparkles, FolderGit2 } from 'lucide-react'
import type { SupportedLocale } from '@/endpoints/seed/home-static'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams?: Promise<{
    locale?: string
  }>
}

const fallbackProjectsList = [
  {
    id: 'p1',
    title: 'Particle Canvas Engine',
    slug: 'particle-canvas-engine',
    period: '2024 - 2026',
    client: 'Personal Open Source',
    collaborators: '',
    summary:
      'High-performance procedural particle generator utilizing HTML5 Canvas, Perlin Noise, and Quadtree spatial partitioning with dynamic theme color adaptation.',
    techStack: [
      { name: 'TypeScript' },
      { name: 'HTML5 Canvas' },
      { name: 'Quadtree' },
      { name: 'Perlin Noise' },
      { name: 'React 19' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/LopataNow', type: 'github' as const },
      { label: 'Live Demo', url: '/', type: 'live' as const },
    ],
  },
  {
    id: 'p2',
    title: 'Headless CMS & E-commerce System',
    slug: 'headless-cms-ecommerce',
    period: '2023 - 2025',
    client: 'Enterprise Solutions',
    collaborators: 'Frontend & Backend Team',
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
      { label: 'Live Demo', url: 'https://github.com/LopataNow', type: 'live' as const },
      { label: 'Source Code', url: 'https://github.com/LopataNow', type: 'github' as const },
    ],
  },
  {
    id: 'p3',
    title: 'Enterprise Cloud Dashboard & Analytics',
    slug: 'enterprise-cloud-dashboard',
    period: '2022 - 2024',
    client: 'FinTech Group',
    collaborators: 'Data & Security Team',
    summary:
      'Real-time metrics visualization platform handling multi-tenant data pipelines, WebSocket telemetry streams, and responsive executive reports.',
    techStack: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'WebSockets' },
      { name: 'Charts.js' },
    ],
    links: [
      { label: 'Case Study', url: 'https://github.com/LopataNow', type: 'other' as const },
    ],
  },
  {
    id: 'p4',
    title: 'Interactive 3D Configurator',
    slug: 'interactive-3d-configurator',
    period: '2023',
    client: 'Automotive & Design Studio',
    collaborators: '3D Artists & UX Designers',
    summary:
      'WebGL-based real-time materials and lighting configurator allowing interactive component swaps and export capabilities directly in modern browsers.',
    techStack: [
      { name: 'Three.js' },
      { name: 'WebGL' },
      { name: 'TypeScript' },
      { name: 'GLSL Shaders' },
    ],
    links: [
      { label: 'Demo Video', url: 'https://github.com/LopataNow', type: 'live' as const },
    ],
  },
]

export default async function ProjectsArchivePage({ searchParams: searchParamsPromise }: Args) {
  const searchParams = searchParamsPromise ? await searchParamsPromise : {}
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('payload_locale')?.value

  const activeLocale: SupportedLocale =
    searchParams?.locale === 'en' || (!searchParams?.locale && cookieLocale === 'en') ? 'en' : 'sk'

  const isSk = activeLocale === 'sk'

  let projectsDocs: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'projects',
      locale: activeLocale,
      limit: 50,
      overrideAccess: false,
    })
    projectsDocs = res.docs
  } catch (err) {
    console.error('Failed to query projects collection:', err)
  }

  const projectsToDisplay = projectsDocs.length > 0 ? projectsDocs : fallbackProjectsList

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20 selection:bg-primary/20">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        {/* Navigation Breadcrumb */}
        <ScrollReveal>
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{isSk ? 'Späť na úvod' : 'Back to Home'}</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Hero Header */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{isSk ? 'Kompletné portfólio' : 'Complete Portfolio'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              {isSk ? 'Projekty & Realizácie' : 'Projects & Work'}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isSk
                ? 'Prehľad webových aplikácií, frontendových architektúr a technických experimentov vyvinutých s dôrazom na čistý kód a používateľský zážitok.'
                : 'A curated overview of web applications, frontend architectures, and engineering experiments built with a focus on clean code and performance.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsToDisplay.map((project, idx) => (
            <ScrollReveal key={project.slug || project.id || idx} delay={0.1 + idx * 0.05}>
              <ProjectCard project={project} locale={activeLocale} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 p-8 md:p-12 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md text-center max-w-3xl mx-auto relative overflow-hidden">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              {isSk ? 'Máte zaujímavý projekt alebo nápad?' : 'Have an exciting project or idea?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm md:text-base">
              {isSk
                ? 'Rád pomôžem s návrhom technickej architektúry, vývojom webu alebo konzultáciou.'
                : 'I would be happy to discuss architectural design, web development, or technical consulting.'}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
            >
              {isSk ? 'Napíšte mi správu' : 'Get in Touch'}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Projekty & Portfólio | Peter Kopáč',
    description:
      'Výber projektov, systémových architektúr a open-source knižníc vyvinutých Petrom Kopáčom.',
  }
}
