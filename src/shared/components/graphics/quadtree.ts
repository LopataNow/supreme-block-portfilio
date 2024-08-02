import Point from "./point";
import Rectangle from "./rectangle";

export default class Quadtree {
    private capacity: number;
    private points: Point[] = [];
    private bounds: Rectangle;
    private divided: boolean = false;

    private topLeft: Quadtree | undefined = undefined;
    private topRight: Quadtree | undefined = undefined;
    private bottomLeft: Quadtree | undefined = undefined;
    private bottomRight: Quadtree | undefined = undefined;

    constructor(bounds: Rectangle, capacity: number) {
        this.capacity = capacity;
        this.bounds = bounds;
    }

    insert(point: Point): boolean {
        if (!this.bounds.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        if (this.topLeft?.insert(point)) {
            return true;
        }
        if (this.topRight?.insert(point)) {
            return true;
        }
        if (this.bottomLeft?.insert(point)) {
            return true;
        }
        if (this.bottomRight?.insert(point)) {
            return true;
        }

        return false;
    }

    subdivide(): void {
        const x = this.bounds.x;
        const y = this.bounds.y;
        const w = this.bounds.width / 2;
        const h = this.bounds.height / 2;

        const topLeftBounds = new Rectangle(x, y, w, h);
        this.topLeft = new Quadtree(topLeftBounds, this.capacity);

        const topRightBounds = new Rectangle(x + w, y, w, h);
        this.topRight = new Quadtree(topRightBounds, this.capacity);

        const bottomLeftBounds = new Rectangle(x, y + h, w, h);
        this.bottomLeft = new Quadtree(bottomLeftBounds, this.capacity);

        const bottomRightBounds = new Rectangle(x + w, y + h, w, h);
        this.bottomRight = new Quadtree(bottomRightBounds, this.capacity);

        this.divided = true;
    }

    query(range: Rectangle): Point[] {
        const foundPoints: Point[] = [];

        if (!this.bounds.intersects(range)) {
            return foundPoints;
        }

        for (const point of this.points) {
            if (range.contains(point)) {
                foundPoints.push(point);
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

