import Point, { IPoint } from "./point";

export interface IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function contains(rect: IRectangle, point: IPoint): boolean {
    return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
    );
}

export function intersects(r1: IRectangle, r2: IRectangle): boolean {
    return (
        r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y
    );
}

export default class Rectangle {
    constructor(public x: number, public y: number, public width: number, public height: number) {}

    contains(point: Point): boolean {
        return (
            point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
        );
    }

    intersects(range: Rectangle): boolean {
        return (
            this.x < range.x + range.width &&
            this.x + this.width > range.x &&
            this.y < range.y + range.height &&
            this.y + this.height > range.y
        );
    }
}