import { Coordinate } from './Character';

export enum TerrainTypes {
  EMPTY,
  IMPASSABLE
};

export enum ItemTypes {
  WEAPON,
  POTION
};

export enum CharacterTypes {
  HERO,
  ENEMY
}

export enum CellTypes {
  EMPTY,
  IMPASSABLE,
  WEAPON,
  POTION,
  HERO,
  ENEMY
}

interface CellInterface {
  position: Coordinate,
  type: CellTypes
};

class Cell {
  position: Coordinate;
  type: CellTypes;

  constructor({position, type}: CellInterface) {
    this.position = position;
    this.type = type;
  }

  setPosition(position: Coordinate) {
    this.position = position;
  }

  getPosition(): Coordinate {
    return this.position;
  }

  getXCoord(): number {
    return this.position.x;
  }

  getYCoord(): number {
    return this.position.y;
  }

  getType(): CellTypes {
    return this.type;
  }

  getColor(): string {
    switch(this.getType()) {
      case CellTypes.EMPTY:
        return 'white';
      case CellTypes.IMPASSABLE:
        return 'black';
      case CellTypes.HERO:
        return 'yellow';
      case CellTypes.POTION:
        return 'red';
      case CellTypes.WEAPON:
        return 'gray';
      case CellTypes.ENEMY:
        return 'green'
      default:
        return 'white';
    }
  }
}

export default Cell;

