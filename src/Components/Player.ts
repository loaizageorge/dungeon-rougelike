export type Coordinate = { x: number; y: number };

class Player {
  position: Coordinate;

  constructor(position: Coordinate) {
    this.position  = position;
  }

  move(keyCode: number): Coordinate | false {
    //const arrowKeys = [37, 38, 39, 40];
    switch (keyCode) {
      case 37:
        return this.moveLeft();

      case 38:
        return this.moveUp();

      case 39:
        return this.moveRight();

      case 40:
        return this.moveDown();
        
      default:
        return false;
    }
  };

  moveLeft(): Coordinate {
    return {x: this.getXCoord() -1, y: this.getYCoord()};
  }

  moveRight(): Coordinate {
    return  {x: this.getXCoord() + 1, y: this.getYCoord()};
  }

  moveDown(): Coordinate {
    return {x: this.getXCoord(), y: this.getYCoord() + 1};
  }

  moveUp(): Coordinate {
    return {x: this.getXCoord(), y: this.getYCoord() - 1};
  }

  /* GETTERS & SETTERS */
  getPosition(): Coordinate {
    return this.position;
  }

  setPosition(position: Coordinate): void {
    this.position = position;
  }

  getXCoord(): number {
    return this.position.x;
  }

  getYCoord(): number {
    return this.position.y;
  }
}

export default Player;