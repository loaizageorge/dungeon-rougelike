import './game.css';
import Board from './Components/Game/Board';
import Player from './Components/Pieces/Player';
import Canvas from './Components/Game/Canvas';
import Cell, { CellTypes } from './Components/Pieces/Cell';
import PlayerStats from './Components/Display/PlayerStats';
import {
  generateAttack,
  generateEmptyMap,
  generatePotion,
  generateRandomEnemy,
  randomSeed,
  randomWalk,
} from './Utils/Generator';
import GameMap from './Components/Game/GameMap';
import { clearEvents } from './Components/Display/History';
import { calculateHP } from './Utils/StatCalculator';
import Boss from './Components/Pieces/Boss';
import { hideModal, showStartingScreen } from './Components/Display/Modal';

const canvas = new Canvas(
  document.getElementById('dungeon-crawler') as HTMLCanvasElement
);

// pass in the board for game overs / restarts to get around a bug with the keyboard event listener not being removed
function setupGame(prevBoard: Board | false): Board {
  const player = reviveHero();
  const seed = randomSeed();
  player.setPosition(seed);

  const emptyMap = generateEmptyMap();

  let {map, lastPosition} = randomWalk(emptyMap, seed);

  // place the hero on the game map
  map[seed.y][seed.x].setType(CellTypes.HERO);

  // randomly place enemies on empty tiles
  let enemiesPlaced = 5;
  while (enemiesPlaced !== 0) {
    const random = randomSeed();
    const cell = map[random.y][random.x];
    if (cell.getType() === CellTypes.EMPTY) {
      map[random.y][random.x] = generateRandomEnemy(random);
      enemiesPlaced--;
    }
  }

  // randomly place potions on empty tiles
  let itemsPlaced = 10;
  while (itemsPlaced !== 0) {
    const random = randomSeed();
    const cell = map[random.y][random.x];
    if (cell.getType() === CellTypes.EMPTY) {
      map[random.y][random.x] = generatePotion(random);
      itemsPlaced--;
    }
  }

  // randomly place attack boosts on empty tiles
  let xAttacks = 10;
  while (xAttacks !== 0) {
    const random = randomSeed();
    const cell = map[random.y][random.x];
    if (cell.getType() === CellTypes.EMPTY) {
      map[random.y][random.x] = generateAttack(random);
      xAttacks--;
    }
  }

  // place the boss enemy on the last tile on the map
  const bossLevel = 10;
  const boss = new Boss({
    position: lastPosition,
    health: calculateHP(bossLevel, 50),
    attack: 40,
    level: 10,
    type: CellTypes.BOSS,
    experience: 100,
  })
  map[lastPosition.y][lastPosition.x] = boss;

  // keep track of the player, items, and enemies
  const gameMap = new GameMap(map);

  clearEvents();

  // show the player stats
  const playerStats = new PlayerStats();
  playerStats.displayStats(player);

  // draw the canvas
  const visible = gameMap.getVisibleMap(seed);
  visible.map((row: Cell[], y: number) => {
    row.map((cell: Cell, x: number) => {
      return canvas.placeOnBoard({ x, y }, cell.getIcon());
    });
  });

  if (prevBoard) {
    prevBoard.setGameMap(gameMap);
    prevBoard.setPlayer(player);
    prevBoard.setPlayerStats(playerStats);
    prevBoard.gameOver = false;
    return prevBoard;
  } else {
    const board = new Board({ canvas, player, playerStats, gameMap });
    board.addArrowKeyListener();
    return board;
  }
}

function reviveHero(): Player {
  const level = 5;
  return new Player({
    level,
    position: { x: 0, y: 2 },
    health: calculateHP(level, 50),
    attack: 40,
    type: CellTypes.HERO,
    experience: 0,
  });
}

const board = setupGame(false);
showStartingScreen();
document.getElementById('modal-button')?.addEventListener('click', function() {
  hideModal();
  setupGame(board);
});

document.getElementById('reset-game')?.addEventListener('click', function () {
  setupGame(board);
});
