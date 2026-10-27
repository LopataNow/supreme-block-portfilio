import {
  createDefaultParticleSettings,
  createParticle,
  drawParticle,
  generateParticles,
  type IParticle,
  type IParticleSettings,
  moveParticleAwayFromPoint,
  moveParticleToPoint,
} from './particle'
import { Quadtree } from './quadtree'

export class ParticleManager {
  particleSettings: IParticleSettings = createDefaultParticleSettings()
  particledTree: Quadtree
  particles: IParticle[] = []
  settings = {
    padding: 0,
    spaces: 6,
  }
  mousePosition = {
    x: -100,
    y: -111,
  }
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  isDark: boolean = true

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    isDark: boolean = true,
    initCallback?: () => void,
  ) {
    this.canvas = canvas
    this.context = context
    this.isDark = isDark
    this.particledTree = new Quadtree(
      { x: 0, y: 0, width: canvas.width, height: canvas.height },
      16,
    )

    this.init()
    if (initCallback) {
      initCallback()
    }
  }

  setTheme(isDark: boolean) {
    this.isDark = isDark
  }

  init() {
    this.particles = []
    this.particledTree = new Quadtree(
      { x: 0, y: 0, width: this.canvas.width, height: this.canvas.height },
      16,
    )

    const rawParticles = generateParticles({
      width: this.canvas.width,
      height: this.canvas.height,
      padding: this.settings.padding,
      spaces: this.settings.spaces,
      randomX: Math.random(),
      randomY: Math.random(),
    })

    this.particles = rawParticles.map(([x, y, lightness]) => createParticle(x, y, lightness))
    this.particles.forEach((p) => this.particledTree.insert(p))
  }

  update(deltaTime: number) {
    const mouseRange = 104
    const particleInMouseRectangle = this.particledTree.query({
      x: this.mousePosition.x - mouseRange,
      y: this.mousePosition.y - mouseRange,
      width: mouseRange * 2,
      height: mouseRange * 2,
    })

    for (const particleInMouse of particleInMouseRectangle) {
      const particlePosX = particleInMouse.position.x + particleInMouse.offset.x
      const particlePosY = particleInMouse.position.y + particleInMouse.offset.y
      const dx = this.mousePosition.x - particlePosX
      const dy = this.mousePosition.y - particlePosY
      const distSq = dx ** 2 + dy ** 2

      if (distSq < mouseRange ** 2) {
        particleInMouse.isInMouseRange = true
        if (distSq < 100 ** 2) {
          const dist = Math.sqrt(distSq)
          moveParticleAwayFromPoint(particleInMouse, dx, dy, dist, deltaTime)
        }
      }
    }

    for (const particle of this.particles) {
      if (!particle.isInMouseRange) {
        moveParticleToPoint(particle, this.particleSettings.moveSpeed, deltaTime)
      }
      particle.isInMouseRange = false
    }
  }

  draw(context: CanvasRenderingContext2D, deltaTime: number) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    for (const particle of this.particles) {
      drawParticle(context, particle, this.particleSettings, this.isDark)
    }

    this.update(deltaTime)
  }

  setMousePosition(pos: { x: number; y: number }) {
    this.mousePosition = pos
  }

  disable() {
    this.particles = []
  }
}

export default ParticleManager
