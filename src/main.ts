import './style.css'

import Board from './Components/Board'
import Player from './Components/Player';
import Canvas, { CellTypes } from './Components/Canvas';
import Enemy from './Components/Enemy';

const canvas = new Canvas(document.getElementById("dungeon-crawler") as HTMLCanvasElement);
const player = new Player({
  position: {x: 0, y: 2},
  health: 10,
  attack: 1,
  type: CellTypes.HERO
});

const enemy = new Enemy({x: 9, y: 9});
const board = new Board(canvas, player, enemy);

canvas.drawBlankBoard();
board.addArrowKeyListener();
canvas.placeOnBoard(player.getPosition(), CellTypes.HERO);
canvas.placeOnBoard(enemy.getPosition(), CellTypes.ENEMY);