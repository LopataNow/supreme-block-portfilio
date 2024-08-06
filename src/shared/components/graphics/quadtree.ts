import Particle, { IParticle } from "./particle";
import Rectangle, { contains, intersects, IRectangle } from "./rectangle";

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
        const w = this.bounds.width / 2;
        const h = this.bounds.height / 2;

        const topLeftBounds: IRectangle = { x, y, width: w, height: h };
        this.topLeft = new Quadtree(topLeftBounds, this.capacity);

        const topRightBounds = new Rectangle(x + w, y, w, h);
        this.topRight = new Quadtree(topRightBounds, this.capacity);

        const bottomLeftBounds = new Rectangle(x, y + h, w, h);
        this.bottomLeft = new Quadtree(bottomLeftBounds, this.capacity);

        const bottomRightBounds = new Rectangle(x + w, y + h, w, h);
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

