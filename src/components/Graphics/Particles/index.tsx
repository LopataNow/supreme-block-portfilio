'use client'

import React, { useRef, useEffect, useState } from 'react'
import { ParticleManager } from './particle-manager'
import { useTheme } from '@/providers/Theme'

function getMousePos(canvas: HTMLCanvasElement, evt: React.MouseEvent<HTMLDivElement>) {
  if (!canvas) return { x: evt.clientX, y: evt.clientY }
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY,
  }
}

interface ParticlesProps {
  children?: React.ReactNode
  className?: string
}

export const Particles: React.FC<ParticlesProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const managerRef = useRef<ParticleManager | null>(null)
  const [isReady, setIsReady] = useState(false)
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const updateThemeState = () => {
      const docTheme = document.documentElement.getAttribute('data-theme')
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const activeIsDark = theme === 'dark' || (!theme && docTheme === 'dark') || (!theme && !docTheme && systemDark)
      setIsDark(activeIsDark)
      if (managerRef.current) {
        managerRef.current.setTheme(activeIsDark)
      }
    }

    updateThemeState()

    const observer = new MutationObserver(() => updateThemeState())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId: number
    let lastTime = performance.now()

    const manager = new ParticleManager(canvas, context, isDark, () => {
      setIsReady(true)
    })
    managerRef.current = manager

    const render = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time
      manager.draw(context, deltaTime)
      animationFrameId = window.requestAnimationFrame(render)
    }

    animationFrameId = window.requestAnimationFrame(render)

    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        manager.init()
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      manager.disable()
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (managerRef.current && canvasRef.current) {
      const pos = getMousePos(canvasRef.current, e)
      managerRef.current.setMousePosition(pos)
    }
  }

  return (
    <div onMouseMove={handleMouseMove} className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default Particles
