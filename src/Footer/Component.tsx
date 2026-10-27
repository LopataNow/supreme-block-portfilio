import Link from 'next/link'
import React from 'react'
import { BrandLogo } from '@/components/Brand/BrandLogo'
import { Github, Linkedin, GraduationCap, ArrowUp } from 'lucide-react'

export async function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-border/70 bg-card/70 dark:bg-card/90 backdrop-blur-md text-foreground transition-colors">
      <div className="container max-w-6xl mx-auto py-10 px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Brand Identity */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="focus:outline-none">
              <BrandLogo />
            </Link>
            <p className="text-xs text-muted-foreground mt-1 text-center md:text-left max-w-xs">
              Crafting modern web applications, interactive graphics, and scalable architectures.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/#about" className="hover:text-foreground transition-colors">
              O mne
            </Link>
            <Link href="/#services" className="hover:text-foreground transition-colors">
              Služby
            </Link>
            <Link href="/#skills" className="hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projekty
            </Link>
            <Link href="/#contact" className="hover:text-foreground transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Right: Socials & Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/LopataNow"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/peterkopac/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://app.pluralsight.com/profile/peter-kopac"
                target="_blank"
                rel="noopener noreferrer"
                title="Pluralsight Profile"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span className="sr-only">Pluralsight</span>
              </a>
              <a
                href="#"
                title="Hore"
                className="inline-flex items-center gap-1 ml-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Hore</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Peter Kopáč. All rights reserved.</p>
          <p className="font-mono text-[11px] text-muted-foreground/80">
            Built with Next.js 15 & Payload CMS 3.x
          </p>
        </div>
      </div>
    </footer>
  )
}
