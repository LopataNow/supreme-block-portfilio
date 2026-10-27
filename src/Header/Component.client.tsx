'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { BrandLogo } from '@/components/Brand/BrandLogo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/40 transition-colors duration-200"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="focus:outline-none">
          <BrandLogo />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
