import PerlinNoise from "@/common/perlin-noise";
import { IPoint, IVector } from "./point";

export interface IParticleSettings {
	radius: number;
	moveRadius: number;
	moveSpeed: number;
}

export interface IParticle{
	colorString: string;
	offset: IVector;
	move: IVector;
	position: IPoint;
	isInMOuseRange?: boolean;
}

export function createDefaultParticleSettings(settrings?: Partial<IParticleSettings>): IParticleSettings {
	return {
		radius: 2,
		moveRadius: 6,
		moveSpeed: 3,
		...settrings,
	};
}

export function drawParticle(context: CanvasRenderingContext2D, particle: IParticle, settings: IParticleSettings) {
	context.fillStyle = particle.colorString;
	context.fillRect(
		particle.position.x + particle.offset.x + Math.sin(particle.move.x) * settings.moveRadius,
		particle.position.y + particle.offset.y + Math.sin(particle.move.y) * settings.moveRadius,
		settings.radius,
		settings.radius
	);
}

export function moveParticleAwayFromPoint(
	particle: IParticle,
	dx: number, dy: number,
	distance: number,
	deltaTime: number
) {
	particle.offset.x -= (dx * 130 * 25 * deltaTime) / (distance ** 2);
	particle.offset.y -= (dy * 130 * 25 * deltaTime) / (distance ** 2);
}

export function moveParticleToPoint(particle: IParticle, moveSpeed: number, deltaTime: number) {
	particle.offset.x -= particle.offset.x * 10 * deltaTime;
	particle.offset.y -= particle.offset.y * 10 * deltaTime;

	particle.move.x += moveSpeed * deltaTime; 
	particle.move.y += moveSpeed * deltaTime;
}

export function createParticle(positionX: number, positionY: number, lightness: number): IParticle {
	const colorString = `hsl( 230, 80%,${lightness}%)`;

	return {
		colorString,
		offset: { x: 0, y: 0 },
		move: { x: Math.random() * 6, y: Math.random() * 6 },
		position: { x: positionX, y: positionY },
	};
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
				// eslint-disable-next-line max-len
				const lightness = 22 + PerlinNoise.noise((randomX + x / width) * 5, (randomY + y / height) * 5, 0.8) * 75;
				particles.push([x, y, lightness]);
			}
		}
	}

	return particles;
}