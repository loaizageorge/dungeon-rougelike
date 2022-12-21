import { Coordinate } from './../Components/Character';
import Cell, { CellTypes } from "../Components/Cell";
import Enemy from "../Components/Enemy";
import Item from "../Components/Item";
import { calculateHP } from './StatCalculator';

export const generateBoard = ({length, width}: {length: number, width: number}): Cell[][] => {
  let map = [];
  let i = 0;
  const MAX_ENEMY = 10;
  let enemyAmount = 0;
  while (i < length) {
    let row = [];
    let j = 0;
    
    while (j < width) { 
      const coor = {x: i, y: j};
      const type = randomize();
      if (type === 'enemy' && enemyAmount < MAX_ENEMY) {
        enemyAmount++;
        row.push(generateRandomEnemy(coor));
      } else if (type === 'item') {
        row.push(generateRandomItem(coor));
      } else {
        row.push(new Cell({position: coor, type: CellTypes.EMPTY}));
      }
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

export const generateRandomEnemy = (position: Coordinate): Enemy => {
  // create the enemy
  const level = Math.round(Math.random() * (5 - 1) + 1);
  const baseHP = 5;
  const enemy = new Enemy({
    position,
    health: calculateHP(level, baseHP),
    attack: 40,
    level,
    type: CellTypes.ENEMY,
    experience: 45,
  });
  return enemy;
};

function generateRandomItem(position: Coordinate): Item {
  const itemType = Math.round(Math.random());
  const item = new Item({
    type: itemType ? CellTypes.POTION : CellTypes.WEAPON,
    amount: 20,//Math.floor(Math.random()* 4) + 5,
    position
  });
  return item;
}

function randomize(): string {
  // 5% chance
  const enemyOdds = [0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  // 10% chance
  const itemOdds = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const roll = Math.floor(Math.random() * 101);
  if (enemyOdds.includes(roll)) {
    return 'enemy';
  } else if (itemOdds.includes(roll)) {
    return 'item';
  }
  return 'empty';
}