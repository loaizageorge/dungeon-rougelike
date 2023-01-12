import { generateBoard } from '../Utils/Generator';
import Board from './Game/Board';
import Canvas from './Game/Canvas';
import { CellTypes } from './Pieces/Cell';
import Enemy from './Pieces/Enemy';
import GameMap from './Game/GameMap';
import Player from './Pieces/Player';
import PlayerStats from './Display/PlayerStats';

export const createPlayer = ({
  position = { x: 0, y: 0 },
  health = 10,
  attack = 1,
  level = 1,
  type = CellTypes.HERO,
  experience = 45,
}) => {
  return new Player({ position, health, attack, type, level, experience });
};

const defaultPlayer = createPlayer({});
const defaultEnemy = new Enemy({
  position: { x: 1, y: 1 },
  health: 10,
  attack: 1,
  level: 1,
  type: CellTypes.ENEMY,
  experience: 45
});
const defaultCanvas = new Canvas(document.createElement('canvas'));
const defaultPlayerStats = new PlayerStats();
const defaultMap = new GameMap(generateBoard({length: 10, width: 10}));
defaultMap.place(defaultEnemy, defaultEnemy.getPosition());


export const testSetup = ({ canvas = defaultCanvas, player = defaultPlayer, playerStats = defaultPlayerStats, gameMap = defaultMap }): Board => {
  return new Board({ canvas, player, playerStats, gameMap });
};

