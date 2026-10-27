'use client'

import React from 'react'
import Link from 'next/link'
import { Particles } from '@/components/Graphics/Particles'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useSearchParams } from 'next/navigation'
import { FolderGit2, Mail, User, Github, Linkedin, ArrowDown, Sparkles } from 'lucide-react'

export interface FixedHeroProps {
  name?: string | null
  title?: string | null
  subtitle?: string | null
}

export const FixedHero: React.FC<FixedHeroProps> = ({
  name = 'Peter Kopáč',
  title = 'Software Engineer & Fullstack Developer',
  subtitle,
}) => {
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale') || 'sk'
  const isSk = locale === 'sk'

  const defaultSubtitle = isSk
    ? 'Tvorba moderných webových aplikácií, interaktívnych grafických riešení a škálovateľných fullstack systémov.'
    : 'Crafting high-performance web applications, interactive graphics, and scalable fullstack architectures.'

  const displaySubtitle = subtitle || defaultSubtitle

  return (
    <div className="fixed inset-0 z-0 h-screen w-full flex items-center justify-center pointer-events-auto overflow-hidden bg-background">
      <Particles className="w-full h-full flex items-center justify-center">
        {/* Main Glassmorphism Card */}
        <div className="container relative z-10 px-4 sm:px-6 max-w-3xl mx-auto flex flex-col items-center justify-center">
          <ScrollReveal direction="down" delay={0.1}>
            <div className="relative rounded-3xl border border-border/80 dark:border-white/10 bg-card/75 dark:bg-card/45 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.8)] text-center overflow-hidden">
              {/* Subtle top ambient glow inside the card */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>
                  {isSk
                    ? 'Otvorený novým projektom & spolupráci'
                    : 'Open to projects & opportunities'}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/80 mb-2 font-mono">
                {name}
              </h1>

              {/* Big Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4">
                <span className="bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                {displaySubtitle}
              </p>

              {/* Hero Action Navigation Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow transition-all"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>{isSk ? 'Pozrieť projekty' : 'View Projects'}</span>
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-border/80 bg-background/80 hover:bg-muted text-foreground transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isSk ? 'Napíšte mi' : 'Get in touch'}</span>
                </Link>

                <Link
                  href="/#about"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>{isSk ? 'O mne' : 'About'}</span>
                </Link>
              </div>

              {/* Social Quick Links in card */}
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-border/60">
                <a
                  href="https://github.com/LopataNow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <span className="text-border">•</span>
                <a
                  href="https://www.linkedin.com/in/peterkopac/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Animated Scroll Down Indicator */}
          <ScrollReveal direction="up" delay={0.3} className="mt-8 sm:mt-10">
            <Link
              href="/#about"
              className="inline-flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="text-[11px] uppercase tracking-widest font-mono text-muted-foreground/80">
                {isSk ? 'Potiahnuť nadol' : 'Scroll down'}
              </span>
              <div className="p-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm group-hover:border-primary/50 transition-all">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-primary" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </Particles>
    </div>
  )
}

export default FixedHero
