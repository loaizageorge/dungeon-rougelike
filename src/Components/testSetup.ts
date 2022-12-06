import Board from './Board';
import Canvas, { CellTypes } from './Canvas';
import Enemy from './Enemy';
import Player from './Player';
import PlayerStats from './PlayerStats';

const testSetup = (): Board => {
  const player = new Player({
    position: { x: 0, y: 0 },
    health: 10,
    attack: 1,
    type: CellTypes.HERO,
  });
  const enemy = new Enemy({
    position: { x: 1, y: 1 },
    health: 10,
    attack: 1,
    type: CellTypes.ENEMY,
  });
  const canvas = new Canvas(document.createElement('canvas'));
  const playerStats = new PlayerStats();
  return new Board(canvas, player, enemy, playerStats);
};

export default testSetup;