import './style.css';
import './game.css';
import Board from './Components/Board';
import Player from './Components/Player';
import Canvas from './Components/Canvas';
import { CellTypes } from './Components/Cell';
import PlayerStats from './Components/PlayerStats';
import { generateBoard } from './Utils/Generator';
import GameMap from './Components/GameMap';
import { clearEvents } from './Components/History';
import { calculateHP } from './Utils/StatCalculator';

const canvas = new Canvas(
  document.getElementById('dungeon-crawler') as HTMLCanvasElement
);

function setupGame() {
  // create the player
  const player = reviveHero();

  const gameMap = initGameMap();

  // place the player on the board
  gameMap.place(player, player.getPosition());
  canvas.placeOnBoard(player.getPosition(), 'yellow');

  // show the player stats
  const playerStats = new PlayerStats();
  playerStats.displayStats(player);

  const board = new Board({ canvas, player, playerStats, gameMap });
  board.addArrowKeyListener();
  return board;
}

function addResetGameListener(board: Board) {
  document.getElementById('reset-game')?.addEventListener('click', function () {
    const player = reviveHero();
    const gameMap = initGameMap();

    // place the player on the board
    gameMap.place(player, player.getPosition());
    canvas.placeOnBoard(player.getPosition(), 'pink');

    // refresh the player and the gamemap
    board.player = player;
    board.gameMap = gameMap;
    if (board.gameOver) {
      board.addArrowKeyListener();
    }
    board.gameOver = false;
  });
}

/**
 * Fresh slate, return a gamemap populated with items and enemies
 */
function initGameMap(): GameMap {
  //canvas.drawBlankBoard();
  let generated = generateBoard({ length: 10, width: 10 });
  
  canvas.drawFilledBoard(generated);
  // generate items and enemies
  // and draw them on the board
  // wipe out the history
  clearEvents();

  // initalize the map with items and enemies
  const gameMap = new GameMap(generated);
  return gameMap;
}

function reviveHero(): Player {
  const level = 5;
  return new Player({
    level,
    position: { x: 0, y: 2 },
    health: calculateHP(level, 35),
    attack: 40,
    type: CellTypes.HERO,
    experience: 0
  });
}

// setup items and enemies

const board = setupGame();
addResetGameListener(board);
