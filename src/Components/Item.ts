import { CellTypes } from './Canvas';
import { Coordinate } from './Character';

interface ItemProps {
  type: CellTypes,
  amount: number,
  position: Coordinate
};

class Item {
  type: CellTypes;
  amount: number;
  position: Coordinate;

  constructor({type, amount, position}: ItemProps) {
    this.type = type;
    this.amount = amount;
    this.position = position;
  }

  getType(): CellTypes {
    return this.type;
  }

  getAmount() {
    return this.amount;
  }

  getPosition() {
    return this.position;
  }

  getXCoord(): number {
    return this.position.x;
  }

  getYCoord(): number {
    return this.position.y;
  }
}

export default Item;
