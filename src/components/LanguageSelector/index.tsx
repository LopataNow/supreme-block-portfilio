'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Globe } from 'lucide-react'

export type LocaleCode = 'sk' | 'en'

export const supportedLocales: { code: LocaleCode; label: string }[] = [
  { code: 'sk', label: 'SK' },
  { code: 'en', label: 'EN' },
]

export const LanguageSelector: React.FC<{
  className?: string
}> = ({ className = '' }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentLocale = (searchParams.get('locale') as LocaleCode) || 'sk'

  const switchLocale = (newLocale: LocaleCode) => {
    if (newLocale === currentLocale) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('locale', newLocale)

    document.cookie = `payload_locale=${newLocale}; path=/; max-age=31536000`

    router.push(`${pathname}?${params.toString()}`)
    router.refresh()
  }

  return (
    <div className={`flex items-center gap-1 border border-border/60 rounded-full px-2 py-1 text-xs font-medium text-foreground bg-background/50 ${className}`}>
      <Globe className="w-3.5 h-3.5 text-muted-foreground mr-0.5" />
      {supportedLocales.map((loc) => {
        const isActive = loc.code === currentLocale
        return (
          <button
            key={loc.code}
            type="button"
            onClick={() => switchLocale(loc.code)}
            aria-label={`Switch language to ${loc.label}`}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {loc.label}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSelector
