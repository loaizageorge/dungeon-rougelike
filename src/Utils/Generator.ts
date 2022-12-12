import Cell, { CellTypes } from "../Components/Cell";

export const generateBoard = ({length, width}: {length: number, width: number}): Cell[][] => {
  let map = [];
  let i = 0;
  while (i < length) {
    let row = [];
    let j = 0;
    
    while (j < width) { 
      const coor = {x: i, y: j};
      const cell = new Cell({position: coor, type: CellTypes.EMPTY});
      row.push(cell);
      j++;
    }
    map.push(row);
    i++;
  }
  return map;
}

export const placeOnBoard = (board: Cell[][], cell: Cell): Cell[][] => {
  const updatedBoard = Array.from(board);
  updatedBoard[cell.getXCoord()][cell.getYCoord()] = cell;
  return updatedBoard;
}

export const removeFromBoard = (board: Cell[][], cell: Cell): Cell[][] => {
  const updatedBoard = Array.from(board);
  updatedBoard[cell.getXCoord()][cell.getYCoord()] = new Cell({type: CellTypes.EMPTY, position: {x: cell.getXCoord(), y: cell.getYCoord()}});
  return updatedBoard;
}