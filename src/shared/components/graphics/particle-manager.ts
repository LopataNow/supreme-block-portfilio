import PerlinNoise from "@/common/perlin-noise";
import Particle, { generateParticles } from "./particle";

export default class ParticleManager {
  worker = new Worker(new URL("./generate-chunk-particles-worker.ts", import.meta.url));
  particles: Particle[] = [];
  settings = {
    windowWidth: undefined,
    windowHeight: undefined,
    padding: 0,
    spaces: 6,
  };
  mousePosition = {
    x: -100,
    y: -111,
  };
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;

    this.worker.onmessage = (event) => {
        this.particles.push(...event.data.map(([x, y, noiseX, noiseY]: any[]) => new Particle(x, y, noiseX, noiseY)));  
    }

    this.init();
  }

  addParticle(x: number, y: number, noiseX: number, noiseY: number) {
    this.particles.push(new Particle(x, y, noiseX, noiseY));
  }

  removeParticle(particle: Particle) {
    const index = this.particles.indexOf(particle);
    if (index !== -1) {
      this.particles.splice(index, 1);
    }
  }

  init() {
    this.particles = [];

    this.worker.postMessage({
      width: this.canvas.width,
      height: this.canvas.height,
      padding: this.settings.padding,
      spaces: this.settings.spaces,
      randomX: Math.random(),
      randomY: Math.random(),
    });
  }

  update() {
    for (const particle of this.particles) {
      particle.update(this.mousePosition);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.update();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (const particle of this.particles) {
      particle.draw(this.context);
    }
  }

  disable() {
    this.worker.terminate();
  }
    

  setMousePosition(pos: { x: number; y: number }) {
    this.mousePosition = pos;
  }
}


