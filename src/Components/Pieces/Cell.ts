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
  ENEMY,
  BOSS
}

export enum CellTypes {
  EMPTY,
  IMPASSABLE,
  WEAPON,
  POTION,
  HERO,
  ENEMY,
  BOSS
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

  setType(type: CellTypes) {
    this.type = type;
  }

  getIcon(): string {
    switch(this.getType()) {
      case CellTypes.EMPTY:
        return 'grass';
      case CellTypes.IMPASSABLE:
        return 'stone';
      case CellTypes.HERO:
        return 'pickachu';
      case CellTypes.POTION:
        return 'potion';
      case CellTypes.WEAPON:
        return 'xattack';
      case CellTypes.ENEMY:
        return 'rattata'
      case CellTypes.BOSS:
        return 'gengar'
      default:
        return 'grass';
    }
  }
}

export default Cell;

