import Cell, { CellTypes } from './Cell';
import { Coordinate } from './Character';

interface ItemProps {
  type: CellTypes,
  amount: number,
  position: Coordinate;
};

class Item extends Cell {
  declare type: CellTypes;
  amount: number;
  declare position: Coordinate;

  constructor({amount, position, type}: ItemProps) {
    super({position, type});
    this.amount = amount;
  }

  getAmount() {
    return this.amount;
  }
}

export default Item;
