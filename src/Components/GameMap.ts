import { Coordinate } from './Character';
import Cell, { CellTypes } from './Cell';

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
    return this.getMap()[position.y][position.x];
  }

  update(cell: Cell, prevPos: Coordinate, newPos: Coordinate): void {
    this.place(cell, newPos);
    this.remove(prevPos);
  }

  // use update so we can keep the map and the UI in sync
  place(cell: Cell, position: Coordinate): void {
    const updatedBoard = Array.from(this.getMap());
    updatedBoard[position.y][position.x] = cell;
    this.setMap(updatedBoard);
  }

  remove(position: Coordinate): void {
    const updatedBoard = Array.from(this.getMap());
    const blankCell = new Cell({ position, type: CellTypes.EMPTY });
    updatedBoard[position.y][position.x] = blankCell;
    this.setMap(updatedBoard);
  }

  getVisibleMap(coordinate: Coordinate) {

    // can see in 1 square radius, 9 grids (including own)
    const visibility = 2;
    const visibleMap = [];

    const currentX = coordinate.x;
    const currentY = coordinate.y;
    const rowsToGet = visibility * 2 + 1;
    let startingRow = currentY - visibility;
    const endingRow = currentY + visibility;
    while (startingRow <= endingRow) {
        const row = this.getRow(startingRow, currentX - visibility, rowsToGet);
        visibleMap.push(row);
      startingRow++;
    }

    return visibleMap;
  }

  
  getRow(rowNumber: number, colNumber: number, amount: number) {
    const maxCol = colNumber + amount;
    const boundaries = 20;
    const row = [];
    while (colNumber < maxCol) {
      if (colNumber >= 0 && colNumber < boundaries && rowNumber < boundaries) {
        row.push(this.getCell({ x: colNumber, y: rowNumber }));
      } else {
        // If we've reached the edge of the map, fill out the FOV with impassable tiles
        row.push(new Cell({position: {x: colNumber, y: rowNumber}, type: CellTypes.IMPASSABLE}));
      }
      colNumber++;
    }
    return row;
  }
}
