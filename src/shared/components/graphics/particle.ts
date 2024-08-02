import PerlinNoise from "@/common/perlin-noise";

export default class Particle {
  settings = {
    radius: 2,
    moveRadius: 6,
    moveSpeed: 0.05,
    color: '',
  };
  offset = { x: 0, y: 0 };
  move = { x: 0, y: 0 };
  position = { x: 0, y: 0 };

  constructor(positionX: number, positionY: number, noiseX: number, noiseY: number) {
    this.position.x = positionX;
    this.position.y = positionY;

    this.move.x = Math.random() * this.settings.moveRadius;
    this.move.y = Math.random() * this.settings.moveRadius;

    const lightness = 22 + PerlinNoise.noise(noiseX * 5, noiseY * 5, 0.8) * 75;
    this.settings.color = `hsl( 230, 80%,${lightness}%)`;
  }

  update(mousePosition: { x: number; y: number }) {
    const dx = mousePosition.x - this.position.x - this.offset.x;
    const dy = mousePosition.y - this.position.y - this.offset.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      this.offset.x -= (dx * 130) / (dist * dist);
      this.offset.y -= (dy * 130) / (dist * dist);
    } else if (dist > 103) {
      this.offset.x -= this.offset.x * 0.2;
      this.offset.y -= this.offset.y * 0.2;

      this.move.x += this.settings.moveSpeed;
      this.move.y += this.settings.moveSpeed;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.settings.color;
    context.fillRect(
      this.position.x + this.offset.x + Math.sin(this.move.x) * this.settings.moveRadius,
      this.position.y + this.offset.y + Math.sin(this.move.y) * this.settings.moveRadius,
      this.settings.radius,
      this.settings.radius
    );
  }
}

export function generateParticles({
    startX = 0,
    startY = 0,
    width,
    height,
    padding,
    spaces,
    randomX,
    randomY,
}: {
    width: number;
    height: number;
    startX?: number;
    startY?: number;
    padding: number;
    spaces: number;
    randomX: number;
    randomY: number;
}) {
    const particles = [];

    for (let x = startX-4; x < width - padding; x +=spaces) {
        for (let y = startY-4; y < height - padding; y += spaces) {
            const noise = PerlinNoise.noise((randomX + x / width) * 20, (randomY + y / height) * 20, 0.8);
            if (noise < 0.36) {
                particles.push([x, y, randomX + x / width, randomY + y / height]);
            }
        }
    }

    return particles;
}