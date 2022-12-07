import './style.css';
import './game.css';

import Board from './Components/Board';
import Player from './Components/Player';
import Canvas from './Components/Canvas';
import { CellTypes } from './Components/Cell';
import Enemy from './Components/Enemy';
import Item from './Components/Item';
import PlayerStats from './Components/PlayerStats';
import { generateMap } from './Utils/Generator';

const generateItems = () => {
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



const canvas = new Canvas(
  document.getElementById('dungeon-crawler') as HTMLCanvasElement
);
const player = new Player({
  position: { x: 0, y: 2 },
  health: 10,
  attack: 5,
  type: CellTypes.HERO,
});

const enemy = new Enemy({
  position: { x: 9, y: 9 },
  health: 10,
  attack: 1,
  type: CellTypes.ENEMY,
});

const playerStats = new PlayerStats();
playerStats.displayStats(player);

const items = generateItems();
items.map((item: Item) => {
  canvas.placeOnBoard(item.getPosition(), 'red')
});

const map = generateMap({length: 10, width: 10});
console.log(map);


const board = new Board(canvas, player, enemy, playerStats, items);

canvas.drawBlankBoard();
board.addArrowKeyListener();
canvas.placeOnBoard(player.getPosition(), 'yellow');
canvas.placeOnBoard(enemy.getPosition(), 'green');

