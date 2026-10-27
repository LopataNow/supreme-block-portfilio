'use client'

import React from 'react'
import Link from 'next/link'
import type { Project } from '@/payload-types'
import { Calendar, ArrowRight, Code2, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Partial<Project>
  locale?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, locale = 'sk' }) => {
  const isSk = locale === 'sk'
  const detailUrl = `/projects/${project.slug}${locale === 'en' ? '?locale=en' : ''}`

  return (
    <div className="group relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-200">
      <div>
        {/* Header row: Period badge & main client/tag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {project.period ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-muted text-muted-foreground border border-border/60">
              <Calendar className="w-3 h-3 text-primary" />
              <span>{project.period}</span>
            </span>
          ) : (
            <span />
          )}

          {project.client && (
            <span className="text-xs font-semibold text-emerald-500/90 truncate max-w-[150px]">
              {project.client}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-3">
          <Link href={detailUrl} className="focus:outline-none">
            {project.title}
          </Link>
        </h3>

        {/* Short Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
          {project.summary}
        </p>
      </div>

      <div>
        {/* Tech tags preview */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted/70 text-foreground/80 border border-border/50"
              >
                {tag.name}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Card Footer: Detail Link & Quick Links */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all"
          >
            <span>{isSk ? 'Zobraziť detail' : 'View Project'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {project.links && project.links.length > 0 && (
            <div className="flex items-center gap-2">
              {project.links.slice(0, 2).map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={l.label}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
