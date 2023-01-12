import { MAX_BOUNDARY, VISIBILITY } from '../../Utils/constants';
import { Coordinate } from '../Pieces/Character';
import Cell, { CellTypes } from '../Pieces/Cell';

// our hero has a visibility of 5 squares ahead, behind, and left and right

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
    const visibleMap = [];

    const currentX = coordinate.x;
    const currentY = coordinate.y;
    const rowsToGet = VISIBILITY * 2 + 1;
    let startingRow = currentY - VISIBILITY;
    const endingRow = currentY + VISIBILITY;
    while (startingRow <= endingRow) {
      const row = this.getRow(startingRow, currentX - VISIBILITY, rowsToGet);
      visibleMap.push(row);
      startingRow++;
    }

    return visibleMap;
  }

  getRow(rowNumber: number, colNumber: number, amount: number) {
    const maxCol = colNumber + amount;
    const row = [];
    while (colNumber < maxCol) {
      if (
        colNumber >= 0 &&
        this.isMoveInBounds({ x: colNumber, y: rowNumber })
      ) {
        row.push(this.getCell({ x: colNumber, y: rowNumber }));
      } else {
        // If we've reached the edge of the map, fill out the FOV with impassable tiles
        row.push(
          new Cell({
            position: { x: colNumber, y: rowNumber },
            type: CellTypes.IMPASSABLE,
          })
        );
      }
      colNumber++;
    }
    return row;
  }

  isMoveInBounds({ x, y }: Coordinate) {
    return x >= 0 && y >= 0 && x < MAX_BOUNDARY && y < MAX_BOUNDARY;
  }
}
