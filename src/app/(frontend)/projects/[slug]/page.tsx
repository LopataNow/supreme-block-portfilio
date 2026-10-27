import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectSpecsTable } from '@/components/ProjectSpecsTable'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import RichText from '@/components/RichText'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    locale?: string
  }>
}

// Fallback demo data if DB query returns null
const fallbackProjectData: Record<string, any> = {
  'particle-canvas-engine': {
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
      { label: 'GitHub Repository', url: 'https://github.com/LopataNow', type: 'github' },
      { label: 'Live Demo', url: '/', type: 'live' },
    ],
    descriptionText:
      'A custom-built interactive graphics engine designed for lightweight web integration. The core system avoids third-party canvas wrappers in favor of raw 2D context manipulation, utilizing Quadtree spatial subdivision for sub-millisecond mouse collision lookups and Perlin Noise algorithms for procedural density distribution.',
  },
  'headless-cms-ecommerce': {
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
      { label: 'GitHub Repository', url: 'https://github.com/LopataNow', type: 'github' },
    ],
    descriptionText:
      'Engineered an enterprise-grade headless architecture focusing on type-safety, rapid content authoring, and internationalization. The system integrates Next.js Server Components with Payload Local API, delivering high-speed caching and dynamic server revalidation.',
  },
  'unity-3d-shaders-experiment': {
    title: 'Unity 3D Game & Shaders Experiment',
    slug: 'unity-3d-shaders-experiment',
    period: '2022 - 2024',
    client: 'Creative Interactive',
    collaborators: '3D Artists & Sound Designers',
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
    descriptionText:
      'Exploration of modern realtime graphics techniques and shader development in Unity. Features custom vertex displacement shaders, post-processing screen effects, procedural terrain generation, and behavior tree-based artificial intelligence for interactive agents.',
  },
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  return {
    title: `${slug} | Peter Kopáč Portfolio`,
  }
}

export default async function ProjectDetailPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug } = await paramsPromise
  const searchParams = searchParamsPromise ? await searchParamsPromise : {}
  const locale = searchParams?.locale === 'en' ? 'en' : 'sk'
  const isSk = locale === 'sk'

  const payload = await getPayload({ config: configPromise })

  let project: any = null

  try {
    const result = await payload.find({
      collection: 'projects',
      limit: 1,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    project = result.docs?.[0]
  } catch (e) {
    // DB not seeded yet, fallback will be used
  }

  if (!project && fallbackProjectData[slug]) {
    project = fallbackProjectData[slug]
  }

  if (!project) {
    // Generate an automatic placeholder project matching the requested slug
    project = {
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      slug,
      period: '2024',
      summary: isSk ? 'Detail projektu a technická špecifikácia.' : 'Project detail and technical specification.',
      descriptionText: isSk
        ? 'Tento projekt demonštruje moderné postupy softvérového inžinierstva, optimalizáciu a čistú kódovú základňu.'
        : 'This project showcases modern software engineering practices, optimization, and clean architectural design.',
      techStack: [{ name: 'TypeScript' }, { name: 'React' }, { name: 'Architecture' }],
      links: [{ label: 'GitHub', url: 'https://github.com/LopataNow', type: 'github' }],
    }
  }

  return (
    <article className="pt-24 pb-32">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Back navigation button */}
        <ScrollReveal direction="down" delay={0.05} className="mb-8">
          <Link
            href={`/projects${locale === 'en' ? '?locale=en' : ''}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-border/80 bg-card/60 hover:bg-muted text-foreground transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isSk ? 'Späť na projekty' : 'Back to projects'}</span>
          </Link>
        </ScrollReveal>

        {/* Top 2-Column Section: Left Story/Text + Right Technical Specs Table */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start mb-16">
          {/* Left Column: Title and Narrative */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Summary */}
            {project.summary && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-medium">
                {project.summary}
              </p>
            )}

            {/* Detailed narrative (Lexical or text fallback) */}
            {project.description ? (
              <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <RichText data={project.description} />
              </div>
            ) : project.descriptionText ? (
              <p className="text-base text-muted-foreground/90 leading-relaxed whitespace-pre-line">
                {project.descriptionText}
              </p>
            ) : null}
          </ScrollReveal>

          {/* Right Column: Technical Specification Table (Date, Tags, URL, For, With, Download) */}
          <ScrollReveal direction="left" delay={0.2} className="w-full">
            <ProjectSpecsTable project={project} locale={locale} />
          </ScrollReveal>
        </div>

        {/* Bottom Full-Width Gallery (Images appear cleanly only when uploaded) */}
        {project.images && project.images.length > 0 && (
          <ScrollReveal direction="up" delay={0.25} className="space-y-10 pt-10 border-t border-border/50">
            {project.images.map((imgItem: any, idx: number) => {
              const imgUrl = typeof imgItem.image === 'object' ? imgItem.image?.url : null
              if (!imgUrl) return null
              return (
                <div key={idx} className="rounded-3xl overflow-hidden border border-border/80 bg-card shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={imgItem.caption || project.title}
                    className="w-full h-auto object-cover"
                  />
                  {imgItem.caption && (
                    <p className="py-3 px-6 text-xs text-center text-muted-foreground border-t border-border/50 bg-muted/30">
                      {imgItem.caption}
                    </p>
                  )}
                </div>
              )
            })}
          </ScrollReveal>
        )}
      </div>
    </article>
  )
}
