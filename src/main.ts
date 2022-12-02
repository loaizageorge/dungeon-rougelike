import './style.css'

import Board from './Components/Board'
import Player from './Components/Player';
import Canvas from './Components/Canvas';

const canvas = new Canvas(document.getElementById("dungeon-crawler") as HTMLCanvasElement);
const player = new Player({x: 0, y: 2});
const board = new Board(canvas, player);

canvas.drawBlankBoard();
board.addArrowKeyListener();
canvas.placeOnBoard(player.getPosition());