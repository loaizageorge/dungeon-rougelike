import { generateBoard } from '../Utils/Generator';
import Board from './Board';
import Canvas from './Canvas';
import { CellTypes } from './Cell';
import Enemy from './Enemy';
import GameMap from './GameMap';
import Player from './Player';
import PlayerStats from './PlayerStats';

const defaultPlayer = new Player({
  position: { x: 0, y: 0 },
  health: 10,
  level: 1,
  attack: 1,
  type: CellTypes.HERO,
});
const defaultEnemy = new Enemy({
  position: { x: 1, y: 1 },
  health: 10,
  attack: 1,
  level: 1,
  type: CellTypes.ENEMY,
});
const defaultCanvas = new Canvas(document.createElement('canvas'));
const defaultPlayerStats = new PlayerStats();
const defaultMap = new GameMap(generateBoard({length: 10, width: 10}));
defaultMap.place(defaultEnemy, defaultEnemy.getPosition());


export const testSetup = ({ canvas = defaultCanvas, player = defaultPlayer, playerStats = defaultPlayerStats, gameMap = defaultMap }): Board => {
  return new Board({ canvas, player, playerStats, gameMap });
};

export const createPlayer = ({
  position = { x: 0, y: 0 },
  health = 10,
  attack = 1,
  level = 1,
  type = CellTypes.HERO,
}) => {
  return new Player({ position, health, attack, type, level });
};