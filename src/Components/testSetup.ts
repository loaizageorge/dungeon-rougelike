import Board from './Board';
import Canvas, { CellTypes } from './Canvas';
import Enemy from './Enemy';
import Item from './Item';
import Player from './Player';
import PlayerStats from './PlayerStats';

export const testSetup = (): Board => {
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

  const items = [
    new Item({
      type: CellTypes.HEALTH,
      amount: 1,
      position: { x: 1, y: 1 },
    }),
  ];
  
  const canvas = new Canvas(document.createElement('canvas'));
  const playerStats = new PlayerStats();
  return new Board(canvas, player, enemy, playerStats, items);
};

export const createPlayer = ({
  position = { x: 0, y: 0 },
  health = 10,
  attack = 1,
  type = CellTypes.HERO,
}) => {
  return new Player({ position, health, attack, type });
};