import { Coordinate } from './Player';

export default class Enemy {
  position: Coordinate;

  constructor(position: Coordinate) {
    this.position = position;
  }

  getPosition(): Coordinate {
    return this.position;
  }
}

