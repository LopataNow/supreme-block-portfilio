export interface IPoint {
  x: number
  y: number
}

export type IVector = IPoint

export function calculateDistance(p1: IPoint, p2: IPoint): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
