export { createInitialState } from "./gameState";
export { gameTick } from "./gameTick";
export type { TickResult } from "./gameTick";
export { render } from "./renderer";
export { changeDirection } from "./snake";
export { checkCollisions } from "./collision";
export type { CollisionResult } from "./collision";
export { isPositionEqual, isInBounds, getSafeRandomPosition } from "./grid";
