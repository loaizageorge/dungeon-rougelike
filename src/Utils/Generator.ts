import Cell, { CellTypes } from "../Components/Cell";
import Enemy from "../Components/Enemy";
import Item from "../Components/Item";

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


export const generateItems = () => {
  return [
    new Item({
      type: CellTypes.POTION,
      amount: 1,
      position: { x: 1, y: 1 },
    }),
    new Item({
      type: CellTypes.POTION,
      amount: 1,
      position: { x: 3, y: 3 },
    }),
    new Item({
      type: CellTypes.WEAPON,
      amount: 1,
      position: { x: 5, y: 5 },
    }),
    new Item({
      type: CellTypes.WEAPON,
      amount: 1,
      position: { x: 8, y: 8 },
    }),
  ];
};

export const generateEnemies = (): Enemy[] => {
  // create the enemy
  const enemy = new Enemy({
    position: { x: 9, y: 9 },
    health: 20,
    attack: 1,
    type: CellTypes.ENEMY,
  });
  return [enemy];
};