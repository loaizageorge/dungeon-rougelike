import './style.css';
import './game.css';
import Board from './Components/Board';
import Player from './Components/Player';
import Canvas from './Components/Canvas';
import Cell, { CellTypes } from './Components/Cell';
import PlayerStats from './Components/PlayerStats';
import { generateEmptyMap, generatePotion, generateRandomEnemy, randomSeed, randomWalk } from './Utils/Generator';
import GameMap from './Components/GameMap';
import { clearEvents } from './Components/History';
import { calculateHP } from './Utils/StatCalculator';

const canvas = new Canvas(
  document.getElementById('dungeon-crawler') as HTMLCanvasElement
);

function setupGame() {
  const player = reviveHero();
  const seed =  randomSeed();
  player.setPosition(seed);

  const emptyMap = generateEmptyMap();
  
  let map = randomWalk(emptyMap, seed);
  map[seed.y][seed.x].setType(CellTypes.HERO);
  let enemiesPlaced = 5;
  while (enemiesPlaced !== 0) {
    const random = randomSeed()
    const cell = map[random.y][random.x];
    if (cell.getType() === CellTypes.EMPTY) {
      
      map[random.y][random.x] = generateRandomEnemy(random);
      enemiesPlaced--;
    }
  }

  let itemsPlaced = 10;
  while (itemsPlaced !== 0) {
    const random = randomSeed();
    const cell = map[random.y][random.x];
    if (cell.getType() === CellTypes.EMPTY) {
      map[random.y][random.x] = generatePotion(random);
      itemsPlaced--;
    }
  }

  const gameMap = new GameMap(map);
  
  clearEvents();

  // show the player stats
  const playerStats = new PlayerStats();
  playerStats.displayStats(player);

  const board = new Board({ canvas, player, playerStats, gameMap });
  board.addArrowKeyListener();
  
  const visible = gameMap.getVisibleMap(seed);

  visible.map((row: Cell[], y: number) => {
    row.map((cell: Cell, x: number) => {   
      return canvas.placeOnBoard({x, y}, cell.getColor());
    })
  })
  return board;
}

function addResetGameListener(board: Board) {
  document.getElementById('reset-game')?.addEventListener('click', function () {
    const player = reviveHero();
    const gameMap = initGameMap();

    // place the player on the board
    gameMap.place(player, player.getPosition());
    canvas.placeOnBoard(player.getPosition(), player.getColor());

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
  const emptyMap = generateEmptyMap();
  let map = randomWalk(emptyMap, randomSeed());
  
  // generate items and enemies
  // and draw them on the board
  // wipe out the history
  clearEvents();

  // initalize the map with items and enemies
  const gameMap = new GameMap(map);
  return gameMap;
}

function reviveHero(): Player {
  const level = 5;
  return new Player({
    level,
    position: { x: 0, y: 2 },
    health: calculateHP(level, 50),
    attack: 40,
    type: CellTypes.HERO,
    experience: 0
  });
}

// setup items and enemies
const board = setupGame();
addResetGameListener(board);


