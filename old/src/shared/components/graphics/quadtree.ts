import { IParticle } from "./particle";
import { contains, intersects, IRectangle } from "./rectangle";

export default class Quadtree {
	private capacity: number;
	private particles: IParticle[] = [];
	private bounds: IRectangle;
	private divided: boolean = false;

	private topLeft: Quadtree | undefined = undefined;
	private topRight: Quadtree | undefined = undefined;
	private bottomLeft: Quadtree | undefined = undefined;
	private bottomRight: Quadtree | undefined = undefined;

	constructor(bounds: IRectangle, capacity: number) {
		this.capacity = capacity;
		this.bounds = bounds;
	}

	insert(particle: IParticle): boolean {
		if (!contains(this.bounds, particle.position)) {
			return false;
		}

		if (this.particles.length < this.capacity) {
			this.particles.push(particle);
			return true;
		}

		if (!this.divided) {
			this.subdivide();
		}

		if (this.topLeft?.insert(particle)) {
			return true;
		}
		if (this.topRight?.insert(particle)) {
			return true;
		}
		if (this.bottomLeft?.insert(particle)) {
			return true;
		}
		if (this.bottomRight?.insert(particle)) {
			return true;
		}

		return false;
	}

	drawBounds(context: CanvasRenderingContext2D): void {
		context.strokeStyle = "black";
		context.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);

		if (this.divided) {
			this.topLeft?.drawBounds(context);
			this.topRight?.drawBounds(context);
			this.bottomLeft?.drawBounds(context);
			this.bottomRight?.drawBounds(context);
		}
	}

	subdivide(): void {
		const x = this.bounds.x;
		const y = this.bounds.y;
		const width = this.bounds.width / 2;
		const height = this.bounds.height / 2;

		const topLeftBounds: IRectangle = { x, y, width, height };
		this.topLeft = new Quadtree(topLeftBounds, this.capacity);

		const topRightBounds: IRectangle = { x: x + width, y, width, height };
		this.topRight = new Quadtree(topRightBounds, this.capacity);

		const bottomLeftBounds: IRectangle = { x, y: y + height, width, height };
		this.bottomLeft = new Quadtree(bottomLeftBounds, this.capacity);

		const bottomRightBounds: IRectangle = { x: x + width, y: y + height, width, height };
		this.bottomRight = new Quadtree(bottomRightBounds, this.capacity);

		this.divided = true;
	}

	query(range: IRectangle): IParticle[] {
		const foundPoints: IParticle[] = [];
    
		if (!intersects(this.bounds, range)) {
			return foundPoints;
		}
    
		for (const particle of this.particles) {
			if (contains(range, particle.position)) {
				foundPoints.push(particle);
			}
		}
    
		if (this.divided) {
			foundPoints.push(...this.topLeft?.query(range) ?? []);
			foundPoints.push(...this.topRight?.query(range) ?? []);
			foundPoints.push(...this.bottomLeft?.query(range) ?? []);
			foundPoints.push(...this.bottomRight?.query(range) ?? []);
		}
    
		return foundPoints;
	}
}

