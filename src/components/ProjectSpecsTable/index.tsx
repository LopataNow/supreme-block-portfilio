import React from 'react'
import type { Project } from '@/payload-types'
import { ExternalLink, Calendar, Users, Building2, Download, ArrowUpRight } from 'lucide-react'

interface ProjectSpecsTableProps {
  project: Partial<Project>
  locale?: string
  className?: string
}

export const ProjectSpecsTable: React.FC<ProjectSpecsTableProps> = ({
  project,
  locale = 'sk',
  className = '',
}) => {
  const isSk = locale === 'sk'

  const hasPeriod = Boolean(project.period)
  const hasTags = Boolean(project.techStack && project.techStack.length > 0)
  const hasLinks = Boolean(project.links && project.links.length > 0)
  const hasClient = Boolean(project.client)
  const hasCollaborators = Boolean(project.collaborators)
  const hasDownload = Boolean(project.downloadFile)

  // If none of the spec fields are filled, hide the table cleanly
  if (!hasPeriod && !hasTags && !hasLinks && !hasClient && !hasCollaborators && !hasDownload) {
    return null
  }

  return (
    <div
      className={`rounded-2xl border border-border/70 bg-card/70 backdrop-blur-md p-6 shadow-sm text-sm ${className}`}
    >
      <div className="space-y-4">
        {/* Date / Period */}
        {hasPeriod && (
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] items-start gap-3">
            <span className="font-semibold text-primary flex items-center gap-1.5">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{isSk ? 'Dátum' : 'Date'}</span>
            </span>
            <span className="text-foreground font-mono">{project.period}</span>
          </div>
        )}

        {/* Tech Stack / Tags */}
        {hasTags && (
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] items-start gap-3">
            <span className="font-semibold text-primary">
              <span>{isSk ? 'Technológie' : 'Tags'}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted/80 text-foreground border border-border/60"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Client / For */}
        {hasClient && (
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] items-start gap-3">
            <span className="font-semibold text-emerald-500 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 shrink-0" />
              <span>{isSk ? 'Pre' : 'For'}</span>
            </span>
            <span className="text-foreground font-medium">{project.client}</span>
          </div>
        )}

        {/* Collaborators / With */}
        {hasCollaborators && (
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] items-start gap-3">
            <span className="font-semibold text-sky-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 shrink-0" />
              <span>{isSk ? 'S kým' : 'With'}</span>
            </span>
            <span className="text-muted-foreground">{project.collaborators}</span>
          </div>
        )}

        {/* Links / URLs */}
        {hasLinks && (
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] items-start gap-3">
            <span className="font-semibold text-primary">
              <span>URL</span>
            </span>
            <div className="flex flex-col gap-1.5">
              {project.links?.map((linkItem, idx) => (
                <a
                  key={idx}
                  href={linkItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium break-all"
                >
                  <span>{linkItem.label || linkItem.url}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Downloadable asset */}
        {hasDownload && (
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] items-start gap-3">
            <span className="font-semibold text-amber-500 flex items-center gap-1.5">
              <Download className="w-4 h-4 shrink-0" />
              <span>{isSk ? 'Súbor' : 'Download'}</span>
            </span>
            <div>
              {typeof project.downloadFile === 'object' && project.downloadFile?.url ? (
                <a
                  href={project.downloadFile.url}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>{isSk ? 'Stiahnuť projekt' : 'Download File'}</span>
                </a>
              ) : (
                <span className="text-muted-foreground text-xs">{isSk ? 'Dostupný' : 'Available'}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectSpecsTable
