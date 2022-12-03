import './style.css'
import './game.css';

import Board from './Components/Board'
import Player from './Components/Player';
import Canvas, { CellTypes } from './Components/Canvas';
import Enemy from './Components/Enemy';
import PlayerStats from './Components/PlayerStats';

const canvas = new Canvas(document.getElementById("dungeon-crawler") as HTMLCanvasElement);
const player = new Player({
  position: {x: 0, y: 2},
  health: 10,
  attack: 5,
  type: CellTypes.HERO
});

const enemy = new Enemy({
  position: {x: 9, y: 9},
  health: 10,
  attack: 1,
  type: CellTypes.ENEMY
});

const playerStats = new PlayerStats();
playerStats.displayStats(player);
const board = new Board(canvas, player, enemy, playerStats);


canvas.drawBlankBoard();
board.addArrowKeyListener();
canvas.placeOnBoard(player.getPosition(), CellTypes.HERO);
canvas.placeOnBoard(enemy.getPosition(), CellTypes.ENEMY);