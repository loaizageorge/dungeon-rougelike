import { Coordinate } from './Character';
import Cell, { CellTypes } from "./Cell";

export default class GameMap {
  gameMap: Cell[][];

  constructor(map: Cell[][]) {
    this.gameMap = map;
  }

  getMap(): Cell[][] {
    return this.gameMap;
  }

  setMap(gameMap: Cell[][]): void {
    this.gameMap = gameMap;
  }

  getCell(position: Coordinate): Cell {
    return this.getMap()[position.x][position.y];
  }


  update(cell: Cell, prevPos: Coordinate, newPos: Coordinate): void {
    this.place(cell, newPos);
    this.remove(prevPos);
  }

  // use update so we can keep the map and the UI in sync
  place(cell: Cell, position: Coordinate): void {
    const updatedBoard = Array.from(this.getMap());
    updatedBoard[position.x][position.y] = cell;
    this.setMap(updatedBoard);
  }

  remove(position: Coordinate): void {
    const updatedBoard = Array.from(this.getMap());
    const blankCell = new Cell({position, type: CellTypes.EMPTY});
    updatedBoard[position.x][position.y] = blankCell;
    this.setMap(updatedBoard);
  }

}