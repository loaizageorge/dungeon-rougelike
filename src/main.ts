import './style.css';
import './game.css';
import Board from './Components/Board';
import Player from './Components/Player';
import Canvas from './Components/Canvas';
import { CellTypes } from './Components/Cell';
import Item from './Components/Item';
import PlayerStats from './Components/PlayerStats';
import { generateBoard, generateEnemies, generateItems, placeOnBoard } from './Utils/Generator';
import GameMap from './Components/GameMap';
import { clearEvents } from './Components/History';
import Character from './Components/Character';

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
    canvas.placeOnBoard(player.getPosition(), 'yellow');

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
  canvas.drawBlankBoard();
  let map = generateBoard({ length: 10, width: 10 });

  // generate items and enemies
  // and draw them on the board
  const items = generateItems();
  const enemies = generateEnemies();
  items.map((item: Item) => {
    map = placeOnBoard(map, item);
    canvas.placeOnBoard(item.getPosition(), item.getColor());
  });

  enemies.map((enemy: Character) => {
    map = placeOnBoard(map, enemy);
    canvas.placeOnBoard(enemy.getPosition(), enemy.getColor());
  });

  // wipe out the history
  clearEvents();

  // initalize the map with items and enemies
  const gameMap = new GameMap(map);
  return gameMap;
}

function reviveHero(): Player {
  return new Player({
    position: { x: 0, y: 2 },
    health: 10,
    attack: 1,
    type: CellTypes.HERO,
  });
}

// setup items and enemies

const board = setupGame();
addResetGameListener(board);
