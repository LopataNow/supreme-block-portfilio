import { createDefaultParticleSettings, createParticle, drawParticle, IParticle, moveParticleAwayFromPoint, moveParticleToPoint } from "./particle";
import Quadtree from "./quadtree";

export default class ParticleManager {
  worker = new Worker(new URL("./generate-chunk-particles-worker.ts", import.meta.url));
  particleSettings = createDefaultParticleSettings();
  particledTree: Quadtree;
  particles: IParticle[] = [];
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

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, initCallback?: () => void) {
    this.canvas = canvas;
    this.context = context;
    this.particledTree = new Quadtree({x: 0, y: 0,width: canvas.width,height : canvas.height}, 16);

    this.worker.onmessage = (event) => {
        this.particles.push(...event.data.map(([x, y, lightness]: any[]) => createParticle(x, y, lightness)));

        this.particles.forEach((particle) => {
            this.particledTree.insert(particle);
        });

        if(initCallback){
            initCallback();
        } 
    }

    this.init();
  }

  addParticle(x: number, y: number, lightness: number) {
    this.particles.push(createParticle(x, y, lightness));
  }

  removeParticle(particle: IParticle) {
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
    const particleInMouseRectangle = this.particledTree.query({
      x: this.mousePosition.x - 104,
      y: this.mousePosition.y - 104,
      width: 208,
      height: 208,
    });

    for (const particleInMouse of particleInMouseRectangle) {
      const particlePosX = particleInMouse.position.x + particleInMouse.offset.x;
      const particlePosY = particleInMouse.position.y + particleInMouse.offset.y;
      const dx = this.mousePosition.x - particlePosX;
      const dy = this.mousePosition.y - particlePosY;
      const distSq = dx ** 2 + dy ** 2;

      if (distSq < 104 ** 2) {
        particleInMouse.isInMOuseRange = true;
        if(distSq < 100 ** 2){
          const dist = Math.sqrt(distSq);
          moveParticleAwayFromPoint(particleInMouse, dx, dy, dist);
        }
      }
    }

    for (const particle of this.particles) {
      if (!particle.isInMOuseRange) {
        moveParticleToPoint(particle, this.particleSettings.moveSpeed);
      }
      particle.isInMOuseRange = false;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.update();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (const particle of this.particles) {
      drawParticle(context, particle, this.particleSettings);
    }

    //this.drawTree(context);
  }

  drawTree(context: CanvasRenderingContext2D){
    this.particledTree.drawBounds(context);
  }

  disable() {
    this.worker.terminate();
  }

  setMousePosition(pos: { x: number; y: number }) {
    this.mousePosition = pos;
  }
}


