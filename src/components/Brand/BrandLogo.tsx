import React from 'react'
import clsx from 'clsx'

interface BrandLogoProps {
  className?: string
  collapsed?: boolean
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className, collapsed = false }) => {
  return (
    <div className={clsx('flex items-center gap-2.5 select-none group', className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-sm tracking-tight shadow-xs group-hover:scale-105 transition-transform duration-200">
        PK
      </div>
      {!collapsed && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-foreground text-sm tracking-tight leading-tight group-hover:text-primary transition-colors">
            Peter Kopáč
          </span>
          <span className="text-[11px] font-mono text-muted-foreground leading-none mt-0.5">
            Software Engineer
          </span>
        </div>
      )}
    </div>
  )
}

export default BrandLogo
